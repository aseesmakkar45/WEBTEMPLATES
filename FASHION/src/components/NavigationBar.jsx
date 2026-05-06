import React, { useState } from 'react';

export default function NavigationBar({ currentView, onViewChange, cartCount, onSearchToggle, onProfileToggle }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', view: 'home' },
    { id: 'collections', label: 'Collections', view: 'collections' },
    { id: 'story', label: 'Our Story', section: 'footer' },
    { id: 'sustainability', label: 'Sustainability', section: 'sustainability' },
    { id: 'archives', label: 'Archives', view: 'collections' }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileOpen(false);
    if (item.view) {
      onViewChange(item.view);
    } else if (item.section) {
      if (currentView !== 'home') {
        onViewChange('home');
        setTimeout(() => {
          document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="sticky top-0 w-full z-40 bg-[#FFC0CB] border-b border-black/10 px-6 md:px-12 py-5 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onViewChange('home'); }}
          className="text-2xl font-black tracking-tighter serif uppercase"
        >
          tooni<span className="text-[10px] align-top ml-0.5">™</span>
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${
                currentView === item.view ? 'border-b-2 border-charcoal pb-1 text-charcoal' : 'text-black/40 hover:text-charcoal'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button onClick={onSearchToggle} className="p-1 hover:text-[#FF00FF] transition-colors cursor-pointer" aria-label="Search">
            <iconify-icon icon="lucide:search" class="text-xl"></iconify-icon>
          </button>
          
          <button
            onClick={() => onViewChange('cart')}
            className="relative p-1 hover:text-[#00FFFF] transition-colors cursor-pointer"
            aria-label="Shopping Bag"
          >
            <iconify-icon icon="lucide:shopping-bag" class="text-xl"></iconify-icon>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-charcoal text-pink text-[9px] font-black px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button onClick={onProfileToggle} className="p-1 hover:text-[#FFFF00] transition-colors cursor-pointer" aria-label="Profile">
            <iconify-icon icon="lucide:user" class="text-xl"></iconify-icon>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 hover:text-[#FF00FF] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <iconify-icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} class="text-xl"></iconify-icon>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-charcoal/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#FFC0CB] p-8 flex flex-col pt-24 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-2xl font-black uppercase tracking-tighter text-charcoal hover:text-[#FF00FF] transition-colors py-2 border-b border-black/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
