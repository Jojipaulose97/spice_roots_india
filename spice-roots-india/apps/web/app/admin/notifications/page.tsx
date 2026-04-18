'use client';

import { useState } from 'react';

const G = '#1A3A28';

type NType = 'order' | 'review' | 'stock' | 'user' | 'system';

interface Notification {
  id: string; type: NType; title: string; body: string;
  createdAt: string; isRead: boolean; link?: string;
}

const ICONS: Record<NType, string> = {
  order:  '📦',
  review: '💬',
  stock:  '⚠️',
  user:   '👤',
  system: '🔔',
};

const COLORS: Record<NType, string> = {
  order:  'bg-blue-50 text-blue-700',
  review: 'bg-purple-50 text-purple-700',
  stock:  'bg-yellow-50 text-yellow-700',
  user:   'bg-green-50 text-green-700',
  system: 'bg-stone-50 text-stone-600',
};

const SEED: Notification[] = [
  { id: '1',  type: 'order',  title: 'New order received',          body: 'ORD-1010 from Arjun Menon · ₹1,760',                         createdAt: '2026-04-16T09:00:00Z', isRead: false, link: '/admin/orders' },
  { id: '2',  type: 'stock',  title: 'Turmeric Powder out of stock',body: 'SKU TURMR-250 has 0 units remaining. Reorder immediately.',   createdAt: '2026-04-15T18:00:00Z', isRead: false, link: '/admin/inventory' },
  { id: '3',  type: 'review', title: 'New review pending approval', body: '"Pure Kerala turmeric" by Anitha K. — 5 stars',              createdAt: '2026-04-14T14:00:00Z', isRead: false, link: '/admin/reviews' },
  { id: '4',  type: 'order',  title: 'Order delivered',             body: 'ORD-1001 (Priya Menon) marked as Delivered.',                 createdAt: '2026-04-13T11:00:00Z', isRead: true,  link: '/admin/orders' },
  { id: '5',  type: 'stock',  title: 'Cinnamon stock running low',  body: 'SKU CINN-100 has only 5 units. Reorder threshold: 10.',       createdAt: '2026-04-13T08:00:00Z', isRead: true,  link: '/admin/inventory' },
  { id: '6',  type: 'review', title: 'Spam review flagged',         body: 'Review on Cardamom 7mm+ flagged as spam — action required.', createdAt: '2026-04-12T16:00:00Z', isRead: true,  link: '/admin/reviews' },
  { id: '7',  type: 'user',   title: 'New user registered',         body: 'Arjun Menon (arjun@example.com) joined Spice Roots India.',   createdAt: '2026-04-12T09:00:00Z', isRead: true,  link: '/admin/customers' },
  { id: '8',  type: 'order',  title: '3 orders pending processing', body: 'ORD-1005, ORD-1006, ORD-1010 are still in Pending status.',   createdAt: '2026-04-11T12:00:00Z', isRead: true,  link: '/admin/orders' },
  { id: '9',  type: 'system', title: 'Flash sale ended',            body: 'The flash sale "Summer Spice Festival" expired at 11:59 PM.',  createdAt: '2026-04-10T00:00:00Z', isRead: true  },
  { id: '10', type: 'system', title: 'Weekly report ready',         body: 'Your weekly sales report for Apr 7–13 is now available.',     createdAt: '2026-04-07T07:00:00Z', isRead: true  },
];

interface NotifPref { label: string; enabled: boolean; }

const DEFAULT_PREFS: Record<NType, NotifPref> = {
  order:  { label: 'New & updated orders',      enabled: true  },
  review: { label: 'New reviews & replies',      enabled: true  },
  stock:  { label: 'Low / out of stock alerts',  enabled: true  },
  user:   { label: 'New user registrations',     enabled: false },
  system: { label: 'System & scheduled reports', enabled: true  },
};

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60)   return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function AdminNotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(SEED);
  const [filter, setFilter] = useState<NType | 'all'>('all');
  const [prefs, setPrefs]   = useState(DEFAULT_PREFS);

  const filtered = filter === 'all' ? notifs : notifs.filter(n => n.type === filter);
  const unread = notifs.filter(n => !n.isRead).length;

  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  const markAll  = () => setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
  const clearAll = () => setNotifs([]);

  const togglePref = (type: NType) => {
    setPrefs(prev => ({ ...prev, [type]: { ...prev[type], enabled: !prev[type].enabled } }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Notifications</h1>
          <p className="text-stone-500 text-sm mt-1">{unread} unread · {notifs.length} total</p>
        </div>
        <div className="flex gap-2">
          {unread > 0 && (
            <button onClick={markAll} className="px-4 py-2 rounded-xl text-sm font-semibold border border-stone-200 hover:bg-stone-50 transition">
              Mark all read
            </button>
          )}
          <button onClick={clearAll} className="px-4 py-2 rounded-xl text-sm font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition">
            Clear all
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="flex gap-1.5 flex-wrap">
            {(['all','order','review','stock','user','system'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${filter === f ? 'bg-orange-600 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
                {f === 'all' ? 'All' : ICONS[f] + ' ' + f}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-stone-400 text-sm bg-white border border-stone-200 rounded-2xl">
              No notifications here.
            </div>
          )}

          {filtered.map(n => (
            <div key={n.id}
              onClick={() => markRead(n.id)}
              className={`flex gap-4 bg-white border rounded-2xl p-4 cursor-pointer transition hover:shadow-sm ${n.isRead ? 'border-stone-200 opacity-70' : 'border-orange-200 shadow-sm'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${COLORS[n.type]}`}>
                {ICONS[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`font-semibold text-stone-900 text-sm ${!n.isRead ? 'font-bold' : ''}`}>{n.title}</p>
                  <span className="text-xs text-stone-400 shrink-0">{timeAgo(n.createdAt)}</span>
                </div>
                <p className="text-stone-500 text-xs mt-0.5 leading-relaxed">{n.body}</p>
                {!n.isRead && <span className="inline-block mt-1.5 w-2 h-2 rounded-full bg-orange-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6">
            <h2 className="font-bold text-stone-900 text-base mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {(Object.entries(prefs) as [NType, NotifPref][]).map(([type, pref]) => (
                <div key={type} className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-stone-900 flex items-center gap-2">
                      {ICONS[type]} {pref.label}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer shrink-0">
                    <input type="checkbox" checked={pref.enabled} onChange={() => togglePref(type)} className="sr-only peer" />
                    <div className="w-10 h-5 bg-stone-200 rounded-full peer peer-checked:bg-orange-600 transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-stone-100">
              <button className="w-full rounded-xl py-2.5 text-sm font-bold text-white transition" style={{ background: G }}>
                Save Preferences
              </button>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <p className="text-xs font-semibold text-orange-800 mb-1">📱 Push Notifications</p>
            <p className="text-xs text-orange-600">Enable browser push notifications to get real-time alerts even when the admin panel is closed.</p>
            <button className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 transition w-full">
              Enable Push Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
