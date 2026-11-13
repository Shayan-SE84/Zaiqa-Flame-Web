import React from 'react';
import { Plus, Tag } from 'lucide-react';
import { FoodImage } from '../components/FoodImage';
import { MenuCard } from '../components/MenuCard';
import { formatPKR } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { SPECIAL_DEALS } from '../data/menuData';

export function DealsPage() {
  const { menuItems, addDealToCart } = useRestaurant();
  const discountedItems = menuItems.filter(
    (item) => (item.originalPrice && item.originalPrice > item.price) || item.offerLabel
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-14">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D9232D] mb-2">
          <Tag className="w-4 h-4" aria-hidden="true" />
          <span>Limited-Time Combos & Specials</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#121C2A]">
          Special Deals & Value Platters
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
          Save more on bundled burgers, family biryani feasts, and Lahori street chaat platters—ready for instant WhatsApp ordering.
        </p>
      </div>

      {/* Combo Deals Grid */}
      <section aria-label="Bundle Combos">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SPECIAL_DEALS.map((deal) => (
            <article
              key={deal.id}
              className="bg-[#0B0F17] text-white rounded-2xl overflow-hidden border border-neutral-800 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <FoodImage src={deal.image} alt={deal.imageAlt} className="w-full h-full" />
                  <span className="absolute top-3 left-3 bg-[#FEA619] text-[#0B0F17] text-xs font-extrabold px-3 py-1 rounded-md shadow">
                    {deal.badgeText}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold text-[#FEA619] mb-1">{deal.subtitle}</p>
                  <h2 className="font-display text-xl font-bold text-white">{deal.title}</h2>
                  <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{deal.description}</p>
                  <ul className="mt-4 space-y-1.5 text-xs text-neutral-200 border-t border-white/10 pt-3">
                    {deal.itemsIncluded.map((inc) => (
                      <li key={inc}>· {inc}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <span className="tabular-nums text-xl font-extrabold text-[#FEA619] block">
                    {formatPKR(deal.price)}
                  </span>
                  <span className="tabular-nums text-xs text-neutral-400 line-through">
                    {formatPKR(deal.originalPrice)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addDealToCart(deal)}
                  className="inline-flex items-center gap-1.5 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors min-h-[44px]"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Add Deal to Cart</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Discounted Individual Items */}
      {discountedItems.length > 0 && (
        <section className="pt-10 border-t border-neutral-200">
          <h2 className="font-display text-2xl font-extrabold text-[#121C2A] mb-6">
            Featured Offers on Individual Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discountedItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
