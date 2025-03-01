import { motion } from 'framer-motion';
import Link from 'next/link';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
}

export default function CartSummary({ subtotal, shipping, total }: Readonly<CartSummaryProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 h-fit"
    >
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="h-px bg-gray-200 my-4"></div>
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Add ${(100 - subtotal).toFixed(2)} more to get free shipping
          </p>
        )}
        <Link href="/checkout">
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg mt-6 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] cursor-pointer">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </motion.div>
  );
}