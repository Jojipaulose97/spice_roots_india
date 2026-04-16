import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-24 flex justify-center min-h-[70vh]">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-8 shadow-sm h-fit">
        <h1 className="text-3xl font-extrabold text-stone-900 mb-2">Welcome Back</h1>
        <p className="text-stone-500 text-sm mb-8">Enter your credentials to access your account.</p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Email Address</label>
            <Input type="email" placeholder="you@example.com" className="h-12 bg-stone-50" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-stone-900">Password</label>
              <a href="#" className="text-xs text-orange-600 font-medium hover:underline">Forgot password?</a>
            </div>
            <Input type="password" placeholder="••••••••" className="h-12 bg-stone-50" />
          </div>
          <Button size="lg" className="w-full h-14 text-lg bg-stone-900 hover:bg-orange-600 shadow-md mt-4">Sign In</Button>
        </form>

        <div className="mt-8 text-center text-sm text-stone-600">
          Don't have an account? <Link href="/register" className="text-orange-600 font-bold hover:underline">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
