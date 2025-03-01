'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Settings() {

  const router = useRouter();


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Notifications</label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
                      <span className="ml-2 text-gray-700">Order updates</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Privacy</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-xl">
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                className="w-full bg-red-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  router.push('/auth/login');
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}