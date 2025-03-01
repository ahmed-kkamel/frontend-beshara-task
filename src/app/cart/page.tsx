'use client';

import { motion, Reorder } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import EmptyCart from '@/components/cart/EmptyCart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import AnimatedHeader from '@/components/ui/AnimatedHeader';

export default function Cart() {
  const {
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total
  } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatedHeader>Shopping Cart</AnimatedHeader>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Reorder.Group axis="y" values={cartItems} onReorder={setCartItems}>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      updateQuantity={updateQuantity}
                      removeItem={removeItem}
                    />
                  ))}
                </Reorder.Group>
              </div>

              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                total={total}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}