import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { BookingCard } from '../components/BookingCard';
import { BookingCardSkeleton } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { Calendar, Filter, Sparkles } from 'lucide-react';

export const MyBookingsPage = () => {
  const { user, isProvider } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      const updated = await api.updateBookingStatus(bookingId, status);
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? updated : b))
      );
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'All') return true;
    return b.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[calc(100vh-12rem)]">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Track Appointments
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {isProvider ? 'Customer Job Requests' : 'My Service Bookings'}
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            {isProvider
              ? 'Review pending customer requests and manage active job statuses.'
              : 'Track your scheduled home services, check partner details, or manage bookings.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'].map((tab) => {
          const isSelected = statusFilter === tab;
          const count = tab === 'All' ? bookings.length : bookings.filter((b) => b.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{tab}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">
          <BookingCardSkeleton />
          <BookingCardSkeleton />
        </div>
      ) : filteredBookings.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title={statusFilter === 'All' ? 'No bookings found' : `No ${statusFilter.toLowerCase()} bookings`}
          description={
            isProvider
              ? 'You have not received any customer requests under this filter.'
              : 'You have not booked any services yet. Explore our service catalog to get started.'
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              isProvider={isProvider}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};
