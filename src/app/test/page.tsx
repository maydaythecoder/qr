import QRInstagramShare from '@/components/QRInstagramShare';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            QR Code Sharing Test Page
          </h1>
          <p className="text-gray-600">
            Test the QR code generation and Instagram sharing functionality with different URLs.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Test Case 1: Simple URL */}
          <QRInstagramShare
            url="https://google.com"
            title="Google Search"
            text="Search the web with Google"
          />

          {/* Test Case 2: Social Media */}
          <QRInstagramShare
            url="https://twitter.com"
            title="Twitter"
            text="Follow us on Twitter"
          />

          {/* Test Case 3: E-commerce */}
          <QRInstagramShare
            url="https://amazon.com"
            title="Amazon Store"
            text="Shop on Amazon"
          />

          {/* Test Case 4: Long URL */}
          <QRInstagramShare
            url="https://www.example.com/very/long/url/with/many/segments/and/parameters?param1=value1&param2=value2&param3=value3"
            title="Long URL Test"
            text="Testing QR code with a very long URL"
          />

          {/* Test Case 5: Local URL */}
          <QRInstagramShare
            url="http://localhost:3000"
            title="Local Development"
            text="Local development server"
          />

          {/* Test Case 6: Custom Size */}
          <QRInstagramShare
            url="https://github.com"
            title="GitHub"
            text="Check out our GitHub repository"
            size={300}
          />
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Testing Instructions</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Mobile Testing:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Open this page on your mobile device</li>
              <li>Tap &quot;Share to Instagram&quot; on any QR code</li>
              <li>Verify Instagram appears in the share sheet</li>
              <li>Test the sharing functionality</li>
            </ul>
            
            <p className="mt-4"><strong>Desktop Testing:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Open this page on desktop browser</li>
              <li>Tap &quot;Share to Instagram&quot; on any QR code</li>
              <li>Verify the image downloads automatically</li>
              <li>Check the downloaded file quality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
