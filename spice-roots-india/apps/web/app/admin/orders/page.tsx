import {  Button  } from "@/app/components/ui/Button";
import {  Badge  } from "@/app/components/ui/Badge";

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Order Management</h1>
        <Button variant="outline" className="bg-white">Export CSV</Button>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 flex gap-4 mb-6">
        <input type="text" placeholder="Search Order ID, Email..." className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm outline-none" />
        <select className="border border-stone-200 rounded-lg px-4 py-2 text-sm outline-none bg-stone-50">
          <option>All Statuses</option>
          <option>Placed</option>
          <option>Confirmed</option>
          <option>Packed</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
        <select className="border border-stone-200 rounded-lg px-4 py-2 text-sm outline-none bg-stone-50">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden text-sm">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-stone-600">Order ID</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Customer</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Date</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Total</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Status</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            <tr className="hover:bg-stone-50 transition">
              <td className="px-6 py-4 font-mono font-medium">#SPICE-12345</td>
              <td className="px-6 py-4">
                <div className="font-bold text-stone-900">Ankit Sharma</div>
                <div className="text-xs text-stone-500">ankit@example.com</div>
              </td>
              <td className="px-6 py-4 text-stone-500">April 16, 2026</td>
              <td className="px-6 py-4 font-bold">₹1,090</td>
              <td className="px-6 py-4"><Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Placed</Badge></td>
              <td className="px-6 py-4 text-right">
                <Button size="sm" className="bg-stone-900 hover:bg-orange-600 text-white rounded shrink-0">Update</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
