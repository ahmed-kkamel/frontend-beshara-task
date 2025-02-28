'use client';

interface ProductImageProps {
  image: string;
  title: string;
}

export default function ProductImage({ image, title }: ProductImageProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full h-[400px] object-contain"
      />
    </div>
  );
}