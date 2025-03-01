import { useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    const processedItems = items.reduce((acc: CartItem[], item: CartItem) => {
      const existingItem = acc.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        return acc;
      }
      return [...acc, { ...item, quantity: 1, price: Number(item.price) || 0 }];
    }, []);
    setCartItems(processedItems);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const newItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id: number) => {
    const newItems = cartItems.filter(item => item.id !== id);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return {
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total
  };
}