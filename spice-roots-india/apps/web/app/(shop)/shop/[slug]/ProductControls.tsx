'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';

const WEIGHTS = [
  { label: '50g',  multiplier: 1 },
  { label: '100g', multiplier: 1.8 },
  { label: '250g', multiplier: 4 },
  { label: '500g', multiplier: 7.5 },
];

const RELATED = [
  { id: 2, name: "Tellicherry Black Pepper", price: 320, img: "https://picsum.photos/seed/pepper/400/400" },
  { id: 3, name: "Ceylon Cinnamon Quills",   price: 550, img: "https://picsum.photos/seed/cinnamon/400/400" },
  { id: 4, name: "Clove Buds (Idukki)",      price: 280, img: "https://picsum.photos/seed/cloves/400/400" },
  { id: 5, name: "Lakadong Turmeric",        price: 180, img: "https://picsum.photos/seed/turmeric/400/400" },
];

interface ProductControlsProps {
  id: number;
  price: number;
  name: string;
  img: string;
  currentId: number;
}

export default function ProductControls({ id, price, name, img, currentId }: ProductControlsProps) {
  const { addItem, items } = useCart();
  const [selectedWeight, setSelectedWeight] = useState('50g');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [addedRelated, setAddedRelated] = useState<number | null>(null);

  const multiplier = WEIGHTS.find(w => w.label === selectedWeight)?.multiplier ?? 1;
  const unitPrice = Math.round(price * multiplier);
  const totalPrice = unitPrice * quantity;

  const inCart = items.some(i => i.id === id && i.weight === selectedWeight);

  // Exclude current product from related
  const related = RELATED.filter(r => r.id !== currentId);

  const handleAddToCart = () => {
    addItem({ id, name, price: unitPrice, weight: selectedWeight, img });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleAddRelated = (prod: typeof RELATED[0]) => {
    addItem({ id: prod.id, name: prod.name, price: prod.price, weight: '50g', img: prod.img });
    setAddedRelated(prod.id);
    setTimeout(() => setAddedRelated(null), 1500);
  };

  return (
    <div>
      {/* ── Dynamic Price ── */}
      <div className="flex items-baseline gap-4 mb-8">
        <span className="text-4xl font-bold text-stone-900">₹{unitPrice}</span>
        <span className="text-xl text-stone-400 line-through">₹{Math.round(unitPrice * 1.35)}</span>
        <span className="text-sm font-bold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">26% OFF</span>
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
          className={`flex-1 h-12 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 ${
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

      {/* ── You May Also Like ── */}
      <div className="border-t border-stone-100 pt-8">
        <h4 className="font-bold text-stone-900 mb-5 text-lg">You May Also Like</h4>
        <div className="grid grid-cols-2 gap-4">
          {related.map(prod => {
            const wasAdded = addedRelated === prod.id;
            return (
              <div key={prod.id} className="group bg-stone-50 hover:bg-white border border-stone-100 hover:border-orange-200 rounded-2xl overflow-hidden transition-all hover:shadow-md flex flex-col">
                <Link href={`/shop/${prod.id}`} className="relative aspect-square overflow-hidden bg-stone-100 block">
                  <Image src={prod.img} alt={prod.name} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="200px" />
                </Link>
                <div className="p-3 flex flex-col gap-1.5">
                  <Link href={`/shop/${prod.id}`}>
                    <p className="text-xs font-semibold text-stone-800 leading-snug hover:text-orange-700 transition line-clamp-2">{prod.name}</p>
                  </Link>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-orange-600 font-bold text-sm">₹{prod.price}</span>
                    <button
                      onClick={() => handleAddRelated(prod)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                        wasAdded
                          ? 'bg-green-600 text-white'
                          : 'bg-stone-900 text-white hover:bg-orange-600'
                      }`}
                    >
                      {wasAdded ? '✓' : '+ Add'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
