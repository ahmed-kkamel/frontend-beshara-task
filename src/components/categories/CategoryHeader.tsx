import { motion } from 'framer-motion';
import { JSX } from 'react';

interface CategoryHeaderProps {
    category: string;
    isVisible: boolean;
    onToggleVisibility: () => void;
}
export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
    category,
    isVisible,
    onToggleVisibility
}): JSX.Element => {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
                <motion.div
                    className="w-1.5 sm:w-2 h-8 sm:h-12 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.h2
                    className="text-2xl sm:text-3xl font-bold capitalize"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        {category}
                    </span>
                </motion.h2>
            </div>
            <motion.button
                onClick={onToggleVisibility}
                className="relative group px-6 py-3 sm:px-8 sm:py-4 rounded-xl overflow-hidden
            bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-medium
            shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-purple-500/40
            transition-all duration-300 ease-out cursor-pointer"
                whileHover={{
                    scale: 1.02,
                    backgroundPosition: ['0%', '100%'],
                    transition: { duration: 0.8 }
                }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent 
              opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                <span className="relative flex items-center gap-2 text-sm sm:text-base">
                    {isVisible ? (
                        <>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            Hide Collection
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Show Collection
                        </>
                    )}
                </span>
            </motion.button>
        </div>
    );
}