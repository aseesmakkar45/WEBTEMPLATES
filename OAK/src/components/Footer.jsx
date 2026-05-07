import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function Footer() {
  return (
    <footer className="bg-[#4A3728] text-[#F5E6D3] py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-20">
        <div className="md:col-span-2">
          <Link to="/" id="footer-brand" className="text-3xl font-medium serif mb-8 block" style={{ fontFamily: 'Gambetta, serif' }}>
            Olive & Oak
          </Link>
          <p className="text-sm text-white/50 max-w-sm leading-relaxed mb-8">
            Cultivating moments of beauty through the art of fine dining and artisan craft. Visit us in the heart of the city.
          </p>
          <div className="flex gap-4">
            <a href="#" id="social-ig" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <Icon icon="ph:instagram-logo" />
            </a>
            <a href="#" id="social-fb" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <Icon icon="ph:facebook-logo" />
            </a>
            <a href="#" id="social-tw" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <Icon icon="ph:twitter-logo" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-6">Locate Us</h4>
          <address className="not-italic text-sm text-white/70 leading-relaxed">
            12 Oak Avenue<br />
            Bloomsbury, London<br />
            WC1A 1AA<br /><br />
            <a href="tel:+442071234567" className="hover:text-[#C85A2F] transition-colors">+44 20 7123 4567</a>
          </address>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase mb-6">Hours</h4>
          <ul className="text-sm text-white/70 space-y-2">
            <li className="flex justify-between"><span>Mon - Fri</span> <span>07:00 - 22:00</span></li>
            <li className="flex justify-between"><span>Saturday</span> <span>08:00 - 23:00</span></li>
            <li className="flex justify-between"><span>Sunday</span> <span>09:00 - 21:00</span></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase tracking-widest text-white/30">© 2024 Olive & Oak. All Rights Reserved.</p>
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/30">
           <a href="#" id="privacy-link" className="hover:text-white transition-colors">Privacy Policy</a>
           <a href="#" id="terms-link" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
