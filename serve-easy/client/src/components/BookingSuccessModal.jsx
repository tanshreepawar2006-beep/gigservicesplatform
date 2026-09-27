import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Calendar, MapPin, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BookingSuccessModal = ({ booking, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen || !booking) return null;

  const service = booking.serviceId || {};
  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-modal border border-slate-100 relative overflow-hidden"
        >
          {/* Decorative Background Blob */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-100 rounded-full blur-2xl opacity-60" />

          {/* Success Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20"
          >
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </motion.div>

          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Booking Request Sent!</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Your booking for <span className="font-bold text-slate-800">{service.title}</span> has been successfully placed.
          </p>

          {/* Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2 text-left text-xs mb-6">
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-brand-600" /> Schedule:
              </span>
              <span className="font-bold text-slate-800">{formattedDate} ({booking.timeSlot})</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-brand-600" /> Location:
              </span>
              <span className="font-bold text-slate-800 truncate max-w-[200px]">{booking.address}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-700 uppercase">Amount Due</span>
              <span className="text-base font-extrabold text-brand-700">₹{booking.totalAmount}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                onClose();
                navigate('/my-bookings');
              }}
              className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
            >
              View My Bookings <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/services');
              }}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" /> Keep Browsing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
