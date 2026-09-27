import React from 'react';
import { Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const normStatus = (status || 'pending').toLowerCase();

  const configs = {
    pending: {
      label: 'Pending Confirmation',
      bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
      dot: 'bg-amber-500 animate-pulse',
      icon: Clock
    },
    accepted: {
      label: 'Accepted / In Progress',
      bg: 'bg-sky-50 text-sky-700 border-sky-200/80',
      dot: 'bg-sky-500',
      icon: CheckCircle2
    },
    completed: {
      label: 'Service Completed',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      dot: 'bg-emerald-500',
      icon: CheckCircle2
    },
    cancelled: {
      label: 'Cancelled',
      bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
      dot: 'bg-rose-500',
      icon: XCircle
    }
  };

  const config = configs[normStatus] || configs.pending;
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} shadow-sm`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <IconComponent className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
