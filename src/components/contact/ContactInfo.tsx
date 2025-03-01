import { motion } from 'framer-motion';

interface ContactInfoItem {
  title: string;
  content: string[];
  delay: number;
}

export default function ContactInfo() {
  const contactInfoItems: ContactInfoItem[] = [
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
  ];

  return (
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
        {contactInfoItems.map((item, index) => (
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
  );
}