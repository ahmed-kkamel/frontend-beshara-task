'use client';

import Image from "next/image";

interface ProductImageProps {
  image: string;
  title: string;
}

export default function ProductImage({ image, title }: ProductImageProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Image
        src={image}
        alt={title}
        className="w-full h-[400px] object-contain"
        width={400}
        height={400}
      />
    </div>
  );
}