import React from 'react';

export default function CartView({ cart, onUpdateQuantity, onRemoveItem, onViewChange }) {
  // Calculations
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 bg-pink-texture text-charcoal">
        <div className="mb-8">
          <iconify-icon icon="lucide:shopping-bag" class="text-8xl text-charcoal/20"></iconify-icon>
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Your Archive is Empty</h2>
        <p className="text-sm font-medium opacity-60 mb-10 max-w-xs text-center">
          No artifacts selected yet. Return to curation drop to discover new items.
        </p>
        <button
          onClick={() => onViewChange('collections')}
          className="px-12 py-5 bg-charcoal text-pink text-xs font-black uppercase tracking-[0.3em] hover:bg-[#FF00FF] hover:text-white transition-all cursor-pointer"
        >
          Explore Drop
        </button>
      </div>
    );
  }

  return (
    <main className="flex-1 grid grid-cols-12 text-charcoal">
      {/* Items Section */}
      <div className="col-span-12 lg:col-span-8 p-6 md:p-12 lg:p-20 relative bg-pink-texture">
        <div className="absolute top-10 left-10 pointer-events-none opacity-[0.03] z-0">
          <h1 className="text-[25vw] font-black serif leading-none select-none">BAG</h1>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-baseline justify-between mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Your <span className="italic serif text-black/60">Archive</span>
            </h1>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-black/40">
              {totalItemsCount.toString().padStart(2, '0')} Items
            </span>
          </div>

          <div className="space-y-12 mb-20">
            {cart.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex flex-col md:flex-row items-center gap-10 pb-12 border-b border-black/10">
                {/* Product Image */}
                <div className="w-full md:w-48 aspect-[3/4] overflow-hidden bg-charcoal relative group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover vibrant-img"
                  />
                  <div className={`absolute inset-0 ${
                    idx % 3 === 0 ? 'bg-[#FF00FF]/20' : idx % 3 === 1 ? 'bg-[#00FFFF]/20' : 'bg-[#FFFF00]/20'
                  } opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                </div>

                {/* Product Meta & Adjusters */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-6">
                      Collection: {item.collection || 'Edition 01'}
                    </p>
                    <div className="flex gap-6 text-[11px] font-black uppercase tracking-widest">
                      <p>
                        <span className="text-black/30 mr-2">Size</span> {item.size}
                      </p>
                      <p>
                        <span className="text-black/30 mr-2">Color</span> {item.color}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <span className="text-2xl font-black">${(item.price * item.quantity).toFixed(2)}</span>
                    <div className="flex items-center gap-8 mt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-black/10 bg-white/50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                        >
                          <iconify-icon icon="lucide:minus"></iconify-icon>
                        </button>
                        <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                        >
                          <iconify-icon icon="lucide:plus"></iconify-icon>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id, item.size, item.color)}
                        className="text-black/40 hover:text-[#FF00FF] transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <iconify-icon icon="lucide:trash-2" class="text-xl"></iconify-icon>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onViewChange('collections')}
            className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:text-[#FF00FF] transition-colors bg-transparent cursor-pointer"
          >
            <iconify-icon icon="lucide:arrow-left"></iconify-icon> Return to Collections
          </button>
        </div>
      </div>

      {/* Cart Summary Panel */}
      <aside className="col-span-12 lg:col-span-4 bg-charcoal p-6 md:p-12 lg:p-20 text-[#FFC0CB] flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="grid grid-cols-4 h-full">
            <div className="border-r border-white"></div>
            <div className="border-r border-white"></div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-[#00FFFF]">
              Summary // Protocol
            </h2>
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-40">Subtotal</span>
                <span className="text-xl font-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-40">Shipping Hub</span>
                <span className="text-xl font-black text-[#FFFF00]">FREE</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-40">Archives Tax</span>
                <span className="text-xl font-black">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-12">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#FF00FF]">Total Amount</span>
                <span className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                  ${total.toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={() => onViewChange('checkout')}
                className="block w-full py-6 bg-pink text-charcoal text-center text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#00FFFF] transition-all transform hover:scale-[1.02] shadow-[0_20px_40px_rgba(0,0,0,0.3)] cursor-pointer"
              >
                Initiate Checkout
              </button>
            </div>
          </div>

          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                <iconify-icon icon="lucide:shield-check" class="text-sm text-[#00FFFF]"></iconify-icon>
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed opacity-50">
                Secured by TOONI Encryption Core. <br />
                Refined logistics guaranteed.
              </p>
            </div>
            <div className="flex gap-4 opacity-30 text-3xl">
              <iconify-icon icon="logos:visa"></iconify-icon>
              <iconify-icon icon="logos:mastercard"></iconify-icon>
            </div>
          </div>
        </div>
      </aside>
    </main>
  );
}
