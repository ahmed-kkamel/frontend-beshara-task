import { motion } from 'framer-motion';
import { ContactFormData } from '@/hooks/useContactForm';

interface ContactFormProps {
  formData: ContactFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({ formData, handleInputChange, handleSubmit }: ContactFormProps) {
  const inputClasses = "w-full px-4 py-3 border rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none transition-all duration-300";
  
  const formFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'subject', label: 'Subject', type: 'text' }
  ];

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Get in Touch
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <label className="block text-gray-700 mb-2 font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name as keyof ContactFormData]}
              onChange={handleInputChange}
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
            name="message"
            value={formData.message}
            onChange={handleInputChange}
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
  );
}