import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Spice Roots India",
  description: "Our 7-day no-questions-asked return and refund policy for all Spice Roots India orders.",
};

export default function RefundsPage() {
  const steps = [
    { step: "01", title: "Raise a Request", desc: "Email support@spicerootsindia.com within 7 days of delivery with your order number and reason." },
    { step: "02", title: "We Review", desc: "Our team reviews your request within 24 hours. We may ask for a photograph if the product is damaged." },
    { step: "03", title: "Pickup Arranged", desc: "For returns, we arrange a free reverse-pickup from your doorstep within 2 business days." },
    { step: "04", title: "Refund Issued", desc: "Refund is credited to your original payment method within 5–7 business days after we receive the item." },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-stone-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Refund & Return Policy</h1>
          <p className="text-stone-400">We stand 100% behind every product we ship. Your satisfaction is guaranteed.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        {/* Guarantee Badge */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-3xl p-8 mb-14 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-extrabold text-stone-900 mb-2">7-Day No-Questions-Asked Return</h2>
          <p className="text-stone-600 max-w-xl mx-auto text-sm leading-relaxed">
            If you're unhappy for any reason — wrong item, quality issue, damaged packaging, or simply a change of mind — we'll make it right. No forms, no hassle.
          </p>
        </div>

        {/* Process Steps */}
        <h2 className="text-2xl font-bold text-stone-900 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {steps.map(s => (
            <div key={s.step} className="flex gap-5 bg-stone-50 rounded-2xl p-6 border border-stone-100">
              <div className="text-4xl font-extrabold text-orange-200 leading-none shrink-0">{s.step}</div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">{s.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Policy Details */}
        {[
          {
            title: "What Can Be Returned?",
            items: [
              "Damaged or broken products (packaging or contents)",
              "Wrong item received (different SKU or weight)",
              "Product quality significantly different from description",
              "Sealed, unopened products returned within 7 days of delivery",
            ],
          },
          {
            title: "What Cannot Be Returned?",
            items: [
              "Opened or partially consumed spice pouches (for obvious hygiene reasons)",
              "Products reported after 7 days of confirmed delivery",
              "Gift hampers where individual items have been removed and used",
              "Custom orders or bulk B2B orders (separate contract applies)",
            ],
          },
          {
            title: "Refund Methods & Timeline",
            items: [
              "UPI / Net Banking / Cards: 5–7 business days",
              "COD orders: Bank transfer (NEFT/IMPS) within 7 business days — account details required",
              "Razorpay wallet / EMI: Up to 10 business days (varies by issuing bank)",
              "Store credit: Instant — available as discount on next order if you prefer",
            ],
          },
          {
            title: "Cancellations",
            items: [
              "Orders can be cancelled within 2 hours of placing — free of charge",
              "Once dispatched, cancellation is not possible; use the return process instead",
              "Cash on Delivery (COD) refusals are treated as a return — refund minus ₹60 courier fee",
            ],
          },
        ].map(section => (
          <section key={section.title} className="mb-10">
            <h2 className="text-lg font-bold text-stone-900 mb-4">{section.title}</h2>
            <ul className="space-y-2.5">
              {section.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-stone-600 text-sm">
                  <svg className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="bg-stone-900 rounded-2xl p-6 text-white text-center mt-10">
          <p className="font-semibold mb-2">Need help with a return?</p>
          <p className="text-stone-400 text-sm mb-4">Reach us at <span className="text-orange-400">support@spicerootsindia.com</span> or WhatsApp <span className="text-orange-400">+91 98765 43210</span></p>
          <a href="mailto:support@spicerootsindia.com" className="inline-block bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-orange-500 transition">
            Email Support
          </a>
        </div>

        <div className="border-t border-stone-100 pt-8 mt-10 flex flex-wrap gap-4 text-sm text-stone-500">
          <Link href="/privacy" className="hover:text-orange-600 transition">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-orange-600 transition">Terms of Service</Link>
          <span>·</span>
          <Link href="/shipping" className="hover:text-orange-600 transition">Shipping Policy</Link>
        </div>
      </div>
    </div>
  );
}
