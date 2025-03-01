'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    setUser(null);
    window.dispatchEvent(new Event('cartUpdated'));
    router.push('/auth/login');
  };

  const menuItems = [
    { label: 'Profile', icon: '👤', href: '/profile' },
    { label: 'Orders', icon: '📦', href: '/orders' },
    { label: 'Wishlist', icon: '❤️', href: '/wishlist' },
    { label: 'Settings', icon: '⚙️', href: '/settings' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {user ? (
        <div>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 px-3 sm:px-4 py-2 rounded-xl hover:bg-gray-100 
                     transition-colors duration-200 text-sm sm:text-base cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                        flex items-center justify-center text-white font-medium text-sm sm:text-base">
              {user.firstName[0].toUpperCase()}
            </div>
            <span className="font-medium text-gray-700 hidden sm:block">{user.firstName}</span>
            <motion.svg
              className="w-4 h-4 text-gray-500 hidden sm:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 180 : 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-[280px] sm:w-64 bg-white rounded-2xl shadow-xl py-2 
                          border border-gray-100 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-medium text-gray-800 text-sm sm:text-base">
                    {`${user.firstName} ${user.lastName}`}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{user.email}</p>
                </div>

                <div className="py-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 
                               transition-colors text-sm sm:text-base"
                    >
                      <span className="text-lg sm:text-xl">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2.5 text-red-600 hover:bg-red-50 
                             transition-colors w-full text-sm sm:text-base"
                  >
                    <span className="text-lg sm:text-xl">🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:block"
        >
          <Link
            href="/auth/login"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r 
                     from-indigo-500 to-purple-500 text-white font-medium hover:shadow-md 
                     transition-all duration-200 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Login</span>
          </Link>
        </motion.div>
      )}
    </div>
  );
}