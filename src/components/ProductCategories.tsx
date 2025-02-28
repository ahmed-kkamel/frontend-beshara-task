'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function ProductCategories({ categories }: { categories: string[] }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryClick = async (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setExpandedCategory(category);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category} className="border rounded-lg overflow-hidden">
          <button
            className="w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
          
          {expandedCategory === category && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-slideDown">
              {loading ? (
                <div>Loading products...</div>
              ) : (
                products.map((product) => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain mb-4"
                      />
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-gray-600">${product.price}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}