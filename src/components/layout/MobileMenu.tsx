'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="mobile-nav-link">Home</Link>
            <Link href="/about" className="mobile-nav-link">About</Link>
            <Link href="/contact" className="mobile-nav-link">Contact</Link>
            <Link href="/cart" className="mobile-nav-link">Cart</Link>
            <Link href="/auth/login" className="mobile-nav-link">Login</Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}