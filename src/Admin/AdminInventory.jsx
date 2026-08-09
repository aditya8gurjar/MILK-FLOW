import React, { useState, useEffect, useRef } from 'react';
import { Package, AlertTriangle, Boxes, IndianRupee, Plus, Search } from 'lucide-react';

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

const AdminInventory = () => {
  const stats = [
    { title: "Total Stock Value", value: "₹2.5L", icon: <IndianRupee className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Total Items", value: "14", icon: <Boxes className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Low Stock Alerts", value: "3", icon: <AlertTriangle className="w-6 h-6" />, colorClass: "bg-red-50 text-red-600" },
    { title: "Out of Stock", value: "1", icon: <Package className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" }
  ];

  const inventory = [
    { id: "#ITM01", name: "Glass Bottles (1L)", category: "Packaging", stock: 1200, capacity: 2000, status: "In Stock", unit: "Units" },
    { id: "#ITM02", name: "Plastic Pouches (500ml)", category: "Packaging", stock: 150, capacity: 5000, status: "Low Stock", unit: "Units" },
    { id: "#ITM03", name: "Ghee Jars (1Kg)", category: "Packaging", stock: 0, capacity: 500, status: "Out of Stock", unit: "Units" },
    { id: "#ITM04", name: "Curd Cups (200g)", category: "Packaging", stock: 3000, capacity: 5000, status: "In Stock", unit: "Units" },
    { id: "#ITM05", name: "Cleaning Solution", category: "Supplies", stock: 45, capacity: 100, status: "In Stock", unit: "Liters" }
  ];

  const getStockColor = (percent) => {
    if (percent < 10) return "bg-red-500";
    if (percent < 30) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Inventory Management</h1>
            <p className="text-gray-500 mt-1">Track packaging materials and daily supplies.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Add Stock
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
            <h2 className="text-xl font-bold text-gray-900">Stock Overview</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search item..." className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none w-64 text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Stock Level</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => {
                  const percent = (item.stock / item.capacity) * 100;
                  return (
                    <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-200 group">
                      <td className="py-4 px-6">
                        <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                        <span className="text-xs text-gray-400">{item.id}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm hidden md:table-cell">{item.category}</td>
                      <td className="py-4 px-6 w-64">
                        <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                          <span>{item.stock} {item.unit}</span>
                          <span>{item.capacity} {item.unit}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${getStockColor(percent)} rounded-full transition-all duration-1000`} style={{ width: `${percent}%` }}></div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${
                          item.status === 'In Stock' ? 'bg-green-50 text-green-600' : 
                          item.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default AdminInventory;