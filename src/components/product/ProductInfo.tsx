'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProductInfoProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductInfo({ id, title, price, description, category, rating, image }: ProductInfoProps) {
  const router = useRouter();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some((item: any) => item.id === id));
  }, [id]);

  const handleWishlist = () => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const itemIndex = wishlist.findIndex((item: any) => item.id === id);

    if (itemIndex > -1) {
      wishlist.splice(itemIndex, 1);
      toast.success('Removed from wishlist');
      setIsInWishlist(false);
    } else {
      wishlist.push({ id, title, price, description, category, image, rating });
      toast.success('Added to wishlist');
      setIsInWishlist(true);
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mb-2">
            {category}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">({rating.rate})</span>
            </div>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">{rating.count} reviews</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlist}
          className={`p-2 rounded-full ${isInWishlist ? 'text-red-500' : 'text-gray-400'} 
                     hover:text-red-500 transition-colors`}
        >
          <svg className="w-6 h-6" fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </motion.button>
      </div>
      <div className="border-t border-b border-gray-200 py-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">${price}</p>
            <p className="text-sm text-gray-500 mt-1">
              Free shipping on orders over $100
            </p>
          </div>
          <div className="bg-green-50 px-3 py-1 rounded-full">
            <p className="text-green-700 text-sm font-medium">In Stock</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
        <div className="prose prose-indigo">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}