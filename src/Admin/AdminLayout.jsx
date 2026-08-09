import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Milk, LayoutDashboard, Users, Tractor, Droplets, Truck, 
  Wallet, BarChart3, Settings, Bell, Search, Menu, X, LogOut,
  Route, Receipt, Boxes, Briefcase, UserCircle
} from 'lucide-react';
const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

    const navLinks = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Customer Management", path: "/admin/customers", icon: <Users className="w-5 h-5" /> },
    { name: "Supplier Management", path: "/admin/suppliers", icon: <Tractor className="w-5 h-5" /> },
    { name: "Daily Collection", path: "/admin/collection", icon: <Droplets className="w-5 h-5" /> },
    { name: "Delivery Management", path: "/admin/delivery", icon: <Truck className="w-5 h-5" /> },
    { name: "Routes", path: "/admin/routes", icon: <Route className="w-5 h-5" /> },
    { name: "Billing & Payments", path: "/admin/billing", icon: <Wallet className="w-5 h-5" /> },
    { name: "Expenses", path: "/admin/expenses", icon: <Receipt className="w-5 h-5" /> },
    { name: "Inventory", path: "/admin/inventory", icon: <Boxes className="w-5 h-5" /> },
    { name: "Employees", path: "/admin/employees", icon: <Briefcase className="w-5 h-5" /> },
    { name: "Reports", path: "/admin/reports", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
    { name: "Profile", path: "/admin/profile", icon: <UserCircle className="w-5 h-5" /> },
  ];
  return (
    <div className="min-h-screen bg-slate-100 font-sans flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Milk className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Dairy Admin</span>
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
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                  isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></span>}
                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>{link.icon}</span>
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
          <Link to="/login" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition">
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
            <Search className="w-5 h-5 text-slate-400" />
            <input type="text" placeholder="Search customers, suppliers..." className="bg-transparent border-none outline-none ml-3 w-full text-sm" />
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
              <Bell className="w-6 h-6 text-slate-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-10 h-10 rounded-full ring-2 ring-blue-100" />
              <div className="hidden md:block">
                <h4 className="font-bold text-sm text-gray-800">Rohit Singh</h4>
                <p className="text-xs text-gray-500">Super Admin</p>
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

export default AdminLayout;