import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Plus, Minus, ShoppingCart, Milk, Droplets, Snowflake } from 'lucide-react';

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(ref.current); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const CustomerExtraOrders = () => {
  const [cart, setCart] = useState({});

  const products = [
    { id: 1, name: "Extra Cow Milk", price: 60, unit: "Litre", icon: <Milk className="w-10 h-10 text-blue-500" /> },
    { id: 2, name: "Pure Ghee", price: 550, unit: "Kg", icon: <Droplets className="w-10 h-10 text-yellow-500" /> },
    { id: 3, name: "Fresh Paneer", price: 320, unit: "Kg", icon: <ShoppingBag className="w-10 h-10 text-green-500" /> },
    { id: 4, name: "Homemade Curd", price: 40, unit: "500g", icon: <Snowflake className="w-10 h-10 text-indigo-500" /> }
  ];

  const handleQtyChange = (id, delta) => {
    setCart(prev => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalAmount = products.reduce((sum, p) => sum + (cart[p.id] || 0) * p.price, 0);

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Order Extra Dairy</h1>
          <p className="text-gray-500 mt-1">Need extra milk or dairy products today? Order instantly.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Products Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((p, index) => (
            <Reveal key={p.id} delay={index * 100}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col items-center text-center group preserve-3d hover:[transform:rotateY(5deg)_rotateX(5deg)]">
                <div className="p-4 bg-slate-50 rounded-2xl mb-4 group-hover:scale-110 transition">{p.icon}</div>
                <h3 className="font-bold text-gray-800 text-lg">{p.name}</h3>
                <p className="text-blue-600 font-extrabold text-xl mb-4">₹{p.price} <span className="text-xs text-gray-400 font-normal">/ {p.unit}</span></p>
                
                <div className="flex items-center justify-between bg-slate-50 rounded-xl border border-slate-200 p-2 w-full mt-auto">
                  <button onClick={() => handleQtyChange(p.id, -1)} className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-105"><Minus className="w-4 h-4 text-gray-600" /></button>
                  <span className="font-bold text-gray-800">{cart[p.id] || 0}</span>
                  <button onClick={() => handleQtyChange(p.id, 1)} className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-105"><Plus className="w-4 h-4 text-blue-600" /></button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cart Summary */}
        <Reveal delay={200}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col sticky top-24">
            <div className="flex items-center mb-8">
              <ShoppingCart className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            </div>
            
            <div className="space-y-4 flex-grow">
              {products.map(p => cart[p.id] > 0 && (
                <div key={p.id} className="flex justify-between items-center text-sm border-b border-slate-100 pb-4">
                  <span className="text-gray-600">{p.name} x {cart[p.id]}</span>
                  <span className="font-bold text-gray-800">₹{cart[p.id] * p.price}</span>
                </div>
              ))}
              {totalItems === 0 && <p className="text-gray-400 text-sm text-center py-8">Your cart is empty. Add items to order.</p>}
            </div>

            <div className="mt-8 pt-8 border-t-2 border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500 font-medium">Total Amount</span>
                <span className="text-3xl font-extrabold text-gray-900">₹{totalAmount}</span>
              </div>
              <button disabled={totalItems === 0} className="btn-shine w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center relative disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="relative z-10 flex items-center">Place Order</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default CustomerExtraOrders;