import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Milk, Frown } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4 overflow-hidden relative">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="relative z-10">
        <div className="relative inline-block mb-8">
          <Milk className="w-24 h-24 text-blue-500 animate-float-slow" />
          <Frown className="w-10 h-10 text-red-500 absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md" />
        </div>
        
        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Oops! Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Looks like this milk bottle spilled somewhere! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto w-fit">
          <Home className="w-5 h-5 mr-2" /> Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;