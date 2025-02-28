import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import NavbarLayout from '@/components/layout/NavbarLayout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-commerce Store',
  description: 'Your one-stop shop for all your needs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <NavbarLayout />
        </Suspense>
        {children}
      </body>
    </html>
  );
}