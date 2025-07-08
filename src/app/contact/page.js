import Layout from '../../components/Layout';
import { Breadcrumb } from '../../components/Navigation';
import { generatePageMetadata } from '../../utils/seoUtils';

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description: 'Get in touch with Geometry Dash Lite team. We\'d love to hear your feedback, suggestions, and help with any questions you may have.',
  path: '/contact',
});

export default function ContactPage() {
  const breadcrumbItems = [
    { title: 'Home', url: '/' },
    { title: 'Contact Us' }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Breadcrumb */}
        {/* <Breadcrumb items={breadcrumbItems} className="mb-4" /> */}

        {/* Page Header */}
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
          <p className="text-base text-gray-600 dark:text-gray-300">Have any questions or suggestions? We'd be happy to help you</p>
        </div>

        <div className="space-y-6">
          
          {/* Contact Info */}
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">📞 Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-left">
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-blue-500 mr-3 mt-1">📧</span>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Support Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">We'll reply to your email within 24 hours</p>
                    <a 
                      href="mailto:support@geometry-dash-lite.org"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      support@geometry-dash-lite.org
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-start">
                  <span className="flex-shrink-0 text-green-500 mr-3 mt-1">🌐</span>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Official Website</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Visit our homepage for more information</p>
                    <a 
                      href="https://geometry-dash-lite.org/"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      geometry-dash-lite.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">✉️ Quick Contact</h2>
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                <p>Please contact us via email for now:</p>
              </div>
              <a
                href="mailto:support@geometry-dash-lite.org?subject=Website Inquiry&body=Hello,%0D%0A%0D%0AI would like to inquire about:%0D%0A%0D%0ADetailed description:%0D%0A%0D%0AThank you!"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="mr-2">📧</span>
                Send Email
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">❓ Frequently Asked Questions</h2>
            <div className="space-y-3">
              <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-left">What should I do if a game won't load?</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                  Please try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, please contact our technical support.
                </p>
              </div>
              <div className="border border-gray-200 dark:border-slate-600 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-left">Is the website completely free?</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                  Yes, all our games are completely free to play. No registration or payment required.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
