import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  MapPin,
  Calendar,
  LayoutDashboard,
  PlusCircle,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, role, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleQuickDemo = async (targetRole) => {
    try {
      await demoLogin(targetRole);
      setDemoMenuOpen(false);
      setMobileMenuOpen(false);
      navigate(targetRole === 'provider' ? '/provider/dashboard' : '/services');
    } catch (err) {
      console.error(err);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & City Badge */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-brand-500 flex items-center justify-center shadow-lg shadow-brand-600/25 group-hover:scale-105 transition-transform duration-200">
                <Wrench className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  Serve<span className="text-brand-600">Easy</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                  On-Demand Services
                </span>
              </div>
            </Link>

            {/* City Badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs font-semibold text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span>Bengaluru, IN</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/services"
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/services')
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              Explore Services
            </Link>

            {/* Authenticated Customer Navigation */}
            {isAuthenticated && role === 'customer' && (
              <Link
                to="/bookings"
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/bookings')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>My Bookings</span>
              </Link>
            )}

            {/* Authenticated Provider Navigation */}
            {isAuthenticated && role === 'provider' && (
              <>
                <Link
                  to="/provider/dashboard"
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive('/provider/dashboard')
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Provider Hub</span>
                </Link>
              </>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                {/* 1-Click Demo Testing Pill Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100/80 border border-brand-200/80 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                    <span>Quick Demo</span>
                    <ChevronDown className="w-3 h-3 text-brand-600" />
                  </button>

                  <AnimatePresence>
                    {demoMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-modal border border-slate-100 p-2 z-50"
                      >
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                          Instant Login As
                        </div>
                        <button
                          onClick={() => handleQuickDemo('customer')}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 text-slate-800 text-xs font-semibold flex items-center justify-between group"
                        >
                          <span>👤 Aarav (Customer)</span>
                          <span className="text-[10px] text-brand-600 bg-brand-100 px-1.5 py-0.5 rounded font-mono">1-click</span>
                        </button>
                        <button
                          onClick={() => handleQuickDemo('provider')}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-brand-50 text-slate-800 text-xs font-semibold flex items-center justify-between group"
                        >
                          <span>🛠️ Rajesh (Provider)</span>
                          <span className="text-[10px] text-brand-600 bg-brand-100 px-1.5 py-0.5 rounded font-mono">1-click</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Log In
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 transition-all"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 pl-2 pr-3 py-1.5 bg-white rounded-2xl border border-slate-200/80 shadow-soft">
                  <div className="w-8 h-8 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-700 font-bold text-xs uppercase overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user?.name?.charAt(0) || 'U'
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 leading-tight">
                      {user?.name}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-brand-600 tracking-wider">
                      {user?.role === 'provider' ? 'Service Partner' : 'Customer'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3"
          >
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 w-fit">
              <MapPin className="w-3.5 h-3.5 text-brand-600" />
              <span>Bengaluru, IN</span>
            </div>

            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Explore Services
            </Link>

            {isAuthenticated && role === 'customer' && (
              <Link
                to="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                My Bookings
              </Link>
            )}

            {isAuthenticated && role === 'provider' && (
              <Link
                to="/provider/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Provider Hub
              </Link>
            )}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              {!isAuthenticated ? (
                <>
                  <div className="grid grid-cols-2 gap-2 pb-2">
                    <button
                      onClick={() => handleQuickDemo('customer')}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-brand-50 text-brand-700 text-center"
                    >
                      Demo Customer
                    </button>
                    <button
                      onClick={() => handleQuickDemo('provider')}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-brand-50 text-brand-700 text-center"
                    >
                      Demo Provider
                    </button>
                  </div>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 text-center text-sm font-semibold text-slate-700 rounded-xl bg-slate-100"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-2.5 text-center text-sm font-semibold text-white rounded-xl bg-brand-600"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">{user?.name}</div>
                      <div className="text-xs text-brand-600 font-medium capitalize">{user?.role}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-2 py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
