

import CategorySection from '@/components/CategorySection';
import { getCategories, getCategoryProducts } from '@/services/categories';
import { Suspense } from 'react';

async function CategoriesContent() {
  try {
    const categories = await getCategories();
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category: string) => ({
        name: category,
        products: await getCategoryProducts(category)
      }))
    );

    return (
      <div className="space-y-8">
        {categoriesWithProducts.map((category) => (
          <CategorySection
            key={category.name}
            category={category.name}
            products={category.products}
          />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-center text-red-600">
        Failed to load products. Please try again later.
      </div>
    );
  }
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Our Store</h1>
        <Suspense
          fallback={
            <div className="text-center py-8">
              <div className="animate-pulse text-lg text-gray-600">
                Loading categories...
              </div>
            </div>
          }
        >
          <CategoriesContent />
        </Suspense>
      </div>
    </main>
  );
}
