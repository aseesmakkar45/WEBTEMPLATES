import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('Guests: 2');

  // Simple mouse parallax for hero items
  useEffect(() => {
    const handleMouseMove = (e) => {
      const items = document.querySelectorAll('.item-3d');
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 40;

      items.forEach((item) => {
        const depth = item.classList.contains('layer-front')
          ? 1.5
          : item.classList.contains('layer-mid')
          ? 1
          : 0.5;
        item.style.transform = `translate3d(${mouseX * depth}px, ${mouseY * depth}px, 0)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleReserveSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      name,
      date,
      guests: guests.replace('Guests: ', '')
    }).toString();
    navigate(`/reservation?${queryParams}`);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden perspective-container hero-gradient pt-20">
        <div className="scene-3d w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* Text Content */}
          <div className="relative z-10 layer-mid">
            <span className="inline-block px-4 py-1 border border-clay text-[var(--terracotta)] text-xs tracking-[0.3em] uppercase mb-6">
              Est. 2024 • London
            </span>
            <h1 className="text-7xl lg:text-9xl font-medium tracking-tight leading-[0.9] mb-8">
              Olive <span className="text-[var(--terracotta)]">&</span> <br />Oak
            </h1>
            <p class="text-lg lg:text-xl font-light text-[var(--coffee-brown)]/80 max-w-md leading-relaxed mb-10">
              Where artisan coffee meets handcrafted cuisine in a symphony of elegant interiors and seasonal ingredients.
            </p>
            <div class="flex flex-wrap gap-4">
              <Link to="/menu" id="hero-menu-btn" class="group flex items-center gap-3 bg-white px-8 py-4 text-[var(--coffee-brown)] border border-clay hover:border-[var(--terracotta)] transition-all">
                <span class="text-xs tracking-widest uppercase font-bold">Explore Menu</span>
                <Icon icon="ph:arrow-right" className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 3D Element Showcase */}
          <div className="hidden lg:flex relative h-[600px] items-center justify-center">
            <div className="item-3d layer-back absolute inset-0 flex items-center justify-center">
               <div className="w-96 h-96 rounded-full border border-clay opacity-20"></div>
            </div>
            
            {/* Floating Coffee Element */}
            <div className="item-3d layer-mid absolute">
              <div className="relative w-80 h-96 bg-[var(--deep-oak)] p-8 flex flex-col justify-end shadow-2xl overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" alt="Artisan Coffee" />
                <div className="relative z-10">
                  <h3 className="text-white text-3xl font-medium mb-2">The Morning Roast</h3>
                  <p className="text-white/70 text-sm">Hand-picked single origin</p>
                </div>
              </div>
            </div>

            {/* Front Accents */}
            <div className="item-3d layer-front absolute -bottom-10 -right-10 flex flex-col gap-4">
              <div className="bg-[var(--terracotta)] p-8 shadow-2xl text-white max-w-[200px]">
                <Icon icon="ph:chef-hat-fill" className="text-4xl mb-4" />
                <p className="text-xs font-bold tracking-widest uppercase">Chef Curated</p>
                <p className="text-xl serif mt-2">Crafted with passion.</p>
              </div>
            </div>

            <div className="item-3d layer-front absolute -top-10 -left-10">
               <Icon icon="ph:coffee-fill" className="text-8xl text-[var(--terracotta)] opacity-20 blur-sm rotate-12" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">Discover More</span>
          <div className="w-[1px] h-16 bg-[var(--coffee-brown)]/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--terracotta)] animate-[scroll-down_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-32 px-8 bg-white overflow-hidden" id="brand-story">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <span className="text-[var(--terracotta)] text-sm tracking-widest font-bold uppercase mb-4 block">Our Philosophy</span>
              <h2 className="text-5xl lg:text-6xl mb-8 leading-tight">
                A Tale of <br />Two Elements
              </h2>
              <p className="text-lg text-[var(--coffee-brown)]/80 leading-relaxed mb-8">
                At Olive & Oak, we believe that the best moments are found in the details. The olive represents the earth's purity and the vibrant flavors of our seasonal cuisine. The oak symbolizes the strength of our traditions and the warm, grounded atmosphere we've cultivated for our guests.
              </p>
              <p className="text-[var(--coffee-brown)] leading-relaxed italic border-l-2 border-clay pl-6 mb-12">
                "Food is an art form, but hospitality is a legacy. We bridge the two every single morning when the first bean is ground."
                <span className="block mt-4 not-italic font-bold text-sm tracking-widest uppercase">— Marcus Thorne, Head Chef</span>
              </p>
              <a href="#brand-story" id="learn-more-link" className="inline-flex items-center gap-2 pb-1 border-b-2 border-clay hover:border-[var(--terracotta)] transition-all font-bold text-xs uppercase tracking-widest">Our Full Story</a>
            </div>

            <div className="lg:col-span-7 relative flex justify-end">
              {/* Overlapping Image Composition */}
              <div className="relative w-full max-w-lg">
                <div className="aspect-[3/4] bg-[var(--coffee-brown)] overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=800" alt="Interior Ambience" className="w-full h-full object-cover opacity-90" />
                </div>
                <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[var(--warm-cream)] p-4 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=600" alt="Chef Preparation" className="w-full h-full object-cover" />
                </div>
                {/* SVG Accent */}
                <div className="absolute -top-10 -right-10">
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0 C 60 40 100 50 60 60 C 50 100 40 60 0 50 C 40 40 50 0 50 0 Z" fill="var(--terracotta)" opacity="0.15"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Highlights */}
      <section className="py-24 bg-[var(--deep-oak)] text-white">
         <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-between items-end mb-16">
               <div>
                  <h2 className="text-4xl serif mb-2">Featured Crafts</h2>
                  <p className="text-white/50">Hand-selected for the discerning palate.</p>
               </div>
               <Link to="/menu" id="view-menu-link" className="text-xs tracking-widest font-bold uppercase border-b border-white/20 pb-1">View All Menu</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {/* Item 1 */}
               <Link to="/item" className="group cursor-pointer block">
                  <div className="overflow-hidden aspect-square mb-6 relative">
                     <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="text-[var(--terracotta)] text-xs font-bold tracking-widest uppercase">Specialty Coffee</span>
                  <h3 className="text-2xl mt-2 serif">The Velvet Flat White</h3>
                  <p className="text-white/40 text-sm mt-3">Micro-foam silky texture with notes of cocoa and toasted hazelnut.</p>
               </Link>

               {/* Item 2 */}
               <Link to="/item" className="group cursor-pointer block">
                  <div className="overflow-hidden aspect-square mb-6 relative">
                     <img src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span class="text-[var(--terracotta)] text-xs font-bold tracking-widest uppercase">Handcrafted Kitchen</span>
                  <h3 class="text-2xl mt-2 serif">Smoked Salmon Tartine</h3>
                  <p class="text-white/40 text-sm mt-3">Dill-infused cream, capers, and heritage grain sourdough.</p>
               </Link>

               {/* Item 3 */}
               <Link to="/item" className="group cursor-pointer block">
                  <div className="overflow-hidden aspect-square mb-6 relative">
                     <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <span class="text-[var(--terracotta)] text-xs font-bold tracking-widest uppercase">Sweet Conclusion</span>
                  <h3 class="text-2xl mt-2 serif">Dark Oak Tiramisu</h3>
                  <p class="text-white/40 text-sm mt-3">Mascarpone, house espresso, and a dusting of smoked sea salt chocolate.</p>
               </Link>
            </div>
         </div>
      </section>

      {/* Reservation Section */}
      <section id="reservations" className="py-32 px-8 relative overflow-hidden">
        {/* Abstract background textures */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--terracotta)] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--coffee-brown)] rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl mb-6">Table for Two?</h2>
            <p className="text-xl font-light text-[var(--coffee-brown)]/60 italic">Reserve your corner of the forest.</p>
          </div>

          <div className="bg-white p-12 lg:p-16 shadow-2xl border border-clay flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/2">
                <h3 className="text-3xl mb-4 serif">Join the Experience</h3>
                <p className="text-sm text-[var(--coffee-brown)]/70 mb-8">
                   Whether it's a quiet morning ritual or an evening celebration, we invite you to take a seat at our table. 
                </p>
                <ul className="space-y-4 text-xs font-bold tracking-widest uppercase">
                   <li className="flex items-center gap-3"><Icon icon="ph:check-circle-fill" className="text-[var(--terracotta)]" /> Private Dining Available</li>
                   <li className="flex items-center gap-3"><Icon icon="ph:check-circle-fill" className="text-[var(--terracotta)]" /> Curated Wine Pairings</li>
                   <li className="flex items-center gap-3"><Icon icon="ph:check-circle-fill" className="text-[var(--terracotta)]" /> Artisan Gift Cards</li>
                </ul>
             </div>
             
             <div className="md:w-1/2 w-full">
                <form className="space-y-4" onSubmit={handleReserveSubmit}>
                   <input
                     type="text"
                     required
                     placeholder="Full Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full bg-[var(--warm-cream)]/30 border-b border-clay px-4 py-4 focus:outline-none focus:border-[var(--terracotta)] transition-colors"
                   />
                   <div className="grid grid-cols-2 gap-4">
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-[var(--warm-cream)]/30 border-b border-clay px-4 py-4 focus:outline-none focus:border-[var(--terracotta)]"
                      />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="bg-[var(--warm-cream)]/30 border-b border-clay px-4 py-4 focus:outline-none focus:border-[var(--terracotta)]"
                      >
                         <option>Guests: 2</option>
                         <option>Guests: 3-4</option>
                         <option>Guests: 5+</option>
                      </select>
                   </div>
                   <button type="submit" className="w-full bg-[var(--terracotta)] text-white py-5 text-sm font-bold tracking-widest uppercase shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                      Reserve My Table
                   </button>
                </form>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
