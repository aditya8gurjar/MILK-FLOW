import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Search, Sun, Moon, Clock, CheckCircle2, 
  ArrowRight, Bike, Warehouse, Home, AlertCircle
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

const DeliveryAreas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const areas = [
    "Station Road", "MG Road", "Jaora Road", "Aligarh", 
    "Kasturba Nagar", "Sarafa Bazar", "Lokmanya Nagar", "Petlawad Road",
    "Indore Road", "Ujjain Road", "Subhash Nagar", "Civil Lines"
  ];

  // Simulated search function
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const isAvailable = areas.some(area => 
      area.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResult(isAvailable ? 'available' : 'unavailable');
  };

  const timings = [
    { 
      icon: <Sun className="w-12 h-12 text-yellow-500" />, 
      title: "Morning Delivery", 
      time: "5:00 AM - 8:00 AM",
      desc: "Fresh milk delivered before your breakfast. Place orders before 10 PM the previous night."
    },
    { 
      icon: <Moon className="w-12 h-12 text-indigo-500" />, 
      title: "Evening Delivery", 
      time: "5:00 PM - 7:00 PM",
      desc: "Get fresh milk and dairy products delivered for your evening tea and dinner needs."
    }
  ];

  const routeSteps = [
    { icon: <Warehouse className="w-10 h-10 text-blue-600" />, title: "Collection Center", desc: "Milk arrives at our central Ratlam facility." },
    { icon: <Search className="w-10 h-10 text-indigo-600" />, title: "Quality Check", desc: "Tested, pasteurized, and packaged hygienically." },
    { icon: <Bike className="w-10 h-10 text-green-600" />, title: "Route Assignment", desc: "Delivery boys load packets according to optimized routes." },
    { icon: <Home className="w-10 h-10 text-yellow-600" />, title: "Doorstep Delivery", desc: "Delivered safely to your home before your chosen time." }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO & SEARCH SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> SERVING RATLAM CITY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Find Your <span className="text-shine">Delivery Area</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              We currently deliver to over 12+ areas in Ratlam. Check if we deliver to your home below!
            </p>
          </Reveal>

          {/* Interactive Search Bar */}
          <Reveal direction="up" delay={200}>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl shadow-xl border border-gray-100">
                <div className="relative flex-grow">
                  <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setSearchResult(null); }}
                    placeholder="Enter your area (e.g. MG Road)" 
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none"
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-shine bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition transform hover:scale-105 shadow-lg flex items-center justify-center relative"
                >
                  <span className="relative z-10 flex items-center">Check <Search className="ml-2 w-5 h-5" /></span>
                </button>
              </div>
              
              {/* Search Result */}
              {searchResult && (
                <div className={`mt-6 p-4 rounded-xl flex items-center justify-center space-x-2 font-bold transition-all duration-300 ${
                  searchResult === 'available' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {searchResult === 'available' ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Great news! We deliver to {searchQuery}.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-6 h-6" />
                      <span>Sorry, we don't deliver to {searchQuery} yet. Contact us to request!</span>
                    </>
                  )}
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ================= DELIVERY TIMINGS (3D Tilt) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">DELIVERY SCHEDULE</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Choose Your Preferred Slot</h2>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {timings.map((timing, index) => (
              <Reveal key={index} delay={index * 200} direction="up">
                <div className="perspective-1000 h-full">
                  <div className="bg-gray-50 p-10 rounded-3xl text-center hover:bg-white hover:shadow-2xl transition border border-gray-100 h-full preserve-3d hover:[transform:rotateY(5deg)_rotateX(5deg)] group">
                    <div className="bg-white p-5 rounded-2xl shadow-sm w-fit mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                      {timing.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{timing.title}</h3>
                    <p className="text-blue-600 font-extrabold text-xl mb-4 flex items-center justify-center">
                      <Clock className="w-5 h-5 mr-2" /> {timing.time}
                    </p>
                    <p className="text-gray-500">{timing.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= AREAS COVERED GRID ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side: Stylized Map with Pinging Pins */}
            <Reveal direction="left">
              <div className="relative rounded-3xl shadow-2xl w-full h-[450px] overflow-hidden border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Map of Ratlam" 
                  className="w-full h-full object-cover animate-kenburns grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-blue-900/30"></div>
                
                {/* Pinging Pins */}
                <div className="absolute top-1/4 left-1/4 flex items-center justify-center">
                  <span className="absolute inline-flex h-10 w-10 rounded-full bg-blue-500 opacity-75 animate-ping"></span>
                  <MapPin className="relative h-8 w-8 text-white drop-shadow-lg" fill="currentColor" />
                </div>
                <div className="absolute top-1/2 right-1/3 flex items-center justify-center">
                  <span className="absolute inline-flex h-8 w-8 rounded-full bg-green-500 opacity-75 animate-ping"></span>
                  <MapPin className="relative h-6 w-6 text-white drop-shadow-lg" fill="currentColor" />
                </div>
                <div className="absolute bottom-1/4 right-1/4 flex items-center justify-center">
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                  <MapPin className="relative h-8 w-8 text-white drop-shadow-lg" fill="currentColor" />
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl">
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" /> Ratlam City Coverage
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">Expanding to new sectors every month!</p>
                </div>
              </div>
            </Reveal>

            {/* Right Side: Area List */}
            <Reveal direction="right" delay={200}>
              <div>
                <span className="text-blue-600 font-bold tracking-widest">COVERAGE AREAS</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                  We Deliver Near You
                </h2>
                <p className="text-gray-600 mb-8">
                  We are currently serving the following localities in Ratlam. If you don't see your area, please reach out to us!
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {areas.map((area, index) => (
                    <div 
                      key={index} 
                      className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-200 hover:scale-105 transition duration-300 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= ROUTE PROCESS TIMELINE ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">HOW IT WORKS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Our Delivery Route Process</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-blue-100 z-0 rounded-full"></div>
            
            {routeSteps.map((step, index) => (
              <Reveal key={index} delay={index * 200} direction="up">
                <div className="bg-gray-50 p-8 rounded-2xl text-center relative z-10 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 h-full">
                  <div className="bg-white p-4 rounded-full w-fit mx-auto mb-6 shadow-md border-4 border-blue-50 group-hover:scale-110 transition">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-yellow-300 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Don't See Your Area?</h2>
            <p className="text-lg mb-8 text-blue-100">We are expanding fast! Let us know where you live, and we'll try to add your area to our delivery route soon.</p>
            <Link to="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
              Request Delivery <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default DeliveryAreas;