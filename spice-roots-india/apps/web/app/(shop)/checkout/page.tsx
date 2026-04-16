import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

const CART_PREVIEW = [
  { name: "Premium Green Cardamom", variant: "50g", price: 450, qty: 1, img: "https://picsum.photos/seed/cardamom/100/100" },
  { name: "Tellicherry Black Pepper", variant: "100g", price: 640, qty: 2, img: "https://picsum.photos/seed/pepper/100/100" },
];
const total = CART_PREVIEW.reduce((a, b) => a + b.price, 0);

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold text-stone-900 mb-8 border-b border-stone-200 pb-4">Secure Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Forms */}
        <div className="space-y-10">
          {/* Step 1: Contact */}
          <section>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-md">1</span>
                Contact Information
              </h2>
              <span className="text-sm text-stone-500">
                Have an account? <Link href="/login" className="text-orange-600 font-medium">Log in</Link>
              </span>
            </div>
            <Input placeholder="Email or phone number" className="h-12 bg-white" />
            <label className="flex items-center gap-2 mt-3 text-sm text-stone-600 cursor-pointer">
              <input type="checkbox" className="accent-orange-600 w-4 h-4" /> Email me with news and offers
            </label>
          </section>

          {/* Step 2: Shipping */}
          <section>
            <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold">2</span>
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <select className="col-span-2 flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:ring-1 focus:ring-orange-600">
                <option>India</option>
                <option>UAE</option>
                <option>USA</option>
                <option>UK</option>
              </select>
              <Input placeholder="First Name" className="h-12 bg-white" />
              <Input placeholder="Last Name" className="h-12 bg-white" />
              <Input placeholder="House No, Street, Area" className="col-span-2 h-12 bg-white" />
              <Input placeholder="Apartment, suite (optional)" className="col-span-2 h-12 bg-white" />
              <Input placeholder="City" className="h-12 bg-white" />
              <Input placeholder="State" className="h-12 bg-white" />
              <Input placeholder="PIN code" className="h-12 bg-white" />
              <Input placeholder="Phone number" className="h-12 bg-white" />
            </div>
          </section>

          {/* Step 3: Payment */}
          <section>
            <h2 className="text-xl font-semibold flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-sm font-bold">3</span>
              Payment
            </h2>
            <p className="text-sm text-stone-500 mb-4">All transactions are secure and encrypted via Razorpay.</p>
            
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white divide-y divide-stone-100">
              <label className="p-4 flex items-center justify-between cursor-pointer hover:bg-orange-50 transition">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" defaultChecked className="accent-orange-600 w-4 h-4" />
                  <span className="font-medium text-stone-900 text-sm">Razorpay (UPI, Cards, NetBanking, Wallets)</span>
                </div>
                <div className="flex gap-1">
                  {["UPI", "VISA", "MC"].map(m => (
                    <div key={m} className="px-1.5 h-5 bg-stone-100 border border-stone-200 rounded text-[8px] font-bold text-stone-500 flex items-center">{m}</div>
                  ))}
                </div>
              </label>
              <div className="p-8 text-center bg-stone-50 text-stone-400 text-sm">
                <svg className="w-10 h-10 mx-auto text-stone-200 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                You'll be redirected to Razorpay after clicking Pay Now.
              </div>
              <label className="p-4 flex items-center gap-3 cursor-pointer hover:bg-stone-50 transition">
                <input type="radio" name="payment" className="accent-orange-600 w-4 h-4" />
                <span className="font-medium text-stone-900 text-sm">Cash on Delivery (COD)</span>
                <span className="ml-auto text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">+₹30 fee</span>
              </label>
            </div>
            
            <div className="mt-8">
              <Link href="/order/SPICE-12345">
                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 h-16 text-xl shadow-xl shadow-orange-600/20 font-bold">
                  Pay Now — ₹{total}
                </Button>
              </Link>
              <p className="text-xs text-center text-stone-400 mt-3 flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                256-bit SSL encrypted
              </p>
            </div>
          </section>
        </div>

        {/* Right: Order Summary */}
        <aside className="bg-stone-50 p-8 rounded-3xl border border-stone-200 h-fit sticky top-28">
          <h3 className="font-bold text-lg mb-6 text-stone-900">In Your Bag</h3>
          <div className="space-y-4 mb-6 pb-6 border-b border-stone-200">
            {CART_PREVIEW.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="relative w-16 h-16 bg-white border border-stone-200 rounded-xl overflow-hidden">
                    <Image src={item.img} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-stone-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">{item.qty}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-800 text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-stone-400">{item.variant}</p>
                </div>
                <div className="font-medium text-stone-900">₹{item.price}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm text-stone-600 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-stone-900">₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4 flex justify-between items-center">
            <span className="font-bold text-lg text-stone-900">Total</span>
            <div className="text-right">
              <span className="text-xs text-stone-400 block">INR</span>
              <span className="text-2xl font-bold text-stone-900">₹{total}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
