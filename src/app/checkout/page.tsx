'use client';

import { motion } from 'framer-motion';
import { useCheckout } from '@/hooks/useCheckout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

export default function Checkout() {
    const {
        cartItems,
        formData,
        errors,
        subtotal,
        shipping,
        total,
        handleInputChange,
        handleSubmit
    } = useCheckout();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex justify-center items-center">
            <div className="container mx-auto px-4 py-24 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12"
                >
                    <h1 className="text-5xl font-bold mb-10 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Checkout
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <CheckoutForm
                            formData={formData}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                        />
                        <OrderSummary
                            cartItems={cartItems}
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}