'use client';

import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  { id: 1, name: 'Priya Menon',    location: 'Kochi, Kerala',     rating: 5, date: 'March 2026', text: 'I have been cooking with these cardamom pods for 3 months now. The aroma is absolutely outstanding — nothing like supermarket brands. My biryanis have never smelled better.', verified: true },
  { id: 2, name: 'Rahul Sharma',   location: 'New Delhi',         rating: 5, date: 'March 2026', text: 'Ordered the 250g pack. The quality is exceptional — you can feel the essential oils on your fingers when you crush a pod. Will never go back to store-bought spices.', verified: true },
  { id: 3, name: 'Anitha Krishnan',location: 'Bengaluru',         rating: 4, date: 'Feb 2026',   text: 'Very good quality cardamom. The packaging is airtight and professional. Shipping was a day late but support was responsive. 4 stars for the small delay.', verified: true },
  { id: 4, name: 'James Rodrigues',location: 'Mumbai',            rating: 5, date: 'Feb 2026',   text: "Gifted this to my mother and she hasn't stopped talking about it. The flavour is intense and complex — almost eucalyptus-like with a citrus finish. Absolutely premium.", verified: false },
];

function StarRating({ val, onChange }: { val: number; onChange?: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type={onChange ? 'button' : undefined}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          className={`text-2xl transition ${onChange ? 'cursor-pointer' : 'cursor-default'} ${n <= (hover || val) ? 'text-amber-400' : 'text-stone-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

interface ProductReviewsProps {
  productName: string;
}

export default function ProductReviews({ productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [formOpen, setFormOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(r => ({ r, count: reviews.filter(rev => rev.rating === r).length }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      location: location.trim() || 'India',
      rating,
      date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      text: text.trim(),
      verified: false,
    };
    setReviews(prev => [newReview, ...prev]);
    setSubmitted(true);
    setFormOpen(false);
    setName(''); setLocation(''); setText(''); setRating(5);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="border-t border-stone-100 pt-14 mt-14">
      <h2 className="text-2xl font-extrabold text-stone-900 mb-8">Customer Reviews</h2>

      {/* Summary Bar */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10 bg-stone-50 rounded-2xl p-6 border border-stone-100">
        <div className="text-center shrink-0">
          <p className="text-6xl font-extrabold text-stone-900">{avg.toFixed(1)}</p>
          <StarRating val={Math.round(avg)} />
          <p className="text-xs text-stone-400 mt-2">{reviews.length} reviews</p>
        </div>
        <div className="flex-1 space-y-2.5">
          {ratingCounts.map(({ r, count }) => (
            <div key={r} className="flex items-center gap-3">
              <span className="text-xs text-stone-500 w-3">{r}</span>
              <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <div className="flex-1 h-2.5 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }} />
              </div>
              <span className="text-xs text-stone-400 w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-5 mb-8">
        {reviews.map(rev => (
          <div key={rev.id} className="bg-white border border-stone-100 rounded-2xl p-6 hover:shadow-sm transition">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-700 text-sm shrink-0">
                  {rev.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-stone-900 text-sm">{rev.name}</p>
                    {rev.verified && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">✓ Verified</span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400">{rev.location} · {rev.date}</p>
                </div>
              </div>
              <div className="flex shrink-0">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={`text-base ${n <= rev.rating ? 'text-amber-400' : 'text-stone-200'}`}>★</span>
                ))}
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">{rev.text}</p>
          </div>
        ))}
      </div>

      {/* Write Review */}
      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center text-green-700 font-semibold text-sm mb-6">
          ✓ Thank you! Your review has been posted.
        </div>
      )}

      {!formOpen ? (
        <button
          onClick={() => setFormOpen(true)}
          className="w-full border-2 border-dashed border-stone-300 hover:border-orange-400 text-stone-500 hover:text-orange-600 rounded-2xl py-4 text-sm font-semibold transition"
        >
          + Write a Review
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-5">
          <h3 className="font-bold text-stone-900">Share Your Experience</h3>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-2 uppercase tracking-wide">Your Rating</label>
            <StarRating val={rating} onChange={setRating} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">Your Name*</label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g. Priya Menon"
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">Location</label>
              <input
                type="text" value={location} onChange={e => setLocation(e.target.value)}
                placeholder="e.g. Mumbai, Maharashtra"
                className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wide">Review*</label>
            <textarea
              required value={text} onChange={e => setText(e.target.value)}
              rows={4} placeholder="What did you love about this product?"
              className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 transition resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex-1 bg-stone-900 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition text-sm">
              Post Review
            </button>
            <button type="button" onClick={() => setFormOpen(false)} className="px-5 border border-stone-300 text-stone-600 rounded-xl hover:bg-stone-100 transition text-sm">
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
