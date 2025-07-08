import Layout from '../../components/Layout';
import { Breadcrumb } from '../../components/Navigation';
import { generatePageMetadata } from '../../utils/seoUtils';

export const metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Read our Terms of Service to understand the rules and regulations for using Geometry Dash Lite platform and our free online games.',
  path: '/terms',
});

export default function TermsPage() {
  const breadcrumbItems = [
    { title: 'Home', url: '/' },
    { title: 'Terms of Service' }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Breadcrumb */}
        {/* <Breadcrumb items={breadcrumbItems} className="mb-4" /> */}

        {/* Page Header */}
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
          <p className="text-base text-gray-600 dark:text-gray-300">Please read the following terms carefully before using our service</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          
          {/* Introduction */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">📋 Terms Overview</h2>
            <div className="prose prose-sm max-w-none text-left">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Welcome to Geometry Dash Lite ("our service", "website").
                This service is provided by <strong>geometry-dash-lite.org</strong>.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                By accessing or using our service, you agree to be bound by these terms of service.
                If you do not agree to these terms, please do not use our service.
              </p>
            </div>
          </div>

          {/* Service Description */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🎮 Service Description</h2>
            <div className="space-y-3 text-left">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Geometry Dash Lite is a free online gaming platform that provides:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-blue-500 mr-2 mt-0.5">🎯</span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Free Games</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Browser games without downloads</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-2 mt-0.5">📱</span>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Cross-Platform Support</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Support for multiple devices and browsers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">👤 User Responsibilities</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 text-left">✅ What You Can Do</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 text-left list-disc list-inside">
                  <li>Use all games we provide for free</li>
                  <li>Share game links with friends</li>
                  <li>Provide feedback and suggestions to us</li>
                  <li>Report technical issues or bugs</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 text-left">❌ What You Cannot Do</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 text-left list-disc list-inside">
                  <li>Attempt to hack, attack, or interfere with our service</li>
                  <li>Use automated tools or bots to access the website</li>
                  <li>Copy, distribute, or modify our game content</li>
                  <li>Engage in any illegal or malicious activities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">⚠️ Disclaimer</h2>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-left">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Our service is provided "as is" without any express or implied warranties.
                To the maximum extent permitted by law, we are not liable for any damages arising from the use or inability to use our service.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-4 text-white text-left">
            <h2 className="text-xl font-bold mb-2">📞 Terms-Related Inquiries</h2>
            <p className="text-sm mb-3 opacity-90">
              If you have any questions about our terms of service, please feel free to contact us:
            </p>
            <a
              href="mailto:support@geometry-dash-lite.org?subject=Terms of Service Inquiry"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-green-50 transition-colors"
            >
              Send Email
            </a>
          </div>

        </div>
      </div>
    </Layout>
  );
} 