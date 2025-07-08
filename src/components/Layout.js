'use client';

import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Navigation />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

// 导出GameDescription组件供向后兼容
export { default as GameDescription } from './GameDescription';

// 导出骨架屏组件
export { 
  Skeleton,
  GameCardSkeleton, 
  GamePlayerSkeleton,
  SidebarGameItemSkeleton,
  GameGridSkeleton,
  GameDescriptionSkeleton
} from './Skeleton';

export default Layout; 