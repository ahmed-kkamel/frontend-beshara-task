
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/product/ProductInfo';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getProduct } from '@/services/products';
import { Suspense } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}


async function ProductContent({ id }: { id: string }) {
  const product = await getProduct(id);

  return (
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
  );
}

export default async function ProductDetails({
  params
}: {
  params: { id: string }
}) {
  const id = params.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingSpinner />}>
        <ProductContent id={id} />
      </Suspense>
    </div>
  );
}