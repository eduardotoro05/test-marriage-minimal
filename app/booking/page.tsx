"use client"

import { useState } from "react"
import Link from "next/link"

export default function BookingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("standard")

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-rose-600">
              OnlineMarriagesNow
            </Link>
            <Link 
              href="/" 
              className="text-gray-500 hover:text-gray-900"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Book Your Marriage Ceremony</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your package and schedule your ceremony. We'll handle everything else to make your special day perfect.
          </p>
        </div>

        {/* Package Selection */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div
            className={`cursor-pointer border rounded-lg p-6 transition-all ${
              selectedPackage === "standard" ? "border-rose-500 ring-2 ring-rose-200" : "border-gray-200"
            }`}
            onClick={() => setSelectedPackage("standard")}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Standard Ceremony</h3>
              <div className="text-2xl font-bold text-rose-600">$299</div>
            </div>
            <p className="text-gray-600 mb-4">Perfect for most couples</p>
            
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Licensed officiant
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Schedule within 7 days
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                30-minute ceremony
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited guests
              </li>
            </ul>
          </div>

          <div
            className={`cursor-pointer border rounded-lg p-6 transition-all ${
              selectedPackage === "rush" ? "border-rose-500 ring-2 ring-rose-200" : "border-gray-200"
            }`}
            onClick={() => setSelectedPackage("rush")}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Same-Day Rush</h3>
              <div className="text-2xl font-bold text-rose-600">$499</div>
            </div>
            <p className="text-gray-600 mb-4">Get married today!</p>
            
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Licensed officiant
              </li>
              <li className="flex items-center">
                <span className="text-orange-500 mr-2">⚡</span>
                Same-day scheduling
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                30-minute ceremony
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited guests
              </li>
            </ul>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Next Steps</h3>
          <p className="text-gray-600 mb-6">
            After selecting your package, you'll be able to schedule your ceremony and complete payment.
          </p>
          
          <div className="text-center">
            <Link 
              href="/booking/calendly" 
              className="bg-rose-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-rose-700 inline-block"
            >
              Continue to Scheduling
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Selected: {selectedPackage === "standard" ? "Standard Ceremony ($299)" : "Same-Day Rush ($499)"}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
