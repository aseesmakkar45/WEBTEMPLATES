import React, { useState, useMemo } from 'react';
import { products } from '../data/products';

export default function SearchModal({ onClose, onProductSelect }) {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-6 bg-charcoal/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#FFC0CB] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-black/5 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-charcoal hover:text-[#FF00FF] cursor-pointer"
          title="Close search"
        >
          <iconify-icon icon="lucide:x" class="text-2xl"></iconify-icon>
        </button>

        <div className="space-y-8">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/40 block mb-2">
              Deep Search Module
            </span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH TOONI ARCHIVE..."
              className="w-full bg-transparent border-b-2 border-charcoal/30 focus:border-charcoal outline-none py-4 text-2xl font-black uppercase tracking-wide placeholder:opacity-20"
            />
          </div>

          <div className="max-h-[350px] overflow-y-auto space-y-4 pr-2">
            {query && searchResults.length === 0 ? (
              <p className="text-xs font-black uppercase tracking-widest text-black/40 py-6">
                No matching artifacts found.
              </p>
            ) : (
              searchResults.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onProductSelect(p.id);
                    onClose();
                  }}
                  className="w-full text-left p-4 bg-white/20 hover:bg-white/50 border border-black/5 hover:border-black/20 flex items-center gap-6 transition-all cursor-pointer group"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-16 object-cover image-saturated"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-black uppercase tracking-wide group-hover:text-[#FF00FF] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[9px] font-black text-black/40 tracking-wider uppercase mt-1">
                      {p.category} // ${p.price}
                    </p>
                  </div>
                  <iconify-icon icon="lucide:arrow-right" class="text-charcoal opacity-0 group-hover:opacity-100 transition-opacity"></iconify-icon>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
