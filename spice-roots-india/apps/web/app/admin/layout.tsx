'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>,
  },
  {
    href: '/admin/orders',
    label: 'Orders',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>,
  },
  {
    href: '/admin/products',
    label: 'Products',
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Login page gets NO sidebar — render bare
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    router.push('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-stone-100 font-sans text-stone-900">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-stone-800 gap-3">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Spice Roots</p>
            <p className="text-stone-500 text-xs">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-1 px-3">
          {NAV.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-xl transition flex items-center gap-3 text-sm font-medium ${
                  active
                    ? 'bg-orange-600 text-white'
                    : 'text-stone-400 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <span className={active ? 'text-white' : 'text-stone-500'}>{item.icon}</span>
                {item.label}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-stone-800 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0">A</div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">Administrator</p>
              <p className="text-stone-500 text-xs truncate">admin@spicerootsindia.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-stone-500 hover:text-red-400 text-xs font-medium py-2 px-2 rounded-lg hover:bg-stone-800 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-stone-200 px-8 flex items-center justify-between shadow-sm shrink-0">
          <div>
            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">
              {NAV.find(n => n.href === pathname)?.label ?? 'Admin'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-xs text-stone-500 hover:text-orange-600 transition flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              View Store
            </Link>
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">A</div>
          </div>
        </header>
        <div className="p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
