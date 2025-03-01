'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}
export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-3xl text-white font-bold mb-4">
              {user?.firstName?.[0]}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">First Name</p>
                <p className="text-gray-900">{user?.firstName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Last Name</p>
                <p className="text-gray-900">{user?.lastName}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}