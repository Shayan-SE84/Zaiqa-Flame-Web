import React from 'react';
import { Minus, Plus, Eye } from 'lucide-react';
import { formatPKR } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuItem } from '../types/restaurant';
import { FoodImage } from './FoodImage';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { cart, addToCart, updateQuantity, setSelectedProduct } = useRestaurant();
  const cartEntry = cart.find((c) => c.id === item.id);
  const qty = cartEntry?.quantity ?? 0;

  return (
    <article className="group bg-white rounded-2xl border border-neutral-200/80 shadow-[0_4px_16px_-2px_rgba(17,24,39,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(17,24,39,0.10)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      {/* 4:3 Culinary Image Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <button
          type="button"
          onClick={() => setSelectedProduct(item)}
          className="block w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D9232D]"
          aria-label={`View details for ${item.name}`}
        >
          <FoodImage
            src={item.image}
            alt={item.imageAlt}
            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </button>

        {item.offerLabel && (
          <span className="absolute top-3 left-3 bg-[#FEA619] text-[#0B0F17] text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
            {item.offerLabel}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 mb-1.5">
            <span>{item.category}</span>
            <span aria-hidden="true">·</span>
            <span>{item.prepTime}</span>
            <span aria-hidden="true">·</span>
            <span>{item.spiceLevel}</span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-[#121C2A] leading-snug">
              <button
                type="button"
                onClick={() => setSelectedProduct(item)}
                className="text-left hover:text-[#D9232D] transition-colors focus-visible:outline-none focus-visible:underline"
              >
                {item.name}
              </button>
            </h3>
            <button
              type="button"
              onClick={() => setSelectedProduct(item)}
              aria-label={`Details for ${item.name}`}
              className="shrink-0 p-1.5 rounded-lg text-neutral-400 hover:text-[#121C2A] hover:bg-neutral-100 transition-colors"
              title="Product details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="tabular-nums text-lg font-extrabold text-[#121C2A]">
              {formatPKR(item.price)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="tabular-nums text-xs text-neutral-400 line-through">
                {formatPKR(item.originalPrice)}
              </span>
            )}
          </div>

          {qty === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(item, 1)}
              className="inline-flex items-center gap-1.5 bg-[#D9232D] hover:bg-[#B3001A] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-[0_6px_16px_-4px_rgba(217,35,45,0.35)] transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0F17]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="inline-flex items-center bg-[#0B0F17] text-white rounded-lg p-1 gap-1 shrink-0">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, qty - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/15 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="tabular-nums text-sm font-bold px-2 min-w-[24px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(item.id, qty + 1)}
                aria-label={`Increase quantity of ${item.name}`}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-[#D9232D] hover:bg-[#B3001A] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
