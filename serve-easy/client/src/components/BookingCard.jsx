import React, { useState } from 'react';
import { StatusBadge } from './StatusBadge';
import { Calendar, Clock, MapPin, User, Phone, Check, X, CheckCircle, Loader2 } from 'lucide-react';

export const BookingCard = ({ booking, isProvider, onUpdateStatus }) => {
  const [updating, setUpdating] = useState(false);

  const service = booking.serviceId || {};
  const customer = booking.customerId || {};
  const provider = booking.providerId || {};

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await onUpdateStatus(booking._id, newStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const formattedDate = booking.date
    ? new Date(booking.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Date not set';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card transition-all flex flex-col md:flex-row gap-5">
      {/* Service thumbnail */}
      <div className="w-full md:w-44 h-36 md:h-full rounded-xl overflow-hidden bg-slate-100 shrink-0 relative">
        <img
          src={service.imageUrl || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600'}
          alt={service.title || 'Service'}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 shadow-sm uppercase tracking-wider">
            {service.category || 'Service'}
          </span>
        </div>
      </div>

      {/* Booking Details */}
      <div className="flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold text-slate-900">
              {service.title || 'Booked Service'}
            </h3>
            <StatusBadge status={booking.status} />
          </div>

          {/* Schedule Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-800">
              <Clock className="w-3.5 h-3.5 text-brand-600" />
              <span>{booking.timeSlot || '10:00 AM - 12:00 PM'}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-1 text-xs text-slate-500">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="text-slate-700">{booking.address}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {isProvider ? `Customer: ${customer.name || 'N/A'}` : `Provider: ${provider.name || 'N/A'}`}
              </span>
              {(isProvider ? customer.phone : provider.phone) && (
                <span className="text-slate-400 flex items-center gap-1 ml-2">
                  <Phone className="w-3 h-3" /> {isProvider ? customer.phone : provider.phone}
                </span>
              )}
            </div>
            {booking.notes && (
              <p className="text-[11px] italic text-slate-400 mt-1">
                Note: "{booking.notes}"
              </p>
            )}
          </div>
        </div>

        {/* Footer: Total Amount & Actions */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Total Amount</span>
            <span className="text-lg font-extrabold text-brand-700">
              ₹{booking.totalAmount?.toLocaleString('en-IN') || service.price}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {updating ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 py-1.5 px-3">
                <Loader2 className="w-4 h-4 animate-spin text-brand-600" /> Updating...
              </div>
            ) : (
              <>
                {/* Provider Actions */}
                {isProvider && booking.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange('Accepted')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Accept Request
                    </button>
                    <button
                      onClick={() => handleStatusChange('Cancelled')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Decline
                    </button>
                  </>
                )}

                {isProvider && booking.status === 'Accepted' && (
                  <button
                    onClick={() => handleStatusChange('Completed')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Mark Completed
                  </button>
                )}

                {/* Customer Actions */}
                {!isProvider && (booking.status === 'Pending' || booking.status === 'Accepted') && (
                  <button
                    onClick={() => handleStatusChange('Cancelled')}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Cancel Booking
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
