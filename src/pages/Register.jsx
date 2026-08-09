import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, User, Phone, MapPin, Home, Calendar, 
  Sun, Moon, Droplets, Check, Gift, Truck, ShieldCheck, Plus, Minus
} from 'lucide-react';

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

const Register = () => {
  const [milkType, setMilkType] = useState('Cow');
  const [morningQty, setMorningQty] = useState(1);
  const [eveningQty, setEveningQty] = useState(0);

  const benefits = [
    { icon: <Gift className="w-8 h-8 text-red-600" />, title: "3-Day Free Trial", desc: "Experience our premium service before you commit to a plan." },
    { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: "100% Pure Guarantee", desc: "Lab-tested for Adulteration, Fat & SNF content every single day." },
    { icon: <Truck className="w-8 h-8 text-green-600" />, title: "Flexible Deliveries", desc: "Going on vacation? Pause your subscription anytime with one click." }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO & FORM SPLIT SECTION ================= */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image & Text */}
          <Reveal direction="left">
            <div>
              <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
                START YOUR SUBSCRIPTION
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
                Fresh Milk at Your <span className="text-shine">Doorstep</span> Tomorrow
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Join 1500+ families in Ratlam who have switched to pure, unadulterated farm milk. Fill in your details and get a 1-day free trial!
              </p>

              {/* Relatable Family/Breakfast Image with Ken Burns */}
              <div className="relative rounded-3xl shadow-2xl w-full h-[350px] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Family Breakfast Milk" 
                  className="w-full h-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating Free Trial Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center space-x-3 hover:scale-110 transition duration-300 animate-bounce">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Gift className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">1-Day Free</h4>
                    <p className="text-gray-500 text-xs">Trial Offer</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Side: Animated Form Card */}
          <Reveal direction="right" delay={200}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Customer Registration</h2>
                <p className="text-gray-500 mb-8">Deliver fresh milk every morning. Cancel anytime.</p>
                
                <form className="space-y-5">
                  
                  {/* Name & Mobile */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="e.g. Rajesh Sharma" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="tel" placeholder="98765 43210" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Address & Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address (House No, Street)</label>
                    <div className="relative">
                      <Home className="w-5 h-5 text-gray-400 absolute left-3 top-4" />
                      <textarea rows="2" placeholder="e.g. 12, MG Road, Near Bus Stand" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none resize-none"></textarea>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area / Locality</label>
                      <div className="relative">
                        <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none bg-white appearance-none">
                          <option>Select Area</option>
                          <option>Station Road</option>
                          <option>MG Road</option>
                          <option>Jaora Road</option>
                          <option>Aligarh</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Start Date</label>
                      <div className="relative">
                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="date" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                  </div>

                  {/* Milk Type Custom Toggle */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Milk Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Cow', 'Buffalo', 'Both'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setMilkType(type)}
                          className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 ${
                            milkType === type
                              ? 'bg-blue-600 text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          <Droplets className="w-4 h-4" /> <span>{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Quantity Steppers */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Sun className="w-4 h-4 text-yellow-500 mr-2" /> Morning Quantity (Liters)
                      </label>
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-2">
                        <button 
                          type="button" 
                          onClick={() => setMorningQty(Math.max(0, morningQty - 0.5))}
                          className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-110"
                        >
                          <Minus className="w-5 h-5 text-gray-600" />
                        </button>
                        <span className="text-xl font-bold text-gray-900">{morningQty} L</span>
                        <button 
                          type="button" 
                          onClick={() => setMorningQty(morningQty + 0.5)}
                          className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-110"
                        >
                          <Plus className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Moon className="w-4 h-4 text-indigo-500 mr-2" /> Evening Quantity (Liters)
                      </label>
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 p-2">
                        <button 
                          type="button" 
                          onClick={() => setEveningQty(Math.max(0, eveningQty - 0.5))}
                          className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-110"
                        >
                          <Minus className="w-5 h-5 text-gray-600" />
                        </button>
                        <span className="text-xl font-bold text-gray-900">{eveningQty} L</span>
                        <button 
                          type="button" 
                          onClick={() => setEveningQty(eveningQty + 0.5)}
                          className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-100 transition hover:scale-110"
                        >
                          <Plus className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Shiny Submit Button */}
                  <button 
                    type="button" 
                    className="btn-shine w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative mt-6"
                  >
                    <span className="relative z-10 flex items-center">Start Free Trial <ArrowRight className="ml-2 w-5 h-5" /></span>
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">WHY CHOOSE US?</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">More Than Just Milk Delivery</h2>
            </div>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition border border-transparent hover:border-blue-100 h-full hover:-translate-y-2 duration-300 group">
                  <div className="bg-white p-4 rounded-2xl shadow-sm w-fit mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm">{benefit.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-600 opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-green-600 opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <Check className="w-12 h-12 text-green-400 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Already Have an Account?</h2>
            <p className="text-lg mb-8 text-gray-300 max-w-xl">
              Login to your customer dashboard to manage your subscription, track deliveries, and pay bills online.
            </p>
            <Link to="/login" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
              Login to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Register;