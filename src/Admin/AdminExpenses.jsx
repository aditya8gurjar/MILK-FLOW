import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Fuel, Wrench, Users, Plus, Search, IndianRupee } from 'lucide-react';

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

const AdminExpenses = () => {
  const stats = [
    { title: "Total Expenses (Today)", value: "₹12,500", icon: <Wallet className="w-6 h-6" />, colorClass: "bg-red-50 text-red-600" },
    { title: "Fuel & Transport", value: "₹4,200", icon: <Fuel className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Maintenance", value: "₹3,100", icon: <Wrench className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" },
    { title: "Staff Salaries", value: "₹5,200", icon: <Users className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const expenses = [
    { id: "#EXP01", desc: "Diesel for Delivery Bikes", cat: "Fuel", amount: "₹2,200", date: "May 20, 2024", icon: <Fuel className="w-5 h-5 text-blue-500" /> },
    { id: "#EXP02", desc: "Collection Center Cleaning", cat: "Maintenance", amount: "₹1,500", date: "May 20, 2024", icon: <Wrench className="w-5 h-5 text-yellow-500" /> },
    { id: "#EXP03", desc: "Morning Shift Staff Salary", cat: "Salary", amount: "₹5,200", date: "May 20, 2024", icon: <Users className="w-5 h-5 text-indigo-500" /> },
    { id: "#EXP04", desc: "Packaging Machine Repair", cat: "Maintenance", amount: "₹1,600", date: "May 19, 2024", icon: <Wrench className="w-5 h-5 text-yellow-500" /> },
    { id: "#EXP05", desc: "Diesel for Transport Van", cat: "Fuel", amount: "₹2,000", date: "May 19, 2024", icon: <Fuel className="w-5 h-5 text-blue-500" /> }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Expenses Tracking</h1>
            <p className="text-gray-500 mt-1">Monitor daily business operational costs.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Add Expense
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
            <h2 className="text-xl font-bold text-gray-900">Recent Expenses</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search expense..." className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none w-64 text-sm" />
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {expenses.map((exp, index) => (
              <div key={index} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition duration-200 group">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition">{exp.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{exp.desc}</h4>
                    <span className="text-xs text-gray-400">{exp.id} • {exp.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-xs font-bold text-gray-500 bg-slate-100 px-3 py-1 rounded-full">{exp.cat}</span>
                  <span className="font-extrabold text-red-600 text-lg flex items-center"><IndianRupee className="w-4 h-4" />{exp.amount.replace('₹', '')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default AdminExpenses;