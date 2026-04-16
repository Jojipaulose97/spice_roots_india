import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-24 flex justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-8 shadow-sm h-fit">
        <h1 className="text-3xl font-extrabold text-stone-900 mb-2">Join Spice Roots</h1>
        <p className="text-stone-500 text-sm mb-8">Experience authentic farm-direct spices.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Full Name</label>
            <Input type="text" placeholder="John Doe" className="h-12 bg-stone-50" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Email Address</label>
            <Input type="email" placeholder="you@example.com" className="h-12 bg-stone-50" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Password</label>
            <Input type="password" placeholder="••••••••" className="h-12 bg-stone-50" />
          </div>
          <label className="flex items-center gap-2 mt-4 text-sm text-stone-600 cursor-pointer">
            <input type="checkbox" className="accent-orange-600 w-4 h-4 cursor-pointer" /> I agree to the <Link href="/legal" className="text-orange-600 underline">Terms & Conditions</Link>
          </label>
          <Button size="lg" className="w-full h-14 text-lg bg-orange-600 hover:bg-orange-700 shadow-md mt-6">Create Account</Button>
        </form>

        <div className="mt-8 text-center text-sm text-stone-600">
          Already have an account? <Link href="/login" className="text-orange-600 font-bold hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
