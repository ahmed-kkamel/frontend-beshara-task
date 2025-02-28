

import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/product/ProductInfo';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getProduct } from '@/services/products';
import { Suspense, use } from 'react';
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

async function ProductContent({ id }: { readonly id: string }) {
  const product = await getProduct(id);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductImage image={product.image} title={product.title} />
          <ProductInfo {...product} />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails({ params }: { readonly params: { readonly id: string } }) {
  const id = use(Promise.resolve(params.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <LoadingSpinner />
        }
      >
        <ProductContent id={id} />
      </Suspense>
    </div>
  );
}