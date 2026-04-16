'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ── Tiny reusable card ── */
function StatCard({ label, value, sub, subColor, icon, trend }: {
  label: string; value: string; sub: string;
  subColor: string; icon: React.ReactNode; trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">{icon}</div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-700' : trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-500'}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '─'} {sub.split(' ')[0]}
          </span>
        )}
      </div>
      <p className="text-3xl font-extrabold text-stone-900 mb-1">{value}</p>
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{label}</p>
      {!trend && <p className={`text-xs mt-1.5 font-medium ${subColor}`}>{sub}</p>}
    </div>
  );
}

/* ── Sparkline (SVG) ── */
function Sparkline({ vals, color }: { vals: number[]; color: string }) {
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const W = 120; const H = 40;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * W;
    const y = H - ((v - min) / (max - min || 1)) * H * 0.9;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={W} height={H} className="overflow-visible">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx={pts.split(' ').at(-1)?.split(',')[0]} cy={pts.split(' ').at(-1)?.split(',')[1]} r="3" fill={color}/>
    </svg>
  );
}

const RECENT_ORDERS = [
  { id: '#SR-4821', customer: 'Priya Menon',    location: 'Kochi',     items: 'Green Cardamom × 2', total: '₹900',   status: 'Shipped',    statusColor: 'bg-blue-100 text-blue-700',   time: '2 min ago' },
  { id: '#SR-4820', customer: 'Rahul Sharma',   location: 'Delhi',     items: 'Pepper + Cinnamon',  total: '₹870',   status: 'Processing', statusColor: 'bg-amber-100 text-amber-700',  time: '14 min ago' },
  { id: '#SR-4819', customer: 'Anitha K.',       location: 'Bengaluru', items: 'Gift Hamper (S)',    total: '₹1,499', status: 'Delivered',  statusColor: 'bg-green-100 text-green-700', time: '1 hr ago' },
  { id: '#SR-4818', customer: 'Ravi Pillai',     location: 'Chennai',   items: 'Turmeric × 3',      total: '₹540',   status: 'Shipped',    statusColor: 'bg-blue-100 text-blue-700',  time: '2 hr ago' },
  { id: '#SR-4817', customer: 'Sara Thomas',     location: 'Mumbai',    items: 'Wayanad Coffee',     total: '₹380',   status: 'Processing', statusColor: 'bg-amber-100 text-amber-700', time: '3 hr ago' },
  { id: '#SR-4816', customer: 'James Roy',       location: 'Pune',      items: 'Spice Box Premium',  total: '₹2,499', status: 'Delivered',  statusColor: 'bg-green-100 text-green-700', time: '5 hr ago' },
];

const TOP_SELLING = [
  { name: 'Green Cardamom 8mm', units: 423, revenue: '₹1,90,350', img: 'https://picsum.photos/seed/cardamom/100/100', stock: 82, trend: [40,55,70,60,85,90,100] },
  { name: 'Tellicherry Pepper',  units: 210, revenue: '₹67,200',   img: 'https://picsum.photos/seed/pepper/100/100',   stock: 44, trend: [30,40,35,50,45,65,70] },
  { name: 'Ceylon Cinnamon',     units: 188, revenue: '₹1,03,400', img: 'https://picsum.photos/seed/cinnamon/100/100', stock: 61, trend: [20,25,40,35,55,60,65] },
  { name: 'Wayanad Coffee',      units: 143, revenue: '₹54,340',   img: 'https://picsum.photos/seed/coffee/100/100',   stock: 29, trend: [10,20,30,25,40,50,55] },
  { name: 'Clove Buds (Idukki)', units: 119, revenue: '₹33,320',   img: 'https://picsum.photos/seed/cloves/100/100',   stock: 67, trend: [15,18,22,20,35,42,48] },
];

const REVENUE_POINTS = [38000,42000,35000,51000,47000,63000,58000,72000,68000,80000,77000,90000,85000,95000,92000,105000,98000,112000,108000,121000,115000,130000,128000,142000,138000,151000,145000,160000,155000,165000];

export default function AdminDashboard() {
  const [tab, setTab] = useState<'all' | 'processing' | 'shipped' | 'delivered'>('all');
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  const filteredOrders = tab === 'all'
    ? RECENT_ORDERS
    : RECENT_ORDERS.filter(o => o.status.toLowerCase() === tab);

  const revenueSlice = period === '7d' ? REVENUE_POINTS.slice(-7) : period === '30d' ? REVENUE_POINTS : REVENUE_POINTS;
  const maxRev = Math.max(...revenueSlice);
  const minRev = Math.min(...revenueSlice);

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-stone-500 text-sm font-medium">Good morning, Admin 👋</p>
          <h1 className="text-3xl font-extrabold text-stone-900">Dashboard</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/new" className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition shadow">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            Add Product
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-2 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 font-semibold px-4 py-2.5 rounded-xl text-sm transition">
            View Orders
          </Link>
        </div>
      </div>

      {/* ── 4 Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Today's Revenue" value="₹45,200" sub="12.5% vs yesterday" subColor="text-green-600" trend="up"
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
        />
        <StatCard
          label="Today's Orders" value="142" sub="↑ 8 from yesterday" subColor="text-stone-500" trend="up"
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>}
        />
        <StatCard
          label="Pending Fulfillment" value="38" sub="Needs action today" subColor="text-amber-600" trend="neutral"
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
        />
        <StatCard
          label="Low Stock Items" value="3" sub="Restock required" subColor="text-red-500" trend="down"
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>}
        />
      </div>

      {/* ── Revenue Chart + Top Selling ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="font-bold text-stone-900 text-lg">Revenue Trend</h2>
              <p className="text-3xl font-extrabold text-stone-900 mt-1">₹45.2L <span className="text-green-500 text-base font-semibold">↑ 18.4%</span></p>
            </div>
            <div className="flex gap-2 bg-stone-100 rounded-xl p-1">
              {(['7d', '30d', '90d'] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${period === p ? 'bg-white shadow text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}>
                  {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart */}
          <div className="h-56 w-full relative">
            <svg viewBox="0 0 600 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ea580c" stopOpacity="0.25"/>
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0.25, 0.5, 0.75, 1].map(p => (
                <line key={p} x1="0" y1={p * 200} x2="600" y2={p * 200} stroke="#e7e5e4" strokeWidth="1"/>
              ))}
              {/* Area */}
              <path
                d={`M${revenueSlice.map((v, i) => `${(i / (revenueSlice.length - 1)) * 600},${180 - ((v - minRev) / (maxRev - minRev || 1)) * 170}`).join(' L')} L600,200 L0,200 Z`}
                fill="url(#revGrad)"
              />
              {/* Line */}
              <polyline
                points={revenueSlice.map((v, i) => `${(i / (revenueSlice.length - 1)) * 600},${180 - ((v - minRev) / (maxRev - minRev || 1)) * 170}`).join(' ')}
                fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinejoin="round"
              />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-stone-400 pb-1">
              {(period === '7d'
                ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
                : ['Mar 17','Mar 24','Mar 31','Apr 7','Apr 14','Apr 16']
              ).map((l, i) => <span key={i}>{l}</span>)}
            </div>
          </div>
        </div>

        {/* Top Selling */}
        <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
          <h2 className="font-bold text-stone-900 text-lg mb-5">Top Products</h2>
          <div className="space-y-5">
            {TOP_SELLING.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span className="text-xs font-extrabold text-stone-300 w-4 shrink-0">{i + 1}</span>
                <div className="relative w-10 h-10 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                  <Image src={item.img} alt={item.name} fill className="object-cover" sizes="40px"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-xs truncate">{item.name}</p>
                  <p className="text-xs text-stone-400">{item.units} units · {item.revenue}</p>
                  <div className="h-1.5 bg-stone-100 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(item.units / 423) * 100}%` }}/>
                  </div>
                </div>
                <Sparkline vals={item.trend} color={item.stock < 35 ? '#ef4444' : '#22c55e'}/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category Revenue Breakdown ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { cat: 'Whole Spices', rev: '₹2,85,400', pct: 63, color: 'bg-orange-500' },
          { cat: 'Powders',      rev: '₹72,100',   pct: 16, color: 'bg-amber-400' },
          { cat: 'Tea & Coffee', rev: '₹54,200',   pct: 12, color: 'bg-stone-600' },
          { cat: 'Gift Hampers', rev: '₹40,500',   pct: 9,  color: 'bg-rose-400'  },
        ].map(c => (
          <div key={c.cat} className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">{c.cat}</p>
              <span className="text-xs font-bold text-stone-900">{c.pct}%</span>
            </div>
            <p className="text-xl font-extrabold text-stone-900 mb-3">{c.rev}</p>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.pct}%` }}/>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Orders Table ── */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 flex items-center justify-between flex-wrap gap-4 border-b border-stone-100">
          <h2 className="font-bold text-stone-900 text-lg">Recent Orders</h2>
          <div className="flex gap-1 bg-stone-100 rounded-xl p-1">
            {(['all', 'processing', 'shipped', 'delivered'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${tab === t ? 'bg-white shadow text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 text-stone-500 text-xs uppercase font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">Items</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left hidden lg:table-cell">Time</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-stone-50 transition">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-orange-600">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-stone-900 text-sm">{order.customer}</p>
                    <p className="text-xs text-stone-400">{order.location}</p>
                  </td>
                  <td className="px-6 py-4 text-xs text-stone-600 hidden md:table-cell">{order.items}</td>
                  <td className="px-6 py-4 font-bold text-stone-900 text-sm">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${order.statusColor}`}>{order.status}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-stone-400 hidden lg:table-cell">{order.time}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs text-orange-600 font-semibold hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-stone-100 flex justify-between items-center">
          <p className="text-xs text-stone-400">Showing {filteredOrders.length} of {RECENT_ORDERS.length} orders</p>
          <Link href="/admin/orders" className="text-xs text-orange-600 font-semibold hover:underline">View all orders →</Link>
        </div>
      </div>

      {/* ── Low Stock Alert ── */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <h2 className="font-bold text-red-800">🚨 Low Stock Alert</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: 'Clove Buds (Idukki)', stock: 7,  sku: 'SRI-CLV-001' },
            { name: 'Wayanad Coffee 500g',  stock: 3,  sku: 'SRI-COF-003' },
            { name: 'Kerala Gift Hamper L', stock: 5,  sku: 'SRI-GFT-002' },
          ].map(item => (
            <div key={item.name} className="bg-white border border-red-200 rounded-xl p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-stone-900 text-sm">{item.name}</p>
                <p className="text-xs text-stone-400 font-mono">{item.sku}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-extrabold text-red-600">{item.stock}</p>
                <p className="text-xs text-red-400 font-medium">units left</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
