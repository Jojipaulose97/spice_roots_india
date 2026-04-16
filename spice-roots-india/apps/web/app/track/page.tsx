import {  Input  } from "@/app/components/ui/Input";
import {  Button  } from "@/app/components/ui/Button";

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
      <h1 className="text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">Track Your Shipment</h1>
      <p className="text-stone-600 text-lg mb-12">
        Enter your Order ID and Email Address to see exactly where your spices are.
      </p>

      <form className="bg-white border border-stone-200 rounded-3xl p-10 shadow-sm text-left flex flex-col gap-6">
        <div>
          <label className="block text-sm font-semibold text-stone-900 mb-2">Order ID</label>
          <Input placeholder="e.g. SPICE-12345" className="h-14 text-base" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-900 mb-2">Email or Phone Number</label>
          <Input placeholder="Enter the email/phone used during checkout" className="h-14 text-base" />
        </div>
        <Button size="lg" className="h-14 bg-orange-600 hover:bg-orange-700 text-lg shadow-lg font-bold">Track Shipment</Button>
      </form>
    </div>
  );
}
