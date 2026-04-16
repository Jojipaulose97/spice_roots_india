import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Spice Roots India",
  description: "Terms and conditions governing your use of Spice Roots India's website and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-stone-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <p className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms of Service</h1>
          <p className="text-stone-400">Last updated: April 16, 2026 · Governed by Indian law</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 text-sm text-stone-700 leading-relaxed">
          By accessing or using spicerootsindia.com, you agree to be bound by these Terms of Service. Please read them carefully before placing any order.
        </div>

        {[
          {
            title: "1. About Us",
            content: "Spice Roots India is a direct-to-consumer food brand operating under Indian law, selling farm-origin spices, teas, and gift hampers. Our registered address is Idukki District, Kerala — 685501.",
          },
          {
            title: "2. Product Descriptions & Accuracy",
            content: "We strive to accurately represent all products, including weight, origin, and aroma profiles. Slight natural colour variations between batches are inherent to organic produce and do not constitute a defect. We reserve the right to update product details without notice as harvest batches change.",
          },
          {
            title: "3. Pricing & Payments",
            content: "All prices are listed in Indian Rupees (INR) and are inclusive of applicable GST (5% on food products). International orders are billed in INR; currency conversion applicable per your bank. Payment is processed via Razorpay — we accept UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) for eligible pin codes.",
          },
          {
            title: "4. Order Processing",
            content: "Orders are confirmed via email within 30 minutes of successful payment. We reserve the right to cancel any order if the product is out of stock, the delivery address is unserviceable, or suspected fraudulent activity is detected. In such cases, a full refund will be issued within 5–7 business days.",
          },
          {
            title: "5. Intellectual Property",
            content: "All content on this website — including product photography, brand identity, recipes, blog posts, and code — is the exclusive intellectual property of Spice Roots India. Reproduction, redistribution, or commercial use without written permission is prohibited.",
          },
          {
            title: "6. User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account credentials. We are not liable for losses arising from unauthorised access to your account if you share your password or fail to log out from shared devices.",
          },
          {
            title: "7. Prohibited Use",
            content: "You may not use this site to: (a) violate applicable Indian law, (b) transmit spam or unsolicited communications, (c) attempt to gain unauthorised access to our systems, (d) scrape pricing or product data for commercial use, or (e) post false reviews.",
          },
          {
            title: "8. Limitation of Liability",
            content: "To the fullest extent permitted by Indian law, Spice Roots India shall not be liable for indirect, incidental, or consequential damages arising from the use or inability to use our products or services. Our maximum liability is limited to the amount paid for the specific order in question.",
          },
          {
            title: "9. Governing Law & Disputes",
            content: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Ernakulam, Kerala. Before initiating legal proceedings, parties agree to attempt resolution via written notice and a 30-day good-faith negotiation period.",
          },
          {
            title: "10. Changes to Terms",
            content: "We may update these Terms at any time. The updated date at the top of this page reflects the latest revision. Continued use of the website after changes constitutes acceptance of the revised Terms.",
          },
        ].map(section => (
          <section key={section.title} className="mb-8">
            <h2 className="text-lg font-bold text-stone-900 mb-3">{section.title}</h2>
            <p className="text-stone-600 text-sm leading-relaxed">{section.content}</p>
          </section>
        ))}

        <div className="border-t border-stone-100 pt-8 mt-8 flex flex-wrap gap-4 text-sm text-stone-500">
          <Link href="/privacy" className="hover:text-orange-600 transition">Privacy Policy</Link>
          <span>·</span>
          <Link href="/refunds" className="hover:text-orange-600 transition">Refund Policy</Link>
          <span>·</span>
          <Link href="/shipping" className="hover:text-orange-600 transition">Shipping Policy</Link>
        </div>
      </div>
    </div>
  );
}
