import Image from "next/image";
import { Button } from "@/app/components/ui/Button";

export default function AdminProductsPage() {
  const products = [
    { id: 1, name: "Green Cardamom 8mm", slug: "green-cardamom-8mm", category: "Whole Spices", price: 450, stock: 120, img: "https://picsum.photos/seed/cardamom/100/100" },
    { id: 2, name: "Tellicherry Black Pepper", slug: "tellicherry-black-pepper", category: "Whole Spices", price: 320, stock: 85, img: "https://picsum.photos/seed/pepper/100/100" },
    { id: 3, name: "Ceylon Cinnamon Quills", slug: "ceylon-cinnamon", category: "Whole Spices", price: 550, stock: 7, img: "https://picsum.photos/seed/cinnamon/100/100" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Products</h1>
          <p className="text-stone-500 text-sm mt-1">{products.length} products total</p>
        </div>
        <Button className="bg-stone-900 text-white hover:bg-orange-600 transition">+ Add Product</Button>
      </div>
      
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-stone-600">Product</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Category</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Base Price</th>
              <th className="px-6 py-4 font-semibold text-stone-600">Stock</th>
              <th className="px-6 py-4 font-semibold text-stone-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-stone-50 transition group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                      <Image src={p.img} alt={p.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900 group-hover:text-orange-700 transition">{p.name}</div>
                      <div className="text-xs text-stone-400">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-xs font-semibold">{p.category}</span>
                </td>
                <td className="px-6 py-4 font-semibold text-stone-900">₹{p.price}</td>
                <td className="px-6 py-4">
                  <span className={`font-bold px-2.5 py-1 rounded-full text-xs ${p.stock > 10 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {p.stock < 10 ? "⚠ " : ""}{p.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-orange-600 hover:underline font-medium">Edit</button>
                  <button className="text-red-400 hover:text-red-600 hover:underline font-medium transition">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
