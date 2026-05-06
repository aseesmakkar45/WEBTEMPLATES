import React from 'react';

export default function SideNavigation({ activeItem = 'curation', onViewChange }) {
  const items = [
    { id: 'vision', label: 'vision', color: '#00FFFF' },
    { id: 'curation', label: 'curation', color: '#FF00FF' },
    { id: 'process', label: 'process', color: '#FFFF00' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-16 md:w-20 border-r border-white/5 bg-[#1a1a1a] z-50 hidden lg:flex flex-col items-center justify-between py-12">
      <div className="flex flex-col items-center gap-12">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (onViewChange) {
                // If on home, let's scroll to sections. If not, go to home or collections.
                if (item.id === 'curation') {
                  onViewChange('collections');
                } else {
                  onViewChange('home');
                  setTimeout(() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }
            }}
            className="vertical-text text-[10px] font-black tracking-[0.3em] transition-colors uppercase cursor-pointer"
            style={{
              color: activeItem === item.id ? item.color : '#FFC0CB',
              '--hover-color': item.color
            }}
            onMouseEnter={(e) => { e.target.style.color = item.color; }}
            onMouseLeave={(e) => { e.target.style.color = activeItem === item.id ? item.color : '#FFC0CB'; }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-6 text-xl text-[#FFC0CB]">
        <a href="#" className="hover:text-[#00FFFF] transition-transform hover:scale-110">
          <iconify-icon icon="brandico:facebook-rect"></iconify-icon>
        </a>
        <a href="#" className="hover:text-[#FF00FF] transition-transform hover:scale-110">
          <iconify-icon icon="brandico:pinterest"></iconify-icon>
        </a>
        <a href="#" className="hover:text-[#FFFF00] transition-transform hover:scale-110">
          <iconify-icon icon="brandico:linkedin-rect"></iconify-icon>
        </a>
      </div>
    </aside>
  );
}
