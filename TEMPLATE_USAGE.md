# Game Site Template Usage Guide

This is a modern, customizable game website template built with Next.js and optimized for GitHub Pages deployment.

## 🚀 Quick Start

1. **Clone or Fork this repository**
2. **Configure your site** by editing `src/data/siteConfig.json`
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Run development server:**
   ```bash
   npm run dev
   ```
5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy:github
   ```

## ⚙️ Configuration

### Site Configuration

Edit `src/data/siteConfig.json` with your site details:

```json
{
  "site": {
    "name": "Your Game Site",
    "shortName": "Your Site",
    "description": "Your site description",
    "url": "https://your-domain.com",
    "contactEmail": "contact@your-domain.com"
  },
  "analytics": {
    "googleAnalyticsId": "G-XXXXXXXXXX"
  },
  "features": {
    "enableFavorites": true,
    "enableAnalytics": true,
    "enableThemeToggle": true
  }
}
```

### Adding Games

1. **Add game data** to `src/data/games.json`
2. **Add game thumbnails** to `public/images/games/thumbnails/`
3. **Update categories** in `src/data/categories.json` if needed

### Custom Domain

1. **Update** `public/CNAME` with your domain
2. **Configure** DNS settings to point to GitHub Pages
3. **Enable** custom domain in repository Settings > Pages

## 🎨 Customization

### Branding
- Replace logo: `public/images/logo.png`
- Update favicon: `public/favicon.ico`
- Modify site information in `src/data/siteConfig.json`

### Navigation
- Edit `src/data/siteConfig.json` navigation section
- Update homepage game selections

### Styling
- All styling uses Tailwind CSS
- Main styles in `src/app/globals.css`
- Component styles in individual component files

## 📦 Deployment

### GitHub Pages (Recommended)
```bash
npm run deploy:github
```

### Manual Build
```bash
npm run build
```
Output will be in the `out/` directory.

## 🔧 Features

- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - Automatic and manual switching
- **Game Favorites** - Local storage based favorites system
- **SEO Optimized** - Meta tags, sitemap, structured data
- **Analytics Ready** - Google Analytics integration
- **Performance Optimized** - Image optimization, code splitting

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── contexts/         # React contexts (theme, favorites)
├── data/            # JSON data files
├── utils/           # Utility functions and configuration
└── constants/       # Style constants
```

## 🛠️ Development

### Adding New Pages
Create new pages in `src/app/` following Next.js App Router conventions.

### Adding Components
Create reusable components in `src/components/` with:
- Template configuration support
- Feature flag checks
- Responsive design

### Modifying Styles
- Use Tailwind CSS classes
- Update `src/constants/styles.js` for shared styles
- Maintain dark mode compatibility

## 📋 Todo Checklist

- [ ] Update site information in `src/data/siteConfig.json`
- [ ] Configure custom domain (optional)
- [ ] Add your games data
- [ ] Upload game thumbnails
- [ ] Set up Google Analytics (optional)
- [ ] Test deployment
- [ ] Configure DNS settings (if using custom domain)

## 🆘 Troubleshooting

### Build Issues
- Check all image paths are correct
- Verify JSON syntax in data files
- Ensure `src/data/siteConfig.json` is properly formatted

### Deployment Issues
- Verify CNAME file matches your domain
- Check GitHub Pages settings
- Review GitHub Actions logs

For more detailed information, see the individual documentation files in this repository. 