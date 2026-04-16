import Link from "next/link";
import {  Button  } from "@/app/components/ui/Button";

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      
      <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-2 block">Thank You</span>
      <h1 className="text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">Your order is confirmed!</h1>
      <p className="text-stone-600 text-lg mb-8">
        We've received your order and are currently processing it. A confirmation email has been sent to your inbox.
      </p>

      <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm text-left mb-8">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="text-stone-500 uppercase tracking-widest text-xs font-semibold mb-1">Order Number</h4>
            <p className="font-bold text-stone-900 text-lg">#{params.id.slice(0,8).toUpperCase()}</p>
          </div>
          <div>
            <h4 className="text-stone-500 uppercase tracking-widest text-xs font-semibold mb-1">Date</h4>
            <p className="font-medium text-stone-900 uppercase">April 16, 2026</p>
          </div>
          <div>
            <h4 className="text-stone-500 uppercase tracking-widest text-xs font-semibold mb-1">Payment Method</h4>
            <p className="font-medium text-stone-900">Razorpay - UPI</p>
          </div>
          <div>
            <h4 className="text-stone-500 uppercase tracking-widest text-xs font-semibold mb-1">Total Fixed</h4>
            <p className="font-bold text-orange-600 text-lg">₹1,090</p>
          </div>
        </div>

        <div className="border-t border-stone-100 mt-6 pt-6">
          <h4 className="text-stone-500 uppercase tracking-widest text-xs font-semibold mb-3">Order Status</h4>
          
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-100 -z-10 -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-1/4 h-1 bg-green-500 -z-10 -translate-y-1/2 rounded-full"></div>
            
            <div className="flex flex-col items-center">
               <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow ring-4 ring-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg></div>
               <span className="text-xs font-semibold mt-2 text-stone-900">Confirmed</span>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center text-stone-400 shadow ring-4 ring-white"></div>
               <span className="text-xs font-medium mt-2 text-stone-500">Packed</span>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center text-stone-400 shadow ring-4 ring-white"></div>
               <span className="text-xs font-medium mt-2 text-stone-500">Shipped</span>
            </div>
            <div className="flex flex-col items-center">
               <div className="w-8 h-8 rounded-full bg-white border-2 border-stone-300 flex items-center justify-center text-stone-400 shadow ring-4 ring-white"></div>
               <span className="text-xs font-medium mt-2 text-stone-500">Delivered</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/shop">
          <Button variant="outline" size="lg" className="border-stone-300 bg-white shadow-sm hover:bg-stone-50 w-full sm:w-auto">Continue Shopping</Button>
        </Link>
        <Link href={`/track?orderId=${params.id}`}>
          <Button size="lg" className="bg-stone-900 hover:bg-orange-600 text-white w-full sm:w-auto shadow-md">Track Order</Button>
        </Link>
      </div>
    </div>
  );
}
