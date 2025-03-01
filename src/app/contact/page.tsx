'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputClasses = "w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none  transition-all duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Contact Us
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'subject', label: 'Subject', type: 'text' }
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <label className="block text-gray-700 mb-2 font-medium">{field.label}</label>
                    <input
                      type={field.type}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className={inputClasses}
                      required
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClasses} h-32 resize-none`}
                    required
                  ></textarea>
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl
                           font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 
                           transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contact Information
              </h2>
              <div className="space-y-8">
                {[
                  {
                    title: 'Address',
                    content: ['123 Store Street', 'City, Country 12345'],
                    delay: 0.5
                  },
                  {
                    title: 'Email',
                    content: ['support@store.com'],
                    delay: 0.6
                  },
                  {
                    title: 'Phone',
                    content: ['+1 (234) 567-8900'],
                    delay: 0.7
                  },
                  {
                    title: 'Business Hours',
                    content: [
                      'Monday - Friday: 9:00 AM - 6:00 PM',
                      'Saturday: 10:00 AM - 4:00 PM',
                      'Sunday: Closed'
                    ],
                    delay: 0.8
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: item.delay }}
                    className="group"
                  >
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.content.map((line, i) => (
                      <p key={i} className="text-gray-600 leading-relaxed">{line}</p>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}