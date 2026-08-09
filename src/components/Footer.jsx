import React from 'react';
import { Link } from 'react-router-dom';
import { Milk, MapPin, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Milk className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Ratlam Dairy</span>
          </div>
          <p className="text-sm">Providing fresh, unadulterated milk from local villages in Ratlam, MP to your doorstep.</p>
        </div>
        
        <div>
          <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/products" className="hover:text-blue-400 transition">Products</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-400 transition">Subscription Plans</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400 transition">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/gallery" className="hover:text-blue-400 transition">Gallery</Link></li>
            <li><Link to="/careers" className="hover:text-blue-400 transition">Careers</Link></li>
            <li><Link to="/testimonials" className="hover:text-blue-400 transition">Reviews</Link></li>
            <li><Link to="/become-supplier" className="hover:text-blue-400 transition">Become a Supplier</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link to="/login" className="hover:text-blue-400 transition">Dashboard Login</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 grid md:grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col space-y-3">
          <p className="flex items-start"><MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0 text-blue-400" /> 123 Dairy Street, Ratlam, Madhya Pradesh</p>
          <p className="flex items-center"><Phone className="w-5 h-5 mr-3 text-blue-400" /> +91 98765 43210</p>
        </div>
        <div className="md:text-right">
          <p>© {new Date().getFullYear()} Ratlam Dairy. All rights reserved.</p>
          <p className="flex items-center md:justify-end mt-2"><MessageCircle className="w-4 h-4 mr-2 text-green-400" /> WhatsApp Support Available 24/7</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;