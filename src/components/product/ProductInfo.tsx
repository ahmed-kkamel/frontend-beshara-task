'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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
    
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Added to Cart!
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {title}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            Close
          </button>
        </div>
      </motion.div>
    ), {
      duration: 3000,
      position: 'bottom-right',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-2xl font-semibold text-indigo-600 mb-4">${price}</p>
      <p className="text-gray-600 mb-6">{description}</p>
      <p className="text-gray-500 mb-6">Category: {category}</p>
      <motion.button
        onClick={handleAddToCart}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl
                 font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
      >
        Add to Cart
      </motion.button>
    </div>
  );
}