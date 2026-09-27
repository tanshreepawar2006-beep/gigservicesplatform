import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ServiceDetailPage from './pages/ServiceDetailPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ProviderDashboard from './pages/ProviderDashboard';
import NotFoundPage from './pages/NotFoundPage';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Browsing Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/services" element={<CustomerDashboard />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Customer Protected Routes */}
                <Route
                  path="/bookings"
                  element={
                    <ProtectedRoute allowedRole="customer">
                      <MyBookingsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/booking/confirmation/:id"
                  element={
                    <ProtectedRoute allowedRole="customer">
                      <BookingConfirmationPage />
                    </ProtectedRoute>
                  }
                />

                {/* Provider Protected Routes */}
                <Route
                  path="/provider/dashboard"
                  element={
                    <ProtectedRoute allowedRole="provider">
                      <ProviderDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
