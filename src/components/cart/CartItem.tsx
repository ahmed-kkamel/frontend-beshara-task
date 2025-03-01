import { Reorder } from 'framer-motion';
import Image from 'next/image';
import { CartItem as CartItemType } from '@/hooks/useCart';

interface CartItemProps {
    item: CartItemType;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
}

export default function CartItem({ item, updateQuantity, removeItem }: Readonly<CartItemProps>) {
    return (
        <Reorder.Item
            key={item.id}
            value={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileDrag={{
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                cursor: "grabbing"
            }}
            className="bg-white rounded-xl shadow-sm p-6 mb-4 hover:shadow-md transition-shadow cursor-grab"
        >
            <div className="flex items-center gap-6">
                <Image src={item.image} alt={item.title} className="w-24 h-24 object-contain rounded-lg" width={96} height={96} />
                <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-indigo-600 font-semibold mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                        >
                            -
                        </button>
                        <span className="mx-4 w-8 text-center">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-2 text-sm cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </Reorder.Item>
    );
}