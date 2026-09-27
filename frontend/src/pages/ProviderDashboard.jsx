import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  Phone,
  Trash2,
  Edit3,
  Loader2,
  IndianRupee,
  Layers,
  Sparkles,
  AlertTriangle,
  Award,
  Camera,
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { servicesAPI, bookingsAPI } from '../services/api';
import ProviderStats from '../components/provider/ProviderStats';
import ServiceModal from '../components/provider/ServiceModal';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import GoogleMapModal from '../components/common/GoogleMapModal';
import LicenseBadgeModal from '../components/common/LicenseBadgeModal';
import WorkPhotosModal from '../components/common/WorkPhotosModal';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const ProviderDashboard = () => {
  const { showToast } = useToast();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'services'
  const [stats, setStats] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [myServices, setMyServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [deleteModalService, setDeleteModalService] = useState(null);
  const [actionInProgressId, setActionInProgressId] = useState(null);

  // New Features Modal States
  const [mapJob, setMapJob] = useState(null);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [photoJob, setPhotoJob] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, jobsRes, servicesRes] = await Promise.all([
        bookingsAPI.getProviderStats(),
        bookingsAPI.getProviderBookings(),
        servicesAPI.getMyListings()
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (jobsRes.success) setJobs(jobsRes.bookings || []);
      if (servicesRes.success) setMyServices(servicesRes.services || []);
    } catch (err) {
      console.error('Error fetching provider dashboard data:', err);
      showToast(err.message || 'Failed to load dashboard data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUpdateJobStatus = async (bookingId, newStatus) => {
    try {
      setActionInProgressId(bookingId);
      const res = await bookingsAPI.updateStatus(bookingId, newStatus);
      if (res.success) {
        showToast(`Job status updated to ${newStatus}!`, 'success');
        setJobs((prev) =>
          prev.map((j) => (j._id === bookingId ? { ...j, status: newStatus } : j))
        );
        // Refresh stats
        const statsRes = await bookingsAPI.getProviderStats();
        if (statsRes.success) setStats(statsRes.stats);
      }
    } catch (err) {
      showToast(err.message || 'Failed to update job status.', 'error');
    } finally {
      setActionInProgressId(null);
    }
  };

  const handleDeleteService = async () => {
    if (!deleteModalService) return;
    try {
      setActionInProgressId(deleteModalService._id);
      const res = await servicesAPI.delete(deleteModalService._id);
      if (res.success) {
        showToast('Service listing deleted successfully.', 'info');
        setMyServices((prev) => prev.filter((s) => s._id !== deleteModalService._id));
        setDeleteModalService(null);
        // Refresh stats
        const statsRes = await bookingsAPI.getProviderStats();
        if (statsRes.success) setStats(statsRes.stats);
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete service.', 'error');
    } finally {
      setActionInProgressId(null);
    }
  };

  const handleOpenAddService = () => {
    setServiceToEdit(null);
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (service) => {
    setServiceToEdit(service);
    setIsServiceModalOpen(true);
  };

  return (
    <div className="min-h-screen py-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner Operations Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Provider Dashboard
            </h1>
            <p className="mt-1 text-slate-500 text-sm">
              Manage incoming customer requests, dispatches, and your published service catalog.
            </p>
          </div>

          <button
            onClick={handleOpenAddService}
            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 transition-all flex items-center space-x-2 w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Service</span>
          </button>
        </div>

        {/* Trade License & Verification Card */}
        <div className="bg-gradient-to-r from-brand-900 to-slate-900 text-white rounded-3xl p-6 mb-8 border border-brand-700/50 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
          <div className="relative z-10 flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-800/80 border border-brand-500/40 flex items-center justify-center flex-shrink-0 text-brand-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Government Trade License & Professional Accreditation
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {user?.license?.status === 'expired' ? 'EXPIRED' : 'AUDITED & ACTIVE'}
                </span>
              </div>
              <p className="text-xs text-brand-200/80 mt-1 max-w-2xl leading-relaxed">
                Reg: <strong className="text-white font-mono">{user?.license?.number || 'KA-ELEC-2023-88492'}</strong> • {user?.license?.type || 'Class-A Electrical & HVAC Wireman License'} • Issued by {user?.license?.issuingAuthority || 'Chief Electrical Inspectorate'}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={() => setIsLicenseModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-brand-300" />
              <span>Verify / Update License</span>
            </button>
          </div>
        </div>

        {/* Analytics Statistics Cards */}
        <ProviderStats stats={stats} />

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center space-x-4 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`pb-4 px-2 text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'jobs'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Incoming Jobs & Bookings</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
              {jobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`pb-4 px-2 text-sm font-bold flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === 'services'
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>My Service Catalog</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
              {myServices.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Incoming Job Requests */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <EmptyState
                icon="inbox"
                title="No Incoming Jobs Yet"
                description="When customers book your published services, their appointment requests will appear here for your review and acceptance."
                actionLabel="Publish a Service Listing"
                onAction={handleOpenAddService}
              />
            ) : (
              jobs.map((job) => {
                const service = job.serviceId || {};
                const customer = job.customerId || {};
                const isPending = job.status === 'pending';
                const isAccepted = job.status === 'accepted';
                const isActioning = actionInProgressId === job._id;

                return (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Left: Service & Customer Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={job.status} />
                        <span className="text-xs font-mono font-semibold text-slate-400">
                          #{job._id.slice(-6).toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full">
                          ₹{(job.totalPrice || service.price || 0).toLocaleString('en-IN')}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {service.title || 'Service Package'}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-brand-600 flex-shrink-0" />
                          <span className="font-semibold text-slate-800">
                            {job.date} ({job.timeSlot})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-brand-600 flex-shrink-0" />
                          <span>
                            {customer.name} • {job.customerPhone || customer.phone || 'Phone on file'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 sm:col-span-2 text-slate-500">
                          <MapPin className="w-4 h-4 text-brand-600 flex-shrink-0" />
                          <span className="truncate">
                            {job.address?.street}, {job.address?.city} - {job.address?.pincode}
                          </span>
                        </div>
                      </div>

                      {job.notes && (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 italic">
                          "Note from customer: {job.notes}"
                        </div>
                      )}
                    </div>

                    {/* Right: Dispatch / Status Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      {/* Google Map Button */}
                      <button
                        onClick={() => setMapJob(job)}
                        className="px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 transition-colors flex items-center space-x-1.5"
                      >
                        <MapPin className="w-3.5 h-3.5 text-sky-600" />
                        <span>View on Map</span>
                      </button>

                      {/* Work Photos Button */}
                      <button
                        onClick={() => setPhotoJob(job)}
                        className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors flex items-center space-x-1.5"
                      >
                        <Camera className="w-3.5 h-3.5 text-purple-600" />
                        <span>Photos ({((job.photos?.before?.length || 0) + (job.photos?.after?.length || 0))})</span>
                      </button>

                      {isPending && (
                        <>
                          <button
                            disabled={isActioning}
                            onClick={() => handleUpdateJobStatus(job._id, 'accepted')}
                            className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all flex items-center space-x-1.5"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accept Request</span>
                          </button>
                          <button
                            disabled={isActioning}
                            onClick={() => handleUpdateJobStatus(job._id, 'cancelled')}
                            className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {isAccepted && (
                        <button
                          disabled={isActioning}
                          onClick={() => handleUpdateJobStatus(job._id, 'completed')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Mark Job Completed</span>
                        </button>
                      )}

                      {job.status === 'completed' && (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                          ✓ Payment & Job Finalized
                        </span>
                      )}

                      {job.status === 'cancelled' && (
                        <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                          Cancelled
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {/* Tab 2: My Service Catalog */}
        {activeTab === 'services' && (
          <div>
            {isLoading ? (
              <div className="p-12 text-center text-slate-400">Loading catalog...</div>
            ) : myServices.length === 0 ? (
              <EmptyState
                icon="sparkles"
                title="No Services Published"
                description="You haven't listed any services in the catalog yet. Add your first service package to start receiving customer jobs."
                actionLabel="Publish First Service"
                onAction={handleOpenAddService}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myServices.map((service) => (
                  <div
                    key={service._id}
                    className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-soft flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                        <img
                          src={service.imageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/90 backdrop-blur-md text-slate-800">
                          {service.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <h4 className="text-base font-bold text-slate-900 mb-1 line-clamp-1">
                          {service.title}
                        </h4>
                        <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
                          <span>Price: <strong className="text-slate-900 font-extrabold text-sm">₹{service.price}</strong></span>
                          <span>Duration: <strong>{service.duration || '60 mins'}</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEditService(service)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteModalService(service)}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-colors flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        serviceToEdit={serviceToEdit}
        onSaved={fetchDashboardData}
      />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModalService && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModalService(null)}
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
                Delete Service Listing?
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-slate-800">
                  {deleteModalService.title}
                </span>
                ? Existing bookings will remain preserved.
              </p>
              <div className="flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDeleteModalService(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteService}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20"
                >
                  Yes, Delete Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google Map Modal for Provider */}
      {mapJob && (
        <GoogleMapModal
          isOpen={!!mapJob}
          onClose={() => setMapJob(null)}
          address={mapJob.address}
          customerName={mapJob.customerId?.name}
          serviceTitle={mapJob.serviceId?.title}
        />
      )}

      {/* License Verification & Audit Modal */}
      <LicenseBadgeModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        providerId={user?._id}
        initialLicense={user?.license}
        providerName={user?.name}
      />

      {/* Customer Work Photos (Before & After) Modal */}
      {photoJob && (
        <WorkPhotosModal
          isOpen={!!photoJob}
          onClose={() => setPhotoJob(null)}
          booking={photoJob}
          onPhotosUpdated={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;
