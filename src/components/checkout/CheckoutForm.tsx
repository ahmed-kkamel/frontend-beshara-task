import { motion } from 'framer-motion';
import { CheckoutFormData, CheckoutErrors } from '@/hooks/useCheckout';

interface CheckoutFormProps {
    formData: CheckoutFormData;
    errors: CheckoutErrors;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function CheckoutForm({ formData, errors, handleInputChange, handleSubmit }: CheckoutFormProps) {
    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="p-8 bg-white rounded-2xl shadow-lg h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
            <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type="text"
                            name={key}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-transparent shadow-sm"
                            value={value}
                            onChange={handleInputChange}
                        />
                        {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
                    </div>
                ))}
                <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl mt-6 font-medium shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer"
                >
                    Complete Order
                </motion.button>
            </form>
        </motion.div>
    );
}