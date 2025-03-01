'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from './MobileMenu';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';

export default function NavbarLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-white/80 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 group">
                        <motion.h1
                            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Store
                        </motion.h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className={`relative px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors ${(() => {
                                        const itemPath = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
                                        return pathname === itemPath;
                                    })()
                                        ? 'text-indigo-600'
                                        : ''
                                    }`}
                            >
                                {item}
                                {pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                                        initial={false}
                                    />
                                )}
                            </Link>
                        ))}
                        <CartIcon />
                        <UserMenu />
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="relative w-6 h-5">
                            <motion.span
                                className="absolute w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                                animate={{
                                    top: isOpen ? '50%' : '0%',
                                    rotate: isOpen ? 45 : 0,
                                    translateY: isOpen ? '-50%' : 0
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="absolute top-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                                animate={{
                                    opacity: isOpen ? 0 : 1,
                                    translateY: '-50%'
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="absolute w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                                animate={{
                                    bottom: isOpen ? '50%' : '0%',
                                    rotate: isOpen ? -45 : 0,
                                    translateY: isOpen ? '50%' : 0
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && <MobileMenu />}
            </AnimatePresence>
        </motion.nav>
    );
}