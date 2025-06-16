"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Heart, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function CalendlyBookingPage() {
  useEffect(() => {
    // Load Calendly widget
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]',
      )
      if (existingScript) {
        document.body.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-semibold">OnlineMarriagesNow</span>
          </Link>
          <Link href="/booking">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Packages
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 md:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Schedule Your Ceremony</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose a date and time that works for you. Our licensed officiants are available 7 days a week.
            </p>
          </div>

          {/* Calendly Embed */}
          <div className="max-w-4xl mx-auto">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/your-calendly-link/marriage-ceremony"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
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
