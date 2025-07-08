import './globals.css'
import { getSiteConfig, getSEOConfig } from '../utils/gameData'
import { getTemplateConfig, getMetadataBaseUrl } from '../utils/templateConfig'

import { ThemeProvider } from '../contexts/ThemeContext'
import { FavoritesProvider } from '../contexts/FavoritesContext'


// Generate metadata from template configuration
const generateMetadata = () => {
  const templateConfig = getTemplateConfig();
  const siteName = templateConfig.site.name;
  const description = templateConfig.site.description;
  const siteUrl = templateConfig.site.url;
  const ogImage = templateConfig.branding.ogImage;
  
  return {
    title: siteName,
    description: description,
    authors: [{ name: templateConfig.site.shortName }],
    creator: templateConfig.site.shortName,
    publisher: templateConfig.site.shortName,

    metadataBase: getMetadataBaseUrl(),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteUrl,
      title: siteName,
      description: description,
      siteName: templateConfig.site.shortName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${templateConfig.site.shortName} - Play Online Free`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

export const metadata = generateMetadata();

export default function RootLayout({ children }) {
  const seoConfig = getSEOConfig()
  const gaId = seoConfig?.googleAnalyticsId

  return (
    <html lang="en">
      <head>
        {/* Theme initialization script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  document.documentElement.classList.toggle('dark', isDark);
                } catch (e) {
                  document.documentElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
                }
              })();
            `,
          }}
        />
        
        {/* Performance optimization - preconnect to external domains */}
        <link rel="preconnect" href="https://1games.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://scratch.mit.edu" crossOrigin="anonymous" />
        {gaId && process.env.NODE_ENV === 'production' && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="//www.googletagmanager.com" />
          </>
        )}
        
        {/* 内联关键CSS - 首屏必需的样式 */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 关键首屏样式 - 防止FOUC */
            *{transition-property:color,background-color,border-color;transition-duration:0.15s;transition-timing-function:ease-out}
            :root{--bg-primary:249 250 251;--surface-primary:255 255 255;--text-primary:17 24 39;--text-secondary:75 85 99;--border-primary:209 213 219;--border-focus:59 130 246}
            .dark{--bg-primary:15 23 42;--surface-primary:30 41 59;--text-primary:248 250 252;--text-secondary:148 163 184;--border-primary:71 85 105;--border-focus:59 130 246}
            html{scroll-behavior:smooth}
            body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;line-height:1.6;background-color:rgb(var(--bg-primary));color:rgb(var(--text-primary));transition:color 0.15s ease-out,background-color 0.15s ease-out}
            .game-player-container{width:100%}
            .game-iframe-container{position:relative;width:100%;background-color:#000;border-radius:0.5rem;overflow:hidden}
            .skeleton{background-color:#e5e7eb;animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite}
            .dark .skeleton{background-color:#334155}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
            @media (prefers-color-scheme:dark){:root:not(.light):not(.dark){--bg-primary:15 23 42;--surface-primary:30 41 59;--text-primary:248 250 252;--text-secondary:148 163 184;--border-primary:71 85 105}}
          `
        }} />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
        
        {/* 优化字体加载 - 使用系统字体优先，减少FOIT */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* 优化字体回退栈 - 系统字体优先 */
            body, html { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI Variable', 'Segoe UI', system-ui, ui-sans-serif, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
              font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* 可选 Web 字体预加载占位符 */
            @font-face {
              font-family: 'SystemFont';
              src: local('SF Pro Display'), local('Segoe UI'), local('Roboto'), local('Helvetica Neue'), local('Arial');
              font-display: swap;
              unicode-range: U+0020-007F;
            }
          `
        }} />
        
        {/* 预连接到字体服务（如果将来需要Web字体） */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 异步加载非关键CSS */}
        <link 
          rel="preload" 
          href="/_next/static/css/app/layout.css" 
          as="style" 
          onLoad="this.onload=null;this.rel='stylesheet'" 
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        </noscript>
        
        {/* Favicon and manifest */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* PWA configuration */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        <meta name="apple-mobile-web-app-title" content={getTemplateConfig().site.shortName} />
        
        {/* 延迟加载Google Analytics - 页面加载完成后再加载 */}
        {gaId && process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // 延迟加载Google Analytics以提升首屏性能
                function loadGoogleAnalytics() {
                  // 检查是否已经加载
                  if (window.gtag) return;
                  
                  // 创建并插入GA脚本
                  const script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=${gaId}';
                  document.head.appendChild(script);
                  
                  // 初始化GA
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_title: document.title,
                    page_location: window.location.href,
                    anonymize_ip: true,
                    send_page_view: true
                  });
                  
                  // 游戏追踪函数
                  window.trackGameStart = function(gameName) {
                    if (typeof gtag === 'function' && gameName) {
                      gtag('event', 'game_start', {
                        event_category: 'Game',
                        event_label: gameName,
                        value: 1
                      });
                    }
                  };
                  
                  window.trackFavorite = function(action, gameName) {
                    if (typeof gtag === 'function' && action && gameName) {
                      gtag('event', 'favorite_' + action, {
                        event_category: 'Engagement',
                        event_label: gameName,
                        value: action === 'add' ? 1 : -1
                      });
                    }
                  };
                }
                
                // 提供备用的追踪函数（GA加载前）
                window.trackGameStart = window.trackGameStart || function() {};
                window.trackFavorite = window.trackFavorite || function() {};
                
                // 页面加载完成后延迟加载GA
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(loadGoogleAnalytics, 1000); // 1秒后加载
                  });
                } else {
                  setTimeout(loadGoogleAnalytics, 1000);
                }
                
                // 用户交互时立即加载GA
                ['scroll', 'click', 'keydown', 'touchstart'].forEach(function(event) {
                  document.addEventListener(event, function() {
                    loadGoogleAnalytics();
                  }, { once: true, passive: true });
                });
              `,
            }}
          />
        )}
        
        {/* 资源预获取优化 - 预加载用户可能访问的页面 */}
        <link rel="prefetch" href="/all-games/" />
        <link rel="prefetch" href="/category/geometry-dash/" />
        <link rel="prefetch" href="/category/google-games/" />
        <link rel="prefetch" href="/games/geometry-dash/" />
        
        {/* 预加载关键游戏资源 */}
        <link rel="dns-prefetch" href="//1games.io" />
        <link rel="dns-prefetch" href="//scratch.mit.edu" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": getTemplateConfig().site.shortName,
              "url": getTemplateConfig().site.url,
              "description": getTemplateConfig().site.description
            })
          }}
        />
        <script defer data-domain="geometry-dash-lite.org" src="https://click.pageview.click/js/script.js"></script>
      </head>
      <body>
        <ThemeProvider>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 