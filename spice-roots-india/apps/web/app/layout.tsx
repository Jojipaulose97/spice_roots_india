import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import StoreShell from './components/StoreShell';

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spice Roots India | Premium Kerala Spices",
  description: "Authentic, farm-direct spices from Idukki, Kerala. Shop cardamom, pepper, cinnamon and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-stone-50 min-h-screen flex flex-col text-slate-900`}>
        <CartProvider>
          <ToastProvider>
            <StoreShell>{children}</StoreShell>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
