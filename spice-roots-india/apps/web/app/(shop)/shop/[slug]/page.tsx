import Image from 'next/image';
import Link from 'next/link';
import ImageGallery from './ImageGallery';
import ProductControls from './ProductControls';
import ProductTabs from './ProductTabs';
import ProductReviews from './ProductReviews';

const PRODUCTS: Record<string, {
  name: string; category: string; origin: string; price: number; originalPrice: number;
  description: string; howToUse: string; img: string; thumbnails: string[];
  tags: string[]; fssai: boolean; inStock: boolean; sku: string;
  highlights: { icon: string; label: string; value: string }[];
}> = {
  '1': {
    name: 'Premium Green Cardamom (8mm)',
    category: 'Whole Spices',
    origin: 'Idukki, Kerala',
    price: 450, originalPrice: 620,
    img: 'https://res.cloudinary.com/demo/image/upload/v1/samples/food/spices',
    thumbnails: [
      'https://picsum.photos/seed/cardamom2/400/400',
      'https://picsum.photos/seed/cardamom3/400/400',
      'https://picsum.photos/seed/cardamom4/400/400',
    ],
    description: 'Sourced directly from the lush plantations of Idukki, these 8mm bold green cardamom pods are handpicked at peak ripeness, naturally sun-dried, and vacuum-sealed to lock in their intense aroma and essential oils. One whiff and you\'ll know the difference from supermarket spices.\n\nPerfect for biryanis, masala chai, kheer, garam masala blends, and desserts. The large 8mm grade is prized by chefs and serious home cooks worldwide.',
    howToUse: 'Crush lightly before adding to curries or rice dishes to release the oils. Add whole pods to boiling water for chai. Grind seeds for fresh cardamom powder. Store in an airtight container away from light and moisture.',
    tags: ['Cardamom', 'Whole', 'Kerala', '8mm Grade'],
    fssai: true, inStock: true, sku: 'SRI-CARD-8MM',
    highlights: [
      { icon: '📍', label: 'Origin',     value: 'Idukki, Kerala' },
      { icon: '🌿', label: 'Processing', value: 'Sun-dried, Natural' },
      { icon: '🏆', label: 'Grade',      value: '8mm Bold' },
      { icon: '📦', label: 'Dispatch',   value: 'Within 24 hrs' },
    ],
  },
  '2': {
    name: 'Tellicherry Black Pepper',
    category: 'Whole Spices',
    origin: 'Kozhikode, Kerala',
    price: 320, originalPrice: 450,
    img: 'https://picsum.photos/seed/pepper/800/800',
    thumbnails: ['https://picsum.photos/seed/pepper2/400/400', 'https://picsum.photos/seed/pepper3/400/400', 'https://picsum.photos/seed/pepper4/400/400'],
    description: 'Kozhikodan Tellicherry pepper — known globally as the king of peppers. These are left on the vine longer than standard pepper, developing a larger size, bolder aroma, and a complex flavour profile that regular black pepper simply cannot match.\n\nPerfect for marinades, steak rubs, freshly ground table seasoning, and traditional Kerala cuisine.',
    howToUse: 'Grind fresh over food just before serving for maximum flavour. Add whole to broths and curries. Use in a pepper mill for daily seasoning.',
    tags: ['Pepper', 'Black', 'Tellicherry', 'Whole'],
    fssai: true, inStock: true, sku: 'SRI-TPEP-100',
    highlights: [
      { icon: '📍', label: 'Origin',     value: 'Kozhikode, Kerala' },
      { icon: '🌿', label: 'Processing', value: 'Vine-ripened, Sundried' },
      { icon: '🏆', label: 'Grade',      value: 'Tellicherry Extra Bold' },
      { icon: '📦', label: 'Dispatch',   value: 'Within 24 hrs' },
    ],
  },
  '3': {
    name: 'Ceylon Cinnamon Quills',
    category: 'Whole Spices',
    origin: 'Thrissur, Kerala',
    price: 550, originalPrice: 720,
    img: 'https://picsum.photos/seed/cinnamon/800/800',
    thumbnails: ['https://picsum.photos/seed/cinnamon2/400/400', 'https://picsum.photos/seed/cinnamon3/400/400', 'https://picsum.photos/seed/cinnamon4/400/400'],
    description: 'True Ceylon cinnamon (Cinnamomum verum), not the cheaper cassia variety most stores sell. Our quills are thin, multi-layered, and delicately fragrant — mild, subtly sweet, and significantly lower in coumarin than cassia.\n\nIdeal for baking, oatmeal, herbal teas, Mexican hot chocolate, and gourmet cooking.',
    howToUse: 'Break a small piece and add to hot liquids — tea, milk, or stew. Grind for fresh cinnamon powder. Use whole in biryani and rice dishes.',
    tags: ['Cinnamon', 'Ceylon', 'Whole', 'True Cinnamon'],
    fssai: true, inStock: true, sku: 'SRI-CINN-100',
    highlights: [
      { icon: '📍', label: 'Origin',     value: 'Thrissur, Kerala' },
      { icon: '🌿', label: 'Type',       value: 'True Ceylon (Verum)' },
      { icon: '🏆', label: 'Grade',      value: 'Premium Quills' },
      { icon: '📦', label: 'Dispatch',   value: 'Within 24 hrs' },
    ],
  },
  '4': {
    name: 'Clove Buds (Idukki)',
    category: 'Whole Spices',
    origin: 'Idukki, Kerala',
    price: 280, originalPrice: 390,
    img: 'https://picsum.photos/seed/cloves/800/800',
    thumbnails: ['https://picsum.photos/seed/cloves2/400/400', 'https://picsum.photos/seed/cloves3/400/400', 'https://picsum.photos/seed/cloves4/400/400'],
    description: 'Hand-harvested clove buds from the ancient spice gardens of Idukki. High eugenol content gives them their characteristic warmth and numbing quality. These are not the dusty, flavourless cloves you find in supermarkets.\n\nIdeal for pickling, biryani, chai masala, garam masala, and traditional medicinal preparations.',
    howToUse: 'Add whole to hot oil at the start of cooking to infuse flavour. Use in biryani rice. Grind for clove powder in garam masala. Store sealed to preserve volatile oils.',
    tags: ['Cloves', 'Buds', 'Idukki', 'Whole'],
    fssai: true, inStock: true, sku: 'SRI-CLVE-100',
    highlights: [
      { icon: '📍', label: 'Origin',     value: 'Idukki, Kerala' },
      { icon: '🌿', label: 'Processing', value: 'Hand-harvested, Dried' },
      { icon: '🏆', label: 'Grade',      value: 'High Eugenol Premium' },
      { icon: '📦', label: 'Dispatch',   value: 'Within 24 hrs' },
    ],
  },
};

const FALLBACK = PRODUCTS['1'];

const RELATED_ALL = [
  { id: 1, name: 'Premium Green Cardamom', price: 450, img: 'https://picsum.photos/seed/cardamom/400/400' },
  { id: 2, name: 'Tellicherry Black Pepper', price: 320, img: 'https://picsum.photos/seed/pepper/400/400' },
  { id: 3, name: 'Ceylon Cinnamon Quills',   price: 550, img: 'https://picsum.photos/seed/cinnamon/400/400' },
  { id: 4, name: 'Clove Buds (Idukki)',      price: 280, img: 'https://picsum.photos/seed/cloves/400/400' },
];

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS[slug] ?? FALLBACK;
  const related = RELATED_ALL.filter(r => r.id !== Number(slug)).slice(0, 4);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-6 pb-2">
        <nav className="text-sm text-stone-400 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-orange-600 transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-orange-600 transition">Shop</Link>
          <span>/</span>
          <span className="text-stone-700 font-medium">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* Left — Image Gallery */}
          <ImageGallery main={product.img} thumbnails={product.thumbnails} name={product.name} />

          {/* Right — Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-5">

            {/* Category + Stock */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                {product.category}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.inStock ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-stone-400 text-sm mt-1.5">SKU: {product.sku} · Origin: <span className="text-stone-600 font-medium">{product.origin}</span></p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400 text-lg leading-none">★★★★★</div>
              <span className="text-stone-700 text-sm font-semibold">4.9</span>
              <span className="text-stone-400 text-sm">·</span>
              <a href="#reviews" className="text-stone-500 text-sm hover:text-orange-600 transition">128 Reviews</a>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-5 border-b border-stone-100">
              <span className="text-4xl font-black text-stone-900">₹{product.price}</span>
              <span className="text-xl text-stone-400 line-through font-medium">₹{product.originalPrice}</span>
              <span className="text-sm font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">{discount}% OFF</span>
            </div>

            {/* Interactive Controls */}
            <ProductControls
              id={Number(slug)}
              price={product.price}
              originalPrice={product.originalPrice}
              name={product.name}
              img={product.img}
              currentId={Number(slug)}
              inStock={product.inStock}
            />

            {/* Highlights Strip */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {product.highlights.map(h => (
                <div key={h.label} className="flex items-center gap-3 bg-stone-50 rounded-2xl px-4 py-3 border border-stone-100">
                  <span className="text-xl">{h.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{h.label}</p>
                    <p className="text-sm font-semibold text-stone-800">{h.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="bg-linear-to-br from-stone-50 to-orange-50 rounded-2xl p-5 border border-orange-100">
              <ul className="space-y-2.5">
                {[
                  { icon: '🚚', text: 'Free shipping on orders above ₹999' },
                  { icon: '💵', text: 'Cash on Delivery available' },
                  { icon: '🏅', text: 'FSSAI Certified · License: 10020042014432' },
                  { icon: '↩️', text: '7-day easy return policy' },
                  { icon: '🔒', text: 'Secure payment — Razorpay / UPI / COD' },
                ].map(b => (
                  <li key={b.text} className="flex items-center gap-3 text-sm text-stone-700">
                    <span className="text-base">{b.icon}</span>
                    {b.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs bg-stone-100 text-stone-500 px-3 py-1 rounded-full font-medium border border-stone-200">
                  # {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description / How to Use / Shipping Tabs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-14">
        <ProductTabs description={product.description} howToUse={product.howToUse} />
      </div>

      {/* You May Also Like */}
      <div className="bg-stone-50 border-t border-stone-100 py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-stone-900">You May Also Like</h2>
            <Link href="/shop" className="text-sm text-orange-600 font-semibold hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {related.map(prod => (
              <Link key={prod.id} href={`/shop/${prod.id}`} className="group bg-white border border-stone-200 hover:border-orange-300 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <Image src={prod.img} alt={prod.name} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="300px" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-stone-900 text-sm leading-snug group-hover:text-orange-700 transition line-clamp-2 mb-2">{prod.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-bold">₹{prod.price}</span>
                    <span className="text-xs text-stone-400 group-hover:text-orange-500 transition font-medium">View →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-14">
        <ProductReviews productName={product.name} />
      </div>
    </div>
  );
}

