import React, { useState, useEffect, useRef } from 'react';
import { Droplets, Wallet, TrendingUp, Award, Plus, ArrowUpRight } from 'lucide-react';

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

const SupplierDashboard = () => {
  const stats = [
    { title: "Today's Milk", value: "15 L", icon: <Droplets className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Week's Earning", value: "₹4,200", icon: <Wallet className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Avg Fat Content", value: "8.2%", icon: <Award className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" },
    { title: "Month-to-Date", value: "₹18,500", icon: <TrendingUp className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const recentEntries = [
    { date: "May 20", shift: "Morning", qty: "8 L", fat: "8.2%", amount: "₹640", status: "Credited" },
    { date: "May 20", shift: "Evening", qty: "7 L", fat: "8.0%", amount: "₹560", status: "Credited" },
    { date: "May 19", shift: "Morning", qty: "9 L", fat: "8.5%", amount: "₹765", status: "Credited" },
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-green-600/20 flex flex-wrap justify-between items-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-2">Namaste, Mahesh! 🌾</h1>
            <p className="text-green-100">Your morning milk collection is ready for pickup at 8:00 AM.</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-green-50 transition transform hover:scale-105 shadow-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Add Evening Entry
          </button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.colorClass}`}>{stat.icon}</div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <h2 className="text-xl font-bold text-gray-900">Recent Milk Submissions</h2>
            <button className="text-green-600 font-bold text-sm hover:underline flex items-center">
              View History <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase">Date</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase">Shift</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase">Qty</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase hidden md:table-cell">Fat</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentEntries.map((entry, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-200">
                    <td className="py-4 px-6 font-bold text-gray-800 text-sm">May {entry.date.includes("19") ? "19" : "20"}</td>
                    <td className="py-4 px-6 text-gray-600 text-sm">{entry.shift}</td>
                    <td className="py-4 px-6 text-gray-800 font-bold text-sm">{entry.qty}</td>
                    <td className="py-4 px-6 text-gray-500 text-sm hidden md:table-cell">{entry.fat}</td>
                    <td className="py-4 px-6 font-extrabold text-green-600 text-sm">{entry.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default SupplierDashboard;