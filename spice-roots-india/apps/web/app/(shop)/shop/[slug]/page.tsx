import Image from "next/image";
import Link from "next/link";
import ProductControls from "./ProductControls";
import ProductReviews from "./ProductReviews";

const PRODUCTS: Record<string, {
  name: string; category: string; price: number; originalPrice: number;
  description: string; img: string; thumbnails: string[]; tags: string[];
}> = {
  "1": {
    name: "Premium Green Cardamom (8mm)",
    category: "Whole Spices",
    price: 450, originalPrice: 600,
    img: "https://picsum.photos/seed/cardamom/800/800",
    thumbnails: [
      "https://picsum.photos/seed/cardamom/200/200",
      "https://picsum.photos/seed/spice2/200/200",
      "https://picsum.photos/seed/spice3/200/200",
      "https://picsum.photos/seed/spice4/200/200",
    ],
    description: "Sourced directly from the lush plantations of Idukki. Our 8mm bold green cardamom is handpicked, naturally dried, and packed to retain its intense aroma and essential oils. Perfect for biryanis, chai, and desserts.",
    tags: ["Cardamom", "Whole", "Kerala"],
  },
  "2": {
    name: "Tellicherry Black Pepper",
    category: "Whole Spices",
    price: 320, originalPrice: 420,
    img: "https://picsum.photos/seed/pepper/800/800",
    thumbnails: [
      "https://picsum.photos/seed/pepper/200/200",
      "https://picsum.photos/seed/spice5/200/200",
      "https://picsum.photos/seed/cardamom/200/200",
      "https://picsum.photos/seed/spice4/200/200",
    ],
    description: "Kozhikodan Tellicherry pepper — known globally as the king of peppers. Larger, bolder, and more aromatic than regular black pepper. Perfect for marinades, steak rubs, and freshly ground sprinkling.",
    tags: ["Pepper", "Black", "Whole"],
  },
  "3": {
    name: "Ceylon Cinnamon Quills",
    category: "Whole Spices",
    price: 550, originalPrice: 700,
    img: "https://picsum.photos/seed/cinnamon/800/800",
    thumbnails: [
      "https://picsum.photos/seed/cinnamon/200/200",
      "https://picsum.photos/seed/spice4/200/200",
      "https://picsum.photos/seed/cardamom/200/200",
      "https://picsum.photos/seed/pepper/200/200",
    ],
    description: "True Ceylon cinnamon (Cinnamomum verum), not the cheaper cassia variety. Mild, subtly sweet, and low in coumarin. Ideal for baking, oatmeal, herbal teas, and gourmet cooking.",
    tags: ["Cinnamon", "Ceylon", "Whole"],
  },
  "4": {
    name: "Clove Buds (Idukki)",
    category: "Whole Spices",
    price: 280, originalPrice: 380,
    img: "https://picsum.photos/seed/cloves/800/800",
    thumbnails: [
      "https://picsum.photos/seed/cloves/200/200",
      "https://picsum.photos/seed/pepper/200/200",
      "https://picsum.photos/seed/cinnamon/200/200",
      "https://picsum.photos/seed/cardamom/200/200",
    ],
    description: "Hand-harvested clove buds from the ancient spice gardens of Idukki. High eugenol content makes these ideal for pickling, biryani, chai masala, and medicinal preparations.",
    tags: ["Cloves", "Buds", "Idukki"],
  },
};

const FALLBACK = PRODUCTS["1"];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS[slug] ?? FALLBACK;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-orange-600 transition">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/shop" className="hover:text-orange-600 transition">Shop</Link>
        <span>&rsaquo;</span>
        <span className="text-stone-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery (Server-rendered) */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-sm">
            <Image
              src={product.img}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.thumbnails.map((thumb, i) => (
              <div key={i} className="relative aspect-square bg-stone-100 rounded-xl overflow-hidden border-2 border-stone-200 hover:border-orange-400 transition cursor-pointer">
                <Image
                  src={thumb}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition duration-300"
                  sizes="120px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col">
          <span className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-2">{product.category}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight leading-tight">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-amber-400 text-xl">★★★★★</div>
            <span className="text-stone-500 text-sm cursor-pointer hover:text-orange-600 transition">128 Reviews</span>
          </div>

          <p className="text-stone-600 leading-relaxed mb-6 text-base">{product.description}</p>

          {/* ✅ Interactive Client Component */}
          <ProductControls
            id={Number(slug)}
            price={product.price}
            name={product.name}
            img={product.img}
            currentId={Number(slug)}
          />

          {/* Trust Badges (static — stays server-rendered) */}
          <div className="bg-gradient-to-br from-stone-50 to-orange-50 p-6 rounded-2xl border border-orange-100">
            <ul className="space-y-3 text-sm text-stone-700">
              {[
                "Shipped within 24 hours",
                "Cash on Delivery Available",
                "FSSAI Certified Pure Quality",
                "7-Day Return Policy",
              ].map(badge => (
                <li key={badge} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {product.tags.map(tag => (
              <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full font-medium">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reviews ── */}
      <ProductReviews productName={product.name} />
    </div>
  );
}
