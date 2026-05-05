import React, { useState } from 'react';

export default function CheckoutView({ cart, onClearCart, onViewChange }) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Calculations
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate transaction processing
    const randomRef = `TOONI-${Math.floor(100000 + Math.random() * 900000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    setOrderRef(randomRef);
    setOrderCompleted(true);
  };

  const handleFinish = () => {
    onClearCart();
    onViewChange('home');
  };

  if (orderCompleted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-32 bg-pink-texture text-charcoal px-6">
        <div className="max-w-xl w-full bg-charcoal text-pink p-12 shadow-[0_40px_80px_rgba(0,0,0,0.4)] border border-pink/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
            <div className="grid grid-cols-6 h-full">
              <div className="border-r border-white"></div>
              <div className="border-r border-white"></div>
            </div>
          </div>

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-full border-2 border-[#00FFFF] flex items-center justify-center mx-auto mb-8 animate-bounce">
              <iconify-icon icon="lucide:shield-check" class="text-4xl text-[#00FFFF]"></iconify-icon>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#00FFFF] block mb-2">
              TRANSACTION AUTHENTICATED
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
              ORDER <br /><span className="italic serif text-white">IN TRANSIT</span>
            </h2>

            <div className="border-y border-white/10 py-6 my-8 text-left space-y-4 text-xs tracking-widest font-black uppercase">
              <div className="flex justify-between">
                <span className="opacity-40">Protocol Reference</span>
                <span className="text-white">{orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-40">Recipient</span>
                <span className="text-white">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-40">Destination</span>
                <span className="text-white text-right max-w-[200px] truncate">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-[#FFFF00]">
                <span>Total Authenticated</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[10px] font-medium opacity-50 mb-10 leading-relaxed text-center">
              A secure transmission has been dispatched to {formData.email}. <br />
              Logistics updates will route automatically.
            </p>

            <button
              onClick={handleFinish}
              className="w-full py-5 bg-pink text-charcoal font-black uppercase text-[10px] tracking-[0.3em] hover:bg-[#00FFFF] transition-all cursor-pointer shadow-lg"
            >
              Terminate Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 grid grid-cols-12 text-charcoal">
      {/* Checkout Form */}
      <div className="col-span-12 lg:col-span-8 p-6 md:p-12 lg:p-20 relative bg-pink-texture">
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="flex items-baseline justify-between mb-16">
            <h1 className="text-5xl font-black uppercase tracking-tighter">
              SECURE <span className="italic serif text-black/60">CHECKOUT</span>
            </h1>
            <button
              onClick={() => onViewChange('cart')}
              className="text-xs font-black uppercase tracking-widest border-b border-black pb-1 cursor-pointer bg-transparent"
            >
              Back to Bag
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Identity & Delivery */}
            <div className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 border-b border-black/10 pb-3">
                01 // Identity & Shipping Coordinates
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E.G. REBEL@TOONI.CO"
                    className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs uppercase font-black tracking-wider placeholder:opacity-30"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="E.G. ALEXANDER ROSE"
                    className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs uppercase font-black tracking-wider placeholder:opacity-30"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                  STREET ADDRESS
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="E.G. 42 INDUSTRIAL WAY, BLOCK B"
                  className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs uppercase font-black tracking-wider placeholder:opacity-30"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                    CITY
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="E.G. NEW YORK"
                    className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs uppercase font-black tracking-wider placeholder:opacity-30"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                    ZIP CODE
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="E.G. 10001"
                    className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs uppercase font-black tracking-wider placeholder:opacity-30"
                  />
                </div>
              </div>
            </div>

            {/* Financial Credentials */}
            <div className="space-y-8">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 border-b border-black/10 pb-3">
                02 // Financial Credentials
              </h2>

              <div className="flex flex-col">
                <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                  CARDHOLDER NAME
                </label>
                <input
                  type="text"
                  name="cardName"
                  required
                  value={formData.cardName}
                  onChange={handleChange}
                  placeholder="NAME AS SHOWN ON CARD"
                  className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs uppercase font-black tracking-wider placeholder:opacity-30"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                  CARD NUMBER
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  required
                  pattern="[0-9]{16}"
                  maxLength="16"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                  className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs font-black tracking-[0.2em] placeholder:opacity-30"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                    EXPIRATION DATE
                  </label>
                  <input
                    type="text"
                    name="cardExpiry"
                    required
                    placeholder="MM/YY"
                    maxLength="5"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs font-black tracking-widest placeholder:opacity-30"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[9px] font-black uppercase tracking-widest text-black/60 mb-2">
                    SECURITY CODE (CVV)
                  </label>
                  <input
                    type="password"
                    name="cardCvv"
                    required
                    pattern="[0-9]{3,4}"
                    maxLength="4"
                    value={formData.cardCvv}
                    onChange={handleChange}
                    placeholder="***"
                    className="bg-transparent border-b border-black/20 focus:border-black outline-none py-3 text-xs font-black tracking-widest placeholder:opacity-30"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-6 bg-charcoal text-[#00FFFF] text-center text-xs font-black uppercase tracking-[0.4em] hover:bg-[#FF00FF] hover:text-white transition-all transform hover:scale-[1.01] shadow-2xl cursor-pointer"
            >
              AUTHORIZE TRANSACTION // ${total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>

      {/* Checkout Sidebar Summary */}
      <aside className="col-span-12 lg:col-span-4 bg-charcoal p-6 md:p-12 lg:p-20 text-[#FFC0CB] flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
          <div className="grid grid-cols-4 h-full">
            <div className="border-r border-white"></div>
            <div className="border-r border-white"></div>
          </div>
        </div>

        <div className="relative z-10 w-full">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 text-[#FF00FF]">
              ARCHIVE DETAILS
            </h2>
            
            <div className="space-y-8 max-h-[300px] overflow-y-auto pr-4 mb-12 border-b border-white/5 pb-8">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center gap-6">
                  <div className="w-16 h-20 bg-black/40 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover image-saturated" />
                  </div>
                  <div className="flex-1 text-[10px] font-black uppercase tracking-widest">
                    <h4 className="text-white truncate max-w-[150px]">{item.name}</h4>
                    <p className="opacity-40 mt-1">QTY: {item.quantity} // SIZE: {item.size}</p>
                    <p className="opacity-40">COLOR: {item.color}</p>
                  </div>
                  <span className="text-xs font-black text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-40">Subtotal</span>
                <span className="text-xl font-black">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-40">Tax (8%)</span>
                <span className="text-xl font-black">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest opacity-40">Transit Fee</span>
                <span className="text-xl font-black text-[#FFFF00]">FREE</span>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-8">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-[#00FFFF]">Total</span>
                <span className="text-4xl font-black text-white">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed opacity-50 space-y-4">
            <div className="flex items-center gap-2">
              <iconify-icon icon="lucide:lock" class="text-sm text-[#00FFFF]"></iconify-icon>
              <span>TLS 1.3 Encryption Active</span>
            </div>
            <p>
              By authorizing, you consent to the delivery protocol coordinates under TOONI Standard Curation terms.
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
