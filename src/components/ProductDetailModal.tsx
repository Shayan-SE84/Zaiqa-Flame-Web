import React, { useEffect, useState } from 'react';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { formatPKR } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { FoodImage } from './FoodImage';

export function ProductDetailModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useRestaurant();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [selectedProduct?.id]);

  useEffect(() => {
    if (!selectedProduct) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProduct, setSelectedProduct]);

  if (!selectedProduct) return null;

  const handleAdd = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F17]/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-[0_24px_48px_-12px_rgba(11,15,23,0.35)] border border-neutral-200 grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Image */}
        <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-neutral-100">
          <FoodImage
            src={selectedProduct.image}
            alt={selectedProduct.imageAlt}
            className="w-full h-full"
            loading="eager"
          />
          {selectedProduct.offerLabel && (
            <span className="absolute top-3 left-3 bg-[#FEA619] text-[#0B0F17] text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm">
              {selectedProduct.offerLabel}
            </span>
          )}
        </div>

        {/* Right Details */}
        <div className="p-6 flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
                <span>{selectedProduct.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedProduct.prepTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close product details"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-[#121C2A] hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2
              id="product-modal-title"
              className="mt-2 font-display text-2xl font-bold text-[#121C2A]"
            >
              {selectedProduct.name}
            </h2>

            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="tabular-nums text-2xl font-extrabold text-[#D9232D]">
                {formatPKR(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice &&
                selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="tabular-nums text-sm text-neutral-400 line-through">
                    {formatPKR(selectedProduct.originalPrice)}
                  </span>
                )}
            </div>

            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="mt-4 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="block text-neutral-400 font-medium">Flavor Profile</span>
                <span className="font-semibold text-[#121C2A]">{selectedProduct.spiceLevel}</span>
              </div>
              <div>
                <span className="block text-neutral-400 font-medium">Serving Size</span>
                <span className="font-semibold text-[#121C2A]">
                  {selectedProduct.servingSize || 'Standard Portion'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
            <div className="inline-flex items-center border border-neutral-200 rounded-lg p-1 bg-neutral-50">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-9 h-9 flex items-center justify-center rounded-md text-[#121C2A] hover:bg-neutral-200/70 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="tabular-nums w-9 text-center font-bold text-sm text-[#121C2A]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-9 h-9 flex items-center justify-center rounded-md text-[#121C2A] hover:bg-neutral-200/70 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-[0_8px_20px_-4px_rgba(217,35,45,0.4)] transition-colors min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" aria-hidden="true" />
              <span className="tabular-nums">
                Add · {formatPKR(selectedProduct.price * quantity)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
