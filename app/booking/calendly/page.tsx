"use client"

import { useEffect } from "react"
import Link from "next/link"

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-rose-600">
              OnlineMarriagesNow
            </Link>
            <Link 
              href="/booking" 
              className="text-gray-500 hover:text-gray-900"
            >
              ← Back to Packages
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Schedule Your Ceremony</h1>
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
      </main>
    </div>
  )
}
