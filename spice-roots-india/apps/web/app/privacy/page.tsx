import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Spice Roots India",
  description: "How Spice Roots India collects, uses, and protects your personal data.",
};

const LAST_UPDATED = "April 16, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-stone-400">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <div className="prose prose-stone max-w-none">
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-10">
            <p className="text-stone-700 text-sm leading-relaxed">
              <strong>Spice Roots India</strong> ("we", "our", "us") is committed to protecting your privacy. This policy explains what information we collect, how we use it, and what rights you have regarding your personal data. We comply with India's <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong>.
            </p>
          </div>

          {[
            {
              title: "1. Information We Collect",
              content: [
                "**Personal Identification:** Full name, email address, phone number, and delivery address collected at registration and checkout.",
                "**Transaction Data:** Order history, payment status (processed securely via Razorpay — we never store card details), and invoice records.",
                "**Device & Usage Data:** IP address, browser type, pages visited, time on site, and referral URL for analytics purposes.",
                "**Communications:** Messages sent via our Contact form or WhatsApp support.",
              ],
            },
            {
              title: "2. How We Use Your Information",
              content: [
                "To process and fulfil your orders, send shipping confirmations and delivery updates.",
                "To send promotional emails and SMS (only if you opted in — you can unsubscribe anytime).",
                "To improve our website, catalogue, and customer experience using aggregated analytics.",
                "To comply with legal obligations under Indian tax law (GST Act) and satisfy FSSAI traceability requirements.",
              ],
            },
            {
              title: "3. Data Sharing",
              content: [
                "**Shipping Partners:** Your name, address, and phone are shared with Delhivery / Shiprocket solely to fulfill delivery.",
                "**Payment Gateway:** Order amounts are securely handled by Razorpay (PCI-DSS compliant). We receive only payment confirmation.",
                "**Analytics:** Anonymised, aggregated data may be processed by Google Analytics. No personally identifiable data is sold, ever.",
                "We do NOT sell or rent your personal data to any third party.",
              ],
            },
            {
              title: "4. Data Storage & Retention",
              content: [
                "All data is stored on AWS servers located in Mumbai (ap-south-1) region.",
                "Account data is retained for 3 years after your last activity or until deletion is requested.",
                "Order records are retained for 7 years as required by Indian GST and accounting regulations.",
              ],
            },
            {
              title: "5. Your Rights (DPDPA 2023)",
              content: [
                "**Right to Access:** Request a copy of all personal data we hold about you.",
                "**Right to Correction:** Request correction of inaccurate or incomplete data.",
                "**Right to Erasure:** Request deletion of your account and associated data (subject to legal retention requirements).",
                "**Right to Withdraw Consent:** Unsubscribe from marketing at any time via link in emails or by emailing privacy@spicerootsindia.com.",
              ],
            },
            {
              title: "6. Cookies",
              content: [
                "We use essential cookies (cart, session) and optional analytics cookies (Google Analytics).",
                "You can manage cookie preferences in your browser settings. Disabling cookies may limit some website features.",
              ],
            },
            {
              title: "7. Contact Us",
              content: [
                "For any privacy-related requests: **privacy@spicerootsindia.com** or write to: Spice Roots India, Idukki District, Kerala — 685501.",
                "We will respond to data requests within 30 days as required by DPDPA.",
              ],
            },
          ].map(section => (
            <section key={section.title} className="mb-10">
              <h2 className="text-xl font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">{section.title}</h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex gap-3 text-stone-600 text-sm leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="border-t border-stone-100 pt-8 mt-8 flex flex-wrap gap-4 text-sm text-stone-500">
          <Link href="/terms" className="hover:text-orange-600 transition">Terms of Service</Link>
          <span>·</span>
          <Link href="/refunds" className="hover:text-orange-600 transition">Refund Policy</Link>
          <span>·</span>
          <Link href="/shipping" className="hover:text-orange-600 transition">Shipping Policy</Link>
        </div>
      </div>
    </div>
  );
}
