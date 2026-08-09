import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, LogIn } from 'lucide-react';

const SessionExpired = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center p-4 overflow-hidden relative">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      
      <div className="relative z-10 text-white max-w-md">
        <div className="relative inline-block mb-8">
          <Clock className="w-20 h-20 text-yellow-400 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Session Expired</h1>
        <p className="text-slate-400 mb-8">
          For your security, your session has timed out due to inactivity. Please log in again to continue managing your dairy account.
        </p>
        <Link to="/login" className="bg-yellow-400 text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto w-fit">
          <LogIn className="w-5 h-5 mr-2" /> Login Again
        </Link>
      </div>
    </div>
  );
};

export default SessionExpired;