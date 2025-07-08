import Layout from '../../components/Layout';
import { Breadcrumb } from '../../components/Navigation';
import { generatePageMetadata } from '../../utils/seoUtils';

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about Geometry Dash Lite, our mission to provide free online games, and our commitment to delivering the best gaming experience.',
  path: '/about',
});

export default function AboutPage() {
  const breadcrumbItems = [
    { title: 'Home', url: '/' },
    { title: 'About Us' }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Breadcrumb */}
        {/* <Breadcrumb items={breadcrumbItems} className="mb-4" /> */}

        {/* Page Header */}
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">About Us</h1>
          <p className="text-base text-gray-600 dark:text-gray-300">Learn about Geometry Dash Lite's story and mission</p>
        </div>

        <div className="space-y-6">
          
          {/* Introduction */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🎮 Who We Are</h2>
            <div className="prose prose-sm max-w-none text-left">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Geometry Dash Lite is a platform dedicated to providing free online games. We are committed to bringing 
                the best browser gaming experience to players worldwide, allowing you to enjoy exciting game content without any downloads.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Our platform features the classic Geometry Dash Lite game, an exciting rhythm-based action platformer that challenges 
                your reflexes and timing skills. In addition to this, we also offer various types of games including arcade games, 
                puzzle games, action games, and more.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">🎯 Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">🌟 Free Gaming Experience</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Provide completely free online games, allowing everyone to enjoy high-quality gaming content without any fees or downloads.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">🚀 Technical Innovation</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Utilize the latest web technologies to ensure games run smoothly across various devices and browsers.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">🌍 Global Community</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Build an inclusive global gaming community that connects players from around the world.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">📱 Cross-Platform Compatibility</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Ensure all games run perfectly on desktop, tablet, and mobile devices, playable anytime, anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">✨ Platform Features</h2>
            <div className="space-y-3">
              <div className="flex items-start text-left">
                <span className="flex-shrink-0 text-blue-500 mr-2 mt-0.5">🎯</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Curated Game Content</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Carefully selected high-quality games, ensuring every game is worth your time.</p>
                </div>
              </div>
              <div className="flex items-start text-left">
                <span className="flex-shrink-0 text-green-500 mr-2 mt-0.5">⚡</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Fast Loading</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Optimized loading speeds that let you start gaming quickly.</p>
                </div>
              </div>
              <div className="flex items-start text-left">
                <span className="flex-shrink-0 text-purple-500 mr-2 mt-0.5">🔒</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Safe and Secure</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">All games are security-tested to protect your device and privacy.</p>
                </div>
              </div>
              <div className="flex items-start text-left">
                <span className="flex-shrink-0 text-orange-500 mr-2 mt-0.5">🎨</span>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Modern Design</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Clean, modern interface design providing an excellent user experience.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Values */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-left">💝 Our Values</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-left">
              <div className="space-y-2">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>User-First:</strong> Always prioritize user experience and continuously improve our services.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Open & Inclusive:</strong> Welcome players of all ages and create a friendly gaming environment.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Innovation:</strong> Continuously explore new technologies and gameplay to bring better experiences to players.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Community Building:</strong> Work closely with the player community to build a better gaming platform together.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white text-left">
            <h2 className="text-xl font-bold mb-2">🤝 Join Our Community</h2>
            <p className="text-sm mb-3 opacity-90">
              Have any suggestions or ideas? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="/contact/"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors text-center"
              >
                Contact Us
              </a>
              <a
                href="mailto:support@geometry-dash-lite.org"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors text-center border border-white border-opacity-30"
              >
                Send Email
              </a>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
} 