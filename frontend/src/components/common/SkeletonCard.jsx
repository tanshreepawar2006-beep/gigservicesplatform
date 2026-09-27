import React from 'react';

export const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-soft p-4 flex flex-col space-y-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-slate-200 rounded-xl" />

      {/* Category & Rating */}
      <div className="flex justify-between items-center pt-1">
        <div className="w-20 h-5 bg-slate-200 rounded-md" />
        <div className="w-12 h-5 bg-slate-200 rounded-md" />
      </div>

      {/* Title */}
      <div className="w-3/4 h-6 bg-slate-200 rounded-md" />

      {/* Description lines */}
      <div className="space-y-2">
        <div className="w-full h-3.5 bg-slate-100 rounded" />
        <div className="w-5/6 h-3.5 bg-slate-100 rounded" />
      </div>

      {/* Provider Pill */}
      <div className="flex items-center space-x-3 pt-2">
        <div className="w-8 h-8 rounded-full bg-slate-200" />
        <div className="w-28 h-4 bg-slate-200 rounded" />
      </div>

      {/* Price & Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="w-20 h-6 bg-slate-200 rounded" />
        <div className="w-24 h-9 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
};

export const BookingRowSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-soft animate-pulse flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <div className="w-48 h-5 bg-slate-200 rounded" />
          <div className="w-32 h-4 bg-slate-100 rounded" />
          <div className="w-24 h-4 bg-slate-100 rounded" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-7 bg-slate-200 rounded-full" />
        <div className="w-28 h-9 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
};

export const StatsCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-soft animate-pulse flex items-center justify-between">
      <div className="space-y-3">
        <div className="w-24 h-4 bg-slate-100 rounded" />
        <div className="w-16 h-8 bg-slate-200 rounded" />
      </div>
      <div className="w-12 h-12 rounded-xl bg-slate-100" />
    </div>
  );
};
