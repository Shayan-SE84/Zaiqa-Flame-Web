import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { formatPKR } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';

export function MobileCartBar() {
  const { totalItems, total, setCartOpen, cartOpen } = useRestaurant();

  if (totalItems === 0 || cartOpen) return null;

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-30">
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="w-full h-12 px-4 bg-[#D9232D] hover:bg-[#B3001A] text-white rounded-xl shadow-[0_12px_28px_-4px_rgba(217,35,45,0.5)] flex items-center justify-between font-semibold text-sm"
      >
        <span className="inline-flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
          <span className="tabular-nums">
            {totalItems} {totalItems === 1 ? 'Item' : 'Items'} in Cart
          </span>
        </span>
        <span className="tabular-nums font-extrabold text-[#FEF08A]">
          View Order · {formatPKR(total)}
        </span>
      </button>
    </div>
  );
}
