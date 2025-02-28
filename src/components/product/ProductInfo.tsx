'use client';

import { useRouter } from 'next/navigation';

interface ProductInfoProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

export default function ProductInfo({ id, title, price, description, category }: ProductInfoProps) {
  const router = useRouter();

  const handleAddToCart = () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id, title, price, description, category });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-2xl font-semibold text-indigo-600 mb-4">${price}</p>
      <p className="text-gray-600 mb-6">{description}</p>
      <p className="text-gray-500 mb-6">Category: {category}</p>
      <button
        onClick={handleAddToCart}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}