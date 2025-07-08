'use client';

import Link from 'next/link';

const CategoryBadge = ({ category, isActive = false, className = '' }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors";
  const activeClasses = isActive 
    ? "bg-blue-500 text-white" 
    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600";

  return (
    <Link 
      href={`/category/${category.slug}/`}
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {category.name}
    </Link>
  );
};

export default CategoryBadge; 