'use client';

import { useState, useEffect } from 'react';

const G    = '#1A3A28';
const GOLD = '#C9A040';

const FS_KEY = 'sri_flash_sale';

interface Coupon {
  id: string; code: string; type: 'percent' | 'fixed'; value: number;
  minOrder: number; maxUses: number; usedCount: number;
  expiresAt: string; isActive: boolean; description: string;
}

interface FlashSale {
  isActive: boolean; label: string; message: string;
  discountPct: number; endsAt: string;
}

const DEFAULT_FS: FlashSale = {
  isActive: false, label: 'Flash Sale', message: 'Limited time offer!',
  discountPct: 20, endsAt: '',
};

const SEED_COUPONS: Coupon[] = [
  { id: '1', code: 'WELCOME10', type: 'percent', value: 10, minOrder: 500,  maxUses: 100, usedCount: 34, expiresAt: '2026-12-31', isActive: true,  description: 'Welcome discount for new users' },
  { id: '2', code: 'SPICE20',   type: 'percent', value: 20, minOrder: 1000, maxUses: 50,  usedCount: 12, expiresAt: '2026-06-30', isActive: true,  description: 'Seasonal spice discount' },
  { id: '3', code: 'FLAT100',   type: 'fixed',   value: 100,minOrder: 800,  maxUses: 200, usedCount: 89, expiresAt: '2026-05-31', isActive: true,  description: 'Flat ₹100 off' },
  { id: '4', code: 'KERALA15',  type: 'percent', value: 15, minOrder: 600,  maxUses: 75,  usedCount: 75, expiresAt: '2026-04-30', isActive: false, description: 'Kerala special — expired' },
];

const EMPTY: Coupon = { id: '', code: '', type: 'percent', value: 10, minOrder: 500, maxUses: 100, usedCount: 0, expiresAt: '', isActive: true, description: '' };

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>(SEED_COUPONS);
  const [form, setForm]       = useState<Coupon | null>(null);
  const [isEdit, setIsEdit]   = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [fs, setFs]         = useState<FlashSale>(DEFAULT_FS);
  const [fsSaving, setFsSaving] = useState(false);
  const [fsSaved, setFsSaved]   = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(FS_KEY);
    if (raw) setFs(JSON.parse(raw));
  }, []);

  const saveFs = () => {
    setFsSaving(true);
    setTimeout(() => {
      localStorage.setItem(FS_KEY, JSON.stringify(fs));
      setFsSaving(false); setFsSaved(true);
      setTimeout(() => setFsSaved(false), 2000);
    }, 400);
  };

  const openAdd = () => { setForm({ ...EMPTY, id: Date.now().toString() }); setIsEdit(false); };
  const openEdit = (c: Coupon) => { setForm({ ...c }); setIsEdit(true); };

  const saveForm = () => {
    if (!form) return;
    if (isEdit) {
      setCoupons(prev => prev.map(c => c.id === form.id ? form : c));
    } else {
      setCoupons(prev => [...prev, form]);
    }
    setForm(null);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setCoupons(prev => prev.filter(c => c.id !== deleteId));
    setDeleteId(null);
  };

  const toggleActive = (id: string) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Coupons & Flash Sale</h1>
        <p className="text-stone-500 text-sm mt-1">Manage discount codes and sitewide flash sale banner</p>
      </div>

      {/* Flash Sale Manager */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-stone-900 text-lg">Flash Sale Banner</h2>
            <p className="text-stone-500 text-sm mt-0.5">Shows a live countdown banner on the storefront when active</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={fs.isActive} onChange={e => setFs(p => ({ ...p, isActive: e.target.checked }))} className="sr-only peer" />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:bg-orange-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
          </label>
        </div>

        {fs.isActive && (
          <div className="rounded-xl p-4 text-white text-center text-sm font-bold" style={{ background: G }}>
            🔥 {fs.label} — {fs.discountPct}% OFF · {fs.message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Banner Label</label>
            <input value={fs.label} onChange={e => setFs(p => ({ ...p, label: e.target.value }))}
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Discount %</label>
            <input type="number" min={1} max={99} value={fs.discountPct} onChange={e => setFs(p => ({ ...p, discountPct: +e.target.value }))}
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-stone-600 mb-1">Message</label>
            <input value={fs.message} onChange={e => setFs(p => ({ ...p, message: e.target.value }))}
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-600 mb-1">Ends At</label>
            <input type="datetime-local" value={fs.endsAt} onChange={e => setFs(p => ({ ...p, endsAt: e.target.value }))}
              className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={saveFs} disabled={fsSaving}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition disabled:opacity-60"
            style={{ background: G }}>
            {fsSaving ? 'Saving…' : 'Save Flash Sale'}
          </button>
          {fsSaved && <span className="text-green-600 text-sm font-semibold">✓ Saved! Banner updated on storefront.</span>}
        </div>
      </div>

      {/* Coupons */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-stone-900 text-lg">Discount Codes</h2>
          <button onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition"
            style={{ background: G }}>
            + Add Coupon
          </button>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-5 py-4 font-semibold text-stone-600">Code</th>
                <th className="px-5 py-4 font-semibold text-stone-600">Discount</th>
                <th className="px-5 py-4 font-semibold text-stone-600 hidden md:table-cell">Min Order</th>
                <th className="px-5 py-4 font-semibold text-stone-600 hidden md:table-cell">Usage</th>
                <th className="px-5 py-4 font-semibold text-stone-600 hidden lg:table-cell">Expires</th>
                <th className="px-5 py-4 font-semibold text-stone-600">Status</th>
                <th className="px-5 py-4 font-semibold text-stone-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {coupons.map(c => (
                <tr key={c.id} className={`hover:bg-stone-50 transition ${!c.isActive ? 'opacity-60' : ''}`}>
                  <td className="px-5 py-3">
                    <p className="font-bold text-stone-900 font-mono tracking-wider">{c.code}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{c.description}</p>
                  </td>
                  <td className="px-5 py-3 font-bold" style={{ color: GOLD }}>
                    {c.type === 'percent' ? `${c.value}% OFF` : `₹${c.value} OFF`}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-stone-600 text-sm">₹{c.minOrder}</td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <div className="text-xs text-stone-600">{c.usedCount} / {c.maxUses}</div>
                    <div className="h-1.5 bg-stone-100 rounded-full mt-1 w-20">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, (c.usedCount / c.maxUses) * 100)}%`, background: G }} />
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell text-stone-500 text-xs">{c.expiresAt || '—'}</td>
                  <td className="px-5 py-3">
                    <button onClick={() => toggleActive(c.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold transition ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                      {c.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="text-orange-600 hover:underline text-xs font-semibold">Edit</button>
                      <button onClick={() => setDeleteId(c.id)} className="text-red-500 hover:underline text-xs font-semibold">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {form && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 sticky top-0 bg-white" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
              <h2 className="font-bold text-stone-900 text-lg">{isEdit ? 'Edit Coupon' : 'New Coupon'}</h2>
              <button onClick={() => setForm(null)} className="text-stone-400 hover:text-stone-700 text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { label: 'Code', key: 'code', type: 'text', placeholder: 'e.g. SPICE20' },
                { label: 'Description', key: 'description', type: 'text', placeholder: 'Short description' },
                { label: 'Value', key: 'value', type: 'number', placeholder: '10' },
                { label: 'Min Order (₹)', key: 'minOrder', type: 'number', placeholder: '500' },
                { label: 'Max Uses', key: 'maxUses', type: 'number', placeholder: '100' },
                { label: 'Expires At', key: 'expiresAt', type: 'date', placeholder: '' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">{f.label}</label>
                  <input type={f.type} value={(form as unknown as Record<string,unknown>)[f.key] as string}
                    onChange={e => setForm(p => p ? { ...p, [f.key]: f.type === 'number' ? +e.target.value : e.target.value } : p)}
                    placeholder={f.placeholder}
                    className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Type</label>
                <select value={form.type} onChange={e => setForm(p => p ? { ...p, type: e.target.value as 'percent' | 'fixed' } : p)}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none cursor-pointer">
                  <option value="percent">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="cActive" checked={form.isActive} onChange={e => setForm(p => p ? { ...p, isActive: e.target.checked } : p)} className="accent-orange-600 w-4 h-4" />
                <label htmlFor="cActive" className="text-sm font-medium text-stone-700">Active</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-stone-100 flex gap-3">
              <button onClick={() => setForm(null)} className="flex-1 border border-stone-200 rounded-xl py-2.5 text-sm font-bold hover:bg-stone-50">Cancel</button>
              <button onClick={saveForm} disabled={!form.code.trim()}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white disabled:opacity-50"
                style={{ background: G }}>
                {isEdit ? 'Save Changes' : 'Create Coupon'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
            <p className="text-4xl">🗑️</p>
            <h2 className="font-bold text-stone-900 text-lg">Delete coupon?</h2>
            <p className="text-stone-500 text-sm">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-stone-200 rounded-xl py-2.5 text-sm font-bold hover:bg-stone-50">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 bg-red-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
