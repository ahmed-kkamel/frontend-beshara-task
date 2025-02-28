'use client';

import { motion } from 'framer-motion';
import CategorySection from './CategorySection';

interface AnimatedCategoriesProps {
  categories: Array<{
    name: string;
    products: Array<any>;
  }>;
}

export default function AnimatedCategories({ categories }: AnimatedCategoriesProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-16"
    >
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: index * 0.2,
            duration: 0.8,
            ease: [0.6, 0.05, 0.01, 0.9]
          }}
        >
          <CategorySection
            category={category.name}
            products={category.products}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}