import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-rose-600">OnlineMarriagesNow</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/how-it-works" className="text-gray-500 hover:text-gray-900">
                How It Works
              </Link>
              <Link href="/pricing" className="text-gray-500 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/faq" className="text-gray-500 hover:text-gray-900">
                FAQ
              </Link>
              <Link 
                href="/booking" 
                className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700"
              >
                Get Married Now
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl">
            Get Married Online in Minutes
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Legal online marriage ceremonies performed by licensed officiants. Quick, easy, and completely legitimate.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              href="/booking" 
              className="bg-rose-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-rose-700"
            >
              Start Your Ceremony
            </Link>
            <Link 
              href="/how-it-works" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-rose-600 text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold">100% Legal</h3>
            <p className="text-gray-600 mt-2">Fully licensed officiants and legally recognized marriage certificates</p>
          </div>
          <div className="text-center">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-rose-600 text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold">Same Day Service</h3>
            <p className="text-gray-600 mt-2">Get married today! Schedule your ceremony for as soon as right now</p>
          </div>
          <div className="text-center">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-rose-600 text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold">Unlimited Guests</h3>
            <p className="text-gray-600 mt-2">Invite as many family and friends as you want to witness your special day</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-lg text-gray-600">One low price includes everything you need for a legal marriage ceremony.</p>
          
          <div className="mt-10 max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-semibold">Complete Ceremony</h3>
              <div className="mt-4 text-4xl font-bold text-rose-600">$299</div>
              <p className="text-gray-500">Everything included</p>
              
              <ul className="mt-6 space-y-3 text-left">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Licensed officiant
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Legal marriage certificate
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  30-minute ceremony
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Unlimited guests
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  Ceremony recording
                </li>
              </ul>
              
              <Link 
                href="/booking" 
                className="mt-8 w-full bg-rose-600 text-white py-3 px-4 rounded-md font-medium hover:bg-rose-700 inline-block"
              >
                Book Your Ceremony
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-rose-600">OnlineMarriagesNow</span>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-gray-500 hover:text-gray-900">Terms</Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900">Privacy</Link>
              <Link href="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © {new Date().getFullYear()} OnlineMarriagesNow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
