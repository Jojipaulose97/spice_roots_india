'use client';

import { useState, useMemo } from 'react';

const G = '#1A3A28';

interface Customer {
  id: string; name: string; email: string; phone: string;
  city: string; state: string; orders: number; totalSpent: number;
  lastOrder: string; isBlocked: boolean; joinedAt: string; tags: string[];
}

const SEED: Customer[] = [
  { id: '1', name: 'Priya Menon',   email: 'priya@example.com',   phone: '+91 98401 00001', city: 'Kochi',     state: 'Kerala',      orders: 5,  totalSpent: 4200,  lastOrder: '2026-04-10', isBlocked: false, joinedAt: '2026-01-10', tags: ['repeat','loyal'] },
  { id: '2', name: 'Rahul Sharma',  email: 'rahul@example.com',   phone: '+91 98401 00002', city: 'Hyderabad', state: 'Telangana',   orders: 3,  totalSpent: 2610,  lastOrder: '2026-04-11', isBlocked: false, joinedAt: '2026-01-22', tags: [] },
  { id: '3', name: 'Anitha K.',     email: 'anitha@example.com',  phone: '+91 98401 00003', city: 'Chennai',   state: 'Tamil Nadu',  orders: 8,  totalSpent: 9800,  lastOrder: '2026-04-12', isBlocked: false, joinedAt: '2026-02-05', tags: ['vip','repeat'] },
  { id: '4', name: 'Ravi Pillai',   email: 'ravi@example.com',    phone: '+91 98401 00004', city: 'Bengaluru', state: 'Karnataka',   orders: 1,  totalSpent: 540,   lastOrder: '2026-04-13', isBlocked: true,  joinedAt: '2026-02-18', tags: [] },
  { id: '5', name: 'Sara Thomas',   email: 'sara@example.com',    phone: '+91 98401 00005', city: 'Kolkata',   state: 'West Bengal', orders: 4,  totalSpent: 3280,  lastOrder: '2026-04-14', isBlocked: false, joinedAt: '2026-03-01', tags: ['repeat'] },
  { id: '6', name: 'James Roy',     email: 'james@example.com',   phone: '+91 98401 00006', city: 'New Delhi', state: 'Delhi',       orders: 2,  totalSpent: 1800,  lastOrder: '2026-04-15', isBlocked: false, joinedAt: '2026-03-12', tags: [] },
  { id: '7', name: 'Meena Iyer',    email: 'meena@example.com',   phone: '+91 98401 00007', city: 'Hyderabad', state: 'Telangana',   orders: 1,  totalSpent: 380,   lastOrder: '2026-04-09', isBlocked: false, joinedAt: '2026-03-20', tags: [] },
  { id: '8', name: 'Vijay Kumar',   email: 'vijay@example.com',   phone: '+91 98401 00008', city: 'Bengaluru', state: 'Karnataka',   orders: 6,  totalSpent: 7100,  lastOrder: '2026-04-07', isBlocked: false, joinedAt: '2026-01-15', tags: ['vip','loyal'] },
  { id: '9', name: 'Lakshmi Nair',  email: 'lakshmi@example.com', phone: '+91 98401 00009', city: 'Kochi',     state: 'Kerala',      orders: 3,  totalSpent: 2400,  lastOrder: '2026-04-13', isBlocked: false, joinedAt: '2026-02-28', tags: ['repeat'] },
  { id: '10',name: 'Arjun Menon',   email: 'arjun@example.com',   phone: '+91 98401 00010', city: 'Chennai',   state: 'Tamil Nadu',  orders: 2,  totalSpent: 1760,  lastOrder: '2026-04-16', isBlocked: false, joinedAt: '2026-04-01', tags: [] },
];

const TAG_COLORS: Record<string, string> = {
  vip:    'bg-yellow-100 text-yellow-700',
  loyal:  'bg-green-100 text-green-700',
  repeat: 'bg-blue-100 text-blue-700',
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(SEED);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'vip' | 'blocked'>('all');
  const [modal, setModal] = useState<Customer | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return customers.filter(c =>
      (filter === 'all' || (filter === 'vip' && c.tags.includes('vip')) || (filter === 'blocked' && c.isBlocked)) &&
      (!q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q))
    );
  }, [customers, search, filter]);

  const toggleBlock = (id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isBlocked: !c.isBlocked } : c));
    if (modal?.id === id) setModal(m => m ? { ...m, isBlocked: !m.isBlocked } : m);
  };

  const stats = {
    total:   customers.length,
    vip:     customers.filter(c => c.tags.includes('vip')).length,
    blocked: customers.filter(c => c.isBlocked).length,
    revenue: customers.reduce((s, c) => s + c.totalSpent, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Customers</h1>
        <p className="text-stone-500 text-sm mt-1">{stats.total} total · {stats.vip} VIP · {stats.blocked} blocked</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: stats.total,   icon: '👥', color: 'bg-blue-50 text-blue-700' },
          { label: 'VIP Customers',   value: stats.vip,     icon: '⭐', color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Blocked',         value: stats.blocked, icon: '🚫', color: 'bg-red-50 text-red-700' },
          { label: 'Total Revenue',   value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: '💰', color: 'bg-green-50 text-green-700' },
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
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, city…"
          className="border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-400 transition w-72" />
        <div className="flex gap-1.5">
          {(['all','vip','blocked'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${filter === f ? 'bg-orange-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-5 py-4 font-semibold text-stone-600">Customer</th>
              <th className="px-5 py-4 font-semibold text-stone-600 hidden md:table-cell">Location</th>
              <th className="px-5 py-4 font-semibold text-stone-600 hidden lg:table-cell">Tags</th>
              <th className="px-5 py-4 font-semibold text-stone-600">Orders / Spent</th>
              <th className="px-5 py-4 font-semibold text-stone-600 hidden md:table-cell">Last Order</th>
              <th className="px-5 py-4 font-semibold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-16 text-center text-stone-400 text-sm">No customers found.</td></tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} className={`hover:bg-stone-50 transition ${c.isBlocked ? 'opacity-60' : ''}`}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 bg-stone-200 text-stone-600">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{c.name}</p>
                      <p className="text-xs text-stone-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 hidden md:table-cell text-stone-600 text-sm">{c.city}, {c.state}</td>
                <td className="px-5 py-3 hidden lg:table-cell">
                  <div className="flex gap-1 flex-wrap">
                    {c.tags.map(t => <span key={t} className={`px-2 py-0.5 rounded-full text-xs font-bold ${TAG_COLORS[t] || 'bg-stone-100 text-stone-500'}`}>{t}</span>)}
                    {c.isBlocked && <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600">blocked</span>}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-stone-900">{c.orders} orders</p>
                  <p className="text-xs text-stone-400">₹{c.totalSpent.toLocaleString('en-IN')}</p>
                </td>
                <td className="px-5 py-3 hidden md:table-cell text-stone-500 text-xs">{c.lastOrder}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setModal(c)} className="text-orange-600 hover:underline font-medium text-sm">View</button>
                    <button onClick={() => toggleBlock(c.id)}
                      className={`text-xs font-semibold hover:underline ${c.isBlocked ? 'text-green-600' : 'text-red-500'}`}>
                      {c.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100" style={{ background: G }}>
              <h2 className="font-bold text-white text-lg">Customer Details</h2>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl bg-stone-200 text-stone-600">
                  {modal.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-lg">{modal.name}</p>
                  <p className="text-stone-500 text-sm">{modal.email}</p>
                  <div className="flex gap-1 mt-1">
                    {modal.tags.map(t => <span key={t} className={`px-2 py-0.5 rounded-full text-xs font-bold ${TAG_COLORS[t] || 'bg-stone-100 text-stone-500'}`}>{t}</span>)}
                  </div>
                </div>
              </div>
              {[
                { label: 'Phone',       value: modal.phone },
                { label: 'Location',    value: `${modal.city}, ${modal.state}` },
                { label: 'Orders',      value: `${modal.orders} orders` },
                { label: 'Total Spent', value: `₹${modal.totalSpent.toLocaleString('en-IN')}` },
                { label: 'Last Order',  value: modal.lastOrder },
                { label: 'Joined',      value: modal.joinedAt },
                { label: 'Status',      value: modal.isBlocked ? 'Blocked' : 'Active' },
              ].map(r => (
                <div key={r.label} className="flex justify-between border-b border-stone-50 pb-2 last:border-0">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{r.label}</span>
                  <span className="text-sm font-medium text-stone-900">{r.value}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-stone-100 flex gap-3">
              <button onClick={() => toggleBlock(modal.id)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-bold border transition ${modal.isBlocked ? 'border-green-600 text-green-600 hover:bg-green-50' : 'border-red-400 text-red-500 hover:bg-red-50'}`}>
                {modal.isBlocked ? 'Unblock Customer' : 'Block Customer'}
              </button>
              <button onClick={() => setModal(null)} className="flex-1 bg-stone-900 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-orange-600 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
