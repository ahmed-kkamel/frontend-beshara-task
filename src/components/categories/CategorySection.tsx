'use client';

import { JSX, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { CategoryHeader } from './CategoryHeader';
import { CategorySectionProps } from "@/types/categoriesTypes"

export const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  products
}): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-50" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">
        <CategoryHeader
          category={category}
          isVisible={isVisible}
          onToggleVisibility={() => setIsVisible(!isVisible)}
        />

        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product.id} {...product} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}