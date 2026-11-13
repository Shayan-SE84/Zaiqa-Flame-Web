import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export function Toast() {
  const { toast } = useRestaurant();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="flex items-center gap-2.5 bg-[#0B0F17] text-white border border-white/15 px-4 py-3 rounded-xl shadow-[0_20px_40px_-8px_rgba(11,15,23,0.35)] text-sm font-semibold whitespace-nowrap">
        <CheckCircle2 className="w-4 h-4 text-[#FEA619] shrink-0" aria-hidden="true" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
