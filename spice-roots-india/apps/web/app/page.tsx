import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

const FEATURED_PRODUCTS = [
  { id: 1, name: "Premium Green Cardamom", price: 450, oldPrice: 600, img: "https://picsum.photos/seed/cardamom/600/600" },
  { id: 2, name: "Tellicherry Black Pepper", price: 320, oldPrice: 420, img: "https://picsum.photos/seed/pepper/600/600" },
  { id: 3, name: "Ceylon Cinnamon Quills", price: 550, oldPrice: 700, img: "https://picsum.photos/seed/cinnamon/600/600" },
  { id: 4, name: "Clove Buds (Idukki)", price: 280, oldPrice: 380, img: "https://picsum.photos/seed/cloves/600/600" },
];

const TRUST_BADGES = [
  "100% Natural",
  "Farm Direct",
  "Kerala Origin",
  "Pan India Delivery",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <Image
          src="https://picsum.photos/seed/hero/1920/1920"
          alt="Kerala Spice Farm"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent z-10" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-4 block animate-pulse">Harvested in Kerala</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 drop-shadow-2xl leading-tight">
            The True Essence<br />of Indian Spices.
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Unadulterated, farm-direct spices sourced from generational farmers in Idukki. Experience flavors kept hidden for centuries.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/shop">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-500 text-white px-10 text-lg shadow-2xl shadow-orange-900/40 h-14">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-white border-white/60 hover:bg-white hover:text-stone-900 h-14 px-8 backdrop-blur-sm">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-orange-50 border-y border-orange-100 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap justify-center md:justify-between items-center gap-6">
          {TRUST_BADGES.map(badge => (
            <span key={badge} className="flex items-center gap-2 text-sm md:text-base font-semibold text-orange-900">
              <svg className="w-5 h-5 text-orange-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-3 block">Our Bestsellers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Loved by Chefs & Homes</h2>
            <div className="w-16 h-1 bg-orange-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((prod) => (
              <Link href={`/shop/${prod.id}`} key={prod.id} className="group flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 mb-4 shadow-sm">
                  <Image
                    src={prod.img}
                    alt={prod.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button className="bg-white text-stone-900 shadow-xl hover:bg-orange-600 hover:text-white transition text-sm px-4">
                      Quick Add
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-stone-800 group-hover:text-orange-700 transition">{prod.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-orange-600 font-bold">₹{prod.price}</span>
                  <span className="text-stone-400 text-sm line-through">₹{prod.oldPrice}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/shop">
              <Button variant="outline" size="lg" className="border-stone-300 px-12 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition">
                View Entire Collection →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Spice Roots India — Premium redesign ── */}
      <section className="relative overflow-hidden bg-[#0f0e0b] text-white">

        {/* Decorative spice-dust blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-orange-700/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />

        {/* ── Stats Bar ── */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: "40+", label: "Years of Farming" },
              { number: "12K+", label: "Happy Customers" },
              { number: "100%", label: "Organic Certified" },
              { number: "24hr", label: "Dispatch Promise" },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-orange-400 tracking-tight mb-1">{stat.number}</p>
                <p className="text-stone-400 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Heading + feature list */}
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">Our Promise to You</span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Why Choose<br />
                <span className="text-orange-400">Spice Roots India?</span>
              </h2>
              <p className="text-stone-400 text-lg leading-relaxed mb-12 max-w-lg">
                We're not just selling spices. Every pouch carries four decades of farming wisdom, zero middlemen, and a promise to your kitchen.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    ),
                    title: "100% Organic Farming",
                    desc: "Shade-grown on the Western Ghats slopes. No synthetic inputs, ever. FSSAI & organic certified on every batch.",
                    accent: "bg-green-500/10 text-green-400",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                      </svg>
                    ),
                    title: "Vacuum-Sealed Freshness",
                    desc: "Nitrogen-flushed, airtight pouches that lock essential oils and peak aroma for up to 18 months.",
                    accent: "bg-orange-500/10 text-orange-400",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    ),
                    title: "Farm-to-Door in 24 hrs",
                    desc: "Packed the day your order arrives. Dispatched same day via priority courier with live GPS tracking.",
                    accent: "bg-amber-500/10 text-amber-400",
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    ),
                    title: "Fair Trade · Farmer First",
                    desc: "85% of your purchase price flows directly to our partner farming families. No agents. No exploitation.",
                    accent: "bg-rose-500/10 text-rose-400",
                  },
                ].map(f => (
                  <div key={f.title} className="flex items-start gap-5 group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${f.accent} transition group-hover:scale-110 duration-300`}>
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white mb-1">{f.title}</h3>
                      <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Stacked image card with label badges */}
            <div className="relative flex items-center justify-center">
              {/* Background glow blob */}
              <div className="absolute w-72 h-72 bg-orange-600/20 rounded-full blur-3xl" />

              <div className="relative w-full max-w-md">
                {/* Main image card */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                  <Image
                    src="https://picsum.photos/seed/farm/600/750"
                    alt="Spice farm in Kerala"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold text-lg">Idukki District, Kerala</p>
                    <p className="text-stone-300 text-sm">2,000m above sea level · Optimal growing climate</p>
                  </div>
                </div>

                {/* Floating badge — top right */}
                <div className="absolute -top-4 -right-4 bg-orange-600 text-white rounded-2xl px-4 py-3 shadow-xl shadow-orange-900/40 text-center min-w-[100px]">
                  <p className="text-2xl font-extrabold">40+</p>
                  <p className="text-xs font-semibold opacity-90 leading-tight">Years of<br/>Farming</p>
                </div>

                {/* Floating badge — bottom left */}
                <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">FSSAI Certified</p>
                    <p className="text-stone-400 text-xs">Every single batch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA Banner ── */}
        <div className="relative overflow-hidden">
          {/* Gradient accent line on top */}
          <div className="h-px bg-gradient-to-r from-transparent via-orange-600/50 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
            <div className="relative bg-gradient-to-br from-stone-800 to-stone-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl px-8 md:px-14 py-12">
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -left-20 -top-20 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                {/* Left: Headline */}
                <div className="text-center lg:text-left">
                  <p className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-3">Limited Time Offer</p>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                    Ready to taste<br className="hidden md:block" /> the difference?
                  </h3>
                  <p className="text-stone-400 text-base max-w-sm">
                    <span className="text-orange-400 font-semibold">Free shipping</span> on all orders above ₹499. Same-day dispatch. No compromises.
                  </p>

                  {/* Mini trust row */}
                  <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
                    {["FSSAI Certified", "No Middlemen", "7-Day Returns"].map(badge => (
                      <span key={badge} className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                        <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                        </svg>
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                  <a
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-900/30 transition-all hover:scale-105 whitespace-nowrap text-base"
                  >
                    Shop the Collection
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                  </a>
                  <a
                    href="/shop?cat=Gift+Hampers"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all hover:scale-105 whitespace-nowrap text-base backdrop-blur-sm"
                  >
                    🎁 Gift Hampers
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recipe Inspiration ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-3 block">Cook with Confidence</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 mb-4">Recipe Inspiration</h2>
            <p className="text-stone-500 max-w-lg mx-auto text-sm">From your kitchen to Kerala's hillside. How our spices come alive in real recipes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Kerala Cardamom Chai",
                time: "10 min", difficulty: "Easy", serves: "2",
                img: "https://picsum.photos/seed/chai/600/400",
                spice: "Green Cardamom",
                steps: ["Crush 4 cardamom pods. Bring 400ml water + milk to boil.", "Add 2 tsp loose tea, crushed cardamom, ½ tsp ginger.", "Simmer 5 min, strain, sweeten with jaggery."],
                badge: "Most Popular",
                badgeColor: "bg-orange-600",
              },
              {
                title: "Pepper Chettinad Chicken",
                time: "45 min", difficulty: "Medium", serves: "4",
                img: "https://picsum.photos/seed/pepper/600/400",
                spice: "Tellicherry Pepper",
                steps: ["Marinate chicken in 2 tsp freshly cracked pepper, turmeric, salt.", "Sauté in sesame oil with shallots, curry leaves.", "Cook down with coconut milk until thick and rich."],
                badge: "Chef's Pick",
                badgeColor: "bg-stone-900",
              },
              {
                title: "Cinnamon Banana Oatmeal",
                time: "8 min", difficulty: "Easy", serves: "1",
                img: "https://picsum.photos/seed/cinnamon/600/400",
                spice: "Ceylon Cinnamon",
                steps: ["Simmer oats in 250ml milk for 5 min.", "Stir in ½ tsp Ceylon cinnamon, sliced banana, honey.", "Top with crushed nuts and a dusting of cinnamon."],
                badge: "Healthy Pick",
                badgeColor: "bg-green-600",
              },
            ].map(recipe => (
              <div key={recipe.title} className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-stone-100">
                  <Image
                    src={recipe.img} alt={recipe.title} fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-4 left-4 ${recipe.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {recipe.badge}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-white/90 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                    Uses: {recipe.spice}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-extrabold text-stone-900 text-lg mb-1">{recipe.title}</h3>
                  <div className="flex gap-4 text-xs text-stone-400 mb-4">
                    <span>⏱ {recipe.time}</span>
                    <span>👨‍🍳 {recipe.difficulty}</span>
                    <span>🍽 Serves {recipe.serves}</span>
                  </div>
                  <ol className="space-y-2 flex-1">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-2.5 text-xs text-stone-600 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all z-50"
        aria-label="Chat on WhatsApp"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
