'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from 'react';
import { useCart } from '@/app/context/CartContext';

const ALL_PRODUCTS = [
  { id: 1,  name: "Premium Green Cardamom (8mm)", category: "Whole Spices", price: 450, oldPrice: 600, img: "https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/cardamom_qdu26x.webp",  rating: 4.9, reviews: 128 },
  { id: 2,  name: "Tellicherry Black Pepper",     category: "Whole Spices", price: 320, oldPrice: 420, img: "https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/pepper_sgo22q.webp",    rating: 4.8, reviews: 94  },
  { id: 3,  name: "Ceylon Cinnamon Quills",        category: "Whole Spices", price: 550, oldPrice: 700, img: "https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/cinamon_wdn1pl.webp",   rating: 4.7, reviews: 76  },
  { id: 4,  name: "Clove Buds (Idukki)",           category: "Whole Spices", price: 280, oldPrice: 380, img: "https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/nutmeg_hk2lao.webp",    rating: 4.8, reviews: 62  },
  { id: 5,  name: "Turmeric Powder (Lakadong)",    category: "Powders",      price: 180, oldPrice: 240, img: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80",            rating: 4.9, reviews: 210 },
  { id: 7,  name: "Wayanad Coffee Powder",         category: "Tea & Coffee", price: 380, oldPrice: 500, img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80",            rating: 5.0, reviews: 155 },
  { id: 8,  name: "Mountain Masala Chai",          category: "Tea & Coffee", price: 260, oldPrice: 350, img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80",            rating: 4.7, reviews: 103 },
  { id: 9,  name: "Star Anise (Chakra Phool)",     category: "Whole Spices", price: 320, oldPrice: 420, img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",            rating: 4.5, reviews: 44  },
  { id: 11, name: "Kerala Gift Hamper (Small)",    category: "Gift Hampers", price: 1499,oldPrice:1999, img: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",            rating: 4.9, reviews: 37  },
  { id: 12, name: "Premium Spice Box (12 items)",  category: "Gift Hampers", price: 2499,oldPrice:3200, img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80",            rating: 5.0, reviews: 22  },
];

const CATEGORIES = ['All', 'Whole Spices', 'Powders', 'Tea & Coffee', 'Gift Hampers'];
const SORTS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

export default function ShopPage() {
  const { addItem, items } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(3200);
  const [sort, setSort] = useState('Featured');
  const [addedId, setAddedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .filter(p => p.price <= maxPrice);

    if (sort === 'Price: Low to High')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'Price: High to Low')  list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'Top Rated')           list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, maxPrice, sort]);

  const handleAddToCart = (e: React.MouseEvent, prod: typeof ALL_PRODUCTS[0]) => {
    e.preventDefault();
    addItem({ id: prod.id, name: prod.name, price: prod.price, weight: '50g', img: prod.img });
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const cartIds = new Set(items.map(i => i.id));

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex gap-8">
      {/* ── Sidebar Filters ── */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-28 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-8">
          <div>
            <h3 className="font-bold text-base text-stone-900 mb-4 uppercase tracking-wider text-xs">Categories</h3>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {cat}
                  <span className="float-right text-xs opacity-60">
                    {cat === 'All' ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base text-stone-900 mb-4 uppercase tracking-wider text-xs">Max Price</h3>
            <input
              type="range"
              min="100" max="3200" step="100"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-sm text-stone-500 mt-2 font-medium">
              <span>₹100</span>
              <span className="text-orange-600 font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
              <span>₹3,200</span>
            </div>
          </div>

          <button
            onClick={() => { setActiveCategory('All'); setMaxPrice(3200); setSort('Featured'); }}
            className="w-full border border-stone-200 text-stone-600 hover:text-red-600 hover:border-red-300 py-2.5 rounded-xl text-sm font-medium transition"
          >
            Clear Filters
          </button>
        </div>
      </aside>

      {/* ── Product Grid ── */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-stone-900">Shop All</h1>
            <p className="text-stone-500 text-sm mt-1">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </p>
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-stone-300 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-orange-500 transition shadow-sm"
          >
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Mobile Category Pills */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-2 mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white'
                  : 'bg-white border border-stone-200 text-stone-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="text-4xl mb-4">🫙</p>
            <p className="text-lg font-medium">No products match your filters.</p>
            <button onClick={() => { setActiveCategory('All'); setMaxPrice(3200); }} className="mt-4 text-orange-600 underline text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prod) => {
              const isAdded = addedId === prod.id;
              const inCart = cartIds.has(prod.id);
              const discount = Math.round(((prod.oldPrice - prod.price) / prod.oldPrice) * 100);
              return (
                <Link href={`/shop/${prod.id}`} key={prod.id} className="group bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <Image
                      src={prod.img}
                      alt={prod.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-orange-600 text-white px-2 py-0.5 text-xs font-bold rounded-full shadow">
                      {discount}% OFF
                    </div>
                    {inCart && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white px-2 py-0.5 text-xs font-bold rounded-full">
                        In Cart
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-1">{prod.category}</p>
                    <h3 className="font-semibold text-base text-stone-900 mb-1 group-hover:text-orange-700 transition leading-snug">{prod.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-amber-400 text-xs">{'★'.repeat(Math.floor(prod.rating))}</span>
                      <span className="text-xs text-stone-400">({prod.reviews})</span>
                    </div>
                    <div className="mt-auto flex justify-between items-center">
                      <div>
                        <p className="text-orange-600 font-bold text-lg">₹{prod.price}</p>
                        <p className="text-xs text-stone-400 line-through">₹{prod.oldPrice}</p>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, prod)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                          isAdded
                            ? 'bg-green-600 text-white scale-95'
                            : 'bg-stone-900 text-white hover:bg-orange-600'
                        }`}
                      >
                        {isAdded ? (
                          <>✓ Added</>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
