import React from 'react';
import { Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const configs = {
    Pending: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Clock,
      label: 'Pending Approval'
    },
    Accepted: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: AlertCircle,
      label: 'Confirmed'
    },
    Completed: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
      label: 'Completed'
    },
    Cancelled: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: XCircle,
      label: 'Cancelled'
    }
  };

  const config = configs[status] || configs.Pending;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
};
