
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Products from './pages/Products';
import Supplier from './pages/Supplier';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Quality from './pages/Quality';
import DeliveryAreas from './pages/DeliveryAreas';
import Gallery from './pages/Gallery';
import Careers from './pages/Careers';
import Testimonials from './pages/Testimonials';
import Terms from './pages/Terms';
import ForgotPassword from './pages/ForgotPassword';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Cancellation from './pages/Cancellation';

// Admin Pages & Layout
import AdminLayout from './Admin/AdminLayout';
import AdminDashboard from './Admin/AdminDashboard';
import AdminCustomers from './Admin/AdminCustomers';
import AdminSuppliers from './Admin/AdminSuppliers';
import AdminCollection from './Admin/AdminCollection';
import AdminDelivery from './Admin/AdminDelivery';
import AdminBilling from './Admin/AdminBilling';
import AdminReports from './Admin/AdminReports';
import AdminInventory from './Admin/AdminInventory';
import AdminExpenses from './Admin/AdminExpenses';
import AdminEmployees from './Admin/AdminEmployees';
import AdminRoutes from './Admin/AdminRoutes';
import AdminSettings from './Admin/AdminSettings';
import AdminProfile from './Admin/AdminProfile';
import AdminCustomerDetails from './Admin/AdminCustomerDetails';
import AdminInvoiceDetails from './Admin/AdminInvoiceDetails';

// Customer Pages & Layout
import CustomerLayout from './customer/CustomerLayout';
import CustomerDashboard from './customer/CustomerDashboard';
import CustomerSubscription from './customer/CustomerSubscription';
import CustomerBills from './customer/CustomerBills';
import CustomerSupport from './customer/CustomerSupport';
import CustomerProfile from './customer/CustomerProfile';
import CustomerDeliveries from './customer/CustomerDeliveries';
import CustomerExtraOrders from './customer/CustomerExtraOrders';
import CustomerPayments from './customer/CustomerPayments';
import CustomerNotifications from './customer/CustomerNotifications';
import CustomerFeedback from './customer/CustomerFeedback';

// Supplier Pages & Layout
import SupplierLayout from './supplier/SupplierLayout';
import SupplierDashboard from './supplier/SupplierDashboard';
import SupplierMilkEntry from './supplier/SupplierMilkEntry';
import SupplierPayments from './supplier/SupplierPayments';
import SupplierQuality from './supplier/SupplierQuality';
import SupplierDocuments from './supplier/SupplierDocuments';
import SupplierNotifications from './supplier/SupplierNotifications';
import SupplierProfile from './supplier/SupplierProfile';

// Utility/Error Pages
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import Maintenance from './pages/Maintenance';
import Unauthorized from './pages/Unauthorized';
import SessionExpired from './pages/SessionExpired';
import Loading from './pages/Loading';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white font-sans">

        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
          <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
          <Route path="/become-supplier" element={<PublicLayout><Supplier /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/quality" element={<PublicLayout><Quality /></PublicLayout>} />
          <Route path="/delivery-areas" element={<PublicLayout><DeliveryAreas /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
          <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
          <Route path="/refund" element={<PublicLayout><Refund /></PublicLayout>} />
          <Route path="/cancellation" element={<PublicLayout><Cancellation /></PublicLayout>} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/customers" element={<AdminLayout><AdminCustomers /></AdminLayout>} />
          <Route path="/admin/suppliers" element={<AdminLayout><AdminSuppliers /></AdminLayout>} />
          <Route path="/admin/collection" element={<AdminLayout><AdminCollection /></AdminLayout>} />
          <Route path="/admin/delivery" element={<AdminLayout><AdminDelivery /></AdminLayout>} />
          <Route path="/admin/billing" element={<AdminLayout><AdminBilling /></AdminLayout>} />
          <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />
          <Route path="/admin/inventory" element={<AdminLayout><AdminInventory /></AdminLayout>} />
          <Route path="/admin/expenses" element={<AdminLayout><AdminExpenses /></AdminLayout>} />
          <Route path="/admin/employees" element={<AdminLayout><AdminEmployees /></AdminLayout>} />
          <Route path="/admin/routes" element={<AdminLayout><AdminRoutes /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />
          <Route path="/admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
          <Route path="/admin/customers/details" element={<AdminLayout><AdminCustomerDetails /></AdminLayout>} />
          <Route path="/admin/billing/invoice" element={<AdminLayout><AdminInvoiceDetails /></AdminLayout>} />

          {/* ================= CUSTOMER ROUTES ================= */}
          <Route path="/customer" element={<CustomerLayout><CustomerDashboard /></CustomerLayout>} />
          <Route path="/customer/subscription" element={<CustomerLayout><CustomerSubscription /></CustomerLayout>} />
          <Route path="/customer/deliveries" element={<CustomerLayout><CustomerDeliveries /></CustomerLayout>} />
          <Route path="/customer/extra-orders" element={<CustomerLayout><CustomerExtraOrders /></CustomerLayout>} />
          <Route path="/customer/bills" element={<CustomerLayout><CustomerBills /></CustomerLayout>} />
          <Route path="/customer/payments" element={<CustomerLayout><CustomerPayments /></CustomerLayout>} />
          <Route path="/customer/notifications" element={<CustomerLayout><CustomerNotifications /></CustomerLayout>} />
          <Route path="/customer/support" element={<CustomerLayout><CustomerSupport /></CustomerLayout>} />
          <Route path="/customer/profile" element={<CustomerLayout><CustomerProfile /></CustomerLayout>} />
          <Route path="/customer/feedback" element={<CustomerLayout><CustomerFeedback /></CustomerLayout>} />

          {/* ================= SUPPLIER ROUTES ================= */}
          <Route path="/supplier" element={<SupplierLayout><SupplierDashboard /></SupplierLayout>} />
          <Route path="/supplier/milk-entry" element={<SupplierLayout><SupplierMilkEntry /></SupplierLayout>} />
          <Route path="/supplier/payments" element={<SupplierLayout><SupplierPayments /></SupplierLayout>} />
          <Route path="/supplier/quality" element={<SupplierLayout><SupplierQuality /></SupplierLayout>} />
          <Route path="/supplier/documents" element={<SupplierLayout><SupplierDocuments /></SupplierLayout>} />
          <Route path="/supplier/notifications" element={<SupplierLayout><SupplierNotifications /></SupplierLayout>} />
          <Route path="/supplier/profile" element={<SupplierLayout><SupplierProfile /></SupplierLayout>} />

          {/* ================= UTILITY/ERROR ROUTES ================= */}
          <Route path="/search" element={<PublicLayout><SearchResults /></PublicLayout>} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/session-expired" element={<SessionExpired />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Global Floating WhatsApp Button */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-green-500 p-4 rounded-full shadow-2xl hover:bg-green-600 transition z-50 group animate-bounce"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
            Chat with us!
          </span>
        </a>

      </div>
    </Router>
  );
}

// Helper component to wrap public pages with Navbar and Footer
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </>
);

export default App;

