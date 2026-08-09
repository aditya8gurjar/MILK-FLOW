import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Milk, LayoutDashboard, Calendar, ShoppingBag, Receipt, 
  Wallet, Bell, User, LifeBuoy, Menu, X, LogOut, MessageSquare // <-- Added MessageSquare here
} from 'lucide-react';

const CustomerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/customer", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "My Subscription", path: "/customer/subscription", icon: <Calendar className="w-5 h-5" /> },
    { name: "My Deliveries", path: "/customer/deliveries", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Extra Orders", path: "/customer/extra-orders", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Bills & Invoices", path: "/customer/bills", icon: <Receipt className="w-5 h-5" /> },
    { name: "Payments", path: "/customer/payments", icon: <Wallet className="w-5 h-5" /> },
    { name: "Support", path: "/customer/support", icon: <LifeBuoy className="w-5 h-5" /> },
    { name: "Feedback", path: "/customer/feedback", icon: <MessageSquare className="w-5 h-5" /> },
    { name: "Notifications", path: "/customer/notifications", icon: <Bell className="w-5 h-5" /> },
    { name: "Profile", path: "/customer/profile", icon: <User className="w-5 h-5" /> },
  ];


  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <Link to="/customer" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Milk className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">My Dairy</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400">
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
                  isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{link.icon}</span>
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <Link to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-500 transition">
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
          
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-96">
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none w-full text-sm" />
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=12" alt="Customer" className="w-10 h-10 rounded-full ring-2 ring-blue-100" />
              <div className="hidden md:block">
                <h4 className="font-bold text-sm text-gray-800">Rajesh Sharma</h4>
                <p className="text-xs text-gray-500">Customer</p>
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

export default CustomerLayout;