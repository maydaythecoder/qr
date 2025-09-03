// import QRCodeShare from '@/components/QRInstagramShare';
import UniversalQR from '@/components/UniversalQR';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QR Code Generator & Multi-Platform Share
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate QR codes from URLs and share them directly to Instagram, LinkedIn, Snapchat, or download. 
            Works seamlessly on mobile devices with fallback to download on desktop.
          </p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {/* Example 1: Basic URL */}
          <div className="mt-6 flex justify-center">
            <UniversalQR title="Share this page" text="Share this page across social platforms" />
          </div>
          <Link 
            href="/test" 
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Test Page
          </Link>
        </main>

        {/* Features Section */}
        <section className="py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 mb-3">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Platform Sharing</h3>
              <p className="text-gray-600 text-sm">
                Share to Instagram, LinkedIn, Snapchat, or download directly from the app.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-green-600 mb-3">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Fallback</h3>
              <p className="text-gray-600 text-sm">
                Automatically downloads QR code images on desktop browsers where Web Share API isn&apos;t available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-purple-600 mb-3">
                <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">User-Friendly</h3>
              <p className="text-gray-600 text-sm">
                Clean, modern UI with loading states, error handling, and clear instructions for users.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Technical Implementation
            </h2>
            <div className="space-y-4 text-sm text-gray-600">
              <p>
                <strong>QR Code Generation:</strong> Uses the <code className="bg-gray-100 px-1 rounded">next-qrcode</code> library 
                to generate high-quality QR codes with configurable error correction levels.
              </p>
              <p>
                <strong>Sharing Method:</strong> Implements Web Share API for native sharing on mobile devices, 
                LinkedIn sharing for desktop, and automatic download functionality for all platforms.
              </p>
              <p>
                <strong>Security:</strong> All processing happens client-side with no server dependencies. 
                QR codes are generated in real-time and shared directly from the browser.
              </p>
              <p>
                <strong>Compatibility:</strong> Works on iOS Safari, Android Chrome, and modern desktop browsers 
                with graceful degradation for older platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-500">
          <p className="mb-4">Built with Next.js and Web Share API</p>
          <a 
            href="/test" 
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Test Page
          </a>
        </footer>
      </div>
    </div>
  );
}
