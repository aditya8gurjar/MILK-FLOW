import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, Home, LogIn } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4 overflow-hidden relative">
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      
      <div className="relative z-10">
        <div className="p-6 bg-red-50 rounded-3xl w-fit mx-auto mb-8">
          <ShieldX className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-7xl md:text-8xl font-extrabold text-red-500 mb-4">403</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Access Denied</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          Sorry, you do not have permission to access this page. Please log in with the correct account role to continue.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg flex items-center justify-center">
            <LogIn className="w-5 h-5 mr-2" /> Login
          </Link>
          <Link to="/" className="bg-white text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg border border-gray-200 flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;