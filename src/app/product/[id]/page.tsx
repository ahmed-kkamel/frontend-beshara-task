
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/product/ProductInfo';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getProduct } from '@/services/products';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);
    return {
      title: product.title,
      description: product.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: 'Product Not Found',
      description: error instanceof Error ? error.message : 'The requested product could not be found',
    };
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params;
  if (!resolvedParams.id) return notFound();

  try {
    const product = await getProduct(resolvedParams.id);

    if (!product) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Oops! Product Not Found</h1>
          <p className="text-gray-600">Try browsing our other products.</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <ProductImage image={product.image} title={product.title} />
                  <ProductInfo {...product} />
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error loading product:", error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center">
        <h1 className="text-4xl font-bold text-red-600">Error Loading Product</h1>
        <p className="text-gray-600">
          {error instanceof Error
            ? `Error: ${error.message}`
            : "We encountered an error while loading this product. Please try again later."}
        </p>
      </div>
    );
  }
}