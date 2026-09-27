import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Camera,
  Upload,
  Sparkles,
  Trash2,
  Calendar,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  SplitSquareVertical
} from 'lucide-react';
import { bookingsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

// Preset sample images for quick testing if user doesn't want to upload local files
const presetPhotoSuggestions = {
  before: [
    {
      title: 'Dirty AC Cooling Coil',
      url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      caption: 'Before: Dust and fungal buildup inside cooling coil'
    },
    {
      title: 'Dripping Tap Leakage',
      url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      caption: 'Before: Constant drip from mixer valve body'
    },
    {
      title: 'Hard-Water Grime on Tiles',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      caption: 'Before: Mineral scale stains on bathroom tiles'
    }
  ],
  after: [
    {
      title: 'Jet-Washed AC',
      url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      caption: 'After: Sanitized high-pressure wash, 100% clean fins'
    },
    {
      title: 'Repaired Leak-Free Tap',
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      caption: 'After: Brand new ceramic cartridge installed & polished'
    },
    {
      title: 'Spotless Floor Scrub',
      url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      caption: 'After: Deep buffed tiles with hospital-grade disinfectant'
    }
  ]
};

const WorkPhotosModal = ({ isOpen, onClose, booking, onPhotosUpdated }) => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('before'); // 'before' | 'after' | 'compare'
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen || !booking) return null;

  const photos = booking.photos || { before: [], after: [] };
  const beforePhotos = photos.before || [];
  const afterPhotos = photos.after || [];

  // Handle local image file selection / camera capture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size exceeds 5MB limit. Please choose a smaller photo.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    if (!photoUrl) {
      showToast('Please select or paste an image photo.', 'error');
      return;
    }

    try {
      setIsUploading(true);
      const res = await bookingsAPI.uploadPhotos(booking._id, {
        stage: activeTab === 'compare' ? 'before' : activeTab,
        url: photoUrl,
        caption: photoCaption.trim()
      });

      if (res.success) {
        showToast('Photo added successfully!', 'success');
        setPhotoUrl('');
        setPhotoCaption('');
        setShowAddForm(false);
        if (onPhotosUpdated) onPhotosUpdated();
      }
    } catch (err) {
      showToast(err.message || 'Failed to save photo.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = async (photoId, stage) => {
    try {
      setIsDeleting(true);
      const res = await bookingsAPI.deletePhoto(booking._id, photoId, stage);
      if (res.success) {
        showToast('Photo removed successfully.', 'info');
        if (onPhotosUpdated) onPhotosUpdated();
      }
    } catch (err) {
      showToast(err.message || 'Failed to remove photo.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const currentList = activeTab === 'before' ? beforePhotos : afterPhotos;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-modal border border-slate-100 max-w-2xl w-full overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50 flex-shrink-0">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200/60 mb-1">
                <Camera className="w-3.5 h-3.5" />
                <span>Job Documentation & Proof of Work</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Work Photos (Before & After)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {booking.serviceId?.title || 'Service Package'} • Ref #{booking._id?.slice(-6).toUpperCase()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setActiveTab('before');
                  setShowAddForm(false);
                }}
                className={`pb-3 px-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-all ${
                  activeTab === 'before'
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>📸 Before Work</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                  {beforePhotos.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('after');
                  setShowAddForm(false);
                }}
                className={`pb-3 px-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-all ${
                  activeTab === 'after'
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>✨ After Completion</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono">
                  {afterPhotos.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('compare');
                  setShowAddForm(false);
                }}
                className={`pb-3 px-3 text-xs font-bold flex items-center space-x-1.5 border-b-2 transition-all ${
                  activeTab === 'compare'
                    ? 'border-brand-600 text-brand-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>Side-by-Side Comparison</span>
              </button>
            </div>

            {activeTab !== 'compare' && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="mb-2 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all flex items-center space-x-1"
              >
                <Camera className="w-3 h-3" />
                <span>{showAddForm ? 'Cancel' : '+ Add Photo'}</span>
              </button>
            )}
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* Add / Snap Photo Form Drawer */}
            {showAddForm && activeTab !== 'compare' && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleUploadPhoto}
                className="p-5 rounded-2xl bg-brand-50/70 border border-brand-200/80 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                    Snap or Upload {activeTab === 'before' ? 'Before Service' : 'After Completion'} Photo
                  </span>
                  <span className="text-[10px] text-brand-600">Supports direct camera snap</span>
                </div>

                {/* Device Camera / File Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-brand-300 rounded-xl bg-white hover:bg-brand-50/50 cursor-pointer transition-colors text-center">
                    <Camera className="w-6 h-6 text-brand-600 mb-1" />
                    <span className="text-xs font-bold text-slate-800">Take Photo / Camera</span>
                    <span className="text-[10px] text-slate-400">Tap to capture or choose file</span>
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">
                      Or Paste Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 bg-white"
                    />
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-slate-400 font-semibold">Presets:</span>
                      {presetPhotoSuggestions[activeTab]?.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setPhotoUrl(p.url);
                            setPhotoCaption(p.caption);
                          }}
                          className="text-[10px] bg-white border border-brand-200 hover:bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Caption Input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Photo Description / Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Deep grease on kitchen chimney baffle filter"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 bg-white"
                  />
                </div>

                {/* Image Preview */}
                {photoUrl && (
                  <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded-md font-bold">
                      Ready to Save
                    </span>
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 flex items-center space-x-1.5"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save {activeTab === 'before' ? 'Before' : 'After'} Photo</span>
                    )}
                  </button>
                </div>
              </motion.form>
            )}

            {/* Tab 1 & 2: Gallery List */}
            {activeTab !== 'compare' && (
              <div>
                {currentList.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                    <Camera className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-slate-700 mb-1">
                      No {activeTab === 'before' ? 'Before Service' : 'After Service'} Photos Yet
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                      {activeTab === 'before'
                        ? 'Take a photo of the area or appliance before technician work begins to document initial conditions.'
                        : 'Document the finished, polished outcome once the job is completed.'}
                    </p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold shadow-sm"
                    >
                      + Add First Photo
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentList.map((item, idx) => (
                      <div
                        key={item._id || idx}
                        className="rounded-2xl border border-slate-200/80 overflow-hidden shadow-soft bg-white flex flex-col justify-between group"
                      >
                        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                          <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-900/80 backdrop-blur-md text-white">
                            {activeTab === 'before' ? 'Before' : 'After'} #{idx + 1}
                          </span>
                        </div>

                        <div className="p-3.5 flex items-start justify-between gap-2">
                          <div>
                            <p className="text-xs font-bold text-slate-800 leading-snug">
                              {item.caption || (activeTab === 'before' ? 'Initial condition' : 'Finished outcome')}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              📅 {item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently taken'}
                            </span>
                          </div>

                          <button
                            disabled={isDeleting}
                            onClick={() => handleDeletePhoto(item._id, activeTab)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex-shrink-0"
                            title="Delete photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Side-by-Side Comparison */}
            {activeTab === 'compare' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200/60 flex items-center justify-between text-xs text-brand-900">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    <span className="font-bold">Before & After Visual Transformation</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {beforePhotos.length} Before • {afterPhotos.length} After
                  </span>
                </div>

                {beforePhotos.length === 0 || afterPhotos.length === 0 ? (
                  <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                    <SplitSquareVertical className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-slate-700 mb-1">
                      Side-by-Side Comparison Requires Both Photos
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                      Add at least 1 Before photo and 1 After photo to unlock the side-by-side transformation view.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Before Column */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-700 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span>Pre-Service State (Before)</span>
                      </div>
                      <div className="rounded-2xl border border-rose-200 overflow-hidden shadow-soft bg-white">
                        <div className="relative h-56 w-full bg-slate-100">
                          <img
                            src={beforePhotos[0].url}
                            alt="Before"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-600 text-white shadow-sm">
                            Before
                          </span>
                        </div>
                        <div className="p-3.5 bg-rose-50/50">
                          <p className="text-xs font-bold text-slate-800">
                            {beforePhotos[0].caption}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* After Column */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Completed Outcome (After)</span>
                      </div>
                      <div className="rounded-2xl border border-emerald-200 overflow-hidden shadow-soft bg-white">
                        <div className="relative h-56 w-full bg-slate-100">
                          <img
                            src={afterPhotos[0].url}
                            alt="After"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-600 text-white shadow-sm">
                            After
                          </span>
                        </div>
                        <div className="p-3.5 bg-emerald-50/50">
                          <p className="text-xs font-bold text-slate-800">
                            {afterPhotos[0].caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WorkPhotosModal;
