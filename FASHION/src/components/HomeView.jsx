import React, { useState } from 'react';
import { products } from '../data/products';

export default function HomeView({ onViewChange, onProductSelect }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // We can pick a few specific products to show as featured
  const featuredIds = ['charcoal-utility-shell', 'pink-satin-hardware', 'neon-accent-scarf'];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden flex items-center bg-[#FFC0CB]">
        <span className="hero-title-bg serif text-[#1a1a1a]/5">MANIFESTO</span>
        
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-12 items-center relative z-10">
          {/* Left Content */}
          <div className="col-span-12 lg:col-span-5 order-2 lg:order-1 pt-12 lg:pt-0">
            <div className="max-w-md">
              <span className="inline-block px-3 py-1 bg-[#1a1a1a] text-[#FFC0CB] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                Edition 01 // Rose Noir
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] mb-8 tracking-tighter text-charcoal">
                Soft <br />
                <span className="italic serif text-[#1a1a1a]/60 relative -left-4 md:-left-5 inline-block">
                  Rebellion
                </span>
              </h1>
              <p className="text-sm text-black/70 font-medium leading-relaxed mb-10 max-w-sm">
                Redefining contemporary luxury through the lens of radical softness. Saturated baby pink meets structural charcoal silhouettes.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button
                  onClick={() => onViewChange('collections')}
                  className="w-full sm:w-auto px-12 py-5 bg-[#1a1a1a] text-white text-xs font-black tracking-[0.2em] hover:bg-[#FF00FF] transition-all flex items-center justify-between gap-10 uppercase cursor-pointer"
                >
                  Explore Drop
                  <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                </button>
                <button className="flex items-center gap-4 text-xs font-black uppercase tracking-widest hover:text-[#00FFFF] transition-colors cursor-pointer">
                  <span className="w-10 h-10 rounded-full border border-black flex items-center justify-center">
                    <iconify-icon icon="lucide:play" class="text-xs"></iconify-icon>
                  </span>
                  Watch Film
                </button>
              </div>
            </div>
          </div>

          {/* Center Image Area - High Contrast */}
          <div className="col-span-12 lg:col-span-7 order-1 lg:order-2 relative">
            <div className="relative flex justify-end">
              <div
                onClick={() => onProductSelect('rose-satin-hardware-dress')}
                className="relative w-full lg:w-[85%] aspect-[3/4] overflow-hidden bg-gradient-to-tr from-[#00FFFF] via-[#FF00FF] to-[#FFFF00] p-[2px] shadow-[0_0_80px_rgba(0,255,255,0.2)] cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1000"
                  alt="Model High Fashion"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105 filter saturate-200 contrast-125"
                />
                <div className="absolute top-0 right-0 p-8">
                  <span className="text-[100px] font-black leading-none text-[#FFC0CB]/20 serif italic">01</span>
                </div>
              </div>
              {/* Asymmetrical Float Element */}
              <div className="absolute -bottom-10 left-0 bg-[#FFFF00] p-10 max-w-[200px] hidden md:block transform -rotate-2">
                <p className="text-[9px] font-black uppercase tracking-widest leading-tight text-charcoal">
                  Handcrafted in limited batches using reclaimed technical silk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual-Tone Split Section: Sustainability (Charcoal) */}
      <section id="sustainability" className="py-32 bg-[#1a1a1a] text-[#FFC0CB] px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            <div className="col-span-1 border-r border-white/20"></div>
            <div className="col-span-1 border-r border-white/20"></div>
            <div className="col-span-1 border-r border-white/20"></div>
          </div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] bg-gradient-to-br from-[#00FFFF] to-[#FF00FF] p-[1px] overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.25)]">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600"
                    alt="Texture"
                    className="w-full h-full object-cover filter saturate-200 contrast-125"
                  />
                </div>
                <div className="aspect-[3/4] bg-gradient-to-tr from-[#FFFF00] to-[#FF00FF] p-[1px] overflow-hidden mt-12 shadow-[0_0_40px_rgba(255,255,0,0.2)]">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600"
                    alt="Fabric"
                    className="w-full h-full object-cover filter saturate-200 contrast-125"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-12">
              <span className="text-[#00FFFF] text-xs font-black uppercase tracking-[0.4em]">02 // The Blueprint</span>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-white">
                CHIC <br />WITHOUT <br />
                <span className="italic serif text-[#FF00FF]">CONSEQUENCE.</span>
              </h2>
              <p className="text-[#FFC0CB]/60 font-medium leading-relaxed max-w-md">
                We believe high fashion shouldn't cost the Earth. Our dual-palette philosophy extends to our manufacturing: 100% circular, zero-carbon production cycles.
              </p>
              <div className="flex flex-wrap gap-12 pt-8">
                <div className="space-y-2">
                  <span className="block text-4xl font-black text-white">85%</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#00FFFF]">RECLAIMED FIBERS</span>
                </div>
                <div className="space-y-2">
                  <span className="block text-4xl font-black text-white">0.0</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#FF00FF]">CARBON FOOTPRINT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Section: Collections (Baby Pink) */}
      <section className="py-32 px-6 md:px-12 bg-[#FFC0CB]">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-xl">
            <span className="text-[#1a1a1a]/40 text-xs font-black uppercase tracking-[0.4em] block mb-4">The Gallery</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-none text-charcoal">
              Curated Artifacts
            </h2>
          </div>
          <button
            onClick={() => onViewChange('collections')}
            className="text-xs font-black uppercase tracking-widest border-b-2 border-black pb-2 hover:bg-black hover:text-white px-4 transition-all cursor-pointer bg-transparent"
          >
            View Full Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {featuredProducts.map((product, idx) => (
            <div
              key={product.id}
              onClick={() => onProductSelect(product.id)}
              className={`group cursor-pointer ${idx === 1 ? 'lg:mt-24' : ''}`}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-8 bg-[#1a1a1a]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${idx === 0 ? 'from-[#FF00FF]/60' : idx === 1 ? 'from-[#00FFFF]/60' : 'from-[#FFFF00]/60'} to-transparent opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                {idx === 0 && (
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase">New Drop</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-start text-charcoal">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter group-hover:text-[#FF00FF] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-black/50 font-black uppercase tracking-widest mt-1">
                    {product.category}
                  </p>
                </div>
                <span className="text-lg font-black">${product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1a1a1a] py-32 px-6 md:px-12 border-t border-white/10">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-12">
              JOIN THE <br />
              <span className="text-[#FFC0CB] italic serif">INNER CIRCLE.</span>
            </h2>
            {subscribed ? (
              <div className="p-6 bg-pink text-charcoal text-xs font-black uppercase tracking-[0.3em] max-w-md animate-pulse">
                ✓ Access Authorized. Transmission endpoints updated.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-8 items-end">
                <div className="flex-1 w-full">
                  <label className="block text-[9px] font-black text-[#FFC0CB] uppercase tracking-[0.4em] mb-4">
                    Transmission Endpoint
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER EMAIL ADDRESS"
                    className="w-full bg-transparent border-b-2 border-[#FFC0CB]/30 py-4 text-[#FFC0CB] font-black uppercase text-xs focus:border-[#FFC0CB] outline-none transition-all placeholder:text-[#FFC0CB]/20 tracking-widest"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 py-5 bg-[#FFC0CB] text-[#1a1a1a] font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#00FFFF] transition-all cursor-pointer"
                >
                  Authenticate
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
