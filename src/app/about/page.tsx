
'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Story</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Welcome to our e-commerce store! We started with a simple mission: to provide high-quality products
                    at competitive prices while delivering exceptional customer service. Since our founding, we've been
                    dedicated to curating a selection of products that meet our strict standards for quality and value.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We strive to make shopping easier and more enjoyable for our customers. Our commitment to
                    excellence drives everything we do, from product selection to customer support.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { number: '1000+', label: 'Products', delay: 0.6 },
              { number: '50k+', label: 'Happy Customers', delay: 0.7 },
              { number: '99%', label: 'Satisfaction Rate', delay: 0.8 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: stat.delay }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
              >
                <motion.div 
                  className="text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}