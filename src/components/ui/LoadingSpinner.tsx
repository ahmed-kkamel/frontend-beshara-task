'use client';

import { motion } from 'framer-motion';

const containerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const dotVariants = {
    initial: { y: 0, opacity: 0.2 },
    animate: {
        y: [-8, 0, -8],
        opacity: [0.2, 1, 0.2],
        transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="flex space-x-3"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                            variants={dotVariants}
                        />
                    ))}
                </motion.div>
                <motion.p
                    className="mt-6 font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Loading...
                </motion.p>
            </motion.div>
        </div>
    );
}