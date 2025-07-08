// All Games 页面的元数据配置
export const metadata = {
  title: 'Search All Games - Find Your Perfect Game | Geometry Dash Lite',
  description: 'Search and discover your perfect game from our complete collection! Use powerful filters to find games by name, category, rating. Over 100+ free online games to explore.',
  keywords: 'search games, find games, all games, game search, free online games, complete collection, game library, browser games, geometry dash games, google games',
  openGraph: {
    title: 'Search All Games - Find Your Perfect Game | Geometry Dash Lite',
    description: 'Search and discover your perfect game from our complete collection! Use powerful filters to find games by name, category, rating.',
    type: 'website',
    url: 'https://geometry-dash-lite.org/all-games/',
    siteName: 'Geometry Dash Lite',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Search All Games - Find Your Perfect Game',
    description: 'Search and discover your perfect game from our complete collection!',
  },
  alternates: {
    canonical: '/all-games/',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function AllGamesLayout({ children }) {
  return children;
} 