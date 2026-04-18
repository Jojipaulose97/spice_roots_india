'use client';

import { useState, useMemo } from 'react';

const G = '#1A3A28';

type ReviewStatus = 'Pending' | 'Approved' | 'Rejected' | 'Flagged';

interface Review {
  id: string; product: string; customer: string; email: string;
  rating: number; title: string; body: string; status: ReviewStatus;
  reply: string; createdAt: string; isVerified: boolean;
}

const SEED: Review[] = [
  { id: '1', product: 'Cardamom 7mm+',     customer: 'Priya Menon',  email: 'priya@example.com',   rating: 5, title: 'Best cardamom ever!',           body: 'Absolutely fresh and aromatic. The 7mm grade is top quality. Will definitely reorder.',   status: 'Approved', reply: 'Thank you Priya! 🙏',                          createdAt: '2026-04-11', isVerified: true  },
  { id: '2', product: 'Black Pepper Bold',  customer: 'Rahul Sharma', email: 'rahul@example.com',   rating: 4, title: 'Great pepper, good value',       body: 'Pungent and fresh. Slightly more bold than expected but great for cooking.',               status: 'Approved', reply: '',                                              createdAt: '2026-04-12', isVerified: true  },
  { id: '3', product: 'Turmeric Powder',    customer: 'Anitha K.',    email: 'anitha@example.com',  rating: 5, title: 'Pure Kerala turmeric',           body: 'Deep golden color and intense flavor. This is authentic farm-fresh turmeric.',             status: 'Pending',  reply: '',                                              createdAt: '2026-04-14', isVerified: true  },
  { id: '4', product: 'Cloves Premium',     customer: 'Sara Thomas',  email: 'sara@example.com',    rating: 3, title: 'Good but smaller than expected', body: 'Quality is fine but the cloves are on the smaller side. Aroma is great though.',           status: 'Pending',  reply: '',                                              createdAt: '2026-04-15', isVerified: false },
  { id: '5', product: 'Cinnamon Sticks',    customer: 'James Roy',    email: 'james@example.com',   rating: 5, title: 'Real Ceylon cinnamon',           body: 'Finally found authentic thin-bark Ceylon cinnamon. Makes a huge difference in tea.',       status: 'Approved', reply: 'So glad you could tell the difference!',        createdAt: '2026-04-08', isVerified: true  },
  { id: '6', product: 'Cardamom 7mm+',     customer: 'Unknown User', email: 'spam@bot.test',       rating: 1, title: 'Worst ever !!!',                 body: 'Buy at amazon cheaper better blah blah click here for discount http://spam.link',          status: 'Flagged',  reply: '',                                              createdAt: '2026-04-16', isVerified: false },
  { id: '7', product: 'Nutmeg Whole',       customer: 'Vijay Kumar',  email: 'vijay@example.com',   rating: 4, title: 'Fresh and fragrant',             body: 'Very fresh nutmeg. Grating it at home makes the kitchen smell amazing. Good quantity.',    status: 'Approved', reply: '',                                              createdAt: '2026-04-09', isVerified: true  },
  { id: '8', product: 'Black Pepper Bold',  customer: 'Lakshmi Nair', email: 'lakshmi@example.com', rating: 5, title: 'Superb quality, fast delivery',  body: 'The pepper is excellent and delivery was quick to Kochi. Packaging was very secure.',       status: 'Pending',  reply: '',                                              createdAt: '2026-04-16', isVerified: true  },
];

const STATUS_COLORS: Record<ReviewStatus, string> = {
  Pending:  'bg-yellow-100 text-yellow-700',
  Approved: 'bg-green-100 text-green-700',
  Rejected: 'bg-stone-100 text-stone-500',
  Flagged:  'bg-red-100 text-red-600',
};

function Stars({ n }: { n: number }) {
  return (
    <span className="text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < n ? 'text-yellow-400' : 'text-stone-200'}>★</span>
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(SEED);
  const [search, setSearch]   = useState('');
  const [filter, setFilter]   = useState<ReviewStatus | 'all'>('all');
  const [modal, setModal]     = useState<Review | null>(null);
  const [replyText, setReplyText] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return reviews.filter(r =>
      (filter === 'all' || r.status === filter) &&
      (!q || r.customer.toLowerCase().includes(q) || r.product.toLowerCase().includes(q) || r.title.toLowerCase().includes(q))
    );
  }, [reviews, search, filter]);

  const setStatus = (id: string, status: ReviewStatus) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    if (modal?.id === id) setModal(m => m ? { ...m, status } : m);
  };

  const saveReply = () => {
    if (!modal) return;
    setReviews(prev => prev.map(r => r.id === modal.id ? { ...r, reply: replyText } : r));
    setModal(m => m ? { ...m, reply: replyText } : m);
  };

  const stats = {
    total:    reviews.length,
    pending:  reviews.filter(r => r.status === 'Pending').length,
    approved: reviews.filter(r => r.status === 'Approved').length,
    avg:      (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Reviews</h1>
        <p className="text-stone-500 text-sm mt-1">{stats.total} total · {stats.pending} pending · avg ★{stats.avg}</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Reviews', value: stats.total,    icon: '💬', color: 'bg-blue-50 text-blue-700' },
          { label: 'Pending',       value: stats.pending,  icon: '⏳', color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Approved',      value: stats.approved, icon: '✅', color: 'bg-green-50 text-green-700' },
          { label: 'Avg Rating',    value: `★ ${stats.avg}`, icon: '⭐', color: 'bg-amber-50 text-amber-700' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4`}>
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by customer, product, title…"
          className="border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-400 transition w-72" />
        <div className="flex gap-1.5 flex-wrap">
          {(['all','Pending','Approved','Rejected','Flagged'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${filter === f ? 'bg-orange-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-stone-400 text-sm">No reviews found.</div>
        )}
        {filtered.map(r => (
          <div key={r.id} className="bg-white border border-stone-200 rounded-2xl p-5 hover:shadow-sm transition">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <Stars n={r.rating} />
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[r.status]}`}>{r.status}</span>
                  {r.isVerified && <span className="text-xs text-green-600 font-semibold">✓ Verified Purchase</span>}
                </div>
                <p className="font-bold text-stone-900">{r.title}</p>
                <p className="text-stone-600 text-sm mt-1 leading-relaxed">{r.body}</p>
                {r.reply && (
                  <div className="mt-3 pl-4 border-l-2 border-orange-300">
                    <p className="text-xs font-bold text-orange-700 mb-0.5">Admin Reply</p>
                    <p className="text-stone-600 text-sm">{r.reply}</p>
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-stone-900 text-sm">{r.customer}</p>
                <p className="text-xs text-stone-400">{r.email}</p>
                <p className="text-xs text-stone-400 mt-0.5">{r.product}</p>
                <p className="text-xs text-stone-300 mt-0.5">{r.createdAt}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {r.status !== 'Approved'  && <button onClick={() => setStatus(r.id, 'Approved')}  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 hover:bg-green-200 transition">Approve</button>}
              {r.status !== 'Rejected'  && <button onClick={() => setStatus(r.id, 'Rejected')}  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-stone-100 text-stone-600 hover:bg-stone-200 transition">Reject</button>}
              {r.status !== 'Flagged'   && <button onClick={() => setStatus(r.id, 'Flagged')}   className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 transition">Flag</button>}
              <button onClick={() => { setModal(r); setReplyText(r.reply); }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-600 hover:bg-orange-100 transition ml-auto">
                {r.reply ? 'Edit Reply' : 'Reply'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100" style={{ background: G }}>
              <h2 className="font-bold text-white">Reply to Review</h2>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="bg-stone-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1"><Stars n={modal.rating} /><span className="text-xs text-stone-400">{modal.customer}</span></div>
                <p className="font-semibold text-stone-900 text-sm">{modal.title}</p>
                <p className="text-stone-600 text-sm mt-1">{modal.body}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Your Reply</label>
                <textarea value={replyText} onChange={e => setReplyText(e.target.value)} rows={4}
                  placeholder="Write a thoughtful reply to the customer…"
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400 resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-stone-100 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 border border-stone-200 rounded-xl py-2.5 text-sm font-bold hover:bg-stone-50">Cancel</button>
              <button onClick={saveReply}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white"
                style={{ background: G }}>Save Reply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
