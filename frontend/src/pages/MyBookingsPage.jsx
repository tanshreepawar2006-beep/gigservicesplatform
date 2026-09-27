import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Phone,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Camera
} from 'lucide-react';
import { bookingsAPI } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import { BookingRowSkeleton } from '../components/common/SkeletonCard';
import EmptyState from '../components/common/EmptyState';
import WorkPhotosModal from '../components/common/WorkPhotosModal';
import { useToast } from '../context/ToastContext';

const filterTabs = ['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'];

const MyBookingsPage = () => {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [cancelModalBooking, setCancelModalBooking] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [photoModalBooking, setPhotoModalBooking] = useState(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const res = await bookingsAPI.getCustomerBookings();
      if (res.success && res.bookings) {
        setBookings(res.bookings);
      }
    } catch (err) {
      console.error('Error fetching customer bookings:', err);
      showToast(err.message || 'Failed to load bookings.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async () => {
    if (!cancelModalBooking) return;
    try {
      setIsCancelling(true);
      const res = await bookingsAPI.updateStatus(cancelModalBooking._id, 'cancelled');
      if (res.success) {
        showToast('Booking successfully cancelled.', 'info');
        setBookings((prev) =>
          prev.map((b) => (b._id === cancelModalBooking._id ? { ...b, status: 'cancelled' } : b))
        );
        setCancelModalBooking(null);
      }
    } catch (err) {
      showToast(err.message || 'Could not cancel booking.', 'error');
    } finally {
      setIsCancelling(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'All') return true;
    return b.status?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="min-h-screen py-10 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My Service Bookings
            </h1>
            <p className="mt-1 text-slate-500 text-sm">
              Track appointments, view service partner details, and schedule follow-ups.
            </p>
          </div>

          <Link
            to="/services"
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all flex items-center space-x-1.5 w-fit"
          >
            <span>Book New Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {filterTabs.map((tab) => {
            const isSelected = activeTab === tab;
            const count =
              tab === 'All'
                ? bookings.length
                : bookings.filter((b) => b.status?.toLowerCase() === tab.toLowerCase()).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bookings List or Skeleton or Empty State */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <BookingRowSkeleton key={i} />
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          <EmptyState
            icon="calendar"
            title={activeTab === 'All' ? 'No Bookings Found' : `No ${activeTab} Bookings`}
            description={
              activeTab === 'All'
                ? "You haven't scheduled any home services yet. Browse our verified technicians and book your first service today!"
                : `You do not have any bookings currently marked as ${activeTab.toLowerCase()}.`
            }
            actionLabel="Browse Available Services"
            onAction={() => (window.location.href = '/services')}
          />
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const service = booking.serviceId || {};
              const provider = booking.providerId || {};
              const isPending = booking.status === 'pending';

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left: Thumbnail & Service Info */}
                  <div className="flex items-start sm:items-center space-x-4">
                    <img
                      src={
                        service.imageUrl ||
                        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={service.title}
                      className="w-20 h-20 rounded-2xl object-cover bg-slate-100 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <StatusBadge status={booking.status} />
                        <span className="text-[10px] text-slate-400 font-mono">
                          #{booking._id.slice(-6).toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {service.title || 'Home Service Package'}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-brand-600" />
                          {booking.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-brand-600" />
                          {booking.timeSlot}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                          Partner: {provider.name || 'Verified Pro'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Address, Pricing, & Action */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-5 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Service Fee
                      </span>
                      <span className="text-lg font-extrabold text-slate-900">
                        ₹{(booking.totalPrice || service.price || 0).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400 block max-w-xs truncate">
                        📍 {booking.address?.street}, {booking.address?.city}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {/* Work Photos Button */}
                      <button
                        onClick={() => setPhotoModalBooking(booking)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors flex items-center space-x-1.5 shadow-2xs"
                      >
                        <Camera className="w-3.5 h-3.5 text-purple-600" />
                        <span>Photos ({((booking.photos?.before?.length || 0) + (booking.photos?.after?.length || 0))})</span>
                      </button>

                      {isPending && (
                        <button
                          onClick={() => setCancelModalBooking(booking)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <Link
                        to={`/services/${service._id}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        Service Info
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {cancelModalBooking && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancelModalBooking(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl p-6 shadow-modal border border-slate-100 max-w-md w-full z-10 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Cancel this booking?
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Are you sure you want to cancel your appointment for{' '}
                <span className="font-semibold text-slate-800">
                  {cancelModalBooking.serviceId?.title}
                </span>{' '}
                on {cancelModalBooking.date}? This slot will be released.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setCancelModalBooking(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  disabled={isCancelling}
                  onClick={handleCancelBooking}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 flex items-center space-x-1.5"
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <span>Yes, Cancel Appointment</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Customer Work Photos Modal */}
      {photoModalBooking && (
        <WorkPhotosModal
          isOpen={!!photoModalBooking}
          onClose={() => setPhotoModalBooking(null)}
          booking={photoModalBooking}
          onPhotosUpdated={fetchBookings}
        />
      )}
    </div>
  );
};

export default MyBookingsPage;
