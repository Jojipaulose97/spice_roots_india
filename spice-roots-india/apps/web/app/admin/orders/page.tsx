'use client';

import { useState, useMemo } from 'react';

const G = '#1A3A28';
const GOLD = '#C9A040';

type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';

interface OrderItem { name: string; qty: number; price: number; weight: string; }
interface Order {
  id: string; customer: string; email: string; phone: string;
  address: string; city: string; state: string; pin: string;
  items: OrderItem[]; subtotal: number; shipping: number; total: number;
  status: OrderStatus; payment: PaymentStatus; paymentMethod: string;
  courier?: string; tracking?: string; note?: string;
  createdAt: string;
}

const SEED: Order[] = [
  { id: 'ORD-1001', customer: 'Priya Menon',   email: 'priya@example.com',  phone: '+91 98401 00001', address: '12 MG Road',          city: 'Kochi',     state: 'Kerala',         pin: '682001', items: [{ name: 'Cardamom 7mm+', qty: 2, price: 1200, weight: '100g' }, { name: 'Black Pepper Bold', qty: 1, price: 890, weight: '200g' }], subtotal: 3290, shipping: 0,   total: 3290, status: 'Delivered',   payment: 'Paid',    paymentMethod: 'UPI',        courier: 'DTDC',      tracking: 'DTDC123456', createdAt: '2026-04-10T10:00:00Z' },
  { id: 'ORD-1002', customer: 'Rahul Sharma',  email: 'rahul@example.com',  phone: '+91 98401 00002', address: '45 Jubilee Hills',    city: 'Hyderabad', state: 'Telangana',      pin: '500033', items: [{ name: 'Turmeric Powder', qty: 3, price: 280, weight: '250g' }], subtotal: 840, shipping: 60,  total: 900,  status: 'Shipped',    payment: 'Paid',    paymentMethod: 'Credit Card', courier: 'BlueDart',  tracking: 'BD789012',   createdAt: '2026-04-11T14:30:00Z' },
  { id: 'ORD-1003', customer: 'Anitha K.',     email: 'anitha@example.com', phone: '+91 98401 00003', address: '7 Anna Nagar',        city: 'Chennai',   state: 'Tamil Nadu',     pin: '600040', items: [{ name: 'Cloves Premium', qty: 1, price: 650, weight: '100g' }, { name: 'Cinnamon Sticks', qty: 2, price: 320, weight: '100g' }], subtotal: 1290, shipping: 0, total: 1290, status: 'Packed',    payment: 'Paid',    paymentMethod: 'Net Banking', courier: '',          tracking: '',           createdAt: '2026-04-12T09:15:00Z' },
  { id: 'ORD-1004', customer: 'Ravi Pillai',   email: 'ravi@example.com',   phone: '+91 98401 00004', address: '3 Brigade Road',      city: 'Bengaluru', state: 'Karnataka',      pin: '560025', items: [{ name: 'Black Pepper Bold', qty: 2, price: 890, weight: '200g' }], subtotal: 1780, shipping: 0, total: 1780, status: 'Confirmed',  payment: 'Paid',    paymentMethod: 'UPI',        courier: '',          tracking: '',           createdAt: '2026-04-13T11:00:00Z' },
  { id: 'ORD-1005', customer: 'Sara Thomas',   email: 'sara@example.com',   phone: '+91 98401 00005', address: '22 Park Street',      city: 'Kolkata',   state: 'West Bengal',    pin: '700016', items: [{ name: 'Cardamom 7mm+', qty: 1, price: 1200, weight: '100g' }], subtotal: 1200, shipping: 80, total: 1280, status: 'Pending',    payment: 'Pending', paymentMethod: 'COD',        courier: '',          tracking: '',           createdAt: '2026-04-14T08:45:00Z' },
  { id: 'ORD-1006', customer: 'James Roy',     email: 'james@example.com',  phone: '+91 98401 00006', address: '11 Connaught Place',  city: 'New Delhi', state: 'Delhi',          pin: '110001', items: [{ name: 'Turmeric Powder', qty: 5, price: 280, weight: '250g' }, { name: 'Cloves Premium', qty: 2, price: 650, weight: '100g' }], subtotal: 2700, shipping: 0, total: 2700, status: 'Processing', payment: 'Paid',    paymentMethod: 'Credit Card', courier: '',          tracking: '',           createdAt: '2026-04-15T16:20:00Z' },
  { id: 'ORD-1007', customer: 'Meena Iyer',    email: 'meena@example.com',  phone: '+91 98401 00007', address: '56 Banjara Hills',    city: 'Hyderabad', state: 'Telangana',      pin: '500034', items: [{ name: 'Cinnamon Sticks', qty: 1, price: 320, weight: '100g' }], subtotal: 320, shipping: 60, total: 380, status: 'Cancelled',  payment: 'Refunded',paymentMethod: 'UPI',        courier: '',          tracking: '',           createdAt: '2026-04-09T12:00:00Z' },
  { id: 'ORD-1008', customer: 'Vijay Kumar',   email: 'vijay@example.com',  phone: '+91 98401 00008', address: '8 Residency Road',    city: 'Bengaluru', state: 'Karnataka',      pin: '560025', items: [{ name: 'Cardamom 7mm+', qty: 3, price: 1200, weight: '100g' }, { name: 'Black Pepper Bold', qty: 1, price: 890, weight: '200g' }], subtotal: 4490, shipping: 0, total: 4490, status: 'Delivered',  payment: 'Paid',    paymentMethod: 'Credit Card', courier: 'FedEx',     tracking: 'FX345678',   createdAt: '2026-04-07T10:30:00Z' },
  { id: 'ORD-1009', customer: 'Lakshmi Nair',  email: 'lakshmi@example.com',phone: '+91 98401 00009', address: '19 Marine Drive',     city: 'Kochi',     state: 'Kerala',         pin: '682031', items: [{ name: 'Cloves Premium', qty: 2, price: 650, weight: '100g' }], subtotal: 1300, shipping: 0, total: 1300, status: 'Shipped',    payment: 'Paid',    paymentMethod: 'UPI',        courier: 'DTDC',      tracking: 'DTDC999001', createdAt: '2026-04-13T15:00:00Z' },
  { id: 'ORD-1010', customer: 'Arjun Menon',   email: 'arjun@example.com',  phone: '+91 98401 00010', address: '30 Poes Garden',      city: 'Chennai',   state: 'Tamil Nadu',     pin: '600086', items: [{ name: 'Turmeric Powder', qty: 2, price: 280, weight: '250g' }, { name: 'Cardamom 7mm+', qty: 1, price: 1200, weight: '100g' }], subtotal: 1760, shipping: 0, total: 1760, status: 'Pending',    payment: 'Pending', paymentMethod: 'COD',        courier: '',          tracking: '',           createdAt: '2026-04-16T09:00:00Z' },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  Pending:    'bg-yellow-100 text-yellow-700',
  Confirmed:  'bg-blue-100 text-blue-700',
  Processing: 'bg-purple-100 text-purple-700',
  Packed:     'bg-indigo-100 text-indigo-700',
  Shipped:    'bg-cyan-100 text-cyan-700',
  Delivered:  'bg-green-100 text-green-700',
  Cancelled:  'bg-red-100 text-red-700',
  Refunded:   'bg-stone-100 text-stone-600',
};

const PAY_COLORS: Record<PaymentStatus, string> = {
  Paid:     'bg-green-100 text-green-700',
  Pending:  'bg-yellow-100 text-yellow-700',
  Refunded: 'bg-stone-100 text-stone-600',
};

const ALL_STATUSES: OrderStatus[] = ['Pending','Confirmed','Processing','Packed','Shipped','Delivered','Cancelled','Refunded'];
const STATUS_STEPS: OrderStatus[] = ['Pending','Confirmed','Processing','Packed','Shipped','Delivered'];

const PAGE_SIZE = 20;

function exportCSV(orders: Order[]) {
  const header = ['ID','Customer','Email','Phone','Items','Subtotal','Shipping','Total','Status','Payment','Method','Courier','Tracking','Date'];
  const rows = orders.map(o => [
    o.id, o.customer, o.email, o.phone,
    o.items.map(i => `${i.qty}x ${i.name}`).join(' | '),
    o.subtotal, o.shipping, o.total,
    o.status, o.payment, o.paymentMethod,
    o.courier || '', o.tracking || '',
    new Date(o.createdAt).toLocaleDateString('en-IN'),
  ]);
  const csv = [header, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = `orders-${Date.now()}.csv`;
  a.click();
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(SEED);
  const [search, setSearch]       = useState('');
  const [statusFilter, setStatus] = useState<OrderStatus | 'all'>('all');
  const [payFilter, setPay]       = useState<PaymentStatus | 'all'>('all');
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [page, setPage]           = useState(1);
  const [panel, setPanel]         = useState<Order | null>(null);
  const [editStatus, setEditStatus]   = useState<OrderStatus>('Pending');
  const [editTracking, setEditTracking] = useState('');
  const [editCourier, setEditCourier]   = useState('');
  const [editNote, setEditNote]         = useState('');
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter(o =>
      (statusFilter === 'all' || o.status === statusFilter) &&
      (payFilter === 'all' || o.payment === payFilter) &&
      (!q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.email.toLowerCase().includes(q))
    );
  }, [orders, search, statusFilter, payFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openPanel = (o: Order) => {
    setPanel(o);
    setEditStatus(o.status);
    setEditTracking(o.tracking || '');
    setEditCourier(o.courier || '');
    setEditNote(o.note || '');
  };

  const savePanel = () => {
    if (!panel) return;
    setSaving(true);
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === panel.id
        ? { ...o, status: editStatus, tracking: editTracking, courier: editCourier, note: editNote }
        : o
      ));
      setPanel(p => p ? { ...p, status: editStatus, tracking: editTracking, courier: editCourier, note: editNote } : p);
      setSaving(false);
    }, 400);
  };

  const bulkMark = (status: OrderStatus) => {
    setOrders(prev => prev.map(o => selected.has(o.id) ? { ...o, status } : o));
    setSelected(new Set());
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (pageItems.every(o => selected.has(o.id))) {
      const next = new Set(selected);
      pageItems.forEach(o => next.delete(o.id));
      setSelected(next);
    } else {
      const next = new Set(selected);
      pageItems.forEach(o => next.add(o.id));
      setSelected(next);
    }
  };

  const allChecked = pageItems.length > 0 && pageItems.every(o => selected.has(o.id));

  const stats = {
    total:     orders.length,
    pending:   orders.filter(o => o.status === 'Pending').length,
    shipped:   orders.filter(o => o.status === 'Shipped').length,
    revenue:   orders.filter(o => o.payment === 'Paid').reduce((s, o) => s + o.total, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Orders</h1>
          <p className="text-stone-500 text-sm mt-1">{stats.total} total · {stats.pending} pending · {stats.shipped} in transit</p>
        </div>
        <button onClick={() => exportCSV(filtered)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-stone-200 hover:bg-stone-50 transition">
          ⬇ Export CSV
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders',   value: stats.total,   icon: '📦', color: 'bg-blue-50 text-blue-700' },
          { label: 'Pending',        value: stats.pending, icon: '⏳', color: 'bg-yellow-50 text-yellow-700' },
          { label: 'In Transit',     value: stats.shipped, icon: '🚚', color: 'bg-cyan-50 text-cyan-700' },
          { label: 'Revenue (Paid)', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: '💰', color: 'bg-green-50 text-green-700' },
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
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search order ID, name, email…"
          className="border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-400 transition w-72" />
        <select value={statusFilter} onChange={e => { setStatus(e.target.value as OrderStatus | 'all'); setPage(1); }}
          className="border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none cursor-pointer">
          <option value="all">All Status</option>
          {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={payFilter} onChange={e => { setPay(e.target.value as PaymentStatus | 'all'); setPage(1); }}
          className="border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none cursor-pointer">
          <option value="all">All Payments</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm">
          <span className="font-semibold text-orange-800">{selected.size} selected</span>
          <span className="text-stone-400">·</span>
          <span className="text-stone-500">Mark as:</span>
          {(['Confirmed','Packed','Shipped'] as OrderStatus[]).map(s => (
            <button key={s} onClick={() => bulkMark(s)}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-white border border-stone-200 hover:bg-stone-50 transition">{s}</button>
          ))}
          <button onClick={() => setSelected(new Set())} className="ml-auto text-stone-400 hover:text-stone-700 text-xs">Clear</button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-4 py-4 w-10">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-orange-600 w-4 h-4 cursor-pointer" />
              </th>
              <th className="px-4 py-4 font-semibold text-stone-600">Order</th>
              <th className="px-4 py-4 font-semibold text-stone-600 hidden md:table-cell">Customer</th>
              <th className="px-4 py-4 font-semibold text-stone-600 hidden lg:table-cell">Items</th>
              <th className="px-4 py-4 font-semibold text-stone-600">Total</th>
              <th className="px-4 py-4 font-semibold text-stone-600">Status</th>
              <th className="px-4 py-4 font-semibold text-stone-600 hidden md:table-cell">Payment</th>
              <th className="px-4 py-4 font-semibold text-stone-600 hidden lg:table-cell">Date</th>
              <th className="px-4 py-4 font-semibold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {pageItems.length === 0 && (
              <tr><td colSpan={9} className="px-6 py-16 text-center text-stone-400 text-sm">No orders found.</td></tr>
            )}
            {pageItems.map((o, i) => (
              <tr key={o.id} className={`hover:bg-stone-50 transition ${i % 2 === 1 ? 'bg-stone-50/50' : ''}`}>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.has(o.id)} onChange={() => toggleSelect(o.id)} className="accent-orange-600 w-4 h-4 cursor-pointer" />
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-stone-900 text-xs">{o.id}</p>
                  <p className="text-xs text-stone-400 md:hidden">{o.customer}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <p className="font-medium text-stone-900 text-sm">{o.customer}</p>
                  <p className="text-xs text-stone-400">{o.city}</p>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <p className="text-xs text-stone-600">{o.items.map(it => `${it.qty}× ${it.name}`).join(', ')}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold text-stone-900 text-sm">₹{o.total.toLocaleString('en-IN')}</p>
                  {o.shipping > 0 && <p className="text-xs text-stone-400">+₹{o.shipping} ship</p>}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[o.status]}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${PAY_COLORS[o.payment]}`}>{o.payment}</span>
                  <p className="text-xs text-stone-400 mt-0.5">{o.paymentMethod}</p>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-xs text-stone-500">
                  {new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openPanel(o)} className="text-orange-600 hover:underline font-medium text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-stone-500">
          <span>Page {page} of {totalPages} · {filtered.length} results</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 disabled:opacity-40 hover:bg-stone-50 transition">← Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-stone-200 disabled:opacity-40 hover:bg-stone-50 transition">Next →</button>
          </div>
        </div>
      )}

      {/* Slide-over Panel */}
      {panel && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setPanel(null)} />
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100" style={{ background: G }}>
              <div>
                <p className="font-bold text-white text-lg">{panel.id}</p>
                <p className="text-xs mt-0.5" style={{ color: GOLD }}>{new Date(panel.createdAt).toLocaleString('en-IN')}</p>
              </div>
              <button onClick={() => setPanel(null)} className="text-white/70 hover:text-white text-2xl leading-none">×</button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Status Timeline */}
              <div className="px-6 py-5 border-b border-stone-100">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Order Timeline</p>
                <div className="flex items-center gap-0">
                  {STATUS_STEPS.map((s, idx) => {
                    const done = STATUS_STEPS.indexOf(panel.status) >= idx;
                    const current = panel.status === s;
                    return (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${
                            current ? 'border-orange-600 bg-orange-600 text-white' :
                            done    ? 'border-green-500 bg-green-500 text-white' :
                                      'border-stone-200 bg-white text-stone-400'
                          }`}>
                            {done && !current ? '✓' : idx + 1}
                          </div>
                          <p className="text-[10px] text-stone-500 mt-1 text-center w-14 leading-tight">{s}</p>
                        </div>
                        {idx < STATUS_STEPS.length - 1 && (
                          <div className={`flex-1 h-0.5 mx-1 mb-4 ${done && STATUS_STEPS.indexOf(panel.status) > idx ? 'bg-green-400' : 'bg-stone-200'}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Info */}
              <div className="px-6 py-5 border-b border-stone-100">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Customer</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: 'Name',  value: panel.customer },
                    { label: 'Email', value: panel.email },
                    { label: 'Phone', value: panel.phone },
                    { label: 'City',  value: `${panel.city}, ${panel.state}` },
                  ].map(r => (
                    <div key={r.label}>
                      <p className="text-xs text-stone-400">{r.label}</p>
                      <p className="font-medium text-stone-900">{r.value}</p>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <p className="text-xs text-stone-400">Address</p>
                    <p className="font-medium text-stone-900">{panel.address}, {panel.city} - {panel.pin}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="px-6 py-5 border-b border-stone-100">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Items</p>
                <div className="space-y-2">
                  {panel.items.map((it, i) => (
                    <div key={i} className="flex justify-between items-center text-sm">
                      <div>
                        <p className="font-medium text-stone-900">{it.name}</p>
                        <p className="text-xs text-stone-400">{it.weight} × {it.qty}</p>
                      </div>
                      <p className="font-bold text-stone-900">₹{(it.price * it.qty).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                  <div className="border-t border-stone-100 pt-2 space-y-1 text-sm">
                    <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>₹{panel.subtotal.toLocaleString('en-IN')}</span></div>
                    <div className="flex justify-between text-stone-500"><span>Shipping</span><span>{panel.shipping > 0 ? `₹${panel.shipping}` : 'Free'}</span></div>
                    <div className="flex justify-between font-bold text-stone-900 text-base"><span>Total</span><span>₹{panel.total.toLocaleString('en-IN')}</span></div>
                  </div>
                </div>
              </div>

              {/* Update Form */}
              <div className="px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Update Order</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Status</label>
                    <select value={editStatus} onChange={e => setEditStatus(e.target.value as OrderStatus)}
                      className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400 cursor-pointer">
                      {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Courier</label>
                      <input value={editCourier} onChange={e => setEditCourier(e.target.value)} placeholder="DTDC, BlueDart…"
                        className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 mb-1">Tracking #</label>
                      <input value={editTracking} onChange={e => setEditTracking(e.target.value)} placeholder="AWB / Tracking ID"
                        className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Internal Note</label>
                    <textarea value={editNote} onChange={e => setEditNote(e.target.value)} rows={2} placeholder="Notes visible only to admins…"
                      className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400 resize-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="px-6 py-4 border-t border-stone-100 flex gap-3">
              <button onClick={() => setPanel(null)} className="flex-1 border border-stone-200 rounded-xl py-2.5 text-sm font-bold hover:bg-stone-50 transition">Close</button>
              <button onClick={savePanel} disabled={saving}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition disabled:opacity-60"
                style={{ background: saving ? '#999' : G }}>
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
