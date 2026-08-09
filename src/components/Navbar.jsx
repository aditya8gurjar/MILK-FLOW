import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Milk, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
  }, [location]);

  // Kept clean: Only main navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Quality", path: "/quality" },
    { name: "Delivery", path: "/delivery-areas" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg transform hover:rotate-12 transition">
            <Milk className="w-6 h-6 text-white" />
          </div>
          <span className={`text-2xl font-bold ${scrolled ? 'text-gray-800' : 'text-gray-900'}`}>Ratlam Dairy</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`font-medium transition relative group ${
                scrolled ? 'text-gray-700' : 'text-gray-800'
            } ${location.pathname === link.path ? 'text-blue-600' : 'hover:text-blue-600'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-1 bg-blue-600 transition-all duration-300 ${
                location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold shadow-lg hover:scale-105">
            Login
          </Link>
        </div>

        <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden">
          {mobileMenu ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {mobileMenu && (
        <div className="md:hidden bg-white mt-3 py-4 px-4 shadow-lg rounded-b-xl mx-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`block py-3 border-b border-gray-100 ${
                location.pathname === link.path ? 'text-blue-600 font-bold' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="block mt-4 bg-blue-600 text-white text-center px-6 py-3 rounded-full font-semibold">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;