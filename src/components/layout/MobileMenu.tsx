'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';

export default function MobileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    setUser(null);
    window.dispatchEvent(new Event('cartUpdated'));
    router.push('/auth/login');
  };

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden bg-white/80 backdrop-blur-md border-t border-gray-100"
    >
      <div className="px-4 py-6 space-y-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.path}
              className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${pathname === item.path
                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 py-2 flex items-center justify-between"
        >
          <CartIcon />
          <div className="md:hidden">
            <UserMenu />
          </div>
        </motion.div>
        {!user && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="px-4 pt-2 md:hidden"
          >
            <Link
              href="/auth/login"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl 
                       bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium 
                       hover:shadow-md transition-all duration-200 w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Login</span>
            </Link>
          </motion.div>
        )}
        {user && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="px-4 pt-2 md:hidden"
          >
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl 
                       bg-red-500 text-white font-medium w-full
                       hover:bg-red-600 hover:shadow-md transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}