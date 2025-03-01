'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartIcon from './CartIcon';
import UserMenu from './UserMenu';

export default function MobileMenu() {
  const pathname = usePathname();


  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Orders', path: '/orders' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'Settings', path: '/settings' },
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
          <UserMenu />
        </motion.div>
      </div>
    </motion.div>
  );
}