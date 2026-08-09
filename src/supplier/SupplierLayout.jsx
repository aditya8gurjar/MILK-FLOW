import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Tractor, LayoutDashboard, Droplets, Wallet, BarChart3, 
  FileText, Bell, User, Menu, X, LogOut
} from 'lucide-react';

const SupplierLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

   const navLinks = [
    { name: "Dashboard", path: "/supplier", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Daily Milk Entry", path: "/supplier/milk-entry", icon: <Droplets className="w-5 h-5" /> },
    { name: "Payment History", path: "/supplier/payments", icon: <Wallet className="w-5 h-5" /> },
    { name: "Quality Reports", path: "/supplier/quality", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Documents", path: "/supplier/documents", icon: <FileText className="w-5 h-5" /> },
    { name: "Notifications", path: "/supplier/notifications", icon: <Bell className="w-5 h-5" /> },
    { name: "Profile", path: "/supplier/profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-green-900 text-green-50 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-green-800">
          <Link to="/supplier" className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Tractor className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Supplier</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-green-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-150px)]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive ? 'bg-green-600 text-white shadow-lg shadow-green-600/20' : 'hover:bg-green-800 hover:text-white'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{link.icon}</span>
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-800">
          <Link to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-green-200 hover:bg-red-500/10 hover:text-red-400 transition">
            <LogOut className="w-5 h-5" /> <span className="font-medium text-sm">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden"></div>}

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="hidden md:block">
            <h2 className="font-bold text-gray-800">Welcome back, Mahesh! 🌾</h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=60" alt="Supplier" className="w-10 h-10 rounded-full ring-2 ring-green-100" />
              <div className="hidden md:block">
                <h4 className="font-bold text-sm text-gray-800">Mahesh Patel</h4>
                <p className="text-xs text-gray-500">Namli Village</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SupplierLayout;