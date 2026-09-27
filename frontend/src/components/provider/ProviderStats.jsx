import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Clock, CheckCircle2, IndianRupee } from 'lucide-react';

const ProviderStats = ({ stats }) => {
  const cards = [
    {
      label: 'Total Active Listings',
      value: stats?.totalServices || 0,
      icon: Briefcase,
      color: 'bg-brand-50 text-brand-700 border-brand-200/80',
      sub: 'Published & searchable'
    },
    {
      label: 'Pending Requests',
      value: stats?.pendingBookings || 0,
      icon: Clock,
      color: 'bg-amber-50 text-amber-700 border-amber-200/80',
      sub: 'Action required'
    },
    {
      label: 'Accepted / Ongoing Jobs',
      value: stats?.activeBookings || 0,
      icon: CheckCircle2,
      color: 'bg-sky-50 text-sky-700 border-sky-200/80',
      sub: 'Scheduled for dispatch'
    },
    {
      label: 'Total Completed Revenue',
      value: `₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      sub: `${stats?.completedBookings || 0} completed orders`
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                {card.label}
              </span>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {card.value}
              </div>
              <span className="text-[11px] text-slate-400 font-medium block mt-1">
                {card.sub}
              </span>
            </div>

            <div
              className={`w-12 h-12 rounded-2xl ${card.color} border flex items-center justify-center flex-shrink-0`}
            >
              <Icon className="w-6 h-6" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProviderStats;
