import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ServerCrash, RefreshCw } from 'lucide-react';

const ServerError = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-4 overflow-hidden relative">
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 text-white">
        <ServerCrash className="w-24 h-24 text-red-400 mb-8 animate-shake mx-auto" />
        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-4">
          500
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Internal Server Error</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-8">
          Our servers are taking a break. We're experiencing some technical issues, but our team is already on it. Please try again later.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => window.location.reload()} className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition transform hover:scale-105 shadow-lg flex items-center justify-center">
            <RefreshCw className="w-5 h-5 mr-2" /> Reload Page
          </button>
          <Link to="/" className="bg-slate-700 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-600 transition transform hover:scale-105 shadow-lg flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;