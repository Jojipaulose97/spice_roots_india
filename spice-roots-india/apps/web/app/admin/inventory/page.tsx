'use client';

import { useState, useMemo } from 'react';

const G = '#1A3A28';
const GOLD = '#C9A040';

interface StockItem {
  id: string; product: string; sku: string; category: string;
  weight: string; stock: number; reorder: number; reserved: number;
  costPrice: number; sellingPrice: number;
  history: { date: string; change: number; reason: string }[];
}

const SEED: StockItem[] = [
  { id: '1', product: 'Cardamom 7mm+',       sku: 'CARD-7MM-100', category: 'Cardamom', weight: '100g', stock: 48,  reorder: 20, reserved: 5,  costPrice: 900,  sellingPrice: 1200, history: [{ date: '2026-04-10', change: +50, reason: 'Restock' }, { date: '2026-04-12', change: -2, reason: 'Order ORD-1001' }] },
  { id: '2', product: 'Cardamom 7mm+',       sku: 'CARD-7MM-250', category: 'Cardamom', weight: '250g', stock: 22,  reorder: 10, reserved: 2,  costPrice: 2100, sellingPrice: 2800, history: [{ date: '2026-04-08', change: +30, reason: 'Restock' }] },
  { id: '3', product: 'Black Pepper Bold',   sku: 'BPEP-BLD-200',  category: 'Pepper',   weight: '200g', stock: 9,   reorder: 15, reserved: 1,  costPrice: 620,  sellingPrice: 890,  history: [{ date: '2026-04-05', change: +40, reason: 'Restock' }, { date: '2026-04-13', change: -3, reason: 'Orders' }] },
  { id: '4', product: 'Turmeric Powder',     sku: 'TURMR-250',     category: 'Turmeric', weight: '250g', stock: 0,   reorder: 25, reserved: 0,  costPrice: 180,  sellingPrice: 280,  history: [{ date: '2026-04-01', change: +60, reason: 'Restock' }, { date: '2026-04-15', change: -60, reason: 'Sold out' }] },
  { id: '5', product: 'Cloves Premium',      sku: 'CLOVE-100',     category: 'Cloves',   weight: '100g', stock: 31,  reorder: 10, reserved: 3,  costPrice: 450,  sellingPrice: 650,  history: [{ date: '2026-04-07', change: +35, reason: 'Restock' }] },
  { id: '6', product: 'Cinnamon Sticks',     sku: 'CINN-100',      category: 'Cinnamon', weight: '100g', stock: 5,   reorder: 10, reserved: 1,  costPrice: 220,  sellingPrice: 320,  history: [{ date: '2026-04-06', change: +20, reason: 'Restock' }, { date: '2026-04-14', change: -14, reason: 'Orders' }] },
  { id: '7', product: 'Nutmeg Whole',        sku: 'NUTM-100',      category: 'Nutmeg',   weight: '100g', stock: 18,  reorder: 8,  reserved: 0,  costPrice: 380,  sellingPrice: 550,  history: [{ date: '2026-04-09', change: +25, reason: 'Restock' }] },
  { id: '8', product: 'Star Anise',          sku: 'STAR-100',      category: 'Anise',    weight: '100g', stock: 14,  reorder: 8,  reserved: 0,  costPrice: 290,  sellingPrice: 420,  history: [{ date: '2026-04-10', change: +20, reason: 'Restock' }] },
];

export default function AdminInventoryPage() {
  const [items, setItems] = useState<StockItem[]>(SEED);
  const [search, setSearch] = useState('');
  const [catFilter, setCat] = useState('all');
  const [modal, setModal] = useState<StockItem | null>(null);
  const [adjustQty, setAdjustQty] = useState(0);
  const [adjustReason, setAdjustReason] = useState('');
  const [historyItem, setHistoryItem] = useState<StockItem | null>(null);
  const [editReorder, setEditReorder] = useState<Record<string, number>>({});

  const categories = ['all', ...Array.from(new Set(items.map(i => i.category)))];

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(i =>
      (catFilter === 'all' || i.category === catFilter) &&
      (!q || i.product.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q))
    );
  }, [items, search, catFilter]);

  const lowStock = items.filter(i => i.stock <= i.reorder && i.stock > 0).length;
  const outOfStock = items.filter(i => i.stock === 0).length;
  const totalValue = items.reduce((s, i) => s + i.stock * i.costPrice, 0);

  const applyAdjust = () => {
    if (!modal || !adjustReason.trim()) return;
    const entry = { date: new Date().toISOString().slice(0, 10), change: adjustQty, reason: adjustReason };
    setItems(prev => prev.map(i => i.id === modal.id
      ? { ...i, stock: Math.max(0, i.stock + adjustQty), history: [entry, ...i.history] }
      : i
    ));
    setModal(null);
    setAdjustQty(0);
    setAdjustReason('');
  };

  const saveReorder = (id: string) => {
    if (editReorder[id] === undefined) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, reorder: editReorder[id] } : i));
    setEditReorder(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Inventory</h1>
        <p className="text-stone-500 text-sm mt-1">{items.length} SKUs · {lowStock} low stock · {outOfStock} out of stock</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total SKUs',    value: items.length,   icon: '📦', color: 'bg-blue-50 text-blue-700' },
          { label: 'Low Stock',     value: lowStock,       icon: '⚠️', color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Out of Stock',  value: outOfStock,     icon: '🚫', color: 'bg-red-50 text-red-700' },
          { label: 'Stock Value',   value: `₹${totalValue.toLocaleString('en-IN')}`, icon: '💎', color: 'bg-green-50 text-green-700' },
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
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search product or SKU…"
          className="border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-400 transition w-64" />
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${catFilter === c ? 'bg-orange-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-5 py-4 font-semibold text-stone-600">Product / SKU</th>
              <th className="px-5 py-4 font-semibold text-stone-600 hidden md:table-cell">Category</th>
              <th className="px-5 py-4 font-semibold text-stone-600">Stock</th>
              <th className="px-5 py-4 font-semibold text-stone-600 hidden md:table-cell">Reserved</th>
              <th className="px-5 py-4 font-semibold text-stone-600">Reorder At</th>
              <th className="px-5 py-4 font-semibold text-stone-600 hidden lg:table-cell">Cost / Sell</th>
              <th className="px-5 py-4 font-semibold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.map(item => {
              const isOut  = item.stock === 0;
              const isLow  = item.stock > 0 && item.stock <= item.reorder;
              const rowBg  = isOut ? 'bg-red-50/30' : isLow ? 'bg-yellow-50/30' : '';
              return (
                <tr key={item.id} className={`hover:bg-stone-50 transition ${rowBg}`}>
                  <td className="px-5 py-3">
                    <p className="font-semibold text-stone-900">{item.product}</p>
                    <p className="text-xs text-stone-400">{item.sku} · {item.weight}</p>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-stone-600 text-sm">{item.category}</td>
                  <td className="px-5 py-3">
                    <span className={`font-bold text-lg ${isOut ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-green-700'}`}>
                      {item.stock}
                    </span>
                    {isOut && <span className="ml-2 text-xs text-red-500 font-bold">OUT</span>}
                    {isLow && <span className="ml-2 text-xs text-yellow-600 font-bold">LOW</span>}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-stone-500 text-sm">{item.reserved}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      <input
                        type="number" min={0}
                        value={editReorder[item.id] ?? item.reorder}
                        onChange={e => setEditReorder(p => ({ ...p, [item.id]: +e.target.value }))}
                        onBlur={() => saveReorder(item.id)}
                        className="w-16 border border-stone-200 rounded-lg px-2 py-1 text-xs text-center outline-none focus:border-orange-400"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell text-xs text-stone-500">
                    <p>Cost: ₹{item.costPrice}</p>
                    <p>Sell: ₹{item.sellingPrice}</p>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setModal(item); setAdjustQty(0); setAdjustReason(''); }}
                        className="text-orange-600 hover:underline text-xs font-semibold">Adjust</button>
                      <button onClick={() => setHistoryItem(item)}
                        className="text-stone-500 hover:underline text-xs font-semibold">History</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Adjust Stock Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100" style={{ background: G }}>
              <h2 className="font-bold text-white">Adjust Stock — {modal.product}</h2>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">×</button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <p className="text-sm text-stone-600">Current stock: <span className="font-bold text-stone-900">{modal.stock}</span> units</p>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Adjustment (+ add / − remove)</label>
                <input type="number" value={adjustQty} onChange={e => setAdjustQty(+e.target.value)}
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
                <p className="text-xs text-stone-400 mt-1">New stock will be: {Math.max(0, modal.stock + adjustQty)}</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">Reason *</label>
                <input value={adjustReason} onChange={e => setAdjustReason(e.target.value)} placeholder="Restock, damage, order, audit…"
                  className="w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-stone-100 flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 border border-stone-200 rounded-xl py-2.5 text-sm font-bold hover:bg-stone-50">Cancel</button>
              <button onClick={applyAdjust} disabled={!adjustReason.trim()}
                className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white disabled:opacity-50"
                style={{ background: G }}>Apply</button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {historyItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <h2 className="font-bold text-stone-900">Stock History — {historyItem.product}</h2>
              <button onClick={() => setHistoryItem(null)} className="text-stone-400 hover:text-stone-700 text-xl">×</button>
            </div>
            <div className="px-6 py-4 max-h-80 overflow-y-auto space-y-2">
              {historyItem.history.length === 0 && <p className="text-sm text-stone-400">No history yet.</p>}
              {historyItem.history.map((h, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-stone-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-stone-900">{h.reason}</p>
                    <p className="text-xs text-stone-400">{h.date}</p>
                  </div>
                  <span className={`font-bold text-sm ${h.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {h.change > 0 ? '+' : ''}{h.change}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-stone-100">
              <button onClick={() => setHistoryItem(null)} className="w-full bg-stone-900 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-orange-600 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
