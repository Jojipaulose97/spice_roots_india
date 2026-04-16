import {  Input  } from "@/app/components/ui/Input";
import {  Button  } from "@/app/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-stone-600 text-lg mb-10">We usually reply within 24 hours. For urgent bulk orders, ping us on WhatsApp.</p>
          
          <div className="space-y-6 mb-10">
            <div className="flex flex-col">
              <span className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-1">Email Us</span>
              <a href="mailto:hello@spicerootsindia.com" className="text-orange-600 font-medium">hello@spicerootsindia.com</a>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-1">WhatsApp</span>
              <a href="https://wa.me/919876543210" className="text-orange-600 font-medium">+91 98765 43210</a>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-stone-900 uppercase tracking-widest text-xs mb-1">Farm Address</span>
              <p className="text-stone-600 text-sm leading-relaxed">
                Spice Roots Estate,<br />
                Vandanmedu Post, Idukki District,<br />
                Kerala, India - 685551
              </p>
            </div>
          </div>
        </div>

        <form className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">First Name</label>
              <Input className="bg-stone-50 h-12" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">Last Name</label>
              <Input className="bg-stone-50 h-12" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Email</label>
            <Input type="email" className="bg-stone-50 h-12" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Message</label>
            <textarea className="w-full flex min-h-[150px] rounded-md border border-slate-300 bg-stone-50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-600" placeholder="How can we help?"></textarea>
          </div>
          <Button size="lg" className="h-14 bg-stone-900 hover:bg-orange-600 text-lg shadow">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
