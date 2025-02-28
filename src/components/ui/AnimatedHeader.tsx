'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
    >
      {children}
    </motion.h1>
  );
}