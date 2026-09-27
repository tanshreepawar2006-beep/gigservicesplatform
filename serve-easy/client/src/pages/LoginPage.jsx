import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-redirect logged-in users
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || (user.role === 'provider' ? '/provider-dashboard' : '/services');
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      const targetPath = loggedUser.role === 'provider' ? '/provider-dashboard' : '/services';
      navigate(targetPath, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (role) => {
    if (role === 'customer') {
      setEmail('customer@serveeasy.com');
      setPassword('password123');
    } else {
      setEmail('provider@serveeasy.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 flex flex-col md:flex-row my-6"
      >
        {/* Left Side: Brand Visual */}
        <div className="w-full md:w-5/12 bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 fill-current text-brand-100" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Serve<span className="text-brand-500">Easy</span>
              </span>
            </Link>

            <div className="space-y-3 pt-6">
              <h2 className="text-2xl font-extrabold leading-tight">
                Welcome back to your trusted local service hub.
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">
                Log in to manage your service bookings, track appointments, or accept job requests.
              </p>
            </div>
          </div>

          {/* Key highlights */}
          <div className="relative z-10 pt-8 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
              <span>Verified Service Professionals</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
              <span>Secure JWT Encryption</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Sign in to ServeEasy</h1>
            <p className="text-slate-500 text-xs mt-1">
              Enter your account credentials to continue
            </p>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="mb-6 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Quick Demo Fill:
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('customer')}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-brand-500 text-slate-700 text-xs font-bold transition-all shadow-sm"
              >
                Demo Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('provider')}
                className="flex-1 py-1.5 px-3 rounded-xl bg-white border border-slate-200 hover:border-brand-500 text-slate-700 text-xs font-bold transition-all shadow-sm"
              >
                Demo Provider
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-900"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-900"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-bold text-brand-600 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
