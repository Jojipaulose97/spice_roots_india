'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const G = '#1A3A28';   // brand green
const GOLD = '#C9A040'; // brand gold

type NavItem = { href: string; label: string; exact?: boolean; badge?: number; icon: React.ReactNode };

const Icon = ({ d, d2 }: { d: string; d2?: string }) => (
  <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d}/>
    {d2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={d2}/>}
  </svg>
);

const NAV: NavItem[] = [
  { href:'/admin',               exact:true, label:'Dashboard',     icon:<Icon d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/> },
  { href:'/admin/orders',        label:'Orders',         badge:5,  icon:<Icon d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/> },
  { href:'/admin/products',      label:'Products',              icon:<Icon d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/> },
  { href:'/admin/inventory',     label:'Inventory',             icon:<Icon d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/> },
  { href:'/admin/customers',     label:'Customers',             icon:<Icon d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/> },
  { href:'/admin/analytics',     label:'Analytics',             icon:<Icon d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/> },
  { href:'/admin/coupons',       label:'Coupons',               icon:<Icon d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"/> },
  { href:'/admin/reviews',       label:'Reviews',               icon:<Icon d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/> },
  { href:'/admin/notifications', label:'Notifications', badge:3, icon:<Icon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/> },
  { href:'/admin/settings',      label:'Settings',              icon:<Icon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" d2="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/> },
];

const MOBILE_NAV = ['/admin', '/admin/orders', '/admin/products', '/admin/customers', '/admin/notifications'];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const router    = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [avatarOpen, setAvatarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin_sidebar_collapsed');
    if (saved) setCollapsed(saved === 'true');
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('admin_sidebar_collapsed', String(next));
  };

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const currentLabel = NAV.find(n => isActive(n))?.label ?? 'Admin';

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') return <>{children}</>;

  const SidebarItem = ({ item }: { item: NavItem }) => {
    const active = isActive(item);
    return (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: collapsed ? '10px 0' : '10px 14px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: '10px', margin: '1px 0', position: 'relative',
          borderLeft: active ? `3px solid ${GOLD}` : '3px solid transparent',
          backgroundColor: active ? 'rgba(201,160,64,0.12)' : 'transparent',
          color: active ? '#fff' : 'rgba(255,255,255,0.65)',
          fontWeight: active ? 700 : 400, fontSize: '0.875rem',
          transition: 'all 0.15s', textDecoration: 'none',
        }}
        className="hover:text-white hover:bg-white/10"
      >
        <span style={{ color: active ? GOLD : 'inherit' }}>{item.icon}</span>
        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
        {!collapsed && item.badge ? (
          <span style={{ backgroundColor: GOLD, color: G, fontSize: '0.65rem', fontWeight: 800, borderRadius: '9999px', padding: '1px 6px', minWidth: '18px', textAlign: 'center' }}>
            {item.badge}
          </span>
        ) : null}
        {collapsed && item.badge ? (
          <span style={{ position: 'absolute', top: 4, right: 4, backgroundColor: GOLD, color: G, fontSize: '0.55rem', fontWeight: 800, borderRadius: '9999px', padding: '0 4px', minWidth: '14px', textAlign: 'center' }}>
            {item.badge}
          </span>
        ) : null}
      </Link>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#F8F9FA' }}>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)}/>
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          width: collapsed ? 64 : 240, backgroundColor: G,
          display: 'flex', flexDirection: 'column', flexShrink: 0,
          transition: 'width 0.2s ease', position: 'relative', zIndex: 30,
          overflowY: 'auto', overflowX: 'hidden',
        }}
        className="hidden md:flex"
      >
        {/* Logo */}
        <div style={{ padding: collapsed ? '20px 0' : '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10, justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 18 }}>🌿</span>
          </div>
          {!collapsed && (
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', lineHeight: 1 }}>Spice Roots</p>
              <p style={{ color: GOLD, fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: collapsed ? '12px 6px' : '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV.map(item => <SidebarItem key={item.href} item={item}/>)}
        </nav>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: collapsed ? '12px 6px' : '12px 10px' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: GOLD, color: G, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>A</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Administrator</p>
                <span style={{ backgroundColor: 'rgba(201,160,64,0.2)', color: GOLD, fontSize: '0.6rem', fontWeight: 700, padding: '1px 6px', borderRadius: 9999, letterSpacing: '0.05em' }}>SUPER ADMIN</span>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, justifyContent: collapsed ? 'center' : 'flex-start', padding: '8px 10px', borderRadius: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}
            className="hover:bg-red-500/20 hover:text-red-300! transition"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={toggleCollapse}
          style={{ position: 'absolute', top: 72, right: -12, width: 24, height: 24, borderRadius: '50%', backgroundColor: G, border: `2px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
        >
          <svg style={{ width: 10, height: 10, color: GOLD, transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
      </aside>

      {/* ── Mobile Slide Sidebar ── */}
      <aside
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: 260,
          backgroundColor: G, zIndex: 50, transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease', display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}
        className="md:hidden"
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 18 }}>🌿</span></div>
            <div>
              <p style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>Spice Roots</p>
              <p style={{ color: GOLD, fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} style={{ color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 22 }}>×</button>
        </div>
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {NAV.map(item => <SidebarItem key={item.href} item={item}/>)}
        </nav>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 10px' }}>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }} className="hover:text-red-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Top Header */}
        <header style={{ height: 64, backgroundColor: '#fff', borderBottom: '1px solid #E5E7EB', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(true)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
            <svg className="w-6 h-6 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          {/* Page title */}
          <div className="hidden md:block">
            <h1 style={{ fontWeight: 800, fontSize: '1.15rem', color: G }}>{currentLabel}</h1>
          </div>

          <div style={{ flex: 1 }}/>

          {/* Global search */}
          <div className="hidden sm:flex" style={{ position: 'relative' }}>
            <svg className="w-4 h-4" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search orders, customers…" style={{ paddingLeft: 32, paddingRight: 12, paddingTop: 7, paddingBottom: 7, border: '1px solid #E5E7EB', borderRadius: 10, fontSize: '0.8rem', outline: 'none', width: 220, backgroundColor: '#F9FAFB' }}/>
          </div>

          {/* Notification bell */}
          <Link href="/admin/notifications" style={{ position: 'relative', padding: 8, borderRadius: 10, display: 'flex', alignItems: 'center', color: '#6B7280', textDecoration: 'none' }} className="hover:bg-stone-100 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            <span style={{ position: 'absolute', top: 4, right: 4, backgroundColor: '#EF4444', color: '#fff', fontSize: '0.55rem', fontWeight: 800, borderRadius: 9999, padding: '1px 4px', minWidth: 14, textAlign: 'center' }}>3</span>
          </Link>

          {/* Quick add */}
          <Link href="/admin/products" style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: G, color: '#fff', fontWeight: 700, fontSize: '0.78rem', padding: '8px 14px', borderRadius: 10, textDecoration: 'none', flexShrink: 0 }} className="hidden sm:flex hover:opacity-90 transition">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
            New Product
          </Link>

          {/* Avatar dropdown */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setAvatarOpen(!avatarOpen)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: 10 }} className="hover:bg-stone-100 transition">
              <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: G, color: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>A</div>
              <span className="hidden md:block" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>Admin</span>
              <svg className="w-3.5 h-3.5 text-stone-400 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
            </button>
            {avatarOpen && (
              <div style={{ position: 'absolute', right: 0, top: '110%', width: 180, backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.12)', zIndex: 100, overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid #F3F4F6' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.82rem', color: '#111827' }}>Administrator</p>
                  <p style={{ fontSize: '0.72rem', color: '#6B7280' }}>admin@spicerootsindia.com</p>
                </div>
                <Link href="/admin/settings" onClick={() => setAvatarOpen(false)} style={{ display: 'block', padding: '9px 14px', fontSize: '0.82rem', color: '#374151', textDecoration: 'none' }} className="hover:bg-stone-50">Profile Settings</Link>
                <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '9px 14px', fontSize: '0.82rem', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }} className="hover:bg-red-50">Sign Out</button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
          {children}
        </div>
      </div>

      {/* ── Mobile bottom tab ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30" style={{ backgroundColor: '#fff', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-around', padding: '8px 0' }}>
        {NAV.filter(n => MOBILE_NAV.includes(n.href)).map(item => {
          const active = isActive(item);
          return (
            <Link key={item.href} href={item.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none', color: active ? G : '#9CA3AF', position: 'relative', minWidth: 56 }}>
              <span style={{ color: active ? G : '#9CA3AF' }}>{item.icon}</span>
              <span style={{ fontSize: '0.6rem', fontWeight: active ? 700 : 400 }}>{item.label}</span>
              {active && <span style={{ position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', width: 24, height: 3, backgroundColor: G, borderRadius: '0 0 3px 3px' }}/>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
