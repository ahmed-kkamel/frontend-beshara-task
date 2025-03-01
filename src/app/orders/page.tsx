'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface OrderItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: 'processing' | 'shipped' | 'delivered';
}

export default function Orders() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    useEffect(() => {
        const user = localStorage.getItem('currentUser');
        if (!user) {
            router.push('/auth/login');
            return;
        }
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const processedOrders = savedOrders.map((order: Order) => ({
            ...order,
            total: Number(order.total) || 0,
            items: order.items.map(item => ({
                ...item,
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 1
            }))
        }));
        setOrders(processedOrders);
    }, [router]);
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
                            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
                            <button
                                onClick={() => router.push('/')}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-md overflow-hidden"
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Order #{order.id}</p>
                                                <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-16 h-16 object-contain rounded-lg"
                                                        width={64}
                                                        height={64}
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium text-gray-900">Total</span>
                                                <span className="font-bold text-gray-900">
                                                    ${(order.total || 0).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}