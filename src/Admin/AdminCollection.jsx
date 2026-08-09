import React, { useState, useEffect, useRef } from 'react';
import { 
  Droplets, Calendar, Plus, Search, IndianRupee, Beaker, 
  CheckCircle2, Clock, Milk
} from 'lucide-react';

// Custom Reveal Component
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Small inline progress bar for table
const TableBar = ({ value, colorClass, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
      <div 
        className={`h-full rounded-full transition-all duration-[1500ms] ease-out ${colorClass}`}
        style={{ width: isVisible ? `${value * 10}%` : '0%' }}
      ></div>
    </div>
  );
};

const AdminCollection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: "Total Milk Today", value: "5,200 L", icon: <Droplets className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Suppliers Today", value: "120", icon: <CheckCircle2 className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Average Fat", value: "7.6%", icon: <Beaker className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" },
    { title: "Total Payout", value: "₹2.4L", icon: <IndianRupee className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const collections = [
    { id: "#COL01", supplier: "Mahesh Patel", village: "Namli", type: "Buffalo", qty: "15 L", fat: 8.2, snf: 9.1, amount: "₹960", status: "Paid", img: "https://i.pravatar.cc/150?img=60" },
    { id: "#COL02", supplier: "Suresh Choudhary", village: "Alot", type: "Cow", qty: "8 L", fat: 6.5, snf: 8.8, amount: "₹480", status: "Pending", img: "https://i.pravatar.cc/150?img=15" },
    { id: "#COL03", supplier: "Rameshwar Singh", village: "Jaora", type: "Mixed", qty: "12 L", fat: 7.0, snf: 9.0, amount: "₹840", status: "Paid", img: "https://i.pravatar.cc/150?img=33" },
    { id: "#COL04", supplier: "Kamal Verma", village: "Piploda", type: "Buffalo", qty: "10 L", fat: 8.5, snf: 9.2, amount: "₹850", status: "Pending", img: "https://i.pravatar.cc/150?img=51" },
    { id: "#COL05", supplier: "Gajendra Joshi", village: "Bajna", type: "Cow", qty: "5 L", fat: 6.2, snf: 8.5, amount: "₹300", status: "Paid", img: "https://i.pravatar.cc/150?img=68" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header & Date */}
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Daily Milk Collection</h1>
            <p className="text-gray-500 mt-1">Track morning and evening milk entries from suppliers.</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="date" 
                defaultValue="2024-05-20"
                className="pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none text-sm font-medium text-gray-600 shadow-sm"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
              <Plus className="w-5 h-5 mr-2" /> Add Entry
            </button>
          </div>
        </div>
      </Reveal>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.colorClass}`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Collection Table Card */}
      <Reveal delay={200}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Table Header / Search */}
          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-gray-900">Today's Entries</h2>
            
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search supplier..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none w-full md:w-72 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Milk Type</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Qty</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Fat & SNF</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((item, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-200 group">
                    
                    {/* Supplier Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={item.img} alt={item.supplier} className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{item.supplier}</h4>
                          <span className="text-xs text-gray-400">{item.village}</span>
                        </div>
                      </div>
                    </td>

                    {/* Milk Type Badge */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${
                        item.type === 'Cow' ? 'bg-blue-50 text-blue-600' : 
                        item.type === 'Buffalo' ? 'bg-amber-50 text-amber-600' : 
                        'bg-purple-50 text-purple-600'
                      }`}>
                        <Milk className="w-3 h-3 mr-1" /> {item.type}
                      </span>
                    </td>

                    {/* Quantity */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-800 text-sm">{item.qty}</span>
                    </td>

                    {/* Fat & SNF with Mini Bars */}
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-gray-500 w-12">Fat: {item.fat}%</span>
                          <TableBar value={item.fat} colorClass="bg-yellow-500" delay={index * 100} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-gray-500 w-12">SNF: {item.snf}%</span>
                          <TableBar value={item.snf} colorClass="bg-green-500" delay={index * 150} />
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6">
                      <span className="font-extrabold text-gray-900 text-sm">{item.amount}</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${
                        item.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {item.status === 'Paid' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Summary */}
          <div className="p-6 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100">
            <p className="text-sm text-gray-500">Showing 5 of 120 entries for today</p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="font-medium text-gray-500">Morning: <span className="font-bold text-gray-800">3,200 L</span></span>
              <span className="font-medium text-gray-500">Evening: <span className="font-bold text-gray-800">2,000 L</span></span>
              <button className="text-blue-600 font-bold hover:underline">View Full History</button>
            </div>
          </div>

        </div>
      </Reveal>

    </div>
  );
};

export default AdminCollection;