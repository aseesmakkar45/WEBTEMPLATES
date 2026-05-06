import React, { useState, useMemo } from 'react';
import { products } from '../data/products';

export default function CollectionsView({ onProductSelect, onQuickAdd }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedColor, setSelectedColor] = useState('all');
  const [sortBy, setSortBy] = useState('Newest Arrivals');

  // Palette color circles definition
  const colors = [
    { value: 'all', hex: 'transparent', label: 'All' },
    { value: '#1a1a1a', hex: '#1a1a1a', label: 'Charcoal' },
    { value: '#FFC0CB', hex: '#FFC0CB', label: 'Pink' },
    { value: '#00FFFF', hex: '#00FFFF', label: 'Cyan' },
    { value: '#FF00FF', hex: '#FF00FF', label: 'Magenta' },
    { value: '#FFFF00', hex: '#FFFF00', label: 'Yellow' }
  ];

  // Reactive filtering
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search term check
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                              p.category.toLowerCase().includes(search.toLowerCase());
        
        // Category check
        const matchesCategory = category === 'all' || p.category.toLowerCase() === category.toLowerCase();
        
        // Price check
        const matchesPrice = p.price <= maxPrice;

        // Color check
        const matchesColor = selectedColor === 'all' || p.colors.includes(selectedColor);

        return matchesSearch && matchesCategory && matchesPrice && matchesColor;
      })
      .sort((a, b) => {
        if (sortBy === 'Price: Low-High') {
          return a.price - b.price;
        }
        if (sortBy === 'Price: High-Low') {
          return b.price - a.price;
        }
        if (sortBy === 'Bestsellers') {
          return b.reviews - a.reviews; // Mocking bestsellers using review count
        }
        return 0; // 'Newest Arrivals' default list order
      });
  }, [search, category, maxPrice, selectedColor, sortBy]);

  return (
    <div className="flex-1 bg-[#FFC0CB]">
      {/* SHOP HERO HEADER */}
      <header className="bg-[#FFC0CB] py-16 md:py-24 px-6 md:px-12 border-b border-black/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="inline-block px-3 py-1 bg-black text-[#FFC0CB] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                ARCHIVE DROP // 01
              </span>
              <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-charcoal">
                THE <br />
                <span className="italic serif text-[#1a1a1a]/60">GALLERY</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-black/70">
              A meticulous curation of structural silhouettes and saturated textures. Reclaimed materials refined for the contemporary rebel.
            </p>
          </div>
        </div>
      </header>

      {/* COLLECTIONS CONTENT AREA */}
      <main className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* FILTER SIDEBAR */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-12 text-charcoal">
            {/* Search Input */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-black/40">Search</h3>
              <div className="relative border-b-2 border-black/20 focus-within:border-black transition-colors">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH ARCHIVE..."
                  className="w-full bg-transparent py-3 text-xs font-black uppercase tracking-widest outline-none placeholder:text-black/30"
                />
                <iconify-icon icon="lucide:search" class="absolute right-0 top-3"></iconify-icon>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-black/40">Categories</h3>
              <ul className="space-y-4">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'outerwear', label: 'Outerwear' },
                  { id: 'dresses', label: 'Dresses' },
                  { id: 'accessories', label: 'Accessories' },
                  { id: 'footwear', label: 'Footwear' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setCategory(item.id)}
                      className={`w-full text-left text-xs font-black uppercase tracking-widest flex items-center justify-between group cursor-pointer ${
                        category === item.id ? 'text-charcoal font-black' : 'text-black/40 hover:text-charcoal'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={`text-[9px] transition-transform ${category === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-black/40">
                Price Threshold: ${maxPrice}
              </h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="cursor-pointer w-full"
                />
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-black/60">
                  <span>$0</span>
                  <span>$1,000+</span>
                </div>
              </div>
            </div>

            {/* Palette Selection */}
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-black/40">Palette Selection</h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => {
                  if (color.value === 'all') {
                    return (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor('all')}
                        className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 border border-black/20 hover:border-black cursor-pointer transition-colors ${
                          selectedColor === 'all' ? 'bg-charcoal text-pink border-charcoal' : 'text-charcoal bg-transparent'
                        }`}
                      >
                        All
                      </button>
                    );
                  }
                  return (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-6 h-6 rounded-full border border-black/10 transition-transform hover:scale-125 cursor-pointer ${
                        selectedColor === color.value ? 'ring-2 ring-black ring-offset-2 ring-offset-[#FFC0CB]' : ''
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.label}
                    />
                  );
                })}
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID AREA */}
          <div className="flex-1">
            {/* Sorting & Results Count */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6 border-b border-black/5 pb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40">
                Displaying {filteredProducts.length} of {products.length} Artifacts
              </span>
              <div className="flex items-center gap-4 text-charcoal">
                <span className="text-[10px] font-black uppercase tracking-widest">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer hover:text-[#FF00FF] font-sans"
                >
                  <option className="bg-[#FFC0CB] text-charcoal">Newest Arrivals</option>
                  <option className="bg-[#FFC0CB] text-charcoal">Price: Low-High</option>
                  <option className="bg-[#FFC0CB] text-charcoal">Price: High-Low</option>
                  <option className="bg-[#FFC0CB] text-charcoal">Bestsellers</option>
                </select>
              </div>
            </div>

            {/* The Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-black/10">
                <p className="text-sm font-black uppercase tracking-widest text-black/40">
                  No matching artifacts found in this sector.
                </p>
                <button
                  onClick={() => {
                    setSearch('');
                    setCategory('all');
                    setMaxPrice(1000);
                    setSelectedColor('all');
                  }}
                  className="mt-6 px-6 py-3 bg-charcoal text-pink text-xs font-black uppercase tracking-widest hover:bg-white hover:text-charcoal transition-colors cursor-pointer"
                >
                  Reset Parameters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                {filteredProducts.map((product, idx) => (
                  <div key={product.id} className="group">
                    <div className="product-image-container aspect-[4/5] mb-6 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onProductSelect(product.id)}
                      />
                      
                      {/* Gradient overlay */}
                      <div
                        onClick={() => onProductSelect(product.id)}
                        className={`absolute inset-0 bg-gradient-to-t ${
                          idx % 3 === 0 ? 'from-[#FF00FF]/60' : idx % 3 === 1 ? 'from-[#00FFFF]/60' : 'from-[#FFFF00]/60'
                        } to-transparent opacity-30 group-hover:opacity-100 transition-all duration-700 cursor-pointer`}
                      ></div>
                      
                      <div className="absolute top-6 right-6">
                        <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest">
                          {product.price > 300 ? 'Limited' : 'New Drop'}
                        </span>
                      </div>
                      
                      {/* Add to Cart Button (Hover) */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 w-[80%] z-10">
                        <button
                          onClick={() => onQuickAdd(product)}
                          className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#00FFFF] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Quick Add <iconify-icon icon="lucide:plus"></iconify-icon>
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start text-charcoal">
                      <div className="cursor-pointer" onClick={() => onProductSelect(product.id)}>
                        <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-[#FF00FF] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 mt-1">
                          {product.category} // {product.collection}
                        </p>
                      </div>
                      <span className="text-base font-black">${product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
