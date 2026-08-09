import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Clock } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center text-center p-4 overflow-hidden relative">
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      
      <div className="relative z-10 bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full">
        <div className="relative inline-block mb-8">
          <div className="p-6 bg-yellow-50 rounded-3xl">
            <Wrench className="w-16 h-16 text-yellow-500 animate-float-slow" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Under Maintenance</h1>
        <p className="text-gray-500 mb-8">
          We are upgrading our dairy systems to serve you better. We'll be back online shortly. Thank you for your patience!
        </p>
        <div className="flex items-center justify-center text-blue-600 font-bold text-sm bg-blue-50 px-4 py-3 rounded-xl">
          <Clock className="w-5 h-5 mr-2 animate-pulse" /> Estimated Time: 2 Hours
        </div>
      </div>
    </div>
  );
};

export default Maintenance;