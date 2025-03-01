import { motion } from 'framer-motion';
import { CartItem } from '@/hooks/useCheckout';

interface OrderSummaryProps {
    cartItems: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
}

export default function OrderSummary({ cartItems, subtotal, shipping, total }: OrderSummaryProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="p-8 bg-white rounded-2xl shadow-lg h-full"
        >
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">{item.quantity}x</span>
                            <span className="text-gray-800 font-medium">{item.title}</span>
                        </div>
                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mt-2">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold mt-4">
                        <span>Total</span>
                        <span className="text-indigo-600">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}