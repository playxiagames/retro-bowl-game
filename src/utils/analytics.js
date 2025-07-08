/**
 * Essential Analytics Utility
 * Only tracks core business metrics for game sites
 */

import { isFeatureEnabled } from './templateConfig';

/**
 * Check if analytics is enabled and gtag is available
 */
const isAnalyticsReady = () => {
  return isFeatureEnabled('enableAnalytics') && 
         typeof window !== 'undefined' && 
         typeof window.gtag === 'function';
};

/**
 * Track game starts - Core business metric
 * @param {string} gameName - Game name/ID
 */
export const trackGameStart = (gameName) => {
  if (isAnalyticsReady()) {
    window.gtag('event', 'game_start', {
      event_category: 'Game',
      event_label: gameName,
      value: 1
    });
  }
};

/**
 * Track favorite actions - User engagement metric
 * @param {string} action - 'add' or 'remove'
 * @param {string} gameName - Game name/ID
 */
export const trackFavorite = (action, gameName) => {
  if (isAnalyticsReady()) {
    window.gtag('event', `favorite_${action}`, {
      event_category: 'Engagement',
      event_label: gameName,
      value: action === 'add' ? 1 : -1
    });
  }
};

/**
 * Track game navigation - Content performance metric
 * @param {string} fromGame - Previous game (optional)
 * @param {string} toGame - Target game
 */
export const trackGameNavigation = (fromGame, toGame) => {
  if (isAnalyticsReady() && toGame) {
    window.gtag('event', 'game_navigation', {
      event_category: 'Navigation',
      event_label: fromGame ? `${fromGame}_to_${toGame}` : `direct_to_${toGame}`,
      value: 1
    });
  }
}; 