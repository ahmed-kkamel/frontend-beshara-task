'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

export default function Checkout() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const router = useRouter();

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

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    // Add validation functions at the top of the component
    const validateCardNumber = (number: string) => {
        const regex = /^[0-9]{16}$/;
        return regex.test(number);
    };
    
    const validateExpiryDate = (date: string) => {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!regex.test(date)) return false;
    
        const [month, year] = date.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date();
        return expiry > today;
    };
    
    const validateCVV = (cvv: string) => {
        const regex = /^[0-9]{3}$/;
        return regex.test(cvv);
    };
    
    const validateZipCode = (zipCode: string) => {
        const regex = /^[0-9]{5}$/;
        return regex.test(zipCode);
    };
    
    // Update the handleSubmit function
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        // Validate cart is not empty
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            return;
        }
    
        // Validate all fields
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            toast.error('Please enter your full name');
            return;
        }
    
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            toast.error('Please enter a valid email address');
            return;
        }
    
        if (!formData.address.trim()) {
            toast.error('Please enter your address');
            return;
        }
    
        if (!formData.city.trim()) {
            toast.error('Please enter your city');
            return;
        }
    
        if (!validateZipCode(formData.zipCode)) {
            toast.error('Please enter a valid 5-digit ZIP code');
            return;
        }
    
        if (!validateCardNumber(formData.cardNumber)) {
            toast.error('Please enter a valid 16-digit card number');
            return;
        }
    
        if (!validateExpiryDate(formData.expiryDate)) {
            toast.error('Please enter a valid expiry date (MM/YY)');
            return;
        }
    
        if (!validateCVV(formData.cvv)) {
            toast.error('Please enter a valid 3-digit CVV');
            return;
        }
    
        // If all validations pass, proceed with order
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: cartItems.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            total: total,
            status: 'processing'
        };
    
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
    
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        router.push('/order-success');
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Checkout
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
                        >
                            <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            required
                                            pattern="[A-Za-z ]+"
                                            title="Please enter a valid name (letters only)"
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            value={formData.zipCode}
                                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t">
                                    <h3 className="text-2xl font-semibold mb-6">Payment Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={16}
                                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                value={formData.cardNumber}
                                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '') })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="MM/YY"
                                                    maxLength={5}
                                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    value={formData.expiryDate}
                                                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    required
                                                    maxLength={3}
                                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                    value={formData.cvv}
                                                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 h-fit"
                        >
                            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-gray-600">{item.quantity}x</span>
                                            <span className="text-gray-800">{item.title}</span>
                                        </div>
                                        <span className="font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</span>
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

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl mt-6
                           font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300"
                                >
                                    Complete Order
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}