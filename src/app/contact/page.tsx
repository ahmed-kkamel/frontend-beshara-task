'use client';

import { motion } from 'framer-motion';
import { useContactForm } from '@/hooks/useContactForm';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import { Toaster } from 'react-hot-toast';

export default function Contact() {
  const { formData, handleInputChange, handleSubmit } = useContactForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <Toaster />
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
            <ContactForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
            <ContactInfo />
          </div>
        </motion.div>
      </div>
    </div>
  );
}