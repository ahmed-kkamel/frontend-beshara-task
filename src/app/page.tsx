

import { getCategories, getCategoryProducts } from '@/services/categories';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import AnimatedHeader from '@/components/ui/AnimatedHeader';
import Categories from '@/components/categories/Categories';

async function CategoriesContent() {
  try {
    const categories = await getCategories();
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category: string) => ({
        name: category,
        products: await getCategoryProducts(category)
      }))
    );

    return <Categories categories={categoriesWithProducts} />;
  } catch (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-red-600 text-xl font-semibold mb-2">Oops!</h3>
          <p className="text-red-500">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-24">
        <AnimatedHeader>
          Welcome to Our Store
        </AnimatedHeader>
        <Suspense fallback={<LoadingSpinner />}>
          <CategoriesContent />
        </Suspense>
      </div>
    </main>
  );
}
