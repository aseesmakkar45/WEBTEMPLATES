import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Events() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [space, setSpace] = useState("Chef's Table");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Title Header */}
      <section className="max-w-7xl mx-auto px-8 mb-20">
        <div className="max-w-3xl reveal active">
          <span className="text-[var(--terracotta)] text-sm tracking-widest font-bold uppercase mb-4 block">
             Ultra-Premium Gatherings
          </span>
          <h1 className="text-7xl lg:text-8xl font-medium tracking-tight serif mb-6">
             Private Events
          </h1>
          <p className="text-lg text-[var(--coffee-brown)]/70 leading-relaxed italic">
             From bespoke tastings to lavish corporate celebrations, we shape unique sensory journeys customized around your guests.
          </p>
        </div>
      </section>

      {/* Showcase of Spaces */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <h2 className="text-3xl serif mb-12 border-b border-clay/20 pb-4">Our Spaces</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Space 1 */}
          <div className="group border border-clay p-6 bg-white/40 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600"
                  alt="Garden Room"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl serif mb-2">The Garden Room</h3>
              <p className="text-sm text-[var(--coffee-brown)]/70 mb-6">
                An indoor-outdoor glasshouse filled with hanging ivy, custom stone tables, and ambient string lighting.
              </p>
            </div>
            <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase border-t border-clay/30 pt-4">
              <span>Capacity</span>
              <span className="text-[var(--terracotta)]">Up to 40 Guests</span>
            </div>
          </div>

          {/* Space 2 */}
          <div className="group border border-clay p-6 bg-white/40 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=600"
                  alt="Chefs Table"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl serif mb-2">The Chef's Table</h3>
              <p className="text-sm text-[var(--coffee-brown)]/70 mb-6">
                An intimate alcove overlooking the open wood-fired kitchen. Features custom leather seating and private sommelier.
              </p>
            </div>
            <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase border-t border-clay/30 pt-4">
              <span>Capacity</span>
              <span className="text-[var(--terracotta)]">Up to 12 Guests</span>
            </div>
          </div>

          {/* Space 3 */}
          <div className="group border border-clay p-6 bg-white/40 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
                  alt="Main Dining Hall"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl serif mb-2">The Grand Hall</h3>
              <p className="text-sm text-[var(--coffee-brown)]/70 mb-6">
                Full venue exclusive booking. Dramatic double-height timber oak ceilings, premium sound system, and custom bars.
              </p>
            </div>
            <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase border-t border-clay/30 pt-4">
              <span>Capacity</span>
              <span className="text-[var(--terracotta)]">Up to 100 Guests</span>
            </div>
          </div>
        </div>
      </section>

      {/* Package Tiers */}
      <section className="bg-[var(--deep-oak)] -mx-8 px-8 py-24 text-white mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl serif mb-3">Event Experiences</h2>
            <p className="text-white/50 text-sm">Bespoke catering and service levels tailored for your day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Tier 1 */}
            <div className="border border-white/10 p-8 flex flex-col justify-between h-full bg-white/5 hover:bg-white/10 transition-all">
              <div>
                <span className="text-[var(--terracotta)] text-xs font-bold tracking-widest uppercase block mb-2">Silver Tier</span>
                <h3 className="text-3xl serif mb-6">Epicurean Blend</h3>
                <ul className="space-y-3 text-sm text-white/60 mb-12">
                  <li>• Custom 3-course seasonal menu</li>
                  <li>• Sommelier chosen house pairings</li>
                  <li>• Floral table configurations</li>
                </ul>
              </div>
              <span className="text-xl font-bold uppercase tracking-widest text-[var(--terracotta)]">£85 / guest</span>
            </div>

            {/* Tier 2 */}
            <div className="border border-white/20 p-8 flex flex-col justify-between h-full bg-white/10 shadow-2xl relative transform lg:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--terracotta)] text-white text-[8px] font-bold tracking-widest uppercase px-4 py-1">Most Popular</div>
              <div>
                <span className="text-[var(--terracotta)] text-xs font-bold tracking-widest uppercase block mb-2">Gold Tier</span>
                <h3 className="text-3xl serif mb-6">Artisan Exclusive</h3>
                <ul className="space-y-3 text-sm text-white/85 mb-12">
                  <li>• Customized 5-course tasting menu</li>
                  <li>• Premium vintage pairings</li>
                  <li>• Welcome cocktail bar reception</li>
                  <li>• Bespoke floral displays</li>
                </ul>
              </div>
              <span className="text-xl font-bold uppercase tracking-widest text-[var(--terracotta)]">£140 / guest</span>
            </div>

            {/* Tier 3 */}
            <div className="border border-white/10 p-8 flex flex-col justify-between h-full bg-white/5 hover:bg-white/10 transition-all">
              <div>
                <span className="text-[var(--terracotta)] text-xs font-bold tracking-widest uppercase block mb-2">Platinum Tier</span>
                <h3 className="text-3xl serif mb-6">The Oak Legacy</h3>
                <ul className="space-y-3 text-sm text-white/60 mb-12">
                  <li>• Chef-attended live fire course prep</li>
                  <li>• Rare vintage cellar pairings</li>
                  <li>• Masterclass barista coffee bar</li>
                  <li>• Live classical acoustic trio</li>
                </ul>
              </div>
              <span className="text-xl font-bold uppercase tracking-widest text-[var(--terracotta)]">£220 / guest</span>
            </div>
            
          </div>
        </div>
      </section>

      {/* Stateful Enquiry Form */}
      <section className="max-w-4xl mx-auto px-8 relative">
        <div className="bg-white p-12 lg:p-16 shadow-2xl border border-clay">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form-enquiry"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl serif mb-4">Request a Proposal</h2>
                  <p className="text-sm text-[var(--coffee-brown)]/60">Tell us details about your gather, and our events team will get back to you shortly.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[var(--warm-cream)]/30 border-b border-clay px-4 py-4 focus:outline-none focus:border-[var(--terracotta)] transition-colors"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[var(--warm-cream)]/30 border-b border-clay px-4 py-4 focus:outline-none focus:border-[var(--terracotta)] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-[var(--warm-cream)]/30 border-b border-clay px-4 py-4 focus:outline-none focus:border-[var(--terracotta)] w-full"
                    />
                    <select
                      value={space}
                      onChange={(e) => setSpace(e.target.value)}
                      className="bg-[var(--warm-cream)]/30 border-b border-clay px-4 py-4 focus:outline-none focus:border-[var(--terracotta)] w-full"
                    >
                      <option>Chef's Table</option>
                      <option>Garden Room</option>
                      <option>The Grand Hall</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[var(--terracotta)] text-white py-5 text-sm font-bold tracking-widest uppercase shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                    Send Proposal Request
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="form-thankyou"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-[var(--terracotta)]/10 text-[var(--terracotta)] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Icon icon="ph:check-bold" className="text-3xl" />
                </div>
                <h2 className="text-4xl serif mb-4">Request Received</h2>
                <p className="text-sm text-[var(--coffee-brown)]/70 max-w-md mx-auto mb-8">
                  Thank you, {name}. Your enquiry for the {space} on {date} has been sent. Our events team will reach out to you within 24 hours with a customized proposal.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[var(--coffee-brown)] text-white text-xs tracking-widest uppercase font-bold hover:bg-[var(--terracotta)] transition-all"
                >
                  Edit Enquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
