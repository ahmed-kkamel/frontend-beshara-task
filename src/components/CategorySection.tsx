'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface CategorySectionProps {
  category: string;
  products: Product[];
}

export default function CategorySection({ category, products }: CategorySectionProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold capitalize">{category}</h2>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-indigo-600 hover:text-indigo-800"
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {isVisible && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              href={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                <div className="aspect-w-1 aspect-h-1 w-full mb-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-indigo-600 font-bold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}