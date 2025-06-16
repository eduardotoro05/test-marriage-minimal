"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Heart, Check, Tag, Plus, Minus, Calendar, Clock, Users, Shield, AlertCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CalendlyEmbed } from "@/components/calendly-embed"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [promoCode, setPromoCode] = useState("")
  const [promoDiscount, setPromoDiscount] = useState<{
    amount: number
    type: "percentage" | "fixed"
    code: string
  } | null>(null)
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoError, setPromoError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [scheduledEvent, setScheduledEvent] = useState<any>(null)
  const [paymentDeadline, setPaymentDeadline] = useState<Date | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<string>("")

  // Package state
  const [selectedPackage, setSelectedPackage] = useState<string>("standard")

  // Add-ons state
  const [sameDayService, setSameDayService] = useState(false)
  const [witnessesNeeded, setWitnessesNeeded] = useState(0)
  const [apostilleStamp, setApostilleStamp] = useState(false)
  const [vowChoice, setVowChoice] = useState<"standard" | "custom">("standard")

  // Form data state
  const [formData, setFormData] = useState({
    firstName1: "",
    lastName1: "",
    email1: "",
    phone1: "",
    firstName2: "",
    lastName2: "",
    email2: "",
    phone2: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  // Check for scheduled event on component mount
  useEffect(() => {
    const storedEvent = localStorage.getItem("calendly_event")
    if (storedEvent) {
      setScheduledEvent(JSON.parse(storedEvent))
    }

    const storedDeadline = localStorage.getItem("payment_deadline")
    if (storedDeadline) {
      setPaymentDeadline(new Date(storedDeadline))
    }
  }, [])

  // Countdown timer effect
  useEffect(() => {
    if (!paymentDeadline) return

    const timer = setInterval(() => {
      const now = new Date()
      const timeLeft = paymentDeadline.getTime() - now.getTime()

      if (timeLeft <= 0) {
        setTimeRemaining("Expired")
        clearInterval(timer)
        // Handle expiration
        handleBookingExpiration()
      } else {
        const minutes = Math.floor(timeLeft / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, "0")}`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [paymentDeadline])

  const handleBookingExpiration = () => {
    // Clear stored data
    localStorage.removeItem("calendly_event")
    localStorage.removeItem("payment_deadline")
    setScheduledEvent(null)
    setPaymentDeadline(null)

    // Show expiration message and redirect to scheduling
    alert("Your booking has expired. Please schedule a new ceremony time.")
    setStep(3) // Go back to scheduling step
  }

  const handleNextStep = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Pricing calculations
  const basePrice = selectedPackage === "standard" ? 299 : 499
  const sameDayPrice = sameDayService ? 200 : 0
  const witnessPrice = witnessesNeeded * 25
  const apostillePrice = apostilleStamp ? 150 : 0
  const subtotal = basePrice + sameDayPrice + witnessPrice + apostillePrice

  const calculateDiscountedPrice = () => {
    if (!promoDiscount) return subtotal

    if (promoDiscount.type === "percentage") {
      return Math.max(0, subtotal - (subtotal * promoDiscount.amount) / 100)
    } else {
      return Math.max(0, subtotal - promoDiscount.amount)
    }
  }

  const finalPrice = calculateDiscountedPrice()
  const discountAmount = subtotal - finalPrice

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return

    setPromoLoading(true)
    setPromoError("")

    try {
      const response = await fetch("/api/validate-promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promoCode: promoCode.trim(),
          amount: subtotal,
        }),
      })

      const data = await response.json()

      if (data.valid) {
        setPromoDiscount({
          amount: data.discount.amount,
          type: data.discount.type,
          code: promoCode.trim(),
        })
        setPromoError("")
      } else {
        setPromoError(data.error || "Invalid promo code")
        setPromoDiscount(null)
      }
    } catch (error) {
      setPromoError("Error validating promo code")
      setPromoDiscount(null)
    }

    setPromoLoading(false)
  }

  const removePromoCode = () => {
    setPromoCode("")
    setPromoDiscount(null)
    setPromoError("")
  }

  const handleCompleteBooking = async () => {
    setIsProcessing(true)

    try {
      const bookingData = {
        package: selectedPackage,
        packageName: selectedPackage === "standard" ? "Online Marriage Ceremony" : "Same-Day Rush Ceremony",
        originalPrice: basePrice,
        finalPrice: finalPrice,
        discount: promoDiscount,
        scheduledEvent: scheduledEvent,
        addOns: {
          sameDayService,
          witnessesNeeded,
          apostilleStamp,
          vowChoice,
        },
        pricing: {
          basePrice,
          sameDayPrice,
          witnessPrice,
          apostillePrice,
          subtotal,
          finalPrice,
        },
        participants: [
          {
            firstName: formData.firstName1,
            lastName: formData.lastName1,
            email: formData.email1,
            phone: formData.phone1,
            role: "partner1",
          },
          {
            firstName: formData.firstName2,
            lastName: formData.lastName2,
            email: formData.email2,
            phone: formData.phone2,
            role: "partner2",
          },
        ],
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
      }

      const response = await fetch("/api/book-ceremony", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (result.success) {
        // Clear stored data on successful payment
        localStorage.removeItem("calendly_event")
        localStorage.removeItem("payment_deadline")
        router.push(`/booking/confirmation?bookingId=${result.bookingId}`)
      } else {
        throw new Error(result.error || "Booking failed")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("There was an error processing your booking. Please try again.")
    }

    setIsProcessing(false)
  }

  // Generate Calendly URL with add-ons info
  const getCalendlyUrl = () => {
    const baseUrl =
      selectedPackage === "standard"
        ? "https://calendly.com/onlinemarriagesnow/online-marriage-ceremony"
        : "https://calendly.com/onlinemarriagesnow/same-day-rush-ceremony"
    const params = new URLSearchParams()

    // Add add-ons as custom answers
    const addOns = []
    if (sameDayService) addOns.push("Same-day service (+$200)")
    if (witnessesNeeded > 0) addOns.push(`${witnessesNeeded} witnesses (+$${witnessPrice})`)
    if (apostilleStamp) addOns.push("Apostille stamp (+$150)")

    if (addOns.length > 0) {
      params.append("a1", addOns.join(", "))
    }

    params.append("a2", `$${finalPrice}`)
    params.append("a3", vowChoice === "standard" ? "Standard" : "Custom")

    return `${baseUrl}?${params.toString()}`
  }

  // Format the scheduled event time for display
  const formatScheduledTime = (event: any) => {
    if (!event) return ""

    const startTime = new Date(event.start_time || event.scheduled_event?.start_time)
    return startTime.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    })
  }

  // Check if form is filled out enough to proceed to scheduling
  const isFormFilledForScheduling = () => {
    return formData.firstName1.trim() !== "" && formData.lastName1.trim() !== "" && formData.email1.trim() !== ""
  }

  // Get the name to use for Calendly prefill
  const getCalendlyPrefillName = () => {
    if (formData.firstName1 && formData.lastName1) {
      return `${formData.firstName1} ${formData.lastName1} & ${formData.firstName2 || "Partner"}`
    }
    return ""
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-semibold">OnlineMarriagesNow</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Book Your Marriage Ceremony</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your package and schedule your ceremony. We'll handle everything else to make your special day
              perfect.
            </p>
          </div>

          {/* Package Selection */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card
              className={`cursor-pointer transition-all ${selectedPackage === "standard" ? "border-rose-500 ring-2 ring-rose-200" : ""}`}
              onClick={() => setSelectedPackage("standard")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Standard Ceremony</CardTitle>
                  <div className="text-2xl font-bold text-rose-600">$299</div>
                </div>
                <CardDescription>Perfect for most couples</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Licensed officiant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Schedule within 7 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm">30-minute ceremony</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited guests</span>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`cursor-pointer transition-all ${selectedPackage === "rush" ? "border-rose-500 ring-2 ring-rose-200" : ""}`}
              onClick={() => setSelectedPackage("rush")}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Same-Day Rush</CardTitle>
                  <div className="text-2xl font-bold text-rose-600">$499</div>
                </div>
                <CardDescription>Get married today!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Licensed officiant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Same-day scheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-sm">30-minute ceremony</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited guests</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                After selecting your package, you'll be able to schedule your ceremony and complete payment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700" disabled={!selectedPackage}>
                  <Link href="/booking/calendly">Continue to Scheduling</Link>
                </Button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Selected: {selectedPackage === "standard" ? "Standard Ceremony ($299)" : "Same-Day Rush ($499)"}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="w-full border-t bg-slate-50 py-6 md:py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-semibold">OnlineMarriagesNow</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} OnlineMarriagesNow. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
