import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wrench,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, isAuthenticated, role, demoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Target destination after successful authentication
  const from = location.state?.from?.pathname || (role === 'provider' ? '/provider/dashboard' : '/services');

  // Auto-redirect logged-in users away from login
  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === 'provider' ? '/provider/dashboard' : '/services', { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  // Real-time client-side form validation
  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your registered email address.';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email format (e.g. name@example.com).';
    }

    if (!password) {
      newErrors.password = 'Please enter your account password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const user = await login(email.trim(), password);
      const dest = location.state?.from?.pathname || (user.role === 'provider' ? '/provider/dashboard' : '/services');
      navigate(dest, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Invalid email or password. Please verify and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async (demoRole) => {
    setServerError('');
    setErrors({});
    try {
      setIsLoading(true);
      const user = await demoLogin(demoRole);
      const dest = location.state?.from?.pathname || (user.role === 'provider' ? '/provider/dashboard' : '/services');
      navigate(dest, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Demo login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* Left Visual Brand Panel (Split Screen on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 text-white p-12 flex-col justify-between">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
            alt="ServeEasy Pro"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shadow-md">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Serve<span className="text-brand-400">Easy</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Trusted by 12,000+ Urban Indian Households</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
            Welcome back to effortless home maintenance.
          </h2>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>Real-time booking tracking & slot scheduling</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>Fixed transparent pricing in INR with zero hidden extras</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>30-day warranty on all repairs and deep cleans</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} ServeEasy Technologies Private Limited
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Top Brand on Mobile */}
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your details to manage bookings or service requests.
            </p>
          </div>

          {/* Quick 1-Click Demo Testing Box */}
          <div className="mb-6 p-4 rounded-2xl bg-brand-50/80 border border-brand-200/80 shadow-soft">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-brand-800 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Quick 1-Click Demo Sign In</span>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Testing the platform? Skip manual typing and login with ready-to-test credentials:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('customer')}
                disabled={isLoading}
                className="py-2 px-3 rounded-xl bg-white hover:bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 shadow-2xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>👤 Customer</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('provider')}
                disabled={isLoading}
                className="py-2 px-3 rounded-xl bg-white hover:bg-brand-100 text-brand-800 text-xs font-bold border border-brand-200 shadow-2xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>🛠️ Provider</span>
              </button>
            </div>
          </div>

          {/* Server Error Message */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold leading-relaxed"
            >
              {serverError}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-400 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-600 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  className={`w-full pl-11 pr-11 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-rose-400 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-600 font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/25 hover:shadow-brand-600/35 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 text-center">
            <p className="text-xs text-slate-500">
              Don't have an account yet?{' '}
              <Link
                to="/signup"
                className="font-bold text-brand-700 hover:text-brand-800 underline ml-1"
              >
                Create a new account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
