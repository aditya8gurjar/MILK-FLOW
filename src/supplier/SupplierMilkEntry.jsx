import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Sun, Moon, Calculator, CheckCircle2, Beaker } from 'lucide-react';

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

const SupplierMilkEntry = () => {
  const [shift, setShift] = useState('Morning');
  const [qty, setQty] = useState(5);
  const [fat, setFat] = useState(8.0);

  // Live rate calculation (e.g., ₹80 per liter for 8% fat)
  const calculatedAmount = (qty * (fat / 8) * 80).toFixed(0);

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Daily Milk Entry</h1>
          <p className="text-gray-500 mt-1">Submit your morning and evening milk quantities.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Entry Form */}
        <Reveal delay={100} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center mb-8">
              <Droplets className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">New Entry</h2>
            </div>

            {/* Shift Toggle */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={() => setShift('Morning')} className={`p-4 rounded-xl border-2 flex items-center justify-center font-bold transition ${shift === 'Morning' ? 'border-yellow-500 bg-yellow-50 text-yellow-600' : 'border-slate-200 text-slate-500'}`}>
                <Sun className="w-5 h-5 mr-2" /> Morning
              </button>
              <button onClick={() => setShift('Evening')} className={`p-4 rounded-xl border-2 flex items-center justify-center font-bold transition ${shift === 'Evening' ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-500'}`}>
                <Moon className="w-5 h-5 mr-2" /> Evening
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Liters)</label>
                <input type="number" value={qty} onChange={(e) => setQty(parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none text-2xl font-bold" />
              </div>
              {/* Fat % */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fat Content (%)</label>
                <div className="relative">
                  <Beaker className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input type="number" step="0.1" value={fat} onChange={(e) => setFat(parseFloat(e.target.value) || 0)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none text-2xl font-bold" />
                </div>
              </div>
            </div>

            <button className="btn-shine w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center relative">
              <span className="relative z-10 flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> Submit Entry</span>
            </button>
          </div>
        </Reveal>

        {/* Live Calculator */}
        <Reveal delay={200}>
          <div className="bg-gradient-to-br from-slate-900 to-green-900 p-8 rounded-2xl shadow-xl text-white h-full flex flex-col">
            <div className="flex items-center mb-6">
              <Calculator className="w-8 h-8 text-green-400 mr-3" />
              <h2 className="text-xl font-bold">Live Rate Calculator</h2>
            </div>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Shift</span>
                <span className="font-bold">{shift}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Quantity</span>
                <span className="font-bold">{qty} Liters</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Fat Content</span>
                <span className="font-bold">{fat}%</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">Base Rate (8% Fat)</span>
                <span className="font-bold">₹80 / L</span>
              </div>
            </div>

            <div className="mt-auto text-center bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <p className="text-green-200 text-sm mb-2">Estimated Payout</p>
              <h3 className="text-5xl font-extrabold text-white">₹{calculatedAmount}</h3>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default SupplierMilkEntry;