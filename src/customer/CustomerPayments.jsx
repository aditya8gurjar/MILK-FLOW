import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Plus, IndianRupee, ArrowDownLeft, ArrowUpRight, CreditCard } from 'lucide-react';

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

const CustomerPayments = () => {
  const transactions = [
    { id: 1, desc: "May Subscription Paid", amount: "₹3,200", date: "May 15, 2024", type: "debit" },
    { id: 2, desc: "Wallet Top-up", amount: "₹1,000", date: "May 10, 2024", type: "credit" },
    { id: 3, desc: "April Subscription Paid", amount: "₹3,200", date: "Apr 15, 2024", type: "debit" },
    { id: 4, desc: "Refund - Missed Delivery", amount: "₹120", date: "Apr 12, 2024", type: "credit" }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Payments & Wallet</h1>
          <p className="text-gray-500 mt-1">Manage your balance, top-up wallet, and view transactions.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Wallet Card */}
        <Reveal delay={100} className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-900 to-slate-700 rounded-3xl p-8 text-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full animate-blob"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl"><Wallet className="w-6 h-6 text-blue-300" /></div>
                <CreditCard className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm mb-2">Current Balance</p>
              <h2 className="text-4xl font-extrabold">₹1,250</h2>
            </div>
            <div className="relative z-10 mt-8">
              <button className="btn-shine w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center relative">
                <span className="relative z-10 flex items-center"><Plus className="w-5 h-5 mr-2" /> Add Money</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Quick Top-up & Methods */}
        <Reveal delay={200} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Top-up</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[500, 1000, 2000].map(amt => (
                <button key={amt} className="p-6 bg-slate-50 rounded-xl border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 transition group">
                  <span className="text-2xl font-extrabold text-gray-800 group-hover:text-blue-600 flex items-center justify-center"><IndianRupee className="w-5 h-5" />{amt}</span>
                </button>
              ))}
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6">Saved Payment Methods</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg mr-4"><CreditCard className="w-6 h-6 text-blue-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">HDFC Bank •••• 4242</h4>
                    <p className="text-xs text-gray-400">Expires 08/26</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Default</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Transaction History */}
      <Reveal delay={300}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {transactions.map(t => (
              <div key={t.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition group">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className={`p-3 rounded-xl ${t.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {t.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{t.desc}</h4>
                    <span className="text-xs text-gray-400">{t.date}</span>
                  </div>
                </div>
                <span className={`font-extrabold text-lg ${t.type === 'credit' ? 'text-green-600' : 'text-gray-800'}`}>
                  {t.type === 'credit' ? '+' : '-'}{t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default CustomerPayments;