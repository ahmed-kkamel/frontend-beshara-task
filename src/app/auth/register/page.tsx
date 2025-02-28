'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    address: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.username) newErrors.username = 'Username is required';

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with one digit, uppercase letter, and special character';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would make an API call here
      localStorage.setItem('user', JSON.stringify(formData));
      router.push('/auth/login');
    }
  };

  const inputFields = [
    { key: 'firstName', label: 'First Name', type: 'text', required: true },
    { key: 'lastName', label: 'Last Name', type: 'text' },
    { key: 'username', label: 'Username', type: 'text', required: true },
    { key: 'email', label: 'Email Address', type: 'email', required: true },
    { key: 'password', label: 'Password', type: 'password', required: true },
    { key: 'address', label: 'Address', type: 'text' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full m-4"
      >
        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputFields.map(({ key, label, type, required }, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={key === 'address' ? 'md:col-span-2' : ''}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={type}
                      value={formData[key as keyof typeof formData]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-lg border ${errors[key] ? 'border-red-300 ring-red-100' : 'border-gray-200'
                        } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none`}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                    />
                    {errors[key] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors[key]}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium
                         hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 text-center"
          >
            <Link
              href="/auth/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
            >
              Already have an account? Login
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}