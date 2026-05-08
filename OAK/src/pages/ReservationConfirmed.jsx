import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function ReservationConfirmed() {
  const [searchParams] = useSearchParams();
  
  // Extract parameters with defaults
  const name = searchParams.get('name') || 'Guest';
  const dateRaw = searchParams.get('date');
  const guests = searchParams.get('guests') || '2';
  const time = searchParams.get('time') || '19:30';

  // Format date nicely
  let formattedDate = 'Tonight';
  if (dateRaw) {
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      formattedDate = new Date(dateRaw).toLocaleDateString('en-GB', options);
    } catch (e) {
      formattedDate = dateRaw;
    }
  } else {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    formattedDate = new Date().toLocaleDateString('en-GB', options);
  }

  return (
    <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-8 hero-gradient">
      <div className="w-full max-w-2xl bg-white p-12 lg:p-16 border border-clay shadow-2xl relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--terracotta)] opacity-5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-clay opacity-10 rounded-full"></div>

        {/* Checked confirmation Icon */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 bg-[var(--terracotta)]/10 text-[var(--terracotta)] rounded-full flex items-center justify-center mb-6">
            <Icon icon="ph:check-bold" className="text-3xl" />
          </div>
          <span className="text-[var(--terracotta)] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Confirmed Booking
          </span>
          <h1 className="text-5xl lg:text-6xl font-medium tracking-tight leading-none mb-4">
            Seat Reserved
          </h1>
          <p className="text-sm text-[var(--coffee-brown)]/60 max-w-sm leading-relaxed">
            Thank you, {name}. Your table at Olive & Oak is prepared. A confirmation details package has been sent to your email.
          </p>
        </div>

        {/* Ticket Details Panel */}
        <div className="border-t border-b border-clay/30 py-8 my-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--coffee-brown)]/40 block mb-2">
              Date
            </span>
            <span className="text-sm font-bold text-[var(--coffee-brown)] block">
              {formattedDate}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--coffee-brown)]/40 block mb-2">
              Time
            </span>
            <span className="text-sm font-bold text-[var(--coffee-brown)] block">
              {time}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[var(--coffee-brown)]/40 block mb-2">
              Guests
            </span>
            <span className="text-sm font-bold text-[var(--coffee-brown)] block">
              {guests} Table
            </span>
          </div>
        </div>

        {/* Booking Details / Rules */}
        <div className="bg-[var(--warm-cream)]/20 p-6 border border-clay/20 mb-12">
          <h3 className="text-xs font-bold tracking-widest uppercase text-[var(--coffee-brown)]/80 mb-3">
             Booking Terms
          </h3>
          <ul className="text-xs text-[var(--coffee-brown)]/70 space-y-2">
             <li>• We hold tables for a maximum of 15 minutes past reservation time.</li>
             <li>• Please inform us in advance of any critical dietary requirements.</li>
             <li>• For parties larger than 6, please call us to adjust table placements.</li>
          </ul>
        </div>

        {/* Action button to return Home */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-4 bg-[var(--coffee-brown)] text-white text-xs tracking-widest uppercase font-bold hover:bg-[var(--terracotta)] transition-all shadow-md text-center"
          >
            Back to Home
          </Link>
          <Link
            to="/menu"
            className="px-8 py-4 bg-white text-[var(--coffee-brown)] border border-clay text-xs tracking-widest uppercase font-bold hover:border-[var(--terracotta)] transition-all text-center"
          >
            Explore Menu
          </Link>
        </div>
        
      </div>
    </main>
  );
}
