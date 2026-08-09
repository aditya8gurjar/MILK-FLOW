import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Wallet, Beaker, Users, Truck, Upload, 
  Check, Phone, MapPin, Droplets, Milk, ShieldCheck
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

const Supplier = () => {
  const [fileName, setFileName] = useState("");

  const benefits = [
    { icon: <Wallet className="w-8 h-8 text-green-600" />, title: "Timely Payments", desc: "Direct bank transfer every week. No middlemen, no waiting." },
    { icon: <Beaker className="w-8 h-8 text-blue-600" />, title: "Transparent Testing", desc: "Fat & SNF tested digitally in front of you. Fair price for quality." },
    { icon: <Truck className="w-8 h-8 text-yellow-600" />, title: "Doorstep Collection", desc: "We collect milk from your village center daily. No transport hassle." },
    { icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />, title: "Free Veterinary Support", desc: "Access to free vet check-ups and cattle feed consultations." }
  ];

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO & FORM SPLIT SECTION ================= */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image & Text */}
          <Reveal direction="left">
            <div>
              <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
                JOIN OUR DAIRY FAMILY
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
                Empowering <span className="text-shine">Local Farmers</span> in Ratlam
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Get fair prices for your milk with transparent fat testing and weekly bank payments. No middlemen, no exploitation.
              </p>

              {/* Relatable Farmer Image with Ken Burns */}
              <div className="relative rounded-3xl shadow-2xl w-full h-[350px] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1605338803155-8b13a4a93f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Indian Village Farmer" 
                  className="w-full h-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Floating Stats Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center space-x-4 hover:scale-105 transition duration-300">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-gray-900">250+ Farmers</h4>
                    <p className="text-gray-500 text-sm">Already partnered with us</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Side: Animated Form */}
          <Reveal direction="right" delay={200}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Supplier Registration</h2>
              <p className="text-gray-500 mb-8">Fill in your details. Our team will contact you within 24 hours.</p>
              
              <form className="space-y-5">
                {/* Name & Village */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" placeholder="e.g. Mahesh Patel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Village Name</label>
                    <input type="text" placeholder="e.g. Namli" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                  </div>
                </div>

                {/* Phone & Milk Type */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="tel" placeholder="98765 43210" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Milk Type</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none bg-white">
                      <option>Cow Milk</option>
                      <option>Buffalo Milk</option>
                      <option>Both</option>
                    </select>
                  </div>
                </div>

                {/* Capacity & Fat % */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Capacity (Liters)</label>
                    <div className="relative">
                      <Droplets className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="number" placeholder="e.g. 15" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Fat %</label>
                    <input type="text" placeholder="e.g. 6.5%" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                  </div>
                </div>

                {/* Bank Details */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account No.</label>
                    <input type="text" placeholder="XXXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                    <input type="text" placeholder="e.g. SBIN0001234" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                  </div>
                </div>

                {/* Aadhaar Upload (Animated Dropzone look) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card Upload</label>
                  <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group ${fileName ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className={`w-8 h-8 mb-2 transition transform group-hover:scale-125 ${fileName ? 'text-green-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
                      {fileName ? (
                        <p className="text-sm text-green-600 font-medium flex items-center">
                          <Check className="w-4 h-4 mr-1" /> {fileName}
                        </p>
                      ) : (
                        <>
                          <p className="text-sm text-gray-500"><span className="font-semibold text-blue-600">Click to upload</span> or drag & drop</p>
                          <p className="text-xs text-gray-400 mt-1">PDF, PNG, or JPG (Max 2MB)</p>
                        </>
                      )}
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="button" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                >
                  Submit Application <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-green-600 font-bold tracking-widest">WHY PARTNER WITH US?</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Benefits of Being a Ratlam Dairy Supplier</h2>
            </div>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-green-600 opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-blue-600 opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <Milk className="w-12 h-12 text-green-400 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Have Questions Before Joining?</h2>
            <p className="text-lg mb-8 text-gray-300 max-w-xl">
              Talk to our supplier relations team. We’re here to help you transition smoothly.
            </p>
            <a href="tel:+919876543210" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-green-50 transition flex items-center shadow-lg hover:scale-105 transform">
              <Phone className="mr-2 w-5 h-5" /> Call: +91 98765 43210
            </a>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Supplier;