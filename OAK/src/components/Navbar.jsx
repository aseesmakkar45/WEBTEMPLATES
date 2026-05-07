import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  // Handle scrolling to story section
  const handleStoryClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const storySec = document.getElementById('brand-story');
      if (storySec) {
        storySec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 px-8 transition-all duration-300 ${
        isScrolled ? 'bg-[#F5E6D3] shadow-md py-4' : 'bg-transparent py-6'
      }`}
      id="main-nav"
    >
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center gap-12">
          <Link
            to="/"
            id="nav-brand"
            class="text-2xl font-bold tracking-tighter flex items-center gap-2 font-['Gambetta',serif]"
          >
            <Icon icon="ph:leaf-fill" className="text-[#8A9A5B]"></Icon>
            OLIVE & OAK
          </Link>
          <div class="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
            <Link
              to="/menu"
              className={`transition-colors ${
                isActive('/menu') ? 'text-[#C85A2F] font-bold' : 'hover:text-[#C85A2F]'
              }`}
            >
              Menu
            </Link>
            <a
              href="/#brand-story"
              onClick={handleStoryClick}
              className="hover:text-[#C85A2F] transition-colors"
            >
              Our Story
            </a>
            <Link
              to="/events"
              className={`transition-colors ${
                isActive('/events') ? 'text-[#C85A2F] font-bold' : 'hover:text-[#C85A2F]'
              }`}
            >
              Private Events
            </Link>
          </div>
        </div>
        <div class="flex items-center gap-8">
          <Link
            to="/reservation"
            id="nav-cta-link"
            class="px-6 py-2 bg-[#4A3728] text-white text-xs tracking-widest uppercase font-bold hover:bg-[#C85A2F] transition-all transform hover:-translate-y-0.5 shadow-sm"
          >
            Book a Table
          </Link>
        </div>
      </div>
    </nav>
  );
}
