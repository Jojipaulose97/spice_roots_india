'use client';

import { useState } from 'react';

const TABS = ['Product Details', 'How to Use', 'Shipping & Returns'] as const;
type Tab = typeof TABS[number];

export default function ProductTabs({ description, howToUse }: { description: string; howToUse: string }) {
  const [active, setActive] = useState<Tab>('Product Details');

  return (
    <div className="border border-stone-200 rounded-3xl overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition border-b-2 ${
              active === t
                ? 'border-orange-600 text-orange-700 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-8">

        {active === 'Product Details' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-stone-900 mb-4 text-lg">About This Product</h3>
              <div className="text-stone-600 text-sm leading-relaxed space-y-3">
                {description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-stone-900 mb-4 text-lg">Product Specifications</h3>
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'Type',        value: 'Whole Spice' },
                  { label: 'Form',        value: 'Raw / Unprocessed' },
                  { label: 'Certification', value: 'FSSAI Licensed' },
                  { label: 'Shelf Life',  value: '18 months (sealed)' },
                  { label: 'Storage',     value: 'Cool, dry place away from sunlight' },
                  { label: 'Packaging',   value: 'Vacuum-sealed, resealable pouch' },
                ].map(r => (
                  <li key={r.label} className="flex justify-between py-2 border-b border-stone-100 last:border-0">
                    <span className="text-stone-500 font-medium">{r.label}</span>
                    <span className="text-stone-800 font-semibold">{r.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {active === 'How to Use' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-stone-900 mb-4 text-lg">Usage Instructions</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{howToUse}</p>
            </div>
            <div>
              <h3 className="font-bold text-stone-900 mb-4 text-lg">Pro Tips</h3>
              <ul className="space-y-3">
                {[
                  '🔥 Toast lightly in a dry pan before grinding for deeper flavour',
                  '❄️ Store in an airtight glass jar to preserve aroma for months',
                  '🫙 Grind fresh in small batches rather than buying pre-ground',
                  '🌡️ Avoid storing near heat or steam sources like the stove',
                  '✅ Use whole spices for slow-cooked dishes; ground for dry rubs',
                ].map(tip => (
                  <li key={tip} className="text-sm text-stone-600 leading-relaxed">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {active === 'Shipping & Returns' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-stone-900 mb-4 text-lg">Shipping Info</h3>
              <ul className="space-y-3.5">
                {[
                  { icon: '📦', title: 'Processing Time',   detail: 'Orders packed & dispatched within 24 hours (Mon–Sat)' },
                  { icon: '🚚', title: 'Standard Delivery', detail: '4–7 business days across India' },
                  { icon: '⚡', title: 'Express Delivery',  detail: '2–3 business days (select at checkout)' },
                  { icon: '🆓', title: 'Free Shipping',     detail: 'On all orders above ₹999' },
                  { icon: '💵', title: 'COD Available',     detail: 'Cash on Delivery with ₹50 handling charge' },
                ].map(s => (
                  <li key={s.title} className="flex gap-3">
                    <span className="text-lg mt-0.5">{s.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{s.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-stone-900 mb-4 text-lg">Returns & Refunds</h3>
              <ul className="space-y-3.5">
                {[
                  { icon: '↩️', title: '7-Day Return Window', detail: 'Return within 7 days of delivery for quality issues' },
                  { icon: '🔍', title: 'Quality Guarantee',   detail: 'Full refund or replacement if product quality is unsatisfactory' },
                  { icon: '📸', title: 'How to Initiate',     detail: 'Email hello@spicerootsindia.com with order ID and photos' },
                  { icon: '⏱️', title: 'Refund Timeline',     detail: 'Refunds processed within 5–7 business days to original payment method' },
                ].map(r => (
                  <li key={r.title} className="flex gap-3">
                    <span className="text-lg mt-0.5">{r.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{r.title}</p>
                      <p className="text-xs text-stone-500 mt-0.5">{r.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
