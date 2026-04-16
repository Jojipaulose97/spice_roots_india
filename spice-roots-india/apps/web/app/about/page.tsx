import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Spice Roots India — Kerala Spice Farm Since 1983",
  description: "Learn about Spice Roots India — four decades of organic spice farming in Idukki, Kerala. From farm to your kitchen, we preserve India's spice heritage.",
};

const TIMELINE = [
  {
    year: "1983",
    title: "The Seeds Were Planted",
    desc: "Rajan Pillai, a third-generation farmer from Idukki, plants his first cardamom nursery at 950m above sea level on the slopes of the Western Ghats. He refuses to use chemical fertilisers, a decision considered eccentric by neighbours at the time.",
  },
  {
    year: "1998",
    title: "The Pepper Estate Expands",
    desc: "After 15 years of cultivating cardamom, the Pillai family acquires adjacent land and introduces Tellicherry black pepper — the large-berry cultivar prized by Malabar traders for centuries. The family cures pepper the old way: sun-drying on red-oxide floors for 5 days.",
  },
  {
    year: "2009",
    title: "Organic Certification",
    desc: "Spice Roots India achieves FSSAI certification and joins the One Certification body for organic agricultural produce. Every batch of spices is now tested for pesticide residue — consistently at zero. This is the year local hotel groups from Kochi begin sourcing directly from the farm.",
  },
  {
    year: "2019",
    title: "The Third Generation Steps In",
    desc: "Arjun Pillai, Rajan's youngest son and an agricultural science graduate from Kerala Agricultural University, returns home and introduces nitrogen-flushed vacuum packaging that extends shelf life from 3 months to 18 months without any preservatives.",
  },
  {
    year: "2026",
    title: "Farm to Every Kitchen in India",
    desc: "Spice Roots India launches direct-to-consumer e-commerce, removing all middlemen. For the first time, a household in Mumbai or Chandigarh can receive spices plucked from the same Idukki hillside that supplied maharajas and colonial spice traders centuries ago.",
  },
];

const TEAM = [
  {
    name: "Rajan Pillai",
    role: "Founder & Head Farmer",
    bio: "40+ years on the hill. Still wakes at 5 AM to walk the cardamom estate every morning.",
    img: "https://picsum.photos/seed/rajan/200/200",
  },
  {
    name: "Arjun Pillai",
    role: "CEO & Operations",
    bio: "BSc (Hons) Agriculture, KAU. Obsessed with traceability, packaging science, and direct farmer economics.",
    img: "https://picsum.photos/seed/arjun/200/200",
  },
  {
    name: "Divya Nair",
    role: "Head of Quality",
    bio: "Former food technologist at Tata Consumer Products. Ensures every batch meets our ruthless internal standards.",
    img: "https://picsum.photos/seed/divya/200/200",
  },
];

const VALUES = [
  {
    icon: "🌿",
    title: "Organic by Conviction",
    desc: "We've been farming without synthetic pesticides since 1983 — 27 years before organic was fashionable. Our soil health practices include intercropping, banana leaf composting, and drip irrigation that uses 60% less water than conventional farms.",
  },
  {
    icon: "⚖️",
    title: "Fair Economics",
    desc: "The global spice trade is notoriously exploitative. Large trading companies buy from farmers at ₹400/kg and sell at ₹2,400/kg. By selling direct, we pass ₹800 minimum to our partner farmers on every kilogram — 3× industry norm.",
  },
  {
    icon: "🔬",
    title: "Radical Transparency",
    desc: "Every product page carries harvest date, farm altitude, and batch moisture content. You can scan the QR code on any pouch to see the specific plantation lot, the harvest week, and the FSSAI test certificate. We call it Field-to-Pouch traceability.",
  },
  {
    icon: "🌍",
    title: "Sustainability First",
    desc: "Our cardamom is shade-grown under silver oak canopy — preserving the biodiversity of the Western Ghats UNESCO biodiversity hotspot. We use recycled kraft paper outer packaging and are working toward fully compostable inner liners by 2027.",
  },
];

const PRODUCTS_INFO = [
  {
    name: "Green Cardamom",
    origin: "Idukki District, Kerala · 800–1,250m elevation",
    detail: "The 'Queen of Spices'. Our cardamom is the Elettaria cardamomum large-seeded variety, harvested manually when the capsules are still green and 60% moisture. They're cured in dryers at ≤45°C to preserve the volatile cineol and linalool compounds that give Kerala cardamom its unique eucalyptus-mint-citrus signature.",
  },
  {
    name: "Tellicherry Black Pepper",
    origin: "Kozhikode & Malappuram, Kerala",
    detail: "True Tellicherry (Malabar) pepper is defined by berry size — only the top 10% of berries by diameter qualify. Our pepper vines are grown on areca nut standards as companion plants. Post-harvest, berries are blanched, sun-dried for 5 days, and hand-sorted. The result: deep, complex heat with floral top notes absent from ordinary pepper.",
  },
  {
    name: "Ceylon Cinnamon Quills",
    origin: "Thrissur & Palakkad, Kerala (Cinnamomum verum)",
    detail: "Most 'cinnamon' sold in India is cassia (Cinnamomum cassia), which contains high coumarin — potentially toxic in large quantities. Our pure Ceylon cinnamon has <0.004% coumarin by weight. The inner bark is harvested from 2-year-old shoots, rolled into multi-layered quills by hand, and dried at room temperature. Flavour profile: mild, sweet, complex vanilla notes.",
  },
  {
    name: "Wayanad Coffee",
    origin: "Wayanad District, Kerala · Arabica & Robusta blend",
    detail: "Wayanad's coffee estates sit at 700–1,400m under the shade of rosewood and silver oak. The mild climate and rich laterite soil produce a naturally low-acid, chocolatey cup. Our blend is 60% washed Arabica / 40% natural processed Robusta — ground fresh on order.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <Image
          src="https://picsum.photos/seed/hero/1920/1920"
          alt="Spice Roots Farm in Idukki, Kerala"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent z-10" />
        <div className="relative z-20 text-center px-6 max-w-3xl mx-auto">
          <span className="text-orange-400 font-bold tracking-widest uppercase text-xs mb-4 block">Est. 1983 · Idukki, Kerala</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl mb-6">Our Roots Run Deep.</h1>
          <p className="text-stone-300 text-lg md:text-xl leading-relaxed">
            Four decades. Three generations. One stubborn refusal to compromise on quality.
          </p>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4 block">The Origin Story</span>
              <h2 className="text-4xl font-extrabold text-stone-900 mb-6 leading-tight">Born in the Mist.<br/>Grown in Patience.</h2>
              <div className="space-y-5 text-stone-600 leading-relaxed">
                <p>
                  The Idukki district of Kerala sits within the Western Ghats — one of the world's 36 biodiversity hotspots, and historically the most coveted spice region on earth. Arab traders, Portuguese explorers, and the British East India Company all came to Kerala chasing one thing: spices.
                </p>
                <p>
                  The Pillai family has farmed these same hills since our great-grandfather's generation. But it was Rajan Pillai, in 1983, who made the decision that defines everything we do today: <strong>no synthetic inputs, ever</strong>. At the time, the government was promoting chemical fertiliser adoption across Kerala. Rajan chose the opposite direction — composted banana leaves, intercropped banana and silver oak, and traditional <em>kuzhimanthal</em> (pit manure) composting.
                </p>
                <p>
                  It took five years longer to see commercial yields. But the quality was unmistakable. Today, chefs from Kochi to Copenhagen seek out our cardamom specifically by batch number.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/farm/600/750"
                  alt="Idukki spice farm"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-bold">Rajan Pillai's cardamom estate</p>
                  <p className="text-stone-300 text-sm">Nedumkandam, Idukki · 980m asl</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-orange-600 rounded-2xl px-5 py-4 text-white text-center shadow-xl">
                <p className="text-3xl font-extrabold">40+</p>
                <p className="text-xs font-semibold leading-tight opacity-90">Years<br/>Farming</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-3 block">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Four Decades, One Farm</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-orange-200 -translate-x-px" />
            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2 flex md:justify-end">
                    <div className={`bg-white rounded-2xl p-6 border border-stone-200 shadow-sm max-w-md w-full ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                      <span className="text-orange-600 font-extrabold text-2xl">{item.year}</span>
                      <h3 className="font-bold text-stone-900 text-lg mt-1 mb-2">{item.title}</h3>
                      <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-md" />
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-3 block">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">Our Values in Practice</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map(v => (
              <div key={v.title} className="bg-stone-50 rounded-3xl p-8 border border-stone-100 hover:border-orange-200 hover:shadow-md transition">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{v.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Deep Dives ── */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-3 block">The Science of Flavour</span>
            <h2 className="text-3xl md:text-4xl font-extrabold">What Makes Our Spices Different</h2>
            <p className="text-stone-400 mt-4 max-w-xl mx-auto text-sm">Each spice has a unique story of terroir, processing, and chemistry. Here's what you're actually buying.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS_INFO.map(p => (
              <div key={p.name} className="bg-stone-800 rounded-2xl p-7 border border-stone-700 hover:border-orange-700/50 transition">
                <h3 className="text-lg font-bold text-orange-400 mb-1">{p.name}</h3>
                <p className="text-xs text-stone-500 mb-4 uppercase tracking-wider">{p.origin}</p>
                <p className="text-stone-300 text-sm leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="py-24 bg-orange-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-3 block">The People</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900">The Family Behind the Farm</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map(member => (
              <div key={member.name} className="text-center bg-white rounded-3xl p-8 shadow-sm border border-stone-100 hover:shadow-md transition">
                <div className="relative w-24 h-24 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-orange-100">
                  <Image src={member.img} alt={member.name} fill className="object-cover" sizes="96px" />
                </div>
                <h3 className="font-extrabold text-stone-900 text-lg">{member.name}</h3>
                <p className="text-orange-600 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-stone-900">Ready to taste our legacy?</h3>
            <p className="text-stone-500 mt-1 text-sm">Free shipping on orders above ₹499. Dispatched same day.</p>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-105 whitespace-nowrap">
            Shop Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
