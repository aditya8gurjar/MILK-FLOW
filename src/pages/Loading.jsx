import React from 'react';
import { Milk } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
      <div className="relative">
        {/* Spinning Ring */}
        <div className="w-24 h-24 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Milk className="w-10 h-10 text-blue-600 animate-pulse" />
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
        Ratlam Dairy
      </h2>
      <p className="text-gray-400 text-sm mt-2 font-medium tracking-wider animate-pulse">LOADING FRESH MILK...</p>
    </div>
  );
};

export default Loading;