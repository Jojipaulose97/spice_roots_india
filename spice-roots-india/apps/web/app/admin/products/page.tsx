'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LS_KEY = 'sri_admin_products';
const CATEGORIES = ['Whole Spices', 'Powders', 'Tea & Coffee', 'Gift Hampers'];

interface Variant { weight: string; price: number; oldPrice: number; stock: number; }
interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  variants: Variant[];
  tags: string;
  isFSSAI: boolean;
  origin: string;
  isActive: boolean;
  createdAt: string;
}

const SEED: AdminProduct[] = [
  { id: '1', name: 'Premium Green Cardamom (8mm)', slug: 'green-cardamom-8mm', description: 'Hand-picked 8mm bold green cardamom from Idukki highlands.', category: 'Whole Spices', images: ['https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/cardamom_qdu26x.webp'], variants: [{ weight: '50g', price: 450, oldPrice: 600, stock: 120 }, { weight: '100g', price: 850, oldPrice: 1100, stock: 60 }], tags: 'cardamom,kerala,spice', isFSSAI: true, origin: 'Idukki, Kerala', isActive: true, createdAt: new Date().toISOString() },
  { id: '2', name: 'Tellicherry Black Pepper', slug: 'tellicherry-black-pepper', description: 'Bold Tellicherry pepper — the gold standard of black pepper.', category: 'Whole Spices', images: ['https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/pepper_sgo22q.webp'], variants: [{ weight: '50g', price: 320, oldPrice: 420, stock: 85 }, { weight: '100g', price: 600, oldPrice: 800, stock: 40 }], tags: 'pepper,black pepper,tellicherry', isFSSAI: true, origin: 'Wayanad, Kerala', isActive: true, createdAt: new Date().toISOString() },
  { id: '3', name: 'Ceylon Cinnamon Quills', slug: 'ceylon-cinnamon-quills', description: 'True Ceylon cinnamon quills with delicate sweet-spicy flavour.', category: 'Whole Spices', images: ['https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/cinamon_wdn1pl.webp'], variants: [{ weight: '50g', price: 550, oldPrice: 700, stock: 7 }, { weight: '100g', price: 1000, oldPrice: 1300, stock: 3 }], tags: 'cinnamon,ceylon,quills', isFSSAI: true, origin: 'Kerala, India', isActive: true, createdAt: new Date().toISOString() },
  { id: '4', name: 'Clove Buds (Idukki)', slug: 'clove-buds-idukki', description: 'Sun-dried clove buds from the high-altitude farms of Idukki.', category: 'Whole Spices', images: ['https://res.cloudinary.com/dpr6iiff6/image/upload/v1776477468/nutmeg_hk2lao.webp'], variants: [{ weight: '50g', price: 280, oldPrice: 380, stock: 62 }], tags: 'clove,idukki,spice', isFSSAI: true, origin: 'Idukki, Kerala', isActive: true, createdAt: new Date().toISOString() },
  { id: '5', name: 'Turmeric Powder (Lakadong)', slug: 'turmeric-powder-lakadong', description: 'Lakadong turmeric with 7–12% curcumin — the highest potency variety.', category: 'Powders', images: ['https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&q=80'], variants: [{ weight: '100g', price: 180, oldPrice: 240, stock: 210 }], tags: 'turmeric,lakadong,powder', isFSSAI: true, origin: 'Meghalaya / Kerala', isActive: true, createdAt: new Date().toISOString() },
  { id: '6', name: 'Wayanad Coffee Powder', slug: 'wayanad-coffee-powder', description: 'Dark roast Arabica-Robusta blend from misty Wayanad estates.', category: 'Tea & Coffee', images: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80'], variants: [{ weight: '100g', price: 380, oldPrice: 500, stock: 155 }, { weight: '250g', price: 850, oldPrice: 1100, stock: 80 }], tags: 'coffee,wayanad,arabica', isFSSAI: true, origin: 'Wayanad, Kerala', isActive: true, createdAt: new Date().toISOString() },
  { id: '7', name: 'Mountain Masala Chai', slug: 'mountain-masala-chai', description: 'Aromatic blend of Assam CTC, ginger, cardamom and cloves.', category: 'Tea & Coffee', images: ['https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80'], variants: [{ weight: '100g', price: 260, oldPrice: 350, stock: 103 }], tags: 'chai,masala,tea', isFSSAI: true, origin: 'Kerala, India', isActive: true, createdAt: new Date().toISOString() },
  { id: '8', name: 'Star Anise (Chakra Phool)', slug: 'star-anise-chakra-phool', description: 'Whole star anise pods with intense liquorice aroma.', category: 'Whole Spices', images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80'], variants: [{ weight: '50g', price: 320, oldPrice: 420, stock: 44 }], tags: 'star anise,chakra phool', isFSSAI: true, origin: 'Kerala, India', isActive: true, createdAt: new Date().toISOString() },
  { id: '9', name: 'Kerala Gift Hamper (Small)', slug: 'kerala-gift-hamper-small', description: 'Curated set of 5 premium spices in a handcrafted jute basket.', category: 'Gift Hampers', images: ['https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80'], variants: [{ weight: '1 set', price: 1499, oldPrice: 1999, stock: 37 }], tags: 'gift,hamper,kerala', isFSSAI: true, origin: 'Kerala, India', isActive: true, createdAt: new Date().toISOString() },
  { id: '10', name: 'Premium Spice Box (12 items)', slug: 'premium-spice-box-12', description: 'A handpicked collection of 12 finest Kerala spices in a wooden box.', category: 'Gift Hampers', images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80'], variants: [{ weight: '1 box', price: 2499, oldPrice: 3200, stock: 22 }], tags: 'gift,spice box,premium', isFSSAI: true, origin: 'Kerala, India', isActive: true, createdAt: new Date().toISOString() },
];

const emptyForm = (): Omit<AdminProduct, 'id' | 'createdAt'> => ({
  name: '', slug: '', description: '', category: 'Whole Spices',
  images: [''], variants: [{ weight: '50g', price: 0, oldPrice: 0, stock: 0 }],
  tags: '', isFSSAI: true, origin: 'Kerala, India', isActive: true,
});

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [search, setSearch]     = useState('');
  const [catFilter, setCat]     = useState('All');
  const [modal, setModal]       = useState<'add' | 'edit' | null>(null);
  const [editing, setEditing]   = useState<AdminProduct | null>(null);
  const [form, setForm]         = useState(emptyForm());
  const [delId, setDelId]       = useState<string | null>(null);
  const [saved, setSaved]       = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    setProducts(raw ? JSON.parse(raw) : SEED);
    if (!raw) localStorage.setItem(LS_KEY, JSON.stringify(SEED));
  }, []);

  const persist = (list: AdminProduct[]) => {
    setProducts(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  };

  const openAdd = () => { setForm(emptyForm()); setEditing(null); setModal('add'); };
  const openEdit = (p: AdminProduct) => {
    setForm({ name: p.name, slug: p.slug, description: p.description, category: p.category, images: p.images.length ? p.images : [''], variants: p.variants, tags: p.tags, isFSSAI: p.isFSSAI, origin: p.origin, isActive: p.isActive });
    setEditing(p); setModal('edit');
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (modal === 'add') {
      const np: AdminProduct = { ...form, id: Date.now().toString(), slug: form.slug || slugify(form.name), createdAt: new Date().toISOString() };
      persist([np, ...products]);
    } else if (editing) {
      persist(products.map(p => p.id === editing.id ? { ...editing, ...form } : p));
    }
    setSaved(true); setTimeout(() => { setSaved(false); setModal(null); }, 800);
  };

  const confirmDelete = (id: string) => setDelId(id);
  const doDelete = () => {
    if (delId) { persist(products.filter(p => p.id !== delId)); setDelId(null); }
  };

  const filtered = products.filter(p => {
    const q = search.toLowerCase();
    return (catFilter === 'All' || p.category === catFilter) &&
      (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  });

  const setVariant = (i: number, key: keyof Variant, val: string | number) => {
    const v = [...form.variants]; v[i] = { ...v[i], [key]: val };
    setForm(f => ({ ...f, variants: v }));
  };
  const addVariant  = () => setForm(f => ({ ...f, variants: [...f.variants, { weight: '', price: 0, oldPrice: 0, stock: 0 }] }));
  const delVariant  = (i: number) => setForm(f => ({ ...f, variants: f.variants.filter((_, j) => j !== i) }));
  const setImage    = (i: number, val: string) => { const imgs = [...form.images]; imgs[i] = val; setForm(f => ({ ...f, images: imgs })); };
  const addImage    = () => setForm(f => ({ ...f, images: [...f.images, ''] }));
  const delImage    = (i: number) => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Products</h1>
          <p className="text-stone-500 text-sm mt-1">{products.length} products total</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition shadow">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" className="border border-stone-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-orange-400 transition w-64"/>
        <div className="flex gap-1.5">
          {['All', ...CATEGORIES].map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${catFilter === c ? 'bg-orange-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-stone-600">Product</th>
              <th className="px-6 py-4 font-semibold text-stone-600 hidden md:table-cell">Category</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Price (INR)</th>
              <th className="px-6 py-4 font-semibold text-stone-600 hidden lg:table-cell">Stock</th>
              <th className="px-6 py-4 font-semibold text-stone-600 hidden lg:table-cell">Status</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-16 text-center text-stone-400 text-sm">No products found.</td></tr>
            )}
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-stone-50 transition group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                      {p.images[0] && <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px"/>}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 group-hover:text-orange-700 transition text-sm">{p.name}</p>
                      <p className="text-xs text-stone-400">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-xs font-semibold">{p.category}</span>
                </td>
                <td className="px-6 py-4 font-semibold text-stone-900">
                  ₹{p.variants[0]?.price ?? '—'}
                  {p.variants.length > 1 && <span className="text-xs text-stone-400 font-normal ml-1">+{p.variants.length - 1} more</span>}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  {(() => { const total = p.variants.reduce((s, v) => s + v.stock, 0); return (
                    <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${total > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {total < 10 && '⚠ '}{total} units
                    </span>
                  ); })()}
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                    {p.isActive ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => openEdit(p)} className="text-orange-600 hover:underline font-medium text-sm">Edit</button>
                  <button onClick={() => confirmDelete(p.id)} className="text-red-400 hover:text-red-600 font-medium text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <h2 className="font-bold text-stone-900 text-lg">{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
              <button onClick={() => setModal(null)} className="text-stone-400 hover:text-stone-700 text-xl leading-none">×</button>
            </div>

            <div className="px-6 py-5 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* Name + Slug */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Product Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value, slug: slugify(e.target.value) }))} className="field" placeholder="e.g. Green Cardamom"/>
                </div>
                <div>
                  <label className="label">Slug</label>
                  <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="field" placeholder="auto-generated"/>
                </div>
              </div>

              {/* Category + Origin */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="field">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Origin</label>
                  <input value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} className="field"/>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="label">Description *</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="field resize-none" placeholder="Short product description…"/>
              </div>

              {/* Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label mb-0">Image URLs</label>
                  <button onClick={addImage} className="text-xs text-orange-600 font-semibold hover:underline">+ Add Image</button>
                </div>
                <div className="space-y-2">
                  {form.images.map((img, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={img} onChange={e => setImage(i, e.target.value)} className="field flex-1" placeholder="https://…"/>
                      {form.images.length > 1 && <button onClick={() => delImage(i)} className="text-red-400 hover:text-red-600 text-lg leading-none px-1">×</button>}
                    </div>
                  ))}
                </div>
                {form.images[0] && (
                  <div className="mt-2 relative w-16 h-16 rounded-xl overflow-hidden border border-stone-200">
                    <Image src={form.images[0]} alt="preview" fill className="object-cover" sizes="64px"/>
                  </div>
                )}
              </div>

              {/* Variants */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label mb-0">Variants (weight / price / stock)</label>
                  <button onClick={addVariant} className="text-xs text-orange-600 font-semibold hover:underline">+ Add Variant</button>
                </div>
                <div className="space-y-2">
                  {form.variants.map((v, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 items-center">
                      <input value={v.weight} onChange={e => setVariant(i, 'weight', e.target.value)} className="field" placeholder="50g"/>
                      <input type="number" value={v.price} onChange={e => setVariant(i, 'price', Number(e.target.value))} className="field" placeholder="Price ₹"/>
                      <input type="number" value={v.oldPrice} onChange={e => setVariant(i, 'oldPrice', Number(e.target.value))} className="field" placeholder="MRP ₹"/>
                      <div className="flex gap-1">
                        <input type="number" value={v.stock} onChange={e => setVariant(i, 'stock', Number(e.target.value))} className="field flex-1" placeholder="Stock"/>
                        {form.variants.length > 1 && <button onClick={() => delVariant(i)} className="text-red-400 hover:text-red-600 text-lg leading-none px-1">×</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="label">Tags (comma-separated)</label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="field" placeholder="cardamom, kerala, spice"/>
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isFSSAI} onChange={e => setForm(f => ({ ...f, isFSSAI: e.target.checked }))} className="accent-orange-600 w-4 h-4"/>
                  <span className="text-sm font-medium text-stone-700">FSSAI Certified</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm(f => ({ ...f, isActive: e.target.checked }))} className="accent-orange-600 w-4 h-4"/>
                  <span className="text-sm font-medium text-stone-700">Active (visible in shop)</span>
                </label>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-100 flex justify-end gap-3">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 font-medium">Cancel</button>
              <button onClick={handleSave} className={`px-5 py-2.5 rounded-xl text-sm font-bold transition shadow ${saved ? 'bg-green-600 text-white' : 'bg-stone-900 text-white hover:bg-orange-600'}`}>
                {saved ? '✓ Saved!' : modal === 'add' ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {delId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <h3 className="font-bold text-stone-900 text-lg mb-2">Delete Product?</h3>
            <p className="text-stone-500 text-sm mb-6">This will remove the product from your store. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 border border-stone-200 rounded-xl py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50">Cancel</button>
              <button onClick={doDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl py-2.5 text-sm font-bold transition">Delete</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .label { display: block; font-size: 0.75rem; font-weight: 600; color: #78716c; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .field { width: 100%; border: 1px solid #e7e5e4; border-radius: 0.75rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; outline: none; transition: border-color 0.15s; }
        .field:focus { border-color: #fb923c; }
      `}</style>
    </div>
  );
}
