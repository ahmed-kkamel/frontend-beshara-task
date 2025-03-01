import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

export interface CheckoutFormData {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface CheckoutErrors {
    [key: string]: string;
}

export function useCheckout() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [formData, setFormData] = useState<CheckoutFormData>({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '4111111111111111',
        expiryDate: '12/26',
        cvv: '123'
    });
    const [errors, setErrors] = useState<CheckoutErrors>({});
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

    const validateForm = () => {
        const newErrors: CheckoutErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zipCode.match(/^\d{2,}$/)) newErrors.zipCode = 'ZIP code must have at least 2 digits';
        if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Invalid card number';
        if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiryDate = 'Invalid expiry date';
        if (!formData.cvv.match(/^\d{3}$/)) newErrors.cvv = 'Invalid CVV';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: cartItems,
            total: total,
            status: 'processing'
        };

        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        router.push('/order-success');
    };

    return {
        cartItems,
        formData,
        errors,
        subtotal,
        shipping,
        total,
        handleInputChange,
        handleSubmit
    };
}