import React, { useState, useEffect } from 'react';
import SideNavigation from './components/SideNavigation';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CollectionsView from './components/CollectionsView';
import ProductDetailView from './components/ProductDetailView';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import SearchModal from './components/SearchModal';

export default function App() {
  // Navigation & Global States
  const [view, setView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('rose-satin-hardware-dress');
  const [cart, setCart] = useState([]);
  
  // Modals & Overlays
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  // Toast notifications
  const [toast, setToast] = useState(null);

  // Sync cart with localStorage for persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('tooni_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart storage:", e);
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('tooni_cart', JSON.stringify(newCart));
  };

  // Toast dispatch
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Reactive Cart Operations
  const handleAddToCart = (product, quantity, size, color) => {
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === size && item.color === color
    );

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({
        ...product,
        quantity,
        size,
        color
      });
    }
    
    saveCart(updatedCart);
    showToast(`ADDED: ${product.name} (SIZE: ${size}) TO BAG`);
  };

  const handleQuickAdd = (product) => {
    // Quick Add defaults: size S, first color swatch
    const defaultColor = product.colors[0];
    const colorName = product.colorNames[defaultColor] || 'Selected Palette';
    const defaultSize = product.sizes[0] || 'M';
    handleAddToCart(product, 1, defaultSize, colorName);
  };

  const handleUpdateQuantity = (id, size, color, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id, size, color);
      return;
    }
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.size === size && item.color === color) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const handleRemoveItem = (id, size, color) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    );
    saveCart(updatedCart);
    showToast("REMOVED ITEM FROM BAG");
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine active SideNavigation highlight
  const getActiveSideItem = () => {
    if (view === 'collections') return 'curation';
    if (view === 'product-detail') return 'curation';
    if (view === 'cart') return 'curation';
    return 'vision'; // default to vision on home or checkout
  };

  // Cart Items Count
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen relative flex flex-col bg-[#FFC0CB] font-sans selection:bg-charcoal selection:text-pink">
      {/* Side Navigation */}
      <SideNavigation
        activeItem={getActiveSideItem()}
        onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />

      {/* Main Wrapper */}
      <div className="lg:pl-20 flex-1 flex flex-col">
        {/* Navigation Bar */}
        <NavigationBar
          currentView={view}
          onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          cartCount={cartItemsCount}
          onSearchToggle={() => setSearchOpen(true)}
          onProfileToggle={() => setProfileOpen(true)}
        />

        {/* Dynamic Page Views */}
        {view === 'home' && (
          <HomeView
            onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onProductSelect={handleProductSelect}
          />
        )}
        {view === 'collections' && (
          <CollectionsView
            onProductSelect={handleProductSelect}
            onQuickAdd={handleQuickAdd}
          />
        )}
        {view === 'product-detail' && (
          <ProductDetailView
            productId={selectedProductId}
            onAddToCart={handleAddToCart}
            onProductSelect={handleProductSelect}
            onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}
        {view === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}
        {view === 'checkout' && (
          <CheckoutView
            cart={cart}
            onClearCart={handleClearCart}
            onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />
        )}

        {/* Footer */}
        <Footer onViewChange={(v) => { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
      </div>

      {/* Live Search Modal */}
      {searchOpen && (
        <SearchModal
          onClose={() => setSearchOpen(false)}
          onProductSelect={handleProductSelect}
        />
      )}

      {/* User Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 backdrop-blur-sm" onClick={() => setProfileOpen(false)}>
          <div className="bg-[#FFC0CB] p-8 max-w-sm w-full border border-black/10 text-charcoal shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setProfileOpen(false)} className="absolute top-4 right-4 text-charcoal hover:text-[#FF00FF] cursor-pointer">
              <iconify-icon icon="lucide:x" class="text-xl"></iconify-icon>
            </button>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/40 block mb-2">IDENTITY PORTAL</span>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">ARCHIVE MEMBER</h3>
            <div className="space-y-4 text-xs font-black uppercase tracking-widest border-t border-black/10 pt-4 mb-6">
              <p className="flex justify-between"><span className="opacity-40">Status</span> <span className="text-[#FF00FF]">ACTIVE</span></p>
              <p className="flex justify-between"><span className="opacity-40">Rank</span> <span>Curation Tier 01</span></p>
              <p className="flex justify-between"><span className="opacity-40">Signature</span> <span>ALEXANDER</span></p>
            </div>
            <button
              onClick={() => setProfileOpen(false)}
              className="w-full py-3 bg-charcoal text-pink text-xs font-black uppercase tracking-[0.3em] hover:bg-[#00FFFF] hover:text-charcoal transition-all cursor-pointer"
            >
              Close Identity
            </button>
          </div>
        </div>
      )}

      {/* Reactive Toast Notification */}
      {toast && (
        <div className="fixed bottom-10 right-10 z-50 bg-charcoal text-pink px-8 py-4 shadow-2xl border border-pink/20 uppercase text-[10px] font-black tracking-[0.2em] flex items-center gap-4 animate-slide-in">
          <iconify-icon icon="lucide:sparkles" class="text-[#00FFFF]"></iconify-icon>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
