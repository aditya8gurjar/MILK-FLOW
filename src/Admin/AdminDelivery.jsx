import React, { useState, useEffect, useRef } from 'react';
import { Truck, MapPin, CheckCircle2, Clock, User, Search, Bike } from 'lucide-react';

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

const AdminDelivery = () => {
  const deliveries = [
    { id: "#DEL01", boy: "Ramesh", area: "Station Road", total: 45, done: 42, pending: 3, status: "Active", img: "https://i.pravatar.cc/150?img=12" },
    { id: "#DEL02", boy: "Suresh", area: "MG Road", total: 30, done: 30, pending: 0, status: "Completed", img: "https://i.pravatar.cc/150?img=15" },
    { id: "#DEL03", boy: "Mahesh", area: "Jaora Road", total: 50, done: 20, pending: 30, status: "Active", img: "https://i.pravatar.cc/150?img=33" },
    { id: "#DEL04", boy: "Kamal", area: "Aligarh", total: 25, done: 0, pending: 25, status: "Pending", img: "https://i.pravatar.cc/150?img=51" }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Delivery Management</h1>
            <p className="text-gray-500 mt-1">Track delivery boys and route status in real-time.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <Bike className="w-5 h-5 mr-2" /> Assign Route
          </button>
        </div>
      </Reveal>

      {/* Delivery Boys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.map((d, index) => (
          <Reveal key={d.id} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img src={d.img} alt={d.boy} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md" />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{d.boy}</h3>
                    <p className="text-sm text-gray-400 flex items-center"><MapPin className="w-3 h-3 mr-1" /> {d.area}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${d.status === 'Completed' ? 'bg-green-50 text-green-600' : d.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>{d.status}</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 flex items-center font-medium"><CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> Delivered</span>
                  <span className="font-bold text-gray-800">{d.done} / {d.total}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${(d.done / d.total) * 100}%` }}></div>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100">
                  <span className="text-gray-500 flex items-center font-medium"><Clock className="w-4 h-4 mr-2 text-orange-500" /> Pending</span>
                  <span className="font-bold text-gray-800">{d.pending} Packets</span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default AdminDelivery;