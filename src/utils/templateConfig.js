/**
 * Template Configuration Utility
 * 统一从 siteConfig.json 读取所有配置
 */

import siteConfigData from '../data/siteConfig.json';

/**
 * Get template configuration from siteConfig.json
 * 只从 siteConfig.json 读取配置，简单直接
 */
export const getTemplateConfig = () => {
  return {
    site: {
      name: siteConfigData.site?.name || "Game Site Template",
      shortName: siteConfigData.site?.shortName || "Game Site",
      description: siteConfigData.site?.description || "Play games online for free!",
      url: siteConfigData.site?.url || "https://your-domain.com",
      mainGameId: siteConfigData.homepage?.mainGame || "game-1",
      contactEmail: siteConfigData.site?.contactEmail || "contact@your-domain.com"
    },
    branding: {
      primaryColor: "blue",
      accentColor: "purple",
      ogImage: siteConfigData.site?.ogImage || "/images/og-image.jpg"
    },
    seo: {
      googleAnalyticsId: siteConfigData.analytics?.googleAnalyticsId || null
    },
    external: {
      imageDomains: ["1games.io", "scratch.mit.edu"],
      gameSources: ["iframe", "scratch", "external"]
    },
    social: {
      twitter: "",
      facebook: "",
      github: ""
    },
    features: {
      enableFavorites: siteConfigData.features?.enableFavorites !== false,
      enableAnalytics: siteConfigData.features?.enableAnalytics !== false,
      enableThemeToggle: siteConfigData.features?.enableThemeToggle !== false
    }
  };
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path = '') => {
  const config = getTemplateConfig();
  const baseUrl = config.site.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

/**
 * Get metadata base URL for Next.js
 */
export const getMetadataBaseUrl = () => {
  const config = getTemplateConfig();
  return new URL(config.site.url);
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (featureName) => {
  const config = getTemplateConfig();
  return config.features[featureName] || false;
};

/**
 * Get external domains for Next.js image configuration
 */
export const getExternalImageDomains = () => {
  const config = getTemplateConfig();
  return config.external.imageDomains;
}; 