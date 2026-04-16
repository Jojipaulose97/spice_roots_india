'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// Demo credentials — replace with real auth in production
const ADMIN_EMAIL    = 'admin@spicerootsindia.com';
const ADMIN_PASSWORD = 'SpiceAdmin@2026';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === ADMIN_EMAIL.toLowerCase() && cleanPassword === ADMIN_PASSWORD) {
      // Store a simple session flag (replace with proper JWT/session in production)
      sessionStorage.setItem('admin_authenticated', 'true');
      router.push('/admin');
    } else {
      setError('Invalid email or password. Check your credentials and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e0b] flex">
      {/* ── Left: Branding Panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden p-12">
        {/* Background image */}
        <Image
          src="https://picsum.photos/seed/farm/800/1200"
          alt="Spice Farm"
          fill
          className="object-cover opacity-30"
          sizes="45vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-stone-900/70 to-orange-950/60" />

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="text-2xl font-extrabold text-orange-500 tracking-tight">
            Spice Roots India
          </Link>
          <p className="text-stone-500 text-sm mt-1">Admin Control Panel</p>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Manage your<br />
            <span className="text-orange-400">spice empire</span><br />
            from one place.
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
            Full visibility over orders, inventory, revenue, customers, and product catalogue.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { label: 'Total Orders',    value: '4,821' },
              { label: 'Revenue (MTD)',   value: '₹4.5L'  },
              { label: 'Products',        value: '12'     },
              { label: 'Active Customers',value: '1,240'  },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-xl font-extrabold text-orange-400">{s.value}</p>
                <p className="text-xs text-stone-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="relative z-10 text-xs text-stone-600">
          &copy; {new Date().getFullYear()} Spice Roots India · Restricted Access
        </p>
      </div>

      {/* ── Right: Login Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-2xl font-extrabold text-orange-500">Spice Roots India</Link>
            <p className="text-stone-500 text-sm mt-1">Admin Panel</p>
          </div>

          {/* Card */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl">
            <div className="mb-8">
              <div className="w-14 h-14 bg-orange-600/10 border border-orange-600/20 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1">Admin Sign In</h2>
              <p className="text-stone-500 text-sm">Enter your credentials to access the dashboard.</p>
            </div>

            {/* Error Banner */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 flex items-start gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@spicerootsindia.com"
                  className="w-full bg-stone-800 border border-stone-700 focus:border-orange-500 text-white placeholder-stone-600 rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-stone-800 border border-stone-700 focus:border-orange-500 text-white placeholder-stone-600 rounded-xl px-4 py-3 pr-12 text-sm outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition"
                  >
                    {showPass ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me row */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-orange-600 w-4 h-4"/>
                  <span className="text-stone-400 text-sm">Remember me</span>
                </label>
                <button type="button" className="text-orange-500 text-sm hover:text-orange-400 transition">
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-900/30 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In to Dashboard
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Hint for demo */}
            <div className="mt-6 bg-stone-800/60 border border-stone-700 rounded-xl p-4 text-xs text-stone-500 space-y-1">
              <p className="font-semibold text-stone-400 mb-1.5">Demo Credentials</p>
              <p>📧 <span className="text-stone-300">admin@spicerootsindia.com</span></p>
              <p>🔒 <span className="text-stone-300">SpiceAdmin@2026</span></p>
            </div>
          </div>

          <p className="text-center text-xs text-stone-600 mt-6">
            <Link href="/" className="hover:text-orange-500 transition">← Back to Storefront</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
