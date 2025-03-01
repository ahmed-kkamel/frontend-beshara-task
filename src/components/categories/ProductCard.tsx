import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  index: number;
}

export default function ProductCard({ id, title, price, image, index }: Readonly<ProductCardProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/product/${id}`}
        className="group block bg-white rounded-2xl shadow-lg overflow-hidden min-h-[300px] md:min-h-[400px]
                 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="p-4">
          <motion.div
            className="relative aspect-square mb-4 bg-gradient-to-br from-gray-50 to-gray-100 
                     rounded-xl overflow-hidden group-hover:shadow-inner"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              alt={title}
              className="w-full h-full aspect-square object-contain p-6 transform group-hover:scale-110 
                       transition-transform duration-500 ease-out"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={index < 4}
            />
          </motion.div>
          <div className="space-y-2 p-2">
            <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 
                       transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                        bg-clip-text text-transparent">
                ${price.toFixed(2)}
              </p>
              <motion.span
                className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium"
                whileHover={{ scale: 1.1 }}
              >
                View Details
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}