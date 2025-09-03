import QRCodeShare from '@/components/QRInstagramShare';
import ShareLinks from '@/components/ShareLinks';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            QR Code Sharing Test Page
          </h1>
          <p className="text-gray-600">
            Test the multi-platform QR code sharing functionality with different URL types and use cases.
          </p>
          <div className="mt-4">
            <ShareLinks text="Check out this test page" hashtags={["qr","sharing","nextjs"]} />
          </div>
        </header>

        {/* Social Media Platforms */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Social Media Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Instagram */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Instagram Profile</h3>
                <p className="text-sm text-gray-600">Perfect for sharing your Instagram profile</p>
              </div>
              <QRCodeShare
                url="https://instagram.com/yourprofile"
                title="Instagram Profile"
                text="Follow me on Instagram!"
                size={200}
              />
            </div>

            {/* LinkedIn */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">LinkedIn Profile</h3>
                <p className="text-sm text-gray-600">Share your professional LinkedIn profile</p>
              </div>
              <QRCodeShare
                url="https://linkedin.com/in/yourprofile"
                title="LinkedIn Profile"
                text="Connect with me on LinkedIn"
                size={200}
              />
            </div>

            {/* Snapchat */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Snapchat</h3>
                <p className="text-sm text-gray-600">Perfect for mobile sharing</p>
              </div>
              <QRCodeShare
                url="https://snapchat.com/add/yourusername"
                title="Snapchat"
                text="Add me on Snapchat!"
                size={200}
              />
            </div>
          </div>
        </section>

        {/* Business & E-commerce */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Business & E-commerce</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* E-commerce Store */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">E-commerce Store</h3>
                <p className="text-sm text-gray-600">Share your online store</p>
              </div>
              <QRCodeShare
                url="https://yourstore.com"
                title="Online Store"
                text="Shop our latest products"
                size={200}
              />
            </div>

            {/* Business Website */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Business Website</h3>
                <p className="text-sm text-gray-600">Share your company website</p>
              </div>
              <QRCodeShare
                url="https://yourbusiness.com"
                title="Business Website"
                text="Visit our website for more information"
                size={200}
              />
            </div>

            {/* Contact Page */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Contact Page</h3>
                <p className="text-sm text-gray-600">Share your contact information</p>
              </div>
              <QRCodeShare
                url="https://yourbusiness.com/contact"
                title="Contact Us"
                text="Get in touch with us"
                size={200}
              />
            </div>
          </div>
        </section>

        {/* Technical Examples */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Technical Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Long URL Test */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 9H17a1 1 0 110 2H3.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Long URL Test</h3>
                <p className="text-sm text-gray-600">Tests complex URLs with parameters</p>
              </div>
              <QRCodeShare
                url="https://www.example.com/very/long/url/with/many/segments/and/parameters?param1=value1&param2=value2&param3=value3&utm_source=test&utm_medium=qr&utm_campaign=sharing"
                title="Long URL Test"
                text="Testing QR code with a very long URL containing multiple parameters"
                size={200}
              />
            </div>

            {/* Custom Size */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L4.414 7H7a1 1 0 010 2H4a1 1 0 01-1-1V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h2.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 7H13a1 1 0 010-2h4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Large QR Code</h3>
                <p className="text-sm text-gray-600">300px size for better scanning</p>
              </div>
              <QRCodeShare
                url="https://github.com/yourusername/yourproject"
                title="GitHub Repository"
                text="Check out our open source project"
                size={300}
              />
            </div>

            {/* Local Development */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-center mb-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Local Development</h3>
                <p className="text-sm text-gray-600">For testing on localhost</p>
              </div>
              <QRCodeShare
                url="http://localhost:3000"
                title="Local Development"
                text="Local development server"
                size={200}
              />
            </div>
          </div>
        </section>

        {/* Testing Instructions */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Testing Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Mobile Testing:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Open this page on your mobile device</li>
                <li>Tap &quot;Share QR Code&quot; on any QR code</li>
                <li>Choose Instagram, LinkedIn, Snapchat, or download</li>
                <li>Test the sharing functionality</li>
              </ul>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Desktop Testing:</strong></p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Open this page in desktop browser</li>
                <li>Tap &quot;Share QR Code&quot; on any QR code</li>
                <li>Choose LinkedIn or download option</li>
                <li>Check the downloaded file quality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
