'use client';

import Link from 'next/link';

const Breadcrumb = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className={`breadcrumb ${className}`} aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg className="flex-shrink-0 h-4 w-4 text-gray-300 dark:text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb; 