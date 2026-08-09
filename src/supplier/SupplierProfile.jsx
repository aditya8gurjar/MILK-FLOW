import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Phone, MapPin, Camera, Edit3, Save, Landmark, Tractor, Droplets } from 'lucide-react';

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

const SupplierProfile = () => {
  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and farm details.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <Reveal delay={100} className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center h-full flex flex-col items-center">
            <div className="relative group mb-6">
              <img src="https://i.pravatar.cc/150?img=60" alt="Supplier" className="w-32 h-32 rounded-full object-cover ring-4 ring-green-100 shadow-lg" />
              <button className="absolute bottom-2 right-2 bg-green-600 p-3 rounded-full text-white shadow-md hover:bg-green-700 hover:scale-110 transition transform">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Mahesh Patel</h2>
            <p className="text-green-600 font-bold text-sm mt-1 flex items-center justify-center">
              <Tractor className="w-4 h-4 mr-1" /> Verified Supplier
            </p>
            
            <div className="w-full mt-8 pt-8 border-t border-slate-100 space-y-4 text-left">
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm">mahesh.patel@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <span className="text-sm">Namli Village, Ratlam</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Edit Details Form */}
        <Reveal delay={200} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Personal & Farm Information</h2>
                <p className="text-sm text-gray-500">Update your account details.</p>
              </div>
              <button className="text-green-600 font-bold text-sm flex items-center hover:bg-green-50 px-4 py-2 rounded-lg transition">
                <Edit3 className="w-4 h-4 mr-1" /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input type="text" defaultValue="Mahesh" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input type="text" defaultValue="Patel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none transition" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" defaultValue="mahesh.patel@gmail.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" defaultValue="98765 43210" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Capacity</label>
                <div className="relative">
                  <Droplets className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" defaultValue="15 Liters" disabled className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-gray-500 outline-none cursor-not-allowed" />
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center"><Landmark className="w-5 h-5 text-green-600 mr-2" /> Bank Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input type="text" defaultValue="32984729384729" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input type="text" defaultValue="SBIN0001234" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-100 outline-none transition" />
                </div>
              </div>
            </div>

            <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition transform hover:scale-105 shadow-lg flex items-center">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default SupplierProfile;