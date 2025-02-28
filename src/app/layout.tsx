import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import NavbarLayout from '@/components/layout/NavbarLayout';
import './globals.css';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-commerce Store',
  description: 'Your one-stop shop for all your needs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavbarLayout />
        <Suspense fallback={<LoadingSpinner />}>
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}