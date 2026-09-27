import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Phone
} from 'lucide-react';

const BookingConfirmationPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const booking = location.state?.booking;

  const service = booking?.serviceId || {};
  const provider = booking?.providerId || {};
  const address = booking?.address || {};

  return (
    <div className="min-h-screen py-16 bg-[#F8FAFC] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full bg-white rounded-3xl border border-slate-200/80 shadow-modal overflow-hidden p-8 sm:p-12 text-center"
      >
        {/* Animated Checkmark Circle */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-teal-400 flex items-center justify-center shadow-lg shadow-brand-600/30 text-white"
          >
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <Check className="w-12 h-12 stroke-[3]" />
            </motion.div>
          </motion.div>
          {/* Subtle pulse ring */}
          <div className="absolute inset-0 rounded-full bg-brand-400/20 animate-ping -z-10" />
        </div>

        {/* Celebration Badges & Heading */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Appointment Confirmed</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Your Booking is Confirmed!
        </h1>
        <p className="mt-2 text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
          Your service request has been assigned to our certified partner. A confirmation message has been dispatched.
        </p>

        {/* Booking Card Details */}
        <div className="mt-8 text-left bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Booking Reference
              </span>
              <div className="text-sm font-bold text-slate-900 font-mono">
                #{id?.slice(-8).toUpperCase() || 'SE-BK2026'}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Total Payable
              </span>
              <div className="text-base font-extrabold text-brand-700">
                ₹{(booking?.totalPrice || service.price || 499).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-medium block mb-1">Service</span>
              <span className="font-bold text-slate-800 text-sm">
                {service.title || 'Home Service Package'}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block mb-1">Service Partner</span>
              <span className="font-bold text-slate-800 flex items-center gap-1">
                {provider.name || 'Certified Specialist'}
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block">Date</span>
                <span className="font-bold text-slate-800">
                  {booking?.date || 'Scheduled Date'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-brand-600 flex-shrink-0" />
              <div>
                <span className="text-slate-400 block">Arrival Window</span>
                <span className="font-bold text-slate-800">
                  {booking?.timeSlot || '10:00 AM - 12:00 PM'}
                </span>
              </div>
            </div>
          </div>

          {/* Destination Address */}
          <div className="pt-3 border-t border-slate-200/60 flex items-start space-x-2 text-xs">
            <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block font-medium">Service Destination</span>
              <span className="font-semibold text-slate-800">
                {address.street ? `${address.street}, ${address.city} - ${address.pincode}` : 'Registered Address, Bengaluru'}
              </span>
            </div>
          </div>
        </div>

        {/* Safety & Payment Note */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Pay securely via Cash, UPI, or Card once the service is finished.</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/bookings"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 transition-all flex items-center justify-center space-x-2"
          >
            <span>View in My Bookings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-all"
          >
            Explore More Services
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmationPage;
