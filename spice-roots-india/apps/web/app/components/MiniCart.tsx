'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface MiniCartProps {
  open: boolean;
  onClose: () => void;
}

export default function MiniCart({ open, onClose }: MiniCartProps) {
  const { items, totalPrice, totalItems, removeItem, updateQty, clearCart } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[201] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <h2 className="font-bold text-stone-900 text-lg">Your Cart</h2>
            {totalItems > 0 && (
              <span className="bg-orange-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-xl transition text-stone-500 hover:text-stone-900">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-6xl mb-5">🛒</div>
              <p className="text-stone-900 font-bold text-xl mb-2">Your cart is empty</p>
              <p className="text-stone-500 text-sm mb-8">Add some Kerala magic to your cart!</p>
              <button onClick={onClose} className="bg-stone-900 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Free shipping progress */}
              {totalPrice < 499 && (
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                  <p className="text-xs text-stone-600 mb-2 font-medium">
                    Add <span className="text-orange-600 font-bold">₹{499 - totalPrice}</span> more for FREE shipping!
                  </p>
                  <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (totalPrice / 499) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {totalPrice >= 499 && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-3 text-center text-sm text-green-700 font-semibold">
                  🎉 You've unlocked FREE shipping!
                </div>
              )}

              {items.map(item => (
                <div key={`${item.id}-${item.weight}`} className="flex gap-4 py-4 border-b border-stone-100 last:border-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <Image src={item.img} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2">{item.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{item.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden h-7">
                        <button onClick={() => updateQty(item.id, item.weight, item.qty - 1)} className="px-2 hover:bg-stone-100 text-stone-500 h-full font-bold text-sm select-none">−</button>
                        <span className="px-2.5 text-xs font-bold text-stone-900">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.weight, item.qty + 1)} className="px-2 hover:bg-stone-100 text-stone-500 h-full font-bold text-sm select-none">+</button>
                      </div>
                      <span className="font-bold text-stone-900 text-sm">₹{item.price * item.qty}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id, item.weight)} className="text-stone-300 hover:text-red-500 transition shrink-0 self-start pt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5 space-y-4">
            <div className="flex justify-between font-bold text-lg text-stone-900">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-stone-400 text-center">Taxes and shipping calculated at checkout</p>
            <Link href="/checkout" onClick={onClose}>
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-orange-600/20 text-base">
                Checkout — ₹{totalPrice.toLocaleString('en-IN')}
              </button>
            </Link>
            <Link href="/cart" onClick={onClose} className="block text-center text-sm text-stone-500 hover:text-orange-600 transition underline-offset-2 hover:underline">
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
