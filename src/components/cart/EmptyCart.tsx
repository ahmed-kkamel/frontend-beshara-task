import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16 bg-white rounded-2xl shadow-sm"
    >
      <Image
        src="/empty-cart.png"
        alt="Empty Cart"
        className="w-48 h-48 mx-auto mb-6 opacity-50"
        width={192}
        height={192}
      />
      <h2 className="text-2xl text-gray-600 mb-4">Your cart is empty</h2>
      <Link
        href="/"
        className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </motion.div>
  );
}