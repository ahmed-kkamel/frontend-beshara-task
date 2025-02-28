'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';

export default function NavbarLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-indigo-600">Store</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="nav-link">Home</Link>
                        <Link href="/about" className="nav-link">About</Link>
                        <Link href="/contact" className="nav-link">Contact</Link>
                        <CartIcon />
                        <UserMenu />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="relative w-6 h-6">
                            <span className={`hamburger-line top ${isOpen ? 'open' : ''}`}></span>
                            <span className={`hamburger-line middle ${isOpen ? 'open' : ''}`}></span>
                            <span className={`hamburger-line bottom ${isOpen ? 'open' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <MobileMenu isOpen={isOpen} />
        </nav>
    );
}