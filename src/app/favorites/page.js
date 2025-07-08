import { generatePageMetadata } from '../../utils/seoUtils';
import Layout from '../../components/Layout';
import FavoritesPage from '../../components/FavoritesPage';

// 生成元数据
export async function generateMetadata() {
  return generatePageMetadata({
    title: 'My Favorite Games',
    description: 'Your personal collection of favorite games. Save, organize, and quickly access your most loved games.',
    path: '/favorites'
  });
}

export default function Favorites() {
  return (
    <Layout>
      <FavoritesPage />
    </Layout>
  );
} 