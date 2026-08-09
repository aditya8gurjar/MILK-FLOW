import React, { useState, useEffect, useRef } from 'react';
import { Truck, MapPin, CheckCircle2, Clock, Sun, Moon, Search } from 'lucide-react';

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

const CustomerDeliveries = () => {
  const history = [
    { date: "May 19, 2024", slot: "Morning", time: "6:05 AM", status: "Delivered", boy: "Ramesh K." },
    { date: "May 19, 2024", slot: "Evening", time: "5:45 PM", status: "Delivered", boy: "Suresh S." },
    { date: "May 18, 2024", slot: "Morning", time: "5:55 AM", status: "Missed", boy: "Ramesh K." },
    { date: "May 18, 2024", slot: "Evening", time: "6:10 PM", status: "Delivered", boy: "Suresh S." }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Deliveries</h1>
          <p className="text-gray-500 mt-1">Track today's milk and view past delivery history.</p>
        </div>
      </Reveal>

      {/* Live Tracking Card */}
      <Reveal delay={100}>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600"><Truck className="w-8 h-8" /></div>
                <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Out for Delivery</h2>
                <p className="text-gray-500 text-sm">Arriving by 6:00 AM</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Delivery Boy</p>
              <p className="font-bold text-gray-800">Ramesh K.</p>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="relative w-full h-2 bg-slate-100 rounded-full mb-2">
            <div className="absolute top-0 left-0 h-full w-2/3 bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-1000"></div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-md"></div>
            <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-md animate-bounce"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-6 h-6 bg-white border-4 border-slate-200 rounded-full shadow-md"></div>
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-500">
            <span>Processed</span>
            <span className="text-blue-600 font-bold">On the way</span>
            <span>Delivered</span>
          </div>
        </div>
      </Reveal>

      {/* Delivery History Table */}
      <Reveal delay={200}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <h2 className="text-xl font-bold text-gray-900">Delivery History</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search date..." className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none w-48 text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Slot</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Time</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-200 group">
                    <td className="py-4 px-6 font-bold text-gray-800 text-sm">{h.date}</td>
                    <td className="py-4 px-6">
                      <span className="flex items-center text-gray-600 text-sm">
                        {h.slot === 'Morning' ? <Sun className="w-4 h-4 text-yellow-500 mr-2" /> : <Moon className="w-4 h-4 text-indigo-500 mr-2" />}
                        {h.slot}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm hidden md:table-cell">{h.time}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${h.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {h.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {h.status}
                      </span>
                    </td>
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

export default CustomerDeliveries;