'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-50" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-2 h-12 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.h2
              className="text-3xl font-bold capitalize"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {category}
              </span>
            </motion.h2>
          </div>
          <motion.button
            onClick={() => setIsVisible(!isVisible)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium 
                     shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isVisible ? 'Hide Collection' : 'Show Collection'}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={`/product/${product.id}`}
                      className="group block bg-white rounded-2xl shadow-lg overflow-hidden 
                               hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="p-4">
                        <motion.div
                          className="relative aspect-square mb-4 bg-gradient-to-br from-gray-50 to-gray-100 
                                   rounded-xl overflow-hidden group-hover:shadow-inner"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-6 transform group-hover:scale-110 
                                     transition-transform duration-500 ease-out"
                          />
                        </motion.div>
                        <div className="space-y-2 p-2">
                          <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 
                                     transition-colors duration-300">
                            {product.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                                      bg-clip-text text-transparent">
                              ${product.price.toFixed(2)}
                            </p>
                            <motion.span
                              className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium"
                              whileHover={{ scale: 1.1 }}
                            >
                              View Details
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}