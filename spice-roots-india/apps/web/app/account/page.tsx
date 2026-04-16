import Image from "next/image";
import { Button } from "@/app/components/ui/Button";

export default function AccountPage() {
  const order = {
    id: "SPICE-12345",
    date: "April 16, 2026",
    total: 1090,
    status: "Delivered",
    itemImg: "https://picsum.photos/seed/cardamom/100/100",
    itemName: "Premium Green Cardamom",
    itemVariant: "Qty: 1 · 50g",
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl flex gap-10">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-white border border-stone-200 rounded-3xl overflow-hidden self-start sticky top-28">
        <div className="p-6 bg-gradient-to-br from-orange-50 to-stone-50 border-b border-stone-200">
          <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">J</div>
          <h3 className="font-bold text-stone-900">Joji Mathew</h3>
          <p className="text-sm text-stone-500">joji@example.com</p>
        </div>
        <nav className="flex flex-col py-4">
          {[
            { label: "Orders", active: true },
            { label: "Addresses" },
            { label: "Wishlist" },
            { label: "Profile Settings" },
          ].map(item => (
            <a key={item.label} href="#" className={`px-6 py-3 font-medium text-sm transition ${item.active ? "text-orange-600 bg-orange-50 border-l-4 border-orange-600" : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"}`}>
              {item.label}
            </a>
          ))}
          <div className="px-6 pt-4 mt-4 border-t border-stone-100">
            <button className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-2 transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1">
        <h2 className="text-2xl font-bold text-stone-900 mb-6">My Orders</h2>
        
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6 pb-6 border-b border-stone-100">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-1">Order #{order.id}</p>
              <p className="text-stone-900 font-medium">Placed on: {order.date}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="bg-green-100 text-green-700 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">{order.status}</span>
              <p className="text-lg font-bold text-stone-900">₹{order.total}</p>
            </div>
          </div>

          <div className="flex gap-4 items-center mb-6">
            <div className="relative w-16 h-16 bg-stone-100 rounded-xl overflow-hidden shrink-0">
              <Image src={order.itemImg} alt={order.itemName} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-900">{order.itemName}</h4>
              <p className="text-xs text-stone-500">{order.itemVariant}</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" className="text-sm border-stone-300 bg-white">View Invoice</Button>
            <Button className="text-sm bg-stone-900 hover:bg-orange-600 transition">Buy Again</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
