import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { CreateEditServiceModal } from '../components/CreateEditServiceModal';
import { BookingCard } from '../components/BookingCard';
import { ServiceCardSkeleton, BookingCardSkeleton } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { 
  PlusCircle, 
  Briefcase, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Trash2, 
  Edit, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ProviderDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('services'); // 'services' | 'jobs'

  const [myServices, setMyServices] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Modal States
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);

  const fetchProviderData = async () => {
    setLoadingServices(true);
    setLoadingBookings(true);
    try {
      if (user?._id) {
        const servicesData = await api.getServices({ providerId: user._id });
        setMyServices(servicesData);
      }
      const bookingsData = await api.getMyBookings();
      setMyBookings(bookingsData);
    } catch (err) {
      console.error('Provider fetch error:', err);
    } finally {
      setLoadingServices(false);
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    fetchProviderData();
  }, [user]);

  const handleCreateNewService = () => {
    setServiceToEdit(null);
    setIsServiceModalOpen(true);
  };

  const handleEditService = (service) => {
    setServiceToEdit(service);
    setIsServiceModalOpen(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service listing?')) {
      return;
    }
    try {
      await api.deleteService(serviceId);
      setMyServices((prev) => prev.filter((s) => s._id !== serviceId));
    } catch (err) {
      alert(err.message || 'Failed to delete service');
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      const updated = await api.updateBookingStatus(bookingId, status);
      setMyBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? updated : b))
      );
    } catch (err) {
      alert(err.message || 'Failed to update booking status');
    }
  };

  const handleModalSuccess = () => {
    setIsServiceModalOpen(false);
    fetchProviderData();
  };

  // Stats calculation
  const pendingCount = myBookings.filter((b) => b.status === 'Pending').length;
  const completedCount = myBookings.filter((b) => b.status === 'Completed').length;
  const totalEarnings = myBookings
    .filter((b) => b.status === 'Completed')
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[calc(100vh-12rem)]">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Service Provider Hub
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Partner'}!
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage your service catalog, review customer requests, and grow your earnings.
          </p>
        </div>

        <button
          onClick={handleCreateNewService}
          className="px-5 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2 shrink-0 active:scale-95 z-10"
        >
          <PlusCircle className="w-5 h-5" /> Add New Service
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Listings</p>
            <p className="text-2xl font-black text-slate-900">{myServices.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Requests</p>
            <p className="text-2xl font-black text-slate-900">{pendingCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Jobs Completed</p>
            <p className="text-2xl font-black text-slate-900">{completedCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</p>
            <p className="text-2xl font-black text-brand-700">₹{totalEarnings.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-4">
        <button
          onClick={() => setActiveTab('services')}
          className={`pb-3 font-bold text-sm transition-all flex items-center gap-2 border-b-2 ${
            activeTab === 'services'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" /> My Service Listings ({myServices.length})
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`pb-3 font-bold text-sm transition-all flex items-center gap-2 border-b-2 relative ${
            activeTab === 'jobs'
              ? 'border-brand-600 text-brand-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" /> Customer Job Requests ({myBookings.length})
          {pendingCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content: Services */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          {loadingServices ? (
            <ServiceCardSkeleton count={3} />
          ) : myServices.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No service listings published yet"
              description="Click the button below to add your first home service listing and start receiving customer bookings."
              actionLabel="Create First Service Listing"
              onAction={handleCreateNewService}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myServices.map((service) => (
                <div
                  key={service._id}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 bg-slate-100 relative overflow-hidden">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-white/90 text-slate-900">
                        {service.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-slate-900 text-base">{service.title}</h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs text-slate-600 font-semibold">
                        <span>Price: ₹{service.price}</span>
                        <span>City: {service.location || 'Mumbai'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors flex items-center gap-1.5"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>

                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Jobs */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {loadingBookings ? (
            <BookingCardSkeleton />
          ) : myBookings.length === 0 ? (
            <EmptyState
              icon={Calendar}
              title="No customer bookings received yet"
              description="When customers book your published services, their booking requests will appear here for your confirmation."
            />
          ) : (
            <div className="space-y-4">
              {myBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  isProvider={true}
                  onUpdateStatus={handleUpdateBookingStatus}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Service Modal */}
      <CreateEditServiceModal
        serviceToEdit={serviceToEdit}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};
