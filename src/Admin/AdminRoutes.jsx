import React, { useState, useEffect, useRef } from 'react';
import { Route, MapPin, Users, Clock, Plus, Search, Bike } from 'lucide-react';

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

const AdminRoutes = () => {
  const routes = [
    { id: "#RTE01", name: "Station Road Loop", area: "Station Road", stops: 45, boy: "Ramesh K.", time: "5:00 AM", progress: 90, status: "Active" },
    { id: "#RTE02", name: "MG Road Circle", area: "MG Road", stops: 30, boy: "Suresh S.", time: "6:00 AM", progress: 100, status: "Completed" },
    { id: "#RTE03", name: "Jaora Highway Stretch", area: "Jaora Road", stops: 50, boy: "Mahesh P.", time: "5:30 AM", progress: 40, status: "Active" },
    { id: "#RTE04", name: "Aligarh Village Route", area: "Aligarh", stops: 25, boy: "Kamal V.", time: "7:00 AM", progress: 0, status: "Pending" }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Routes Management</h1>
            <p className="text-gray-500 mt-1">Organize delivery zones and assign route maps.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Create Route
          </button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routes.map((route, index) => (
          <Reveal key={route.id} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition">
                    <Route className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{route.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center"><MapPin className="w-3 h-3 mr-1" /> {route.area}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${route.status === 'Completed' ? 'bg-green-50 text-green-600' : route.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-yellow-50 text-yellow-600'}`}>{route.status}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <Users className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Stops</p>
                  <p className="font-bold text-gray-800">{route.stops}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <Clock className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Start Time</p>
                  <p className="font-bold text-gray-800">{route.time}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <Bike className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">Driver</p>
                  <p className="font-bold text-gray-800 text-sm truncate">{route.boy}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                  <span>Delivery Progress</span>
                  <span>{route.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-1000" style={{ width: `${route.progress}%` }}></div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default AdminRoutes;