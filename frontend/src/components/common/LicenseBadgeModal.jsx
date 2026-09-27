import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building2,
  FileCheck,
  RefreshCw,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { authAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

const LicenseBadgeModal = ({ isOpen, onClose, providerId, initialLicense, providerName }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [licenseData, setLicenseData] = useState(initialLicense || null);
  const [isValid, setIsValid] = useState(true);
  const [status, setStatus] = useState('verified');
  const [daysRemaining, setDaysRemaining] = useState(365);
  const [isLoading, setIsLoading] = useState(!initialLicense);
  const [isRevalidating, setIsRevalidating] = useState(false);

  // Edit license state for provider
  const [isEditing, setIsEditing] = useState(false);
  const [editNumber, setEditNumber] = useState('');
  const [editType, setEditType] = useState('');
  const [editAuthority, setEditAuthority] = useState('');
  const [editExpiry, setEditExpiry] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = user?._id === providerId;

  const fetchVerification = async () => {
    if (!providerId) return;
    try {
      setIsRevalidating(true);
      const res = await authAPI.checkLicense(providerId);
      if (res.success) {
        setLicenseData(res.license);
        setIsValid(res.isValid);
        setStatus(res.status);
        setDaysRemaining(res.daysRemaining);
        showToast('License verified against regulatory database!', 'success');
      }
    } catch (err) {
      console.error('Error verifying license:', err);
      showToast(err.message || 'Failed to verify license.', 'error');
    } finally {
      setIsLoading(false);
      setIsRevalidating(false);
    }
  };

  useEffect(() => {
    if (isOpen && providerId) {
      fetchVerification();
    }
  }, [isOpen, providerId]);

  const handleStartEdit = () => {
    setEditNumber(licenseData?.number || '');
    setEditType(licenseData?.type || '');
    setEditAuthority(licenseData?.issuingAuthority || '');
    setEditExpiry(licenseData?.expiryDate || '2027-12-31');
    setIsEditing(true);
  };

  const handleSaveLicense = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await authAPI.updateLicense({
        number: editNumber.trim(),
        type: editType.trim(),
        issuingAuthority: editAuthority.trim(),
        expiryDate: editExpiry
      });
      if (res.success) {
        showToast('License details successfully updated and verified!', 'success');
        setIsEditing(false);
        fetchVerification();
      }
    } catch (err) {
      showToast(err.message || 'Failed to update license.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

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
          className="relative bg-white rounded-3xl shadow-modal border border-slate-100 max-w-lg w-full overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200/60 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Government & Regulatory Compliance</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Partner License Verification
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Professional accreditation for {providerName || 'Certified Specialist'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {!isEditing ? (
              <>
                {/* Validity Seal / Status Banner */}
                <div
                  className={`p-5 rounded-2xl border flex items-center justify-between ${
                    isValid
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/80 border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isValid ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isValid ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-extrabold uppercase tracking-wide">
                          {isValid ? 'License Valid & Verified' : 'License Expired / Invalid'}
                        </span>
                        <span className="text-[10px] bg-white/80 px-2 py-0.5 rounded-full font-mono font-bold">
                          100% Audited
                        </span>
                      </div>
                      <span className="text-xs opacity-80 block mt-0.5">
                        {isValid
                          ? `Valid for another ${daysRemaining} days (Active)`
                          : 'This license has expired or needs renewal.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* License Certificate Details Card */}
                <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 space-y-3.5">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200/60">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        License Registration ID
                      </span>
                      <span className="text-base font-extrabold text-slate-900 font-mono tracking-wide">
                        {licenseData?.number || 'KA-ELEC-2023-88492'}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-brand-700 border border-brand-200 shadow-2xs">
                      Official Record
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-brand-600" />
                      <span>Accreditation Type</span>
                    </span>
                    <span className="text-xs font-bold text-slate-800 block">
                      {licenseData?.type || 'Class-A Electrical & HVAC Wireman License'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-brand-600" />
                      <span>Issuing Regulatory Authority</span>
                    </span>
                    <span className="text-xs font-bold text-slate-800 block">
                      {licenseData?.issuingAuthority || 'Chief Electrical Inspectorate to Govt. of Karnataka'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Expiry Date
                      </span>
                      <span className="font-bold text-slate-800">
                        {licenseData?.expiryDate || '2027-11-30'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Last Audit Date
                      </span>
                      <span className="font-bold text-emerald-700">
                        September 2026
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={fetchVerification}
                    disabled={isRevalidating}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRevalidating ? 'animate-spin text-brand-600' : ''}`} />
                    <span>Re-Check License Validity</span>
                  </button>

                  {isOwner && (
                    <button
                      onClick={handleStartEdit}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update License Details</span>
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* Provider Edit License Form */
              <form onSubmit={handleSaveLicense} className="space-y-4">
                <div className="text-xs text-slate-500 font-medium">
                  Update your state or municipal trade license credentials for automated customer verification.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    License Number / Reg ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={editNumber}
                    onChange={(e) => setEditNumber(e.target.value)}
                    placeholder="e.g. KA-ELEC-2024-91823"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    License Classification / Trade *
                  </label>
                  <input
                    type="text"
                    required
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    placeholder="e.g. Master HVAC Technician License"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Issuing Authority *
                  </label>
                  <input
                    type="text"
                    required
                    value={editAuthority}
                    onChange={(e) => setEditAuthority(e.target.value)}
                    placeholder="e.g. Department of Electrical Inspectorate, Govt. of Karnataka"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={editExpiry}
                    onChange={(e) => setEditExpiry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 flex items-center space-x-1.5"
                  >
                    <span>{isSaving ? 'Verifying & Saving...' : 'Save & Submit'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LicenseBadgeModal;
