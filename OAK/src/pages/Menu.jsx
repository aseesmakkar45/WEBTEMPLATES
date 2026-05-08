import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';

const MENU_ITEMS = {
  breakfast: [
    {
      id: 'avocado-toast',
      title: 'Heritage Avocado Toast',
      price: '14',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
      description: 'Hass avocado, chili flakes, organic poached eggs, and cold-pressed olive oil on 48-hour fermented oak-baked sourdough.',
      tags: ['V', 'GF Option'],
      category: 'breakfast'
    },
    {
      id: 'pancakes',
      title: 'Oak Honey Pancakes',
      price: '12',
      image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=400',
      description: 'Fluffy buttermilk stacks with wild honey, toasted walnuts, and seasonal berry compote. Prepared fresh every morning.',
      tags: ['V'],
      category: 'breakfast'
    }
  ],
  lunch: [
    {
      id: 'burrata-heirloom',
      title: 'Burrata & Heirloom',
      price: '18',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400',
      description: 'Creamy burrata heart, heritage tomatoes, toasted pine nuts, and house-made basil oil infused with oak smoke.',
      tags: ['V', 'GF'],
      category: 'lunch'
    },
    {
      id: 'oak-burger',
      title: 'The Oak Burger',
      price: '22',
      image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&q=80&w=400',
      description: 'Dry-aged Wagyu beef, truffle-infused cheddar, balsamic caramelized onions, and brioche bun toasted in marrow butter.',
      tags: [],
      category: 'lunch'
    }
  ],
  dinner: [
    {
      id: 'ribeye',
      title: 'Wood-Fired Ribeye',
      price: '38',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
      description: '35-day aged prime ribeye seared over oak wood, served with bone marrow jus and honey-glazed heritage carrots.',
      tags: ['GF'],
      category: 'dinner'
    },
    {
      id: 'salmon', // Maps to the detailed item detail page
      title: 'Pan-Seared Sea Bass',
      price: '34',
      image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=400',
      description: 'Wild-caught sea bass, lemon-thyme butter, crushed potatoes with saffron, and samphire greens.',
      tags: ['GF'],
      category: 'dinner'
    }
  ],
  drinks: [
    {
      id: 'pour-over',
      title: 'Single Origin Pour-over',
      price: '6.50',
      description: 'Rotating micro-lot beans from Ethiopia or Colombia. Clean, complex, and hand-brewed.',
      icon: 'ph:coffee-fill',
      tags: [],
      category: 'drinks'
    },
    {
      id: 'oolong-tea',
      title: 'Smoked Oolong Tea',
      price: '5.00',
      description: 'High-mountain oolong infused with subtle oak smoke. Earthy, deep, and meditative.',
      icon: 'ph:leaf-bold',
      tags: [],
      category: 'drinks'
    },
    {
      id: 'martini',
      title: 'The Olive Martini',
      price: '16.00',
      description: 'House-infused gin, artisan vermouth, and a splash of cold-pressed olive brine.',
      icon: 'ph:drop-fill',
      tags: [],
      category: 'drinks'
    }
  ]
};

export default function Menu() {
  const [filter, setFilter] = useState('ALL');

  const matchesFilter = (item) => {
    if (filter === 'ALL') return true;
    if (filter === 'V') return item.tags.includes('V');
    if (filter === 'VG') return item.tags.includes('VG') || item.tags.includes('V'); // Assumed matching
    if (filter === 'GF') return item.tags.includes('GF') || item.tags.includes('GF Option');
    return true;
  };

  const renderFoodCard = (item) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      key={item.id}
    >
      <Link
        to="/item"
        className="menu-card group flex flex-col md:flex-row gap-6 p-6 border border-clay hover:border-[var(--terracotta)] bg-white/40 h-full"
      >
        <div className="w-full md:w-40 aspect-square shrink-0 overflow-hidden bg-gray-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl serif">{item.title}</h3>
              <span className="text-xl font-medium">£{item.price}</span>
            </div>
            <p className="text-sm text-[var(--coffee-brown)]/70 mb-4 line-clamp-2">{item.description}</p>
          </div>
          <div className="flex gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 text-[8px] font-bold uppercase border border-clay ${
                  tag === 'V' || tag === 'VG' ? 'bg-white text-[var(--terracotta)]' : 'bg-white'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <main className="flex-1 pt-32 pb-24">
      <section className="max-w-7xl mx-auto px-8 mb-20">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[var(--terracotta)] text-sm tracking-widest font-bold uppercase mb-4 block">
              Curated Experience
            </span>
            <h1 className="text-7xl lg:text-8xl font-medium tracking-tight serif mb-6">
              The Artisan <br />Collection
            </h1>
            <p className="text-lg text-[var(--coffee-brown)]/70 leading-relaxed italic">
              Explore the harmony of seasonal harvest and artisan craft. Every ingredient is sourced with intention, every plate composed with passion.
            </p>
          </div>
          
          {/* Filtering Pills */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All Items', value: 'ALL' },
              { label: 'Vegetarian (V)', value: 'V' },
              { label: 'Vegan (VG)', value: 'VG' },
              { label: 'Gluten-Free (GF)', value: 'GF' }
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value)}
                className={`filter-pill px-6 py-3 text-[10px] font-bold uppercase tracking-widest ${
                  filter === btn.value
                    ? 'active bg-[var(--terracotta)] border-[var(--terracotta)] text-white'
                    : 'hover:bg-[var(--terracotta)] hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-32">
          
          {/* Breakfast Category */}
          <section id="breakfast">
            <div className="relative mb-12 flex items-center gap-6">
              <h2 className="text-4xl serif">Sunrise & Sourdough</h2>
              <div className="flex-1 h-[1px] bg-clay/20"></div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-40">Breakfast</span>
              <svg viewBox="0 0 100 100" className="category-accent">
                <path className="morph-svg" fill="var(--terracotta)" d="M50 0 C 60 40 100 50 60 60 C 50 100 40 60 0 50 C 40 40 50 0 50 0 Z"></path>
              </svg>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
              <AnimatePresence>
                {MENU_ITEMS.breakfast.filter(matchesFilter).map(renderFoodCard)}
              </AnimatePresence>
            </div>
          </section>

          {/* Lunch Category */}
          <section id="lunch">
            <div className="relative mb-12 flex items-center gap-6">
              <h2 className="text-4xl serif">Artisan Midday</h2>
              <div className="flex-1 h-[1px] bg-clay/20"></div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-40">Lunch</span>
              <svg viewBox="0 0 100 100" className="category-accent">
                <path className="morph-svg" fill="var(--terracotta)" d="M50 0 C 60 40 100 50 60 60 C 50 100 40 60 0 50 C 40 40 50 0 50 0 Z"></path>
              </svg>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
              <AnimatePresence>
                {MENU_ITEMS.lunch.filter(matchesFilter).map(renderFoodCard)}
              </AnimatePresence>
            </div>
          </section>

          {/* Dinner Category */}
          <section id="dinner">
            <div className="relative mb-12 flex items-center gap-6">
              <h2 className="text-4xl serif">Elegance at Dusk</h2>
              <div className="flex-1 h-[1px] bg-clay/20"></div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-40">Dinner</span>
              <svg viewBox="0 0 100 100" className="category-accent">
                <path className="morph-svg" fill="var(--terracotta)" d="M50 0 C 60 40 100 50 60 60 C 50 100 40 60 0 50 C 40 40 50 0 50 0 Z"></path>
              </svg>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
              <AnimatePresence>
                {MENU_ITEMS.dinner.filter(matchesFilter).map(renderFoodCard)}
              </AnimatePresence>
            </div>
          </section>

          {/* Drinks & Coffee Category */}
          <section id="drinks" className="bg-[var(--deep-oak)] -mx-8 px-8 py-24 text-white">
            <div className="max-w-7xl mx-auto">
              <div className="relative mb-16 flex items-center gap-6">
                <h2 className="text-4xl serif">Artisan Brews & Infusions</h2>
                <div className="flex-1 h-[1px] bg-white/10"></div>
                <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-40 text-white/50">Coffee & Beverages</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {MENU_ITEMS.drinks.map((item) => (
                  <div key={item.id} className="flex flex-col border border-white/10 p-8 hover:bg-white/5 transition-all group">
                    <Icon icon={item.icon} className="text-4xl text-[var(--terracotta)] mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl serif mb-2">{item.title}</h3>
                    <p className="text-sm text-white/40 mb-6">{item.description}</p>
                    <span className="text-xl font-medium">£{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
        </div>
      </section>
    </main>
  );
}
