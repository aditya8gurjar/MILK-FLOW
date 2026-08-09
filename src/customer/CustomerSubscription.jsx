import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Sun, Moon, Plus, Minus, PauseCircle, PlayCircle, CheckCircle2, CreditCard } from 'lucide-react';

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

const Toggle = ({ enabled, onChange }) => (
  <button onClick={() => onChange(!enabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${enabled ? 'bg-red-500' : 'bg-slate-200'}`}>
    <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const CustomerSubscription = () => {
  const [morningQty, setMorningQty] = useState(1);
  const [eveningQty, setEveningQty] = useState(1);
  const [vacationMode, setVacationMode] = useState(false);

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Subscription</h1>
          <p className="text-gray-500 mt-1">Manage your daily milk plan and modifications.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Current Plan Card */}
        <Reveal delay={100} className="lg:col-span-1">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl shadow-blue-600/20 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">ACTIVE</span>
              <CreditCard className="w-8 h-8 text-blue-200" />
            </div>
            <h2 className="text-3xl font-extrabold mb-2">Family Plus</h2>
            <p className="text-blue-100 mb-8">Valid until May 31, 2024</p>
            
            <div className="space-y-4 mt-auto">
              <div className="flex justify-between text-sm border-t border-white/20 pt-4">
                <span className="text-blue-200">Monthly Fee</span>
                <span className="font-bold">₹3,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-200">Delivery Slot</span>
                <span className="font-bold">Morning & Evening</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Modify Quantities & Vacation */}
        <Reveal delay={200} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Customize Daily Delivery</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Morning Qty Stepper */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center mb-4">
                  <Sun className="w-6 h-6 text-yellow-500 mr-2" />
                  <h4 className="font-bold text-gray-800">Morning Quantity</h4>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={() => setMorningQty(Math.max(0, morningQty - 0.5))} className="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-100 transition hover:scale-105"><Minus className="w-5 h-5 text-gray-600" /></button>
                  <span className="text-3xl font-extrabold text-gray-900">{morningQty} L</span>
                  <button onClick={() => setMorningQty(morningQty + 0.5)} className="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-100 transition hover:scale-105"><Plus className="w-5 h-5 text-blue-600" /></button>
                </div>
              </div>

              {/* Evening Qty Stepper */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center mb-4">
                  <Moon className="w-6 h-6 text-indigo-500 mr-2" />
                  <h4 className="font-bold text-gray-800">Evening Quantity</h4>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={() => setEveningQty(Math.max(0, eveningQty - 0.5))} className="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-100 transition hover:scale-105"><Minus className="w-5 h-5 text-gray-600" /></button>
                  <span className="text-3xl font-extrabold text-gray-900">{eveningQty} L</span>
                  <button onClick={() => setEveningQty(eveningQty + 0.5)} className="bg-white p-3 rounded-xl shadow-sm hover:bg-gray-100 transition hover:scale-105"><Plus className="w-5 h-5 text-blue-600" /></button>
                </div>
              </div>
            </div>

            {/* Vacation Mode */}
            <div className={`p-6 rounded-2xl border-2 flex items-center justify-between transition ${vacationMode ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center">
                <PauseCircle className={`w-8 h-8 mr-4 ${vacationMode ? 'text-red-500' : 'text-gray-400'}`} />
                <div>
                  <h4 className="font-bold text-gray-800">Vacation Mode</h4>
                  <p className="text-sm text-gray-500">Pause deliveries temporarily without charges.</p>
                </div>
              </div>
              <Toggle enabled={vacationMode} onChange={setVacationMode} />
            </div>

            <button className="btn-shine mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative">
              <span className="relative z-10 flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> Save Changes</span>
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default CustomerSubscription;