'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const G    = '#1A3A28';
const GOLD = '#C9A040';

const REVENUE_7D = [
  { day: 'Apr 10', revenue: 3290,  orders: 2 },
  { day: 'Apr 11', revenue: 4100,  orders: 3 },
  { day: 'Apr 12', revenue: 1290,  orders: 1 },
  { day: 'Apr 13', revenue: 5270,  orders: 3 },
  { day: 'Apr 14', revenue: 1280,  orders: 1 },
  { day: 'Apr 15', revenue: 2700,  orders: 2 },
  { day: 'Apr 16', revenue: 1760,  orders: 1 },
];

const REVENUE_30D = Array.from({ length: 30 }, (_, i) => ({
  day: `Apr ${i + 1}`,
  revenue: 800 + Math.floor(Math.random() * 4000),
  orders:  1 + Math.floor(Math.random() * 5),
}));

const REVENUE_90D = Array.from({ length: 12 }, (_, i) => ({
  day: `Week ${i + 1}`,
  revenue: 5000 + Math.floor(Math.random() * 15000),
  orders:  5 + Math.floor(Math.random() * 20),
}));

const TOP_PRODUCTS = [
  { name: 'Cardamom 7mm+', revenue: 14400, units: 12 },
  { name: 'Black Pepper Bold', revenue: 9790, units: 11 },
  { name: 'Cloves Premium',   revenue: 6500, units: 10 },
  { name: 'Turmeric Powder',  revenue: 4200, units: 15 },
  { name: 'Cinnamon Sticks',  revenue: 3200, units: 10 },
];

const CATEGORY_MIX = [
  { name: 'Cardamom',  value: 38 },
  { name: 'Pepper',    value: 25 },
  { name: 'Cloves',    value: 17 },
  { name: 'Turmeric',  value: 12 },
  { name: 'Others',    value: 8  },
];

const GEO = [
  { state: 'Kerala',      orders: 12, revenue: 14800 },
  { state: 'Karnataka',   orders: 9,  revenue: 11200 },
  { state: 'Tamil Nadu',  orders: 7,  revenue: 9400  },
  { state: 'Telangana',   orders: 6,  revenue: 6300  },
  { state: 'Delhi',       orders: 4,  revenue: 5100  },
  { state: 'West Bengal', orders: 3,  revenue: 3800  },
];

const FUNNEL = [
  { stage: 'Visited',     value: 1280 },
  { stage: 'Product View',value: 640  },
  { stage: 'Add to Cart', value: 310  },
  { stage: 'Checkout',    value: 95   },
  { stage: 'Ordered',     value: 58   },
];

const PIE_COLORS = [G, GOLD, '#E07B39', '#5B8C5A', '#9B6B4B', '#C5A880'];

type Range = '7d' | '30d' | '90d';

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<Range>('7d');

  const chartData = range === '7d' ? REVENUE_7D : range === '30d' ? REVENUE_30D : REVENUE_90D;
  const totalRevenue = chartData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders  = chartData.reduce((s, d) => s + d.orders, 0);
  const avgOrder     = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Analytics</h1>
        <p className="text-stone-500 text-sm mt-1">Sales trends, product performance and customer insights</p>
      </div>

      {/* Period KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Revenue',       value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: '💰', color: 'bg-green-50 text-green-700' },
          { label: 'Orders',        value: totalOrders,  icon: '📦', color: 'bg-blue-50 text-blue-700' },
          { label: 'Avg Order Value',value: `₹${avgOrder.toLocaleString('en-IN')}`, icon: '📊', color: 'bg-amber-50 text-amber-700' },
          { label: 'Repeat Buyers', value: '62%',        icon: '🔄', color: 'bg-purple-50 text-purple-700' },
        ].map(s => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4`}>
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-2xl font-extrabold">{s.value}</p>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="font-bold text-stone-900 text-lg">Revenue & Orders</h2>
          <div className="flex gap-1.5">
            {(['7d','30d','90d'] as Range[]).map(r => (
              <button key={r} onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${range === r ? 'text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                style={range === r ? { background: G } : {}}>
                {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="rev" tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}`} />
            <YAxis yAxisId="ord" orientation="right" tick={{ fontSize: 11 }} />
            <Tooltip formatter={(val, name) => [name === 'revenue' ? `₹${val}` : String(val), name === 'revenue' ? 'Revenue' : 'Orders'] as [string, string]} />
            <Legend />
            <Line yAxisId="rev" type="monotone" dataKey="revenue" stroke={G}    strokeWidth={2.5} dot={false} name="revenue" />
            <Line yAxisId="ord" type="monotone" dataKey="orders"  stroke={GOLD} strokeWidth={2}   dot={false} name="orders" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Bar Chart */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-bold text-stone-900 text-lg mb-6">Top Products by Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TOP_PRODUCTS} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={120} />
              <Tooltip formatter={(v) => `₹${v}`} />
              <Bar dataKey="revenue" fill={G} radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Pie */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-bold text-stone-900 text-lg mb-6">Revenue by Category</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="55%" height={200}>
              <PieChart>
                <Pie data={CATEGORY_MIX} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {CATEGORY_MIX.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {CATEGORY_MIX.map((c, i) => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                  <span className="text-stone-700">{c.name}</span>
                  <span className="font-bold text-stone-900 ml-auto">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geography */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-bold text-stone-900 text-lg mb-4">Orders by State</h2>
          <div className="space-y-3">
            {GEO.map(g => {
              const pct = Math.round((g.orders / GEO[0].orders) * 100);
              return (
                <div key={g.state}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-stone-700 font-medium">{g.state}</span>
                    <span className="text-stone-500">{g.orders} orders · ₹{g.revenue.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: G }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-bold text-stone-900 text-lg mb-4">Conversion Funnel</h2>
          <div className="space-y-3">
            {FUNNEL.map((f, i) => {
              const pct = Math.round((f.value / FUNNEL[0].value) * 100);
              const convRate = i > 0 ? Math.round((f.value / FUNNEL[i - 1].value) * 100) : 100;
              return (
                <div key={f.stage}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-stone-700 font-medium">{f.stage}</span>
                    <span className="text-stone-500">{f.value.toLocaleString()} {i > 0 && <span className="text-orange-600">({convRate}%)</span>}</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: GOLD }} />
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-stone-400 mt-2">Overall conversion: {Math.round((FUNNEL[FUNNEL.length-1].value / FUNNEL[0].value) * 100 * 10) / 10}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
