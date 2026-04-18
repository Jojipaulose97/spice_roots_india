'use client';

import { useState, useEffect } from 'react';

export const STORE_SETTINGS_KEY = 'sri_store_settings';

const G    = '#1A3A28';
const GOLD = '#C9A040';

type Tab = 'store' | 'shipping' | 'payment' | 'email' | 'security';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'store',    label: 'Store Info',    icon: '🏪' },
  { id: 'shipping', label: 'Shipping',      icon: '🚚' },
  { id: 'payment',  label: 'Payment',       icon: '💳' },
  { id: 'email',    label: 'Email',         icon: '📧' },
  { id: 'security', label: 'Security',      icon: '🔒' },
];

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center gap-3 pt-6 border-t border-stone-100 mt-6">
      <button onClick={onSave}
        className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition"
        style={{ background: G }}>
        Save Changes
      </button>
      {saved && <span className="text-green-600 text-sm font-semibold">✓ Saved successfully</span>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

const INPUT = "w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-orange-400 transition";
const SELECT = "w-full border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none cursor-pointer focus:border-orange-400";

const DEFAULT_STORE = {
  name: 'Spice Roots India', tagline: "Kerala's Finest Spices, Farm to Your Door",
  email: 'hello@spicerootsindia.com', phone: '+91 95447 70078', whatsapp: '919544770078',
  address: 'Spice Roots Estate, Vandanmedu Post, Idukki District, Kerala - 685551',
  currency: 'INR', timezone: 'Asia/Kolkata', fssai: '10020042014432',
};

export default function AdminSettingsPage() {
  const [tab, setTab]   = useState<Tab>('store');
  const [saved, setSaved] = useState<Tab | null>(null);

  // Store
  const [store, setStore] = useState(DEFAULT_STORE);

  useEffect(() => {
    const raw = localStorage.getItem(STORE_SETTINGS_KEY);
    if (raw) setStore(JSON.parse(raw));
  }, []);

  const save = (t: Tab) => {
    if (t === 'store') {
      localStorage.setItem(STORE_SETTINGS_KEY, JSON.stringify(store));
    }
    setSaved(t);
    setTimeout(() => setSaved(null), 2500);
  };

  // Shipping — below
  const [ship, setShip] = useState({
    freeAbove: 999, flatRate: 80, expressRate: 150,
    codEnabled: true, codCharge: 50,
    processingDays: 1, estimatedDays: '4–7',
  });

  // Payment
  const [pay, setPay] = useState({
    razorpayEnabled: true, razorpayKey: 'rzp_live_xxxxxxxxxxxxx',
    upiEnabled: true, upiId: 'spiceroots@upi',
    codEnabled: true,
    testMode: false,
  });

  // Email
  const [email, setEmail] = useState({
    fromName: 'Spice Roots India', fromEmail: 'noreply@spicerootsindia.com',
    orderConfirm: true, shipNotify: true, reviewRequest: true, promoEmails: false,
    footerText: 'Spice Roots Estate, Vandanmedu, Kerala 685551 | +91 95447 70078',
  });

  // Security
  const [sec, setSec] = useState({
    currentPwd: '', newPwd: '', confirmPwd: '',
    twoFactor: false, sessionTimeout: 60,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-900">Settings</h1>
        <p className="text-stone-500 text-sm mt-1">Configure your store, shipping, payments and more</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white border border-stone-200 rounded-2xl p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap w-full text-left ${tab === t.id ? 'text-white' : 'text-stone-600 hover:bg-stone-50'}`}
                style={tab === t.id ? { background: G } : {}}>
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <div className="flex-1 bg-white border border-stone-200 rounded-2xl p-6">
          {/* Store Info */}
          {tab === 'store' && (
            <div className="space-y-5">
              <h2 className="font-bold text-stone-900 text-lg">Store Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Store Name">
                  <input value={store.name} onChange={e => setStore(p => ({ ...p, name: e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Tagline">
                  <input value={store.tagline} onChange={e => setStore(p => ({ ...p, tagline: e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Contact Email">
                  <input type="email" value={store.email} onChange={e => setStore(p => ({ ...p, email: e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Phone">
                  <input value={store.phone} onChange={e => setStore(p => ({ ...p, phone: e.target.value }))} className={INPUT} />
                </Field>
                <Field label="WhatsApp Number (with country code)">
                  <input value={store.whatsapp} onChange={e => setStore(p => ({ ...p, whatsapp: e.target.value }))} className={INPUT} />
                </Field>
                <Field label="FSSAI License">
                  <input value={store.fssai} onChange={e => setStore(p => ({ ...p, fssai: e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Currency">
                  <select value={store.currency} onChange={e => setStore(p => ({ ...p, currency: e.target.value }))} className={SELECT}>
                    <option value="INR">INR — Indian Rupee (₹)</option>
                    <option value="USD">USD — US Dollar ($)</option>
                  </select>
                </Field>
                <Field label="Timezone">
                  <select value={store.timezone} onChange={e => setStore(p => ({ ...p, timezone: e.target.value }))} className={SELECT}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </Field>
                <Field label="Address">
                  <textarea value={store.address} onChange={e => setStore(p => ({ ...p, address: e.target.value }))} rows={2} className={INPUT + ' resize-none'} />
                </Field>
              </div>
              <SaveBar onSave={() => save('store')} saved={saved === 'store'} />
            </div>
          )}

          {/* Shipping */}
          {tab === 'shipping' && (
            <div className="space-y-5">
              <h2 className="font-bold text-stone-900 text-lg">Shipping Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Free Shipping Above (₹)">
                  <input type="number" value={ship.freeAbove} onChange={e => setShip(p => ({ ...p, freeAbove: +e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Standard Flat Rate (₹)">
                  <input type="number" value={ship.flatRate} onChange={e => setShip(p => ({ ...p, flatRate: +e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Express Rate (₹)">
                  <input type="number" value={ship.expressRate} onChange={e => setShip(p => ({ ...p, expressRate: +e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Processing Days">
                  <input type="number" min={0} value={ship.processingDays} onChange={e => setShip(p => ({ ...p, processingDays: +e.target.value }))} className={INPUT} />
                </Field>
                <Field label="Estimated Delivery (e.g. 4–7 days)">
                  <input value={ship.estimatedDays} onChange={e => setShip(p => ({ ...p, estimatedDays: e.target.value }))} className={INPUT} />
                </Field>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={ship.codEnabled} onChange={e => setShip(p => ({ ...p, codEnabled: e.target.checked }))} className="accent-orange-600 w-4 h-4" />
                  <span className="text-sm font-medium text-stone-900">Enable Cash on Delivery (COD)</span>
                </label>
                {ship.codEnabled && (
                  <Field label="COD Charge (₹)">
                    <input type="number" value={ship.codCharge} onChange={e => setShip(p => ({ ...p, codCharge: +e.target.value }))} className={INPUT + ' max-w-xs'} />
                  </Field>
                )}
              </div>
              <SaveBar onSave={() => save('shipping')} saved={saved === 'shipping'} />
            </div>
          )}

          {/* Payment */}
          {tab === 'payment' && (
            <div className="space-y-5">
              <h2 className="font-bold text-stone-900 text-lg">Payment Gateways</h2>
              <div className="space-y-6">
                <div className="border border-stone-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-stone-900">Razorpay</p>
                      <p className="text-xs text-stone-400 mt-0.5">Cards, UPI, Net Banking, Wallets</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={pay.razorpayEnabled} onChange={e => setPay(p => ({ ...p, razorpayEnabled: e.target.checked }))} className="sr-only peer" />
                      <div className="w-11 h-6 bg-stone-200 rounded-full peer peer-checked:bg-orange-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                  {pay.razorpayEnabled && (
                    <Field label="Razorpay Key ID">
                      <input value={pay.razorpayKey} onChange={e => setPay(p => ({ ...p, razorpayKey: e.target.value }))} className={INPUT} />
                    </Field>
                  )}
                </div>
                <div className="border border-stone-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-stone-900">Direct UPI</p>
                      <p className="text-xs text-stone-400 mt-0.5">Accept payments directly via UPI ID</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={pay.upiEnabled} onChange={e => setPay(p => ({ ...p, upiEnabled: e.target.checked }))} className="sr-only peer" />
                      <div className="w-11 h-6 bg-stone-200 rounded-full peer peer-checked:bg-orange-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                    </label>
                  </div>
                  {pay.upiEnabled && (
                    <Field label="UPI ID">
                      <input value={pay.upiId} onChange={e => setPay(p => ({ ...p, upiId: e.target.value }))} className={INPUT} />
                    </Field>
                  )}
                </div>
                <label className="flex items-center gap-3 cursor-pointer border border-stone-200 rounded-2xl p-5">
                  <input type="checkbox" checked={pay.codEnabled} onChange={e => setPay(p => ({ ...p, codEnabled: e.target.checked }))} className="accent-orange-600 w-4 h-4" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Cash on Delivery</p>
                    <p className="text-xs text-stone-400">Managed via Shipping settings</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={pay.testMode} onChange={e => setPay(p => ({ ...p, testMode: e.target.checked }))} className="accent-orange-600 w-4 h-4" />
                  <span className="text-sm text-stone-700">Test mode (use sandbox keys)</span>
                </label>
              </div>
              <SaveBar onSave={() => save('payment')} saved={saved === 'payment'} />
            </div>
          )}

          {/* Email */}
          {tab === 'email' && (
            <div className="space-y-5">
              <h2 className="font-bold text-stone-900 text-lg">Email Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="From Name">
                  <input value={email.fromName} onChange={e => setEmail(p => ({ ...p, fromName: e.target.value }))} className={INPUT} />
                </Field>
                <Field label="From Email">
                  <input type="email" value={email.fromEmail} onChange={e => setEmail(p => ({ ...p, fromEmail: e.target.value }))} className={INPUT} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Email Footer Text">
                    <input value={email.footerText} onChange={e => setEmail(p => ({ ...p, footerText: e.target.value }))} className={INPUT} />
                  </Field>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Automated Emails</p>
                {[
                  { key: 'orderConfirm',  label: 'Order Confirmation' },
                  { key: 'shipNotify',    label: 'Shipping Notification' },
                  { key: 'reviewRequest', label: 'Review Request (after delivery)' },
                  { key: 'promoEmails',   label: 'Promotional Emails' },
                ].map(f => (
                  <label key={f.key} className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={(email as Record<string,unknown>)[f.key] as boolean}
                      onChange={e => setEmail(p => ({ ...p, [f.key]: e.target.checked }))}
                      className="accent-orange-600 w-4 h-4" />
                    <span className="text-sm font-medium text-stone-900">{f.label}</span>
                  </label>
                ))}
              </div>
              <SaveBar onSave={() => save('email')} saved={saved === 'email'} />
            </div>
          )}

          {/* Security */}
          {tab === 'security' && (
            <div className="space-y-5">
              <h2 className="font-bold text-stone-900 text-lg">Security</h2>
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Change Password</p>
                <Field label="Current Password">
                  <input type="password" value={sec.currentPwd} onChange={e => setSec(p => ({ ...p, currentPwd: e.target.value }))} className={INPUT + ' max-w-sm'} />
                </Field>
                <Field label="New Password">
                  <input type="password" value={sec.newPwd} onChange={e => setSec(p => ({ ...p, newPwd: e.target.value }))} className={INPUT + ' max-w-sm'} />
                </Field>
                <Field label="Confirm New Password">
                  <input type="password" value={sec.confirmPwd} onChange={e => setSec(p => ({ ...p, confirmPwd: e.target.value }))} className={INPUT + ' max-w-sm'} />
                </Field>
              </div>
              <div className="space-y-4 border-t border-stone-100 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Session & 2FA</p>
                <Field label="Session Timeout (minutes)">
                  <input type="number" min={15} max={480} value={sec.sessionTimeout} onChange={e => setSec(p => ({ ...p, sessionTimeout: +e.target.value }))} className={INPUT + ' max-w-xs'} />
                </Field>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={sec.twoFactor} onChange={e => setSec(p => ({ ...p, twoFactor: e.target.checked }))} className="accent-orange-600 w-4 h-4" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Two-Factor Authentication</p>
                    <p className="text-xs text-stone-400">Adds OTP verification on login (TOTP/SMS)</p>
                  </div>
                </label>
              </div>
              <div className="border-t border-stone-100 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Danger Zone</p>
                <button className="px-4 py-2.5 rounded-xl text-sm font-bold border border-red-300 text-red-600 hover:bg-red-50 transition">
                  Clear All Sessions
                </button>
              </div>
              <SaveBar onSave={() => save('security')} saved={saved === 'security'} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
