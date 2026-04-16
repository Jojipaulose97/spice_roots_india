import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy | Spice Roots India",
  description: "Delivery timelines, charges, and tracking information for Spice Roots India orders across India and internationally.",
};

export default function ShippingPage() {
  const india = [
    { zone: "Kerala & Southern States", time: "1–2 business days", cost: "Free above ₹499, else ₹40" },
    { zone: "Metro Cities (Mumbai, Delhi, Bengaluru, etc.)", time: "2–3 business days", cost: "Free above ₹499, else ₹50" },
    { zone: "Tier-2 & Tier-3 Cities", time: "3–5 business days", cost: "Free above ₹499, else ₹60" },
    { zone: "North-East India & Remote PIN Codes", time: "5–7 business days", cost: "₹80 flat (no free threshold)" },
    { zone: "J&K, Ladakh, Andaman & Nicobar", time: "6–10 business days", cost: "₹120 flat" },
  ];

  const international = [
    { region: "UAE, Bahrain, Qatar, Kuwait", time: "5–8 days", cost: "₹500 flat" },
    { region: "USA, Canada, UK", time: "8–14 days", cost: "₹900 flat" },
    { region: "Australia, New Zealand", time: "10–16 days", cost: "₹1,100 flat" },
    { region: "Rest of World", time: "10–20 days", cost: "₹1,400 flat" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-stone-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Shipping Policy</h1>
          <p className="text-stone-400">We ship pan-India and to 50+ countries. Here's everything you need to know.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        {/* Dispatch Promise */}
        <div className="grid grid-cols-3 gap-4 mb-14">
          {[
            { icon: "⚡", stat: "24hr", label: "Dispatch Promise" },
            { icon: "📦", stat: "100%", label: "Orders Tracked" },
            { icon: "🛡️", stat: "₹0", label: "Damage Insurance" },
          ].map(item => (
            <div key={item.label} className="text-center bg-stone-50 rounded-2xl p-5 border border-stone-100">
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-2xl font-extrabold text-stone-900">{item.stat}</p>
              <p className="text-stone-500 text-xs mt-1 font-medium uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>

        {/* India Table */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            🇮🇳 Domestic Shipping (India)
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-stone-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-5 py-4">Zone</th>
                  <th className="px-5 py-4">Estimated Delivery</th>
                  <th className="px-5 py-4">Shipping Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {india.map(row => (
                  <tr key={row.zone} className="hover:bg-orange-50 transition">
                    <td className="px-5 py-4 font-medium text-stone-800">{row.zone}</td>
                    <td className="px-5 py-4 text-stone-600">{row.time}</td>
                    <td className="px-5 py-4 text-orange-600 font-semibold">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-400 mt-3">* Shipped via Delhivery, Shiprocket, or DTDC depending on your pin code.</p>
        </section>

        {/* International Table */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            🌍 International Shipping
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-stone-600 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-5 py-4">Region</th>
                  <th className="px-5 py-4">Estimated Delivery</th>
                  <th className="px-5 py-4">Shipping Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {international.map(row => (
                  <tr key={row.region} className="hover:bg-orange-50 transition">
                    <td className="px-5 py-4 font-medium text-stone-800">{row.region}</td>
                    <td className="px-5 py-4 text-stone-600">{row.time}</td>
                    <td className="px-5 py-4 text-orange-600 font-semibold">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-400 mt-3">* Import duties and customs taxes are the responsibility of the buyer. We declare accurate values on all customs documents.</p>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "When will my order be dispatched?",
                a: "We dispatch all orders placed before 2:00 PM IST on the same day (Monday–Saturday). Orders after 2 PM are dispatched the next business day. You'll receive a tracking link via email and SMS once dispatched.",
              },
              {
                q: "Can I change my delivery address after placing the order?",
                a: "Address changes are possible within 1 hour of placing the order. Email support@spicerootsindia.com immediately. Once dispatched, address changes are not possible.",
              },
              {
                q: "My order shows 'Out for Delivery' but hasn't arrived. What do I do?",
                a: "Delays on the final-mile day can occur due to volume or traffic. If your order isn't delivered by end of day, contact our support — we'll escalate with the courier immediately.",
              },
              {
                q: "Do you ship to all Indian PIN codes?",
                a: "We ship to 26,000+ PIN codes across India. If your PIN is unserviceable, we'll notify you immediately and cancel the order with a full refund.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="group border border-stone-200 rounded-2xl overflow-hidden">
                <summary className="cursor-pointer px-6 py-4 font-semibold text-stone-900 text-sm flex justify-between items-center hover:bg-stone-50 transition list-none">
                  {q}
                  <svg className="w-4 h-4 text-stone-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 py-4 text-stone-600 text-sm leading-relaxed bg-stone-50 border-t border-stone-100">{a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="border-t border-stone-100 pt-8 mt-10 flex flex-wrap gap-4 text-sm text-stone-500">
          <Link href="/privacy" className="hover:text-orange-600 transition">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-orange-600 transition">Terms of Service</Link>
          <span>·</span>
          <Link href="/refunds" className="hover:text-orange-600 transition">Refund Policy</Link>
        </div>
      </div>
    </div>
  );
}
