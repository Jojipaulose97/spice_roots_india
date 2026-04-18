'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar,
} from 'recharts';

const G = '#1A3A28';
const GOLD = '#C9A040';

/* ── Mock data ── */
const REVENUE_7D = [
  { date: 'Apr 12', revenue: 28400, orders: 34 },
  { date: 'Apr 13', revenue: 31200, orders: 38 },
  { date: 'Apr 14', revenue: 24800, orders: 29 },
  { date: 'Apr 15', revenue: 42100, orders: 51 },
  { date: 'Apr 16', revenue: 38600, orders: 47 },
  { date: 'Apr 17', revenue: 51200, orders: 62 },
  { date: 'Apr 18', revenue: 45200, orders: 55 },
];
const REVENUE_30D = Array.from({ length: 30 }, (_, i) => ({
  date: `Apr ${i + 1 > 18 ? 'Mar ' + (i - 17) : i + 1 < 10 ? 'Apr 0' + (i + 1) : 'Apr ' + (i + 1)}`,
  revenue: 18000 + Math.floor(Math.random() * 40000),
  orders: 20 + Math.floor(Math.random() * 60),
}));
const REVENUE_90D = Array.from({ length: 12 }, (_, i) => ({
  date: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  revenue: 280000 + Math.floor(Math.random() * 400000),
  orders: 300 + Math.floor(Math.random() * 600),
})).slice(0, 12);

const RECENT_ORDERS = [
  { id: '#SR-4821', customer: 'Priya Menon',    location: 'Kochi',     items: 2, total: 900,   status: 'Shipped',    time: '2 min ago' },
  { id: '#SR-4820', customer: 'Rahul Sharma',   location: 'Delhi',     items: 2, total: 870,   status: 'Processing', time: '14 min ago' },
  { id: '#SR-4819', customer: 'Anitha K.',       location: 'Bengaluru', items: 1, total: 1499,  status: 'Delivered',  time: '1 hr ago' },
  { id: '#SR-4818', customer: 'Ravi Pillai',     location: 'Chennai',   items: 3, total: 540,   status: 'Packed',     time: '2 hr ago' },
  { id: '#SR-4817', customer: 'Sara Thomas',     location: 'Mumbai',    items: 1, total: 380,   status: 'Confirmed',  time: '3 hr ago' },
  { id: '#SR-4816', customer: 'James Roy',       location: 'Pune',      items: 1, total: 2499,  status: 'Delivered',  time: '5 hr ago' },
  { id: '#SR-4815', customer: 'Meera Nair',      location: 'Thrissur',  items: 4, total: 1280,  status: 'Shipped',    time: '6 hr ago' },
  { id: '#SR-4814', customer: 'Arjun Singh',     location: 'Jaipur',    items: 2, total: 760,   status: 'Pending',    time: '8 hr ago' },
];

const LOW_STOCK = [
  { name: 'Clove Buds (Idukki)',  sku: 'SRI-CLV-001', stock: 7,  reorder: 50 },
  { name: 'Wayanad Coffee 500g',  sku: 'SRI-COF-003', stock: 3,  reorder: 30 },
  { name: 'Kerala Gift Hamper L', sku: 'SRI-GFT-002', stock: 5,  reorder: 20 },
  { name: 'Star Anise 50g',       sku: 'SRI-STA-001', stock: 0,  reorder: 40 },
];

const TOP_PRODUCTS = [
  { name: 'Green Cardamom 8mm', units: 423, revenue: 190350, pct: 100 },
  { name: 'Tellicherry Pepper',  units: 210, revenue: 67200,  pct: 50  },
  { name: 'Ceylon Cinnamon',     units: 188, revenue: 103400, pct: 44  },
  { name: 'Wayanad Coffee',      units: 143, revenue: 54340,  pct: 34  },
  { name: 'Clove Buds',          units: 119, revenue: 33320,  pct: 28  },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  Pending:    { bg: '#FEF3C7', color: '#92400E' },
  Confirmed:  { bg: '#DBEAFE', color: '#1E40AF' },
  Packed:     { bg: '#EDE9FE', color: '#5B21B6' },
  Shipped:    { bg: '#CCFBF1', color: '#065F46' },
  Processing: { bg: '#FEF9C3', color: '#713F12' },
  Delivered:  { bg: '#D1FAE5', color: '#065F46' },
  Cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
};

function KPI({ label, value, sub, trend, icon, subColor }: { label: string; value: string; sub: string; trend?: 'up'|'down'|'neutral'; icon: string; subColor?: string }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 20, border: '1px solid #F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{icon}</div>
        {trend && (
          <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: 9999, backgroundColor: trend === 'up' ? '#D1FAE5' : trend === 'down' ? '#FEE2E2' : '#F3F4F6', color: trend === 'up' ? '#065F46' : trend === 'down' ? '#991B1B' : '#6B7280' }}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—'} {sub}
          </span>
        )}
      </div>
      <p style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', marginBottom: 2 }}>{value}</p>
      <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
      {!trend && <p style={{ fontSize: '0.75rem', marginTop: 4, fontWeight: 500, color: subColor ?? '#6B7280' }}>{sub}</p>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: '0.8rem' }}>
      <p style={{ fontWeight: 700, color: '#111827', marginBottom: 6 }}>{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.dataKey === 'revenue' ? `₹${p.value.toLocaleString('en-IN')}` : `${p.value} orders`}
        </p>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState<'7d'|'30d'|'90d'>('7d');

  const chartData = period === '7d' ? REVENUE_7D : period === '30d' ? REVENUE_30D : REVENUE_90D;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ color: '#6B7280', fontSize: '0.85rem' }}>Friday, 18 April 2026</p>
          <h1 style={{ fontWeight: 900, fontSize: '1.6rem', color: G }}>Good morning, Admin 👋</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/admin/orders?status=pending" style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #E5E7EB', backgroundColor: '#fff', color: '#374151', fontWeight: 600, fontSize: '0.8rem', padding: '8px 14px', borderRadius: 10, textDecoration: 'none' }} className="hover:bg-stone-50 transition">View Pending</Link>
          <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: G, color: '#fff', fontWeight: 700, fontSize: '0.8rem', padding: '8px 14px', borderRadius: 10, textDecoration: 'none' }} className="hover:opacity-90 transition">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
            Add Product
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <KPI label="Today's Orders" value="142" sub="8.5% vs yesterday" trend="up" icon="📦"/>
        <KPI label="Revenue Today"  value="₹45,200" sub="12.5% vs yesterday" trend="up" icon="💰"/>
        <KPI label="Total Customers" value="1,240" sub="+38 this month" icon="👥" subColor="#2563EB"/>
        <KPI label="Pending Orders" value="38" sub="Needs action now" icon="⏳" subColor="#DC2626"/>
      </div>

      {/* Revenue Chart */}
      <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: 24, border: '1px solid #F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontWeight: 800, color: '#111827', fontSize: '1rem' }}>Revenue & Orders</h2>
            <p style={{ fontSize: '1.6rem', fontWeight: 900, color: G }}>₹45.2L <span style={{ fontSize: '0.9rem', color: '#16A34A', fontWeight: 600 }}>↑ 18.4%</span></p>
          </div>
          <div style={{ display: 'flex', gap: 4, backgroundColor: '#F9FAFB', borderRadius: 10, padding: 4 }}>
            {(['7d','30d','90d'] as const).map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{ padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', backgroundColor: period === p ? '#fff' : 'transparent', color: period === p ? G : '#6B7280', boxShadow: period === p ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6"/>
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={false}/>
            <YAxis yAxisId="revenue" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} width={48}/>
            <YAxis yAxisId="orders" orientation="right" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={false} width={32}/>
            <Tooltip content={<CustomTooltip/>}/>
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.78rem' }}/>
            <Line yAxisId="revenue" type="monotone" dataKey="revenue" stroke={G} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} name="Revenue"/>
            <Line yAxisId="orders"  type="monotone" dataKey="orders"  stroke={GOLD} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} name="Orders"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders + Low Stock */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>

        {/* Recent Orders */}
        <div style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Recent Orders</h2>
            <Link href="/admin/orders" style={{ fontSize: '0.75rem', color: G, fontWeight: 700, textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB' }}>
                  {['Order', 'Customer', 'Total', 'Status', 'Time'].map(h => (
                    <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontWeight: 600, color: '#6B7280', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o, i) => {
                  const s = STATUS_STYLES[o.status] ?? STATUS_STYLES.Pending;
                  return (
                    <tr key={o.id} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#FAFAFA', borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '10px 16px', fontWeight: 700, color: G, whiteSpace: 'nowrap' }}>{o.id}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <p style={{ fontWeight: 600, color: '#111827', whiteSpace: 'nowrap' }}>{o.customer}</p>
                        <p style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>{o.location}</p>
                      </td>
                      <td style={{ padding: '10px 16px', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>₹{o.total.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ ...s, padding: '3px 10px', borderRadius: 9999, fontWeight: 700, fontSize: '0.7rem', whiteSpace: 'nowrap' }}>{o.status}</span>
                      </td>
                      <td style={{ padding: '10px 16px', color: '#9CA3AF', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{o.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock + Top Products (right column) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Low Stock */}
          <div style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #FEE2E2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 18 }}>🚨</span>
              <h2 style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem' }}>Low Stock Alert</h2>
              <span style={{ marginLeft: 'auto', backgroundColor: '#FEE2E2', color: '#991B1B', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: 9999 }}>{LOW_STOCK.filter(p => p.stock === 0).length} out of stock</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {LOW_STOCK.map(p => (
                <div key={p.sku} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 10, border: p.stock === 0 ? '1px solid #FCA5A5' : '1px solid #FED7AA', backgroundColor: p.stock === 0 ? '#FFF5F5' : '#FFFBEB' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: '#111827', fontSize: '0.82rem' }}>{p.name}</p>
                    <p style={{ fontSize: '0.68rem', color: '#9CA3AF', fontFamily: 'monospace' }}>{p.sku}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 900, fontSize: '1.2rem', color: p.stock === 0 ? '#DC2626' : '#D97706' }}>{p.stock}</p>
                      <p style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>units left</p>
                    </div>
                    <Link href="/admin/inventory" style={{ fontSize: '0.72rem', fontWeight: 700, color: G, backgroundColor: '#F0FDF4', padding: '4px 10px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}>Restock</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 20 }}>
            <h2 style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem', marginBottom: 14 }}>Top Products This Month</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TOP_PRODUCTS.map((p, i) => (
                <div key={p.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 800, color: '#D1D5DB', fontSize: '0.7rem', width: 14 }}>#{i + 1}</span>
                      <p style={{ fontWeight: 600, color: '#111827', fontSize: '0.82rem' }}>{p.name}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.78rem', color: G }}>₹{(p.revenue/1000).toFixed(0)}k</p>
                      <p style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{p.units} units</p>
                    </div>
                  </div>
                  <div style={{ height: 5, backgroundColor: '#F3F4F6', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p.pct}%`, backgroundColor: i === 0 ? G : GOLD, borderRadius: 9999 }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ backgroundColor: '#fff', borderRadius: 16, border: '1px solid #F3F4F6', padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontWeight: 800, color: '#111827', fontSize: '0.95rem', marginBottom: 14 }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { label: 'Add New Product',        href: '/admin/products',  icon: '📦', bg: G,       color: '#fff' },
            { label: 'View Pending Orders',    href: '/admin/orders',    icon: '⏳', bg: '#FFFBEB', color: '#92400E' },
            { label: 'Create Coupon',          href: '/admin/coupons',   icon: '🏷️', bg: '#EFF6FF', color: '#1E40AF' },
            { label: 'Inventory Control',      href: '/admin/inventory', icon: '📊', bg: '#F0FDF4', color: '#065F46' },
            { label: 'View Analytics',         href: '/admin/analytics', icon: '📈', bg: '#FAF5FF', color: '#5B21B6' },
          ].map(a => (
            <Link key={a.label} href={a.href} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12, backgroundColor: a.bg, color: a.color, fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none', border: '1px solid transparent', transition: 'all 0.15s' }} className="hover:opacity-90 hover:scale-105">
              <span>{a.icon}</span>{a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
