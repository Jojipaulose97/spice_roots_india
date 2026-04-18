'use client';

import { useState, useEffect } from 'react';

const LS_KEY = 'sri_admin_users';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isActive: boolean;
  orders: number;
  totalSpent: number;
  createdAt: string;
}

const SEED: AdminUser[] = [
  { id: '1', name: 'Priya Menon',   email: 'priya@example.com',   phone: '+91 98401 00001', role: 'user',  isActive: true,  orders: 5,  totalSpent: 4200,  createdAt: '2026-01-10T10:00:00Z' },
  { id: '2', name: 'Rahul Sharma',  email: 'rahul@example.com',   phone: '+91 98401 00002', role: 'user',  isActive: true,  orders: 3,  totalSpent: 2610,  createdAt: '2026-01-22T10:00:00Z' },
  { id: '3', name: 'Anitha K.',     email: 'anitha@example.com',  phone: '+91 98401 00003', role: 'user',  isActive: true,  orders: 8,  totalSpent: 9800,  createdAt: '2026-02-05T10:00:00Z' },
  { id: '4', name: 'Ravi Pillai',   email: 'ravi@example.com',    phone: '+91 98401 00004', role: 'user',  isActive: false, orders: 1,  totalSpent: 540,   createdAt: '2026-02-18T10:00:00Z' },
  { id: '5', name: 'Sara Thomas',   email: 'sara@example.com',    phone: '+91 98401 00005', role: 'user',  isActive: true,  orders: 4,  totalSpent: 3280,  createdAt: '2026-03-01T10:00:00Z' },
  { id: '6', name: 'James Roy',     email: 'james@example.com',   phone: '+91 98401 00006', role: 'admin', isActive: true,  orders: 2,  totalSpent: 1800,  createdAt: '2026-03-12T10:00:00Z' },
  { id: '7', name: 'Administrator', email: 'admin@spicerootsindia.com', phone: '+91 95447 70078', role: 'admin', isActive: true, orders: 0, totalSpent: 0, createdAt: '2026-01-01T00:00:00Z' },
];

export default function AdminUsersPage() {
  const [users, setUsers]       = useState<AdminUser[]>([]);
  const [search, setSearch]     = useState('');
  const [roleFilter, setRole]   = useState<'all' | 'user' | 'admin'>('all');
  const [modal, setModal]       = useState<AdminUser | null>(null);
  const [saving, setSaving]     = useState(false);
  const [roleSaved, setRoleSaved] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    setUsers(raw ? JSON.parse(raw) : SEED);
    if (!raw) localStorage.setItem(LS_KEY, JSON.stringify(SEED));
  }, []);

  const persist = (list: AdminUser[]) => {
    setUsers(list); localStorage.setItem(LS_KEY, JSON.stringify(list));
  };

  const changeRole = (id: string, role: 'user' | 'admin') => {
    setSaving(true);
    setTimeout(() => {
      persist(users.map(u => u.id === id ? { ...u, role } : u));
      setSaving(false);
      setRoleSaved(id);
      setTimeout(() => setRoleSaved(null), 1500);
    }, 300);
  };

  const toggleActive = (id: string) => {
    persist(users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return (roleFilter === 'all' || u.role === roleFilter) &&
      (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  });

  const adminCount = users.filter(u => u.role === 'admin').length;
  const activeCount = users.filter(u => u.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Users</h1>
          <p className="text-stone-500 text-sm mt-1">{users.length} total · {adminCount} admin · {activeCount} active</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Users',    value: users.length,   color: 'bg-blue-50 text-blue-700',   icon: '👥' },
          { label: 'Admins',         value: adminCount,     color: 'bg-orange-50 text-orange-700',icon: '🛡️' },
          { label: 'Active',         value: activeCount,    color: 'bg-green-50 text-green-700',  icon: '✅' },
          { label: 'Total Revenue',  value: `₹${users.reduce((s, u) => s + u.totalSpent, 0).toLocaleString('en-IN')}`, color: 'bg-amber-50 text-amber-700', icon: '💰' },
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
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…" className="border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-400 transition w-72"/>
        <div className="flex gap-1.5">
          {(['all', 'user', 'admin'] as const).map(r => (
            <button key={r} onClick={() => setRole(r)} className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${roleFilter === r ? 'bg-orange-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>{r}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-stone-600">User</th>
              <th className="px-6 py-4 font-semibold text-stone-600 hidden md:table-cell">Phone</th>
              <th className="px-6 py-4 font-semibold text-stone-600 hidden lg:table-cell">Orders / Spent</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Role</th>
              <th className="px-6 py-4 font-semibold text-stone-600 hidden md:table-cell">Status</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-16 text-center text-stone-400 text-sm">No users found.</td></tr>
            )}
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-stone-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${u.role === 'admin' ? 'bg-orange-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{u.name}</p>
                      <p className="text-xs text-stone-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-stone-600 text-xs hidden md:table-cell">{u.phone || '—'}</td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <p className="text-sm font-semibold text-stone-900">{u.orders} orders</p>
                  <p className="text-xs text-stone-400">₹{u.totalSpent.toLocaleString('en-IN')}</p>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={e => changeRole(u.id, e.target.value as 'user' | 'admin')}
                    disabled={saving}
                    className={`border rounded-lg px-2 py-1 text-xs font-bold outline-none transition cursor-pointer ${u.role === 'admin' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-stone-50 border-stone-200 text-stone-600'}`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  {roleSaved === u.id && <span className="ml-2 text-xs text-green-600 font-semibold">✓ Saved</span>}
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <button onClick={() => toggleActive(u.id)} className={`px-2.5 py-1 rounded-full text-xs font-bold transition ${u.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}>
                    {u.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => setModal(u)} className="text-orange-600 hover:underline font-medium text-sm">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Detail Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <h2 className="font-bold text-stone-900 text-lg">User Details</h2>
              <button onClick={() => setModal(null)} className="text-stone-400 hover:text-stone-700 text-xl leading-none">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl ${modal.role === 'admin' ? 'bg-orange-600 text-white' : 'bg-stone-200 text-stone-600'}`}>
                  {modal.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-lg">{modal.name}</p>
                  <p className="text-stone-500 text-sm">{modal.email}</p>
                </div>
              </div>
              {[
                { label: 'Phone',      value: modal.phone || 'Not provided' },
                { label: 'Role',       value: modal.role.charAt(0).toUpperCase() + modal.role.slice(1) },
                { label: 'Status',     value: modal.isActive ? 'Active' : 'Inactive' },
                { label: 'Orders',     value: `${modal.orders} orders` },
                { label: 'Total Spent',value: `₹${modal.totalSpent.toLocaleString('en-IN')}` },
                { label: 'Joined',     value: new Date(modal.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
              ].map(row => (
                <div key={row.label} className="flex justify-between border-b border-stone-50 pb-2 last:border-0">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">{row.label}</span>
                  <span className="text-sm font-medium text-stone-900">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-stone-100">
              <button onClick={() => setModal(null)} className="w-full bg-stone-900 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-orange-600 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
