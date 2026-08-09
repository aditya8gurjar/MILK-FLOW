import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Milk, Droplets, Snowflake, Egg, Leaf, ArrowRight, 
  Check, ShieldCheck, Beaker, Package
} from 'lucide-react';

// 1. IMPORT ALL YOUR GALLERY IMAGES HERE
// Make sure the names match EXACTLY with the files in your src/assets folder
import cowImg from "../assets/cow.jpg";
import buffaloImg from "../assets/buffalo.jpg";
import gheeImg from "../assets/ghee.jpg";
import curdImg from "../assets/curd.jpg";
import paneerImg from "../assets/paneer.jpg";
import butterImg from "../assets/butter.webp";
import buttermilkImg from "../assets/buttermilk.jpg";
import khoaImg from "../assets/khoa.webp";

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

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = [
    { name: "All", icon: <Package className="w-5 h-5" /> },
    { name: "Milk", icon: <Milk className="w-5 h-5" /> },
    { name: "Ghee", icon: <Droplets className="w-5 h-5" /> },
    { name: "Curd", icon: <Snowflake className="w-5 h-5" /> },
    { name: "Others", icon: <Egg className="w-5 h-5" /> }
  ];

  // 2. USE THE IMPORTED VARIABLES HERE (NO QUOTES!)
  const products = [
    { 
      id: 1, 
      name: "Cow Milk", 
      category: "Milk", 
      price: "₹60 / Litre", 
      desc: "A2 Desi Cow Milk, rich in nutrients.", 
      img: cowImg,  // <-- Changed from "cow.jpg" to cowImg
      tag: "Bestseller" 
    },
    { 
      id: 2, 
      name: "Buffalo Milk", 
      category: "Milk", 
      price: "₹80 / Litre", 
      desc: "Thick & creamy high-fat buffalo milk.", 
      img: buffaloImg, 
      tag: "High Fat" 
    },
    { 
      id: 3, 
      name: "Pure Cow Ghee", 
      category: "Ghee", 
      price: "₹550 / Kg", 
      desc: "Traditional bilona method pure ghee.", 
      img: gheeImg, 
      tag: "Organic" 
    },
    { 
      id: 4, 
      name: "Fresh Curd", 
      category: "Curd", 
      price: "₹40 / 500g", 
      desc: "Thick, probiotic-rich homemade curd.", 
      img: curdImg, 
      tag: "Fresh" 
    },
    { 
      id: 5, 
      name: "Paneer", 
      category: "Others", 
      price: "₹320 / Kg", 
      desc: "Soft, freshly made chenna paneer.", 
      img: paneerImg, 
      tag: "New" 
    },
    { 
      id: 6, 
      name: "Butter", 
      category: "Others", 
      price: "₹450 / Kg", 
      desc: "Creamy white butter, no added salt.", 
      img: butterImg, 
      tag: "Creamy" 
    },
    { 
      id: 7, 
      name: "Buttermilk", 
      category: "Curd", 
      price: "₹20 / 500g", 
      desc: "Refreshing spiced buttermilk (Chaas).", 
      img: buttermilkImg, 
      tag: "Refreshing" 
    },
    { 
      id: 8, 
      name: "Khoa/Mawa", 
      category: "Others", 
      price: "₹600 / Kg", 
      desc: "Thickened milk for Indian sweets.", 
      img: khoaImg, 
      tag: "Premium" 
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleFilter = (category) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsAnimating(false);
    }, 300);
  };

  const qualitySteps = [
    { icon: <Leaf className="w-10 h-10 text-green-600" />, title: "Sourced Ethically", desc: "Directly from local village farmers in Ratlam." },
    { icon: <Beaker className="w-10 h-10 text-blue-600" />, title: "Lab Tested", desc: "Tested for Fat, SNF, and adulteration." },
    { icon: <ShieldCheck className="w-10 h-10 text-indigo-600" />, title: "Hygienic Packaging", desc: "Packed in sanitized glass bottles and pouches." },
    { icon: <Snowflake className="w-10 h-10 text-cyan-600" />, title: "Cold Chain Delivery", desc: "Maintained at 4°C until it reaches you." }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
              100% PURE & FRESH
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Our <span className="text-shine">Dairy Products</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From morning milk to fresh paneer, everything is sourced ethically and delivered with care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= FILTER & PRODUCTS GRID ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Animated Filter Tabs */}
          <Reveal direction="up">
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleFilter(cat.name)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                    activeCategory === cat.name
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Products Grid with Animation */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {filteredProducts.map((product, index) => (
              <Reveal key={product.id} delay={index * 100} direction="up" className="h-full">
                <div className="perspective-1000 h-full">
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group preserve-3d hover:[transform:rotateY(5deg)_rotateX(5deg)] h-full flex flex-col border border-gray-100">
                    
                    {/* Image Section */}
                    <div className="overflow-hidden h-56 relative">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      
                      {/* Tag Badge */}
                      <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                        {product.tag}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-grow bg-white relative z-10">
                      <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-gray-500 text-sm mt-1 mb-4 flex-grow">{product.desc}</p>
                      
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <span className="text-blue-600 font-bold text-lg">{product.price}</span>
                        <Link 
                          to="/pricing" 
                          className="text-sm font-semibold text-white bg-gray-900 group-hover:bg-blue-600 transition duration-300 w-9 h-9 rounded-full flex items-center justify-center transform group-hover:rotate-45"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUALITY ASSURANCE SECTION ================= */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">QUALITY ASSURANCE</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">From Farm to Your Table</h2>
              <p className="text-gray-500 max-w-2xl mx-auto mt-4">We follow a strict 4-step process to ensure you get the safest, purest dairy products.</p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualitySteps.map((step, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 h-full text-center group">
                  <div className="bg-gray-50 p-5 rounded-2xl w-fit mx-auto mb-6 group-hover:bg-blue-50 group-hover:scale-110 group-hover:rotate-6 transition duration-300">
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
            <Check className="w-12 h-12 text-green-300 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Start Your Daily Subscription</h2>
            <p className="text-lg mb-8 text-blue-100">Get fresh milk and dairy products delivered to your doorstep every morning. Pause or modify anytime.</p>
            <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
              Subscribe Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Products;