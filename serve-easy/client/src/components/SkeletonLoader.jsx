import React from 'react';

export const ServiceCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-0 overflow-hidden shadow-soft animate-pulse flex flex-col">
      <div className="h-48 bg-slate-200 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="space-y-1.5">
          <div className="h-3.5 bg-slate-100 rounded w-full" />
          <div className="h-3.5 bg-slate-100 rounded w-5/6" />
        </div>
        <div className="h-7 bg-slate-100 rounded-lg w-full mt-2" />
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="h-6 bg-slate-200 rounded w-20" />
          <div className="h-8 bg-slate-200 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
};

export const ServiceGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ServiceCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export const BookingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-soft animate-pulse flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-44 h-36 rounded-xl bg-slate-200 shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 bg-slate-200 rounded w-1/2" />
          <div className="h-6 bg-slate-200 rounded-full w-24" />
        </div>
        <div className="h-10 bg-slate-100 rounded-xl w-full" />
        <div className="h-4 bg-slate-100 rounded w-2/3" />
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
          <div className="h-6 bg-slate-200 rounded w-20" />
          <div className="h-8 bg-slate-200 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
};
