'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useState, useRef, useEffect, useCallback } from 'react';
import MiniCart from './MiniCart';

const ALL_PRODUCTS = [
  { id: 1, name: 'Premium Green Cardamom (8mm)', category: 'Whole Spices', price: 450 },
  { id: 2, name: 'Tellicherry Black Pepper', category: 'Whole Spices', price: 320 },
  { id: 3, name: 'Ceylon Cinnamon Quills', category: 'Whole Spices', price: 550 },
  { id: 4, name: 'Clove Buds (Idukki)', category: 'Whole Spices', price: 280 },
  { id: 5, name: 'Turmeric Powder (Lakadong)', category: 'Powders', price: 180 },
  { id: 6, name: 'Red Chilli Powder (Kashmir)', category: 'Powders', price: 200 },
  { id: 7, name: 'Wayanad Coffee Powder', category: 'Tea & Coffee', price: 380 },
  { id: 8, name: 'Mountain Masala Chai', category: 'Tea & Coffee', price: 260 },
  { id: 9, name: 'Kerala Gift Hamper (Small)', category: 'Gift Hampers', price: 1499 },
  { id: 10, name: 'Premium Spice Box (12 items)', category: 'Gift Hampers', price: 2499 },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.trim().length > 1
    ? ALL_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="text-2xl font-extrabold tracking-tight text-orange-700">Spice Roots</span>
            <span className="hidden sm:block text-2xl font-light text-stone-400 ml-1">India</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 font-medium text-stone-700 text-sm">
            <Link href="/shop" className="hover:text-orange-600 transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-orange-600 transition-colors">Our Farm</Link>
            <Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link>
            <Link href="/track" className="hover:text-orange-600 transition-colors">Track Order</Link>
          </nav>

          {/* Search Bar (desktop) */}
          <div ref={searchRef} className="hidden md:block relative flex-1 max-w-72">
            {searchOpen ? (
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search spices, teas..."
                  className="w-full border-2 border-orange-400 rounded-xl px-4 py-2 text-sm outline-none bg-white shadow-lg"
                  onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                />
                <button onClick={() => { setSearchOpen(false); setQuery(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">✕</button>

                {results.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {results.map(r => (
                      <Link
                        key={r.id}
                        href={`/shop/${r.id}`}
                        onClick={() => { setSearchOpen(false); setQuery(''); }}
                        className="flex items-center justify-between px-4 py-3 hover:bg-orange-50 transition border-b border-stone-50 last:border-0"
                      >
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{r.name}</p>
                          <p className="text-xs text-stone-400">{r.category}</p>
                        </div>
                        <span className="text-orange-600 font-bold text-sm">₹{r.price}</span>
                      </Link>
                    ))}
                    <Link
                      href={`/shop?q=${encodeURIComponent(query)}`}
                      onClick={() => { setSearchOpen(false); setQuery(''); }}
                      className="block text-center text-xs text-orange-600 font-semibold py-3 hover:bg-orange-50 transition"
                    >
                      See all results for "{query}" →
                    </Link>
                  </div>
                )}
                {query.trim().length > 1 && results.length === 0 && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-stone-200 rounded-2xl shadow-xl p-6 text-center text-sm text-stone-400 z-50">
                    No products found for "{query}"
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openSearch}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-400 rounded-xl px-4 py-2 text-sm w-full transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                Search products...
              </button>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Mobile Search */}
            <button onClick={openSearch} className="md:hidden p-2 hover:bg-stone-100 rounded-xl">
              <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>

            {/* Account */}
            <Link href="/account" className="p-2 hover:bg-stone-100 rounded-xl transition hidden sm:block">
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </Link>

            {/* Cart — opens MiniCart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-stone-100 rounded-xl transition"
            >
              <svg className="w-5 h-5 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1 animate-bounce-once">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Sign In */}
            <Link href="/login" className="hidden sm:flex items-center gap-1 px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors shadow">
              Sign In
            </Link>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-stone-100 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 shadow-2xl">
            {/* Nav Links */}
            <div className="px-4 pt-4 pb-2 space-y-1">
              {[
                { href: '/shop', label: 'Shop', icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                )},
                { href: '/about', label: 'Our Farm', icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
                )},
                { href: '/contact', label: 'Contact', icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                )},
                { href: '/track', label: 'Track Order', icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                )},
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-orange-50 hover:text-orange-700 transition-all group"
                >
                  <span className="text-stone-400 group-hover:text-orange-500 transition-colors">{link.icon}</span>
                  {link.label}
                  <svg className="w-4 h-4 ml-auto text-stone-300 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-4 my-2 border-t border-stone-100" />

            {/* Account Actions */}
            <div className="px-4 pb-4 flex gap-3">
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-stone-200 text-stone-700 font-semibold text-sm hover:border-orange-300 hover:text-orange-700 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Account
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 text-white font-semibold text-sm hover:bg-orange-600 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                Sign In
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mini Cart Drawer */}
      <MiniCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
