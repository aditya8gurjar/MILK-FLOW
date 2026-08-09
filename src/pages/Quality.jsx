import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Beaker, Droplet, ThermometerSnowflake, Package, 
  ArrowRight, CheckCircle2, Microscope, Sparkles, FlaskConical
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

// Custom Animated Meter Component for Fat & SNF
const LiquidMeter = ({ value, label, color, delay }) => {
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-32 h-48 bg-gray-100 rounded-2xl border-2 border-gray-200 overflow-hidden shadow-inner">
        {/* Liquid Fill */}
        <div 
          className={`absolute bottom-0 left-0 right-0 ${color} transition-all duration-[2000ms] ease-out flex items-end justify-center`}
          style={{ height: isVisible ? `${value}%` : '0%' }}
        >
          <div className="w-full h-3 bg-white/30 rounded-full animate-pulse"></div>
        </div>
        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-extrabold text-gray-900 z-10 drop-shadow-md">
            {isVisible ? `${value}%` : '0%'}
          </span>
        </div>
      </div>
      <p className="mt-4 font-bold text-gray-700 text-lg">{label}</p>
    </div>
  );
};

const Quality = () => {
  const processSteps = [
    { icon: <Droplet className="w-10 h-10 text-blue-600" />, title: "1. Village Collection", desc: "Milk is collected from farmers in sterile stainless steel cans." },
    { icon: <Microscope className="w-10 h-10 text-indigo-600" />, title: "2. Lab Testing", desc: "Tested for Fat, SNF, and any signs of adulteration." },
    { icon: <FlaskConical className="w-10 h-10 text-green-600" />, title: "3. Pasteurization", desc: "Heated to 72°C to kill bacteria while retaining nutrients." },
    { icon: <Package className="w-10 h-10 text-yellow-600" />, title: "4. Hygienic Packaging", desc: "Packed in sanitized glass bottles or food-grade pouches." }
  ];

  const hygieneStandards = [
    { icon: <Sparkles className="w-8 h-8 text-blue-600" />, title: "Sanitized Equipment", desc: "All containers and machines are washed and sanitized every 4 hours." },
    { icon: <ThermometerSnowflake className="w-8 h-8 text-cyan-600" />, title: "4°C Cold Chain", desc: "Milk is chilled immediately and kept cold until it reaches your home." },
    { icon: <ShieldCheck className="w-8 h-8 text-green-600" />, title: "No Preservatives", desc: "We never add any chemicals, water, or preservatives to extend shelf life." },
    { icon: <CheckCircle2 className="w-8 h-8 text-indigo-600" />, title: "Regular Vet Checks", desc: "Our partner cattle undergo regular health and veterinary check-ups." }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2" /> 100% QUALITY GUARANTEED
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Uncompromising <span className="text-shine">Purity & Hygiene</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From the village farm to your doorstep, we follow a rigorous 4-step quality process to ensure every drop of milk is safe, pure, and full of nutrition.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= FAT & SNF TESTING SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          <Reveal direction="left">
            <div>
              <span className="text-blue-600 font-bold tracking-widest">LABORATORY TESTING</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                Scientifically Tested for Fat & SNF
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We don't just guess the quality; we measure it. Every batch of milk is tested in our advanced lab to ensure it meets the highest standards of Fat and Solids-Not-Fat (SNF) content.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg mt-1"><Droplet className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">Fat Content (Creaminess)</h4>
                    <p className="text-gray-500 text-sm">Ensures the rich, creamy texture and taste of pure milk.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg mt-1"><Beaker className="w-5 h-5 text-green-600" /></div>
                  <div>
                    <h4 className="font-bold text-gray-900">SNF (Proteins & Lactose)</h4>
                    <p className="text-gray-500 text-sm">Determines the nutritional value, thickness, and wholesomeness.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={200}>
            <div className="bg-gray-50 p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-gray-700 mb-12">Average Test Results</h3>
              <div className="flex justify-center space-x-16">
                <LiquidMeter value={6} label="Cow Milk Fat" color="bg-yellow-400" delay={0} />
                <LiquidMeter value={8} label="Buffalo Fat" color="bg-blue-500" delay={300} />
                <LiquidMeter value={9} label="SNF Level" color="bg-green-500" delay={600} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= 4-STEP PROCESS TIMELINE ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">OUR PROCESS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">From Farm to Table in 4 Steps</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-blue-100 z-0 rounded-full"></div>
            
            {processSteps.map((step, index) => (
              <Reveal key={index} delay={index * 200} direction="up">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center relative z-10 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 h-full">
                  <div className="bg-white p-4 rounded-full w-fit mx-auto mb-6 shadow-md border-4 border-gray-50 group-hover:scale-110 transition">
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

      {/* ================= HYGIENE STANDARDS (3D Cards) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">HYGIENE STANDARDS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Cleanliness is Our Priority</h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hygieneStandards.map((std, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="perspective-1000 h-full">
                  <div className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-2xl transition border border-transparent hover:border-blue-100 h-full hover:-translate-y-2 duration-300 group preserve-3d hover:[transform:rotateY(5deg)_rotateX(5deg)]">
                    <div className="bg-white p-4 rounded-2xl shadow-sm w-fit mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                      {std.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{std.title}</h3>
                    <p className="text-gray-500 text-sm">{std.desc}</p>
                  </div>
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
            <ShieldCheck className="w-12 h-12 text-green-300 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Taste the Purity Today</h2>
            <p className="text-lg mb-8 text-blue-100">Join 1500+ families who trust Ratlam Dairy for their daily nutritional needs.</p>
            <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
              Subscribe Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Quality;