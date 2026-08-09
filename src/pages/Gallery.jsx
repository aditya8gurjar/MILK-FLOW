import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, X, Maximize2, ArrowRight, Milk, Truck, Package, Warehouse
} from 'lucide-react';
import packghee from "../assets/packghee.jpg";
import grass from "../assets/grass.webp";
import delivery from "../assets/delivery.png";
import morning from "../assets/morning.png";
import cattle from "../assets/cattle.png"

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

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { name: "All", icon: <Camera className="w-5 h-5" /> },
    { name: "Farms", icon: <Warehouse className="w-5 h-5" /> },
    { name: "Village", icon: <Milk className="w-5 h-5" /> },
    { name: "Packaging", icon: <Package className="w-5 h-5" /> },
    { name: "Delivery", icon: <Truck className="w-5 h-5" /> }
  ];

  const images = [
    { id: 1, category: "Farms", title: "Open Grazing Land",img:grass,  size: "tall" },
    { id: 2, category: "Village", title: "Morning Milking",img: morning,size: "normal" },
    { id: 3, category: "Packaging", title: "Pure Ghee Jars", img: packghee , size: "normal" },
    { id: 4, category: "Farms", title: "Healthy Desi Cows", size: "wide" },
    { id: 5, category: "Delivery", title: "Doorstep Drop", img:delivery, size: "tall" },
    { id: 6, category: "Village", title: "Farmer with Cattle", img:cattle, size: "normal" },
    { id: 7, category: "Packaging", title: "Glass Bottle Milk",  size: "normal" },
    { id: 8, category: "Delivery", title: "Out for Delivery",  size: "wide" }
  ];

  const filteredImages = activeCategory === 'All' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const handleFilter = (category) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* HERO SECTION */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
              <Camera className="w-4 h-4 mr-2" /> OUR JOURNEY IN FRAMES
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              The Ratlam Dairy <span className="text-shine">Gallery</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a visual tour of our farms, village collection centers, hygienic packaging, and delivery network.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FILTER & GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
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

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {filteredImages.map((image, index) => (
              <Reveal key={image.id} delay={index * 100} direction="up" className={`group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition duration-300 cursor-pointer perspective-1000 preserve-3d hover:[transform:rotateY(2deg)_rotateX(2deg)] ${
                image.size === 'tall' ? 'sm:row-span-2 h-64 sm:h-auto' : 
                image.size === 'wide' ? 'sm:col-span-2 h-64' : 'h-64'
              }`} onClick={() => setSelectedImage(image)}>
                
                <img 
                  src={image.img} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold translate-y-4 group-hover:translate-y-0 transition duration-300">{image.title}</h3>
                  <p className="text-blue-300 text-sm translate-y-4 group-hover:translate-y-0 transition duration-300 delay-75">{image.category}</p>
                </div>

                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition duration-300 transform group-hover:scale-110">
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <Camera className="w-12 h-12 text-green-300 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Experience It Yourself</h2>
            <p className="text-lg mb-8 text-blue-100">Join our dairy family today and taste the difference of pure, farm-fresh milk.</p>
            <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
              Subscribe Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition transform hover:scale-110">
            <X className="w-8 h-8" />
          </button>
          
          <div 
            className="relative max-w-4xl w-full transform transition-all duration-300 scale-95 opacity-0 animate-zoom-in"
            style={{ animation: 'zoomIn 0.3s ease-out forwards' }}
          >
            <img src={selectedImage.img} alt={selectedImage.title} className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl">
              <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-blue-300">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

    </div>
  );
};

export default Gallery;