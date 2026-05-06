import React, { useState, useEffect } from 'react';
import { products } from '../data/products';

export default function ProductDetailView({ productId, onAddToCart, onProductSelect, onViewChange }) {
  // Find current product
  const product = products.find(p => p.id === productId) || products[0];

  // Component local states
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Update active states when product ID changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedColor(product.colors[0]);
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
  }, [productId]);

  // Related products logic: pick other products in the same category or just the first few
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleQuantityChange = (dir) => {
    if (dir === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (dir === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const handleAddBag = (e) => {
    e.preventDefault();
    const colorName = product.colorNames[selectedColor] || 'Selected Palette';
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      collection: product.collection
    }, quantity, selectedSize, colorName);
  };

  return (
    <div className="flex-1 bg-[#FFC0CB]">
      {/* Breadcrumbs */}
      <div className="px-6 md:px-12 py-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
        <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('home'); }} className="hover:text-black">
          Home
        </a>
        <iconify-icon icon="lucide:chevron-right"></iconify-icon>
        <a href="#" onClick={(e) => { e.preventDefault(); onViewChange('collections'); }} className="hover:text-black">
          Collections
        </a>
        <iconify-icon icon="lucide:chevron-right"></iconify-icon>
        <span className="text-black">{product.name}</span>
      </div>

      {/* Product Main Section */}
      <section className="px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 text-charcoal">
        {/* Product Images */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] bg-gradient-to-tr from-[#00FFFF] via-[#FF00FF] to-[#FFFF00] p-[2px] shadow-[0_0_80px_rgba(255,182,217,0.3)]">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover image-saturated"
            />
            <div className="absolute top-8 right-8">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-charcoal hover:text-[#FF00FF] transition-colors shadow-xl cursor-pointer"
              >
                <iconify-icon
                  icon={isFavorite ? "lucide:heart-handshake" : "lucide:heart"}
                  class={`text-xl ${isFavorite ? 'text-[#FF00FF]' : ''}`}
                ></iconify-icon>
              </button>
            </div>
          </div>
          
          {/* Secondary Views */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-6 mt-6">
              {product.images.slice(0, 3).map((imgUrl, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`aspect-square bg-[#1a1a1a] p-[1px] cursor-pointer overflow-hidden transition-opacity hover:opacity-95 ${
                    activeImage === imgUrl ? 'ring-2 ring-black' : 'opacity-80'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`Detail view ${i + 1}`}
                    className="w-full h-full object-cover image-saturated"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 bg-charcoal text-pink text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              {product.collection}
            </span>
            <h1 className="text-5xl md:text-6xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
              {product.name.split(' ').slice(0, 2).join(' ')} <br />
              <span className="italic serif text-black/50">{product.name.split(' ').slice(2).join(' ') || 'Piece'}</span>
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-black">${product.price}</span>
              <div className="flex items-center gap-1 text-[#FF00FF]">
                <iconify-icon icon="lucide:star"></iconify-icon>
                <iconify-icon icon="lucide:star"></iconify-icon>
                <iconify-icon icon="lucide:star"></iconify-icon>
                <iconify-icon icon="lucide:star"></iconify-icon>
                <iconify-icon icon="lucide:star-half"></iconify-icon>
                <span className="text-[10px] font-black text-black ml-2 uppercase tracking-widest">
                  ({product.reviews} Reviews)
                </span>
              </div>
            </div>
            <p className="text-sm text-black/70 font-medium leading-relaxed mb-10">
              {product.description}
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-10 border-t border-black/10 pt-10">
            {/* Color Selection */}
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.4em] mb-6">
                Select Palette: {product.colorNames[selectedColor] || 'Custom'}
              </span>
              <div className="flex gap-4">
                {product.colors.map((colorHex) => (
                  <button
                    key={colorHex}
                    onClick={() => setSelectedColor(colorHex)}
                    className={`w-10 h-10 rounded-full cursor-pointer border border-black/10 transition-transform ${
                      selectedColor === colorHex ? 'ring-2 ring-black ring-offset-2 ring-offset-pink scale-110' : ''
                    }`}
                    style={{ backgroundColor: colorHex }}
                    title={product.colorNames[colorHex]}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                  Select Size: {selectedSize}
                </span>
                <button className="text-[9px] font-black uppercase tracking-widest border-b border-black">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-12 border border-black flex items-center justify-center text-[10px] font-black cursor-pointer transition-colors ${
                      selectedSize === size
                        ? 'bg-charcoal text-pink'
                        : 'bg-transparent text-charcoal hover:bg-black hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <div className="flex items-center border border-black h-16 bg-white/30">
                <button
                  onClick={() => handleQuantityChange('dec')}
                  className="w-12 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <iconify-icon icon="lucide:minus" class="text-xs"></iconify-icon>
                </button>
                <span className="flex-1 w-12 text-center text-xs font-black">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('inc')}
                  className="w-12 h-full flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                >
                  <iconify-icon icon="lucide:plus" class="text-xs"></iconify-icon>
                </button>
              </div>
              <button
                onClick={handleAddBag}
                className="flex-1 h-16 bg-charcoal text-pink flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all shadow-[0_0_20px_rgba(255,0,255,0.2)] hover:shadow-[0_0_30px_rgba(255,0,255,0.5)] group cursor-pointer"
              >
                Add To Shopping Bag
                <iconify-icon
                  icon="lucide:arrow-right"
                  class="group-hover:translate-x-2 transition-transform"
                ></iconify-icon>
              </button>
            </div>
          </div>

          {/* Details Accordion */}
          <div className="mt-12 space-y-6">
            <details className="group" open>
              <summary className="list-none flex justify-between items-center cursor-pointer py-4 border-b border-black/10 focus:outline-none">
                <span className="text-[10px] font-black uppercase tracking-widest">Technical Specifications</span>
                <iconify-icon icon="lucide:plus" class="group-open:hidden"></iconify-icon>
                <iconify-icon icon="lucide:minus" class="hidden group-open:block"></iconify-icon>
              </summary>
              <div className="py-4 text-xs font-medium leading-relaxed text-black/60">
                {product.specifications}
              </div>
            </details>
            <details className="group">
              <summary className="list-none flex justify-between items-center cursor-pointer py-4 border-b border-black/10 focus:outline-none">
                <span className="text-[10px] font-black uppercase tracking-widest">Care Protocol</span>
                <iconify-icon icon="lucide:plus" class="group-open:hidden"></iconify-icon>
                <iconify-icon icon="lucide:minus" class="hidden group-open:block"></iconify-icon>
              </summary>
              <div className="py-4 text-xs font-medium leading-relaxed text-black/60">
                {product.care}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-32 bg-[#1a1a1a] text-[#FFC0CB] px-6 md:px-12">
        <div className="flex items-end justify-between mb-24">
          <div>
            <span className="text-[#00FFFF] text-[10px] font-black uppercase tracking-[0.4em] block mb-4">
              Synchronized Pieces
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Complete The Visual</h2>
          </div>
          <button
            onClick={() => onViewChange('collections')}
            className="text-[10px] font-black uppercase tracking-widest border-b border-[#FFC0CB] pb-2 cursor-pointer bg-transparent"
          >
            View Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((relProd, i) => (
            <div key={relProd.id} onClick={() => onProductSelect(relProd.id)} className="group cursor-pointer">
              <div className={`relative aspect-[4/5] bg-gradient-to-tr ${
                i === 0 ? 'from-[#00FFFF] to-[#FF00FF]' : i === 1 ? 'from-[#FFFF00] to-[#FF00FF]' : i === 2 ? 'from-[#00FFFF] via-[#FFFF00] to-transparent' : 'from-pink to-charcoal'
              } p-[1px] mb-6 overflow-hidden`}>
                <img
                  src={relProd.image}
                  alt={relProd.name}
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-110 image-saturated"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF00FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-black uppercase tracking-widest">{relProd.name}</h3>
                <span className="font-black">${relProd.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
