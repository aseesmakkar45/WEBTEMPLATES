import React from 'react';

export default function Footer({ onViewChange }) {
  const handleLinkClick = (e, view) => {
    e.preventDefault();
    onViewChange(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#1a1a1a] text-[#FFC0CB]/60 py-20 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1">
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="text-3xl font-black tracking-tighter uppercase block mb-8 italic text-white"
            style={{ fontFamily: "'Zodiak', serif" }}
          >
            tooni<span className="text-[10px] align-top ml-1 not-italic">™</span>
          </a>
          <p className="text-xs font-medium leading-relaxed max-w-xs">
            Contemporary high-fashion laboratory blending technical craftsmanship with emotional silhouettes.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white">Collections</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
            <li>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, 'collections')}
                className="hover:text-[#FFC0CB] transition-colors"
              >
                The Black Label
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, 'collections')}
                className="hover:text-[#FFC0CB] transition-colors"
              >
                Rose Hardware
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => handleLinkClick(e, 'collections')}
                className="hover:text-[#FFC0CB] transition-colors"
              >
                Seasonal Archive
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white">Identity</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
            <li>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onViewChange('home'); setTimeout(() => document.getElementById('vision')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
                className="hover:text-[#FFC0CB] transition-colors"
              >
                Manifesto
              </a>
            </li>
            <li><a href="#" className="hover:text-[#FFC0CB] transition-colors">Studio Careers</a></li>
            <li><a href="#" className="hover:text-[#FFC0CB] transition-colors">Press Terminal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white">Global</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest">
            <li><a href="#" className="hover:text-[#FFC0CB] transition-colors">Shipping Hub</a></li>
            <li><a href="#" className="hover:text-[#FFC0CB] transition-colors">Return Protocol</a></li>
            <li><a href="#" className="hover:text-[#FFC0CB] transition-colors">Contact Center</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <p className="text-[9px] font-black uppercase tracking-[0.4em]">© 2024 TOONI™ ARCHIVE. REFINED FOR THE NEW AGE.</p>
        <div className="flex gap-8">
          <a href="#" className="text-white hover:text-[#FF00FF] transition-colors text-xl">
            <iconify-icon icon="lucide:instagram"></iconify-icon>
          </a>
          <a href="#" className="text-white hover:text-[#00FFFF] transition-colors text-xl">
            <iconify-icon icon="lucide:twitter"></iconify-icon>
          </a>
          <a href="#" className="text-white hover:text-[#FFFF00] transition-colors text-xl">
            <iconify-icon icon="lucide:facebook"></iconify-icon>
          </a>
        </div>
      </div>
    </footer>
  );
}
