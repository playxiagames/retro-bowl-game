'use client';

import { getFooterConfig, getSiteConfig } from '../utils/gameData';

const Footer = () => {
  const footerConfig = getFooterConfig();
  const siteConfig = getSiteConfig();

  return (
    <footer className="bg-gray-800 dark:bg-slate-950 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-3">
              <span className="text-xl mr-2">🎮</span>
              <h3 className="text-lg font-bold">{siteConfig.shortName}</h3>
            </div>
            <p className="text-gray-300 mb-3 max-w-md text-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/category/geometry-dash/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Geometry Dash Games
                </a>
              </li>
              <li>
                <a href="/category/google-games/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Google Games
                </a>
              </li>
              <li>
                <a href="/category/js13k-games/" className="text-gray-300 hover:text-white transition-colors text-sm">
                  JS13K Games
                </a>
              </li>
              <li>
                <a href="https://geometry-dash-unblocked.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Geometry Dash Unblocked
                </a>
              </li>
              <li>
                <a href="https://www.playxia.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Playxia Games
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-base font-semibold mb-3">Legal</h4>
            <ul className="space-y-1">
              {footerConfig.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/sitemap/"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-left">
            <p className="text-gray-400 text-sm">
              {footerConfig.copyright}
            </p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <span className="text-gray-400 text-sm">Made with ❤️ for gamers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 