import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, User, Lock, Eye, EyeOff, ShieldCheck, 
  Tractor, Mail, LogIn
} from 'lucide-react';

// 1. IMPORT YOUR IMAGE HERE (Make sure the name matches exactly)
import dairyFarmImg from "../assets/dairyfarm.png";

// UPGRADED Reveal Component
const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const hiddenStyles = {
    up: 'opacity-0 translate-y-16',
    left: 'opacity-0 -translate-x-16',
    right: 'opacity-0 translate-x-16',
    zoom: 'opacity-0 scale-90',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-out ${className} ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hiddenStyles[direction]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Login = () => {
  const [role, setRole] = useState('Customer');
  const [showPassword, setShowPassword] = useState(false);

  // Removed Admin and Delivery roles
  const roles = [
    { name: "Customer", icon: <User className="w-6 h-6" />, desc: "Manage subscriptions & bills" },
    { name: "Supplier", icon: <Tractor className="w-6 h-6" />, desc: "View milk entries & payments" }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-16">
      
      {/* ================= LOGIN SPLIT SECTION ================= */}
      <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center py-12">
          
          {/* Left Side: Relatable Image & Trust Indicators */}
          <Reveal direction="left" className="hidden lg:block">
            <div className="relative">
              <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
                WELCOME BACK!
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
                Fresh Milk, Just a <span className="text-shine">Click Away</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Login to your dashboard to manage your subscriptions, track daily deliveries, and pay bills online seamlessly.
              </p>

              {/* Relatable Dairy Image with Ken Burns */}
              <div className="relative rounded-3xl shadow-2xl w-full h-[400px] overflow-hidden group">
                <img 
                  src={dairyFarmImg} 
                  alt="Dairy Farm" 
                  className="w-full h-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Floating Stats Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center space-x-4 hover:scale-105 transition duration-300">
                  <div className="bg-green-100 p-3 rounded-full">
                    <ShieldCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-gray-900">100% Secure</h4>
                    <p className="text-gray-500 text-sm">Data encrypted & protected</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Side: Animated Login Form Card */}
          <Reveal direction="right" delay={200}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <LogIn className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Dashboard Login</h2>
                </div>
                <p className="text-gray-500 mb-8">Select your role and enter your credentials.</p>
                
                <form className="space-y-6">
                  
                  {/* Role Selection Grid */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Your Role</label>
                    <div className="grid grid-cols-2 gap-3">
                      {roles.map((r) => (
                        <button
                          key={r.name}
                          type="button"
                          onClick={() => setRole(r.name)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group ${
                            role === r.name
                              ? 'border-blue-600 bg-blue-50 shadow-md scale-[1.02]'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`flex items-center mb-2 transition duration-300 ${
                            role === r.name ? 'text-blue-600 scale-110' : 'text-gray-400 group-hover:text-gray-600'
                          }`}>
                            {r.icon}
                          </div>
                          <h4 className={`font-bold text-sm ${role === r.name ? 'text-blue-700' : 'text-gray-800'}`}>{r.name}</h4>
                          <p className="text-xs text-gray-400 mt-1 hidden sm:block">{r.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email / Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email or Mobile Number</label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        placeholder="e.g. rajesh@example.com" 
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" 
                      />
                    </div>
                  </div>

                  {/* Password with Toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <Link to="/forgot-password" className="text-sm text-blue-600 font-medium hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center">
                    <input 
                      id="remember-me" 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                      Keep me logged in on this device
                    </label>
                  </div>

                  {/* Shiny Submit Button */}
                  <button 
                    type="button" 
                    className="btn-shine w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative"
                  >
                    <span className="relative z-10 flex items-center">
                      Login as {role} <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </button>

                  {/* Register Link */}
                  <p className="text-center text-sm text-gray-500">
                    Don't have an account? {' '}
                    <Link to="/register" className="text-blue-600 font-bold hover:underline">
                      Create an account
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Login;