'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

const WEIGHTS = [
  { label: '50g',  multiplier: 1 },
  { label: '100g', multiplier: 1.8 },
  { label: '250g', multiplier: 4 },
  { label: '500g', multiplier: 7.5 },
];


interface ProductControlsProps {
  id: number;
  price: number;
  originalPrice: number;
  name: string;
  img: string;
  currentId: number;
  inStock: boolean;
}

export default function ProductControls({ id, price, originalPrice, name, img, currentId, inStock }: ProductControlsProps) {
  const { addItem, items } = useCart();
  const [selectedWeight, setSelectedWeight] = useState('50g');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const multiplier = WEIGHTS.find(w => w.label === selectedWeight)?.multiplier ?? 1;
  const unitPrice    = Math.round(price * multiplier);
  const origUnitPrice = Math.round(originalPrice * multiplier);
  const totalPrice   = unitPrice * quantity;

  const inCart = items.some(i => i.id === id && i.weight === selectedWeight);

  const handleAddToCart = () => {
    addItem({ id, name, price: unitPrice, weight: selectedWeight, img });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* ── Dynamic Price ── */}
      <div className="flex items-baseline gap-4 mb-6">
        <span className="text-3xl font-black text-stone-900">₹{unitPrice}</span>
        <span className="text-lg text-stone-400 line-through">₹{origUnitPrice}</span>
      </div>

      {/* ── Weight Selector ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-stone-900">Select Weight</h4>
          <span className="text-sm text-stone-500">
            Selected: <span className="text-orange-600 font-bold">{selectedWeight}</span>
          </span>
        </div>
        <div className="flex gap-3 flex-wrap">
          {WEIGHTS.map(w => (
            <button
              key={w.label}
              onClick={() => setSelectedWeight(w.label)}
              className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all border-2 focus:outline-none ${
                selectedWeight === w.label
                  ? 'border-orange-600 bg-orange-50 text-orange-900 shadow-md shadow-orange-100'
                  : 'border-stone-200 text-stone-600 hover:border-orange-300 bg-white'
              }`}
            >
              {w.label}
              <span className="block text-xs font-normal opacity-60 mt-0.5">₹{Math.round(price * w.multiplier)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Quantity + Add to Cart ── */}
      <div className="flex gap-4 items-end mb-6 pt-6 border-t border-stone-100">
        <div className="w-36">
          <label className="block text-sm font-semibold mb-2 text-stone-700">Quantity</label>
          <div className="flex items-center border-2 border-stone-200 rounded-xl overflow-hidden h-12 bg-white focus-within:border-orange-400 transition-colors">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="px-4 text-stone-500 hover:bg-stone-100 h-full font-bold text-xl disabled:opacity-30 disabled:cursor-not-allowed select-none transition"
            >−</button>
            <span className="flex-1 text-center font-bold text-stone-900 text-base select-none">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(99, q + 1))}
              disabled={quantity >= 99}
              className="px-4 text-stone-500 hover:bg-stone-100 h-full font-bold text-xl disabled:opacity-30 disabled:cursor-not-allowed select-none transition"
            >+</button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`flex-1 h-12 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            added
              ? 'bg-green-600 text-white scale-95'
              : inCart
              ? 'bg-orange-100 text-orange-800 border-2 border-orange-400'
              : 'bg-stone-900 hover:bg-orange-600 text-white shadow-md'
          }`}
        >
          {added ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
              Added to Cart!
            </>
          ) : inCart ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              Add Again — ₹{totalPrice}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              Add to Cart — ₹{totalPrice}
            </>
          )}
        </button>
      </div>

      {/* ── Go to Cart ── */}
      {inCart && (
        <Link
          href="/cart"
          className="flex items-center justify-center gap-2 w-full py-3 mb-6 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition"
        >
          View Cart & Checkout →
        </Link>
      )}

      {/* ── Wishlist ── */}
      <button className="flex items-center justify-center gap-2 w-full border-2 border-stone-200 hover:border-red-300 text-stone-600 hover:text-red-500 font-medium py-3 rounded-xl transition-all mb-10">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
        Save to Wishlist
      </button>

    </div>
  );
}
