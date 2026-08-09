import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, FileX, Package } from 'lucide-react';

const SearchResults = () => {
  const [query] = useState("milk"); // Hardcoded for UI demo
  
  const results = [
    { title: "Cow Milk (A2 Desi)", desc: "Pure A2 cow milk rich in nutrients.", path: "/products" },
    { title: "Buffalo Milk", desc: "Thick and creamy high-fat buffalo milk.", path: "/products" },
    { title: "Pricing Plans", desc: "Check out our daily and monthly milk subscription plans.", path: "/pricing" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Search Results</h1>
          <div className="relative">
            <Search className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              defaultValue={query}
              className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition text-lg shadow-sm"
            />
          </div>
          <p className="text-gray-500 mt-4 text-sm">Showing 3 results for: <span className="font-bold text-gray-800">"{query}"</span></p>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((res, index) => (
            <Link 
              key={index} 
              to={res.path} 
              className="block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">{res.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{res.desc}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-2 transition" />
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Fallback UI */}
        <div className="mt-12 hidden bg-white p-8 rounded-2xl border border-dashed border-slate-200 text-center">
          <FileX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800">No results found</h3>
          <p className="text-gray-500 mt-2">We couldn't find anything for your search. Try a different keyword.</p>
        </div>

      </div>
    </div>
  );
};

export default SearchResults;