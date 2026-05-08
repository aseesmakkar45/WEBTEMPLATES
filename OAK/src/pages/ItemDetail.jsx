import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ItemDetail() {
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const basePrice = 28.00;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToBag = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <main className="flex-1 pt-32 pb-24 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-[var(--deep-oak)] border border-clay text-white px-8 py-4 shadow-2xl z-50 flex items-center gap-3 text-xs tracking-widest uppercase font-bold"
          >
            <Icon icon="ph:check-circle-fill" className="text-[var(--terracotta)] text-lg" />
            {quantity} x Seared Atlantic Salmon added to bag
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-8">
        {/* Back Link */}
        <Link to="/menu" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold opacity-60 hover:opacity-100 hover:text-[var(--terracotta)] transition-all mb-12">
          <Icon icon="ph:arrow-left" /> Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/3] bg-white border border-clay p-4 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1200"
                alt="Seared Atlantic Salmon"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Design accents */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-clay opacity-10 rounded-full z-[-1]"></div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[var(--terracotta)] text-xs font-bold tracking-widest uppercase mb-4 block">
              Dusk Kitchen Highlights
            </span>
            <h1 className="text-5xl lg:text-6xl font-medium tracking-tight leading-none mb-6">
              Seared Atlantic <br />Salmon
            </h1>
            
            {/* Price */}
            <div className="text-3xl font-medium text-[var(--coffee-brown)] mb-6">
              £{basePrice.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-lg text-[var(--coffee-brown)]/80 leading-relaxed mb-8">
              Sustainably caught wild salmon, pan-seared to crispy skin perfection. Nestled on a bed of sautéed samphire, baby potatoes, and bathed in a delicate lemon-herb butter sauce.
            </p>

            {/* Info Badges */}
            <div className="flex gap-3 mb-10">
              <span className="px-3 py-1.5 text-[10px] font-bold uppercase border border-clay bg-white text-[var(--terracotta)]">GF</span>
              <span className="px-3 py-1.5 text-[10px] font-bold uppercase border border-clay bg-white text-[var(--terracotta)]">Sea Sourced</span>
            </div>

            {/* Interactive Quantity & Add-to-bag Controls */}
            <div className="flex flex-col sm:flex-row gap-6 items-stretch border-t border-clay pt-8">
              <div className="flex items-center justify-between border border-clay bg-white px-6 py-4 sm:w-1/3">
                <button
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="text-xl font-bold opacity-60 hover:opacity-100 hover:text-[var(--terracotta)] disabled:opacity-20 transition-colors"
                >
                  —
                </button>
                <span className="text-lg font-medium font-sans">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="text-xl font-bold opacity-60 hover:opacity-100 hover:text-[var(--terracotta)] transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToBag}
                className="flex-1 bg-[var(--coffee-brown)] hover:bg-[var(--terracotta)] text-white font-bold text-xs tracking-widest uppercase py-5 px-8 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-between"
              >
                <span>Add to Bag</span>
                <span>Total: £{(basePrice * quantity).toFixed(2)}</span>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}
