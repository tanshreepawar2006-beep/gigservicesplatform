import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Wrench,
  User,
  Briefcase,
  Mail,
  Lock,
  Phone,
  MapPin,
  ArrowRight,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const cities = ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad'];

const SignupPage = () => {
  const { signup, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [roleSelection, setRoleSelection] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [city, setCity] = useState('Bengaluru');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Auto-redirect logged-in users away from signup
  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === 'provider' ? '/provider/dashboard' : '/services', { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide your full legal name.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please provide an active email address.';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Please create a secure password.';
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
      const user = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        role: roleSelection,
        phone: phone.trim(),
        city
      });

      navigate(user.role === 'provider' ? '/provider/dashboard' : '/services', {
        replace: true
      });
    } catch (err) {
      setServerError(err.message || 'Unable to complete registration. Please check your inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* Left Visual Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-900 text-white p-12 flex-col justify-between">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
            alt="ServeEasy Clean"
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
            <span>Join 12,000+ Customers & Verified Pros</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
            {roleSelection === 'provider'
              ? 'Empower your craft and grow your customer base.'
              : 'Experience first-class home repairs and wellness.'}
          </h2>

          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>
                {roleSelection === 'provider'
                  ? 'Accept job requests with zero upfront lead purchasing fees'
                  : 'Book verified electricians, plumbers & cleaners in under 60 seconds'}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>
                {roleSelection === 'provider'
                  ? 'Custom service catalog management with instant price updates'
                  : 'Fixed transparent pricing in INR with zero surge costs'}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>
                {roleSelection === 'provider'
                  ? 'Build your digital reputation with verified client reviews'
                  : '30-day service warranty on every completed job'}
              </span>
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
          <div className="text-center lg:text-left mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Select your role to personalize your experience.
            </p>
          </div>

          {/* Role Selection Switch Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRoleSelection('customer')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                roleSelection === 'customer'
                  ? 'bg-brand-50/80 border-brand-600 ring-2 ring-brand-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    roleSelection === 'customer'
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                {roleSelection === 'customer' && (
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Customer</span>
                <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                  I want to book services
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRoleSelection('provider')}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                roleSelection === 'provider'
                  ? 'bg-brand-50/80 border-brand-600 ring-2 ring-brand-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    roleSelection === 'provider'
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                </div>
                {roleSelection === 'provider' && (
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Service Provider</span>
                <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                  I offer professional services
                </span>
              </div>
            </button>
          </div>

          {/* Server Error Alert */}
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
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Legal Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                  }}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-rose-400 focus:ring-rose-500/20'
                      : 'border-slate-200 focus:border-brand-500 focus:ring-brand-500/20'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email Address */}
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
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
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
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Phone & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-600/25 hover:shadow-brand-600/35 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Your Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-slate-200/80 text-center">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-brand-700 hover:text-brand-800 underline ml-1"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
