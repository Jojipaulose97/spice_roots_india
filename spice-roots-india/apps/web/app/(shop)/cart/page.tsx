'use client';

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { Button } from "@/app/components/ui/Button";
import { useState } from "react";

const COUPONS: Record<string, { type: 'pct' | 'flat'; value: number }> = {
  SPICE10:  { type: 'pct',  value: 10 },
  KERALA20: { type: 'pct',  value: 20 },
  FLAT50:   { type: 'flat', value: 50  },
};

export default function CartPage() {
  const { items, totalPrice, removeItem, updateQty, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const found = COUPONS[code];
    if (!found) { setCouponMsg('Invalid coupon code.'); setDiscount(0); return; }
    const d = found.type === 'pct' ? Math.round(totalPrice * found.value / 100) : found.value;
    setDiscount(d);
    setCouponMsg(`✓ "${code}" applied — saved ₹${d}`);
  };

  const finalTotal = Math.max(0, totalPrice - discount);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
        <p className="text-6xl mb-6">🛒</p>
        <h2 className="text-2xl font-bold text-stone-900 mb-3">Your cart is empty</h2>
        <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/shop">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-10">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-600 hover:underline transition">Clear All</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={`${item.id}-${item.weight}`} className="flex gap-4 bg-white p-5 rounded-2xl shadow-sm border border-stone-100 items-center">
              <div className="relative w-20 h-20 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={item.img} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-stone-900 truncate">{item.name}</h3>
                <p className="text-xs text-stone-400 mt-0.5">Weight: {item.weight}</p>
                <p className="text-orange-600 font-bold mt-1">₹{item.price} <span className="text-xs text-stone-400 font-normal">each</span></p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  onClick={() => removeItem(item.id, item.weight)}
                  className="text-stone-300 hover:text-red-500 transition text-xs"
                >✕ Remove</button>
                <div className="flex items-center border-2 border-stone-200 rounded-xl overflow-hidden h-9 bg-white focus-within:border-orange-400 transition">
                  <button onClick={() => updateQty(item.id, item.weight, item.qty - 1)} className="px-3 hover:bg-stone-100 h-full font-bold text-stone-500 select-none">−</button>
                  <span className="w-8 text-center font-bold text-sm text-stone-900">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.weight, item.qty + 1)} className="px-3 hover:bg-stone-100 h-full font-bold text-stone-500 select-none">+</button>
                </div>
                <p className="text-sm font-bold text-stone-700">₹{item.price * item.qty}</p>
              </div>
            </div>
          ))}

          <Link href="/shop" className="flex items-center gap-2 text-orange-600 font-medium hover:underline text-sm pt-2">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="bg-stone-50 p-6 rounded-3xl border border-stone-200 h-fit space-y-5">
          <h2 className="font-bold text-xl text-stone-900">Order Summary</h2>

          {/* Coupon */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={e => { setCoupon(e.target.value); setCouponMsg(''); }}
                className="flex-1 border border-stone-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-500 transition uppercase"
              />
              <Button onClick={applyCoupon} className="bg-stone-900 text-white rounded-xl text-sm px-4">Apply</Button>
            </div>
            {couponMsg && (
              <p className={`text-xs mt-1.5 font-medium ${couponMsg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>
                {couponMsg}
              </p>
            )}
            <p className="text-xs text-stone-400 mt-1">Try: SPICE10 · KERALA20 · FLAT50</p>
          </div>

          <div className="space-y-3 text-sm border-t border-stone-200 pt-4">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal ({items.length} items)</span>
              <span className="font-medium text-stone-900">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 font-medium">
                <span>Coupon Discount</span>
                <span>− ₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">{totalPrice >= 499 ? 'FREE' : '₹60'}</span>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4">
            <div className="flex justify-between font-bold text-xl text-stone-900">
              <span>Total</span>
              <span>₹{(finalTotal + (totalPrice < 499 ? 60 : 0)).toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-stone-400 mt-1 text-right">GST included</p>
          </div>

          <Link href="/checkout">
            <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white h-14 rounded-xl font-bold text-base shadow-lg shadow-orange-600/20">
              Proceed to Checkout →
            </Button>
          </Link>

          <div className="flex items-center justify-center gap-1 text-xs text-stone-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            100% Secure · Razorpay Encrypted
          </div>
        </div>
      </div>
    </div>
  );
}
