import Layout from '../../components/Layout';
import { Breadcrumb } from '../../components/Navigation';
import { generatePageMetadata } from '../../utils/seoUtils';

export const metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Our Privacy Policy explains how Geometry Dash Lite collects, uses, and protects your personal information when you use our gaming platform.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const breadcrumbItems = [
    { title: 'Home', url: '/' },
    { title: 'Privacy Policy' }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Breadcrumb */}
        {/* <Breadcrumb items={breadcrumbItems} className="mb-4" /> */}

        {/* Page Header */}
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
          <p className="text-base text-gray-600 dark:text-gray-300">Learn how we protect your privacy and data security</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Last updated: December 2024</p>
        </div>

        <div className="space-y-6">
          
          {/* Introduction */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">📋 Policy Overview</h2>
            <div className="prose prose-sm max-w-none text-left">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Geometry Dash Lite ("we", "our", "the website") respects and protects the privacy rights of all visitors.
                This privacy policy explains how we collect, use, store, and protect your personal information.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                By accessing and using our website <strong>geometry-dash-lite.org</strong>,
                you agree to the practices described in this privacy policy.
              </p>
            </div>
          </div>

          {/* Information Collection */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">📊 Information Collection</h2>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 text-left">🔍 Automatically Collected Information</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 text-left list-disc list-inside">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Visit time and page browsing records</li>
                  <li>Operating system information</li>
                  <li>Game usage statistics (used only to improve services)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 text-left">✉️ Voluntarily Provided Information</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 text-left list-disc list-inside">
                  <li>Email address provided when contacting us</li>
                  <li>Feedback and suggestion content</li>
                  <li>Related information in error reports</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Usage */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🎯 Information Usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">🔧 Service Improvement</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>Optimize website performance</li>
                  <li>Fix technical issues</li>
                  <li>Improve user experience</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">📞 Customer Support</h3>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li>Reply to user inquiries</li>
                  <li>Provide technical support</li>
                  <li>Process feedback and suggestions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Protection */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🔒 Data Protection</h2>
            <div className="space-y-3">
              <div className="flex items-start text-left">
                <span className="flex-shrink-0 text-green-500 mr-2 mt-0.5">🛡️</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Security Measures</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">We employ industry-standard security measures to protect your data, including SSL encrypted transmission.</p>
                </div>
              </div>
              <div className="flex items-start text-left">
                <span className="flex-shrink-0 text-blue-500 mr-2 mt-0.5">👥</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Access Control</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Only authorized personnel can access user data, and only for necessary business purposes.</p>
                </div>
              </div>
              <div className="flex items-start text-left">
                <span className="flex-shrink-0 text-purple-500 mr-2 mt-0.5">🗄️</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Data Storage</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Data is stored on secure servers with regular backups and monitoring for unusual activities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🍪 Cookie Usage</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-left">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                We use cookies to improve your browsing experience:
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                <li><strong>Essential Cookies:</strong> Ensure the website functions properly</li>
                <li><strong>Performance Cookies:</strong> Analyze website usage</li>
                <li><strong>Functional Cookies:</strong> Remember your preference settings</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                You can manage cookie preferences through your browser settings.
              </p>
            </div>
          </div>

          {/* Third Party */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🤝 Third-Party Services</h2>
            <div className="space-y-3 text-left">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                We may use the following third-party services to provide better user experience:
              </p>
              <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
                  <li><strong>Analytics Services:</strong> Understand website usage (anonymous data)</li>
                  <li><strong>CDN Services:</strong> Accelerate content loading</li>
                  <li><strong>Security Services:</strong> Protect against malicious attacks</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                These service providers have their own privacy policies, and we recommend reviewing their terms.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">⚖️ Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">📋</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Access Right</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6">Inquire about the personal information we collect about you</p>
              </div>
              <div className="space-y-2 text-left">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✏️</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Correction Right</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6">Request correction of inaccurate personal information</p>
              </div>
              <div className="space-y-2 text-left">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">🗑️</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Deletion Right</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6">Request deletion of your personal information</p>
              </div>
              <div className="space-y-2 text-left">
                <div className="flex items-center">
                  <span className="text-purple-500 mr-2">🚫</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Objection Right</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 ml-6">Object to the processing of your personal information</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white text-left">
            <h2 className="text-xl font-bold mb-2">📞 Privacy-Related Inquiries</h2>
            <p className="text-sm mb-3 opacity-90">
              If you have any questions about our privacy policy or need to exercise your rights, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="mailto:support@geometry-dash-lite.org?subject=Privacy Policy Inquiry"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors text-center"
              >
                Send Email
              </a>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-sm">
                support@geometry-dash-lite.org
              </span>
            </div>
          </div>

          {/* Updates */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🔄 Policy Updates</h2>
            <div className="text-left">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                We may update this privacy policy from time to time. For significant changes, we will:
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside ml-4">
                <li>Post update notifications on the website</li>
                <li>Notify relevant users via email (if applicable)</li>
                <li>Update the "Last updated" date at the top of this page</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                We recommend checking this page regularly to stay informed about the latest privacy policy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
} 