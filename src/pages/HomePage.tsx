import React from 'react';
import { ArrowRight, MessageCircle, Plus, Star } from 'lucide-react';
import { MenuCard } from '../components/MenuCard';
import { FoodImage } from '../components/FoodImage';
import {
  buildWhatsAppUrl,
  formatPKR,
  RESTAURANT_CONFIG,
} from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { FOOD_IMAGES } from '../data/foodImages';
import { CUSTOMER_REVIEWS, FOOD_CATEGORIES, SPECIAL_DEALS } from '../data/menuData';

export function HomePage() {
  const { menuItems, navigate, addDealToCart, setCartOpen, totalItems } = useRestaurant();

  const bestSellers = menuItems.filter((item) => item.isBestSeller || item.isPopular).slice(0, 6);

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B0F17] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={FOOD_IMAGES.heroFeastSpread}
            alt="Zaiqa Flame feast with crispy Zinger Burger, saffron Chicken Biryani, Gol Gappay, and chilled soda"
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/85 to-[#0B0F17]/35"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-bold text-[#FEA619] tracking-wide mb-3">
              Gulberg III, Lahore · Open Daily Till Late
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance">
              Bold Flame Burgers, Saffron Biryani & Crisp Street Classics.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-neutral-200 leading-relaxed max-w-xl">
              Crafted fresh to order with 100% halal cuts, whole roasted spices, and chilled chutneys. Build your feast and send your order in seconds via WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  if (totalItems > 0) {
                    setCartOpen(true);
                  } else {
                    navigate('menu');
                  }
                }}
                className="inline-flex items-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-base px-7 py-3.5 rounded-xl shadow-[0_8px_24px_-2px_rgba(217,35,45,0.45)] transition-colors min-h-[48px]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => navigate('menu')}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#FEF08A] text-[#0B0F17] font-semibold text-base px-7 py-3.5 rounded-xl transition-colors min-h-[48px]"
              >
                <span>Explore Menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Service Guarantee Strip */}
        <div className="relative border-t border-white/10 bg-[#0B0F17]/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div>
              <span className="block text-[#FEA619] font-bold">30–45 Min Delivery</span>
              <span className="text-neutral-300">Hot & crisp to your doorstep</span>
            </div>
            <div>
              <span className="block text-[#FEA619] font-bold">Free Delivery</span>
              <span className="text-neutral-300 tabular-nums">
                On orders over {formatPKR(RESTAURANT_CONFIG.ordering.freeDeliveryThreshold)}
              </span>
            </div>
            <div>
              <span className="block text-[#FEA619] font-bold">WhatsApp Checkout</span>
              <span className="text-neutral-300 tabular-nums">
                Direct line: {RESTAURANT_CONFIG.contact.whatsappNumber}
              </span>
            </div>
            <div>
              <span className="block text-[#FEA619] font-bold">100% Fresh Halal</span>
              <span className="text-neutral-300">Daily-prepared spices & chutneys</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOOD CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121C2A]">
              Explore by Category
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-neutral-600">
              Jump straight to your cravings across our five signature kitchen stations.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('menu', 'All')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D9232D] hover:text-[#B3001A] whitespace-nowrap self-start sm:self-auto"
          >
            <span>See all {menuItems.length} items</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {FOOD_CATEGORIES.map((cat) => {
            const count = menuItems.filter((m) => m.category === cat.name).length;
            return (
              <button
                key={cat.name}
                type="button"
                onClick={() => navigate('menu', cat.name)}
                className="group text-left bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-[0_4px_16px_-2px_rgba(17,24,39,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(17,24,39,0.12)] hover:-translate-y-0.5 transition-all"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <FoodImage
                    src={cat.image}
                    alt={`${cat.name} dishes`}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-[#121C2A] group-hover:text-[#D9232D] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="tabular-nums text-xs font-semibold text-neutral-500">
                      {count} items
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-neutral-600 line-clamp-2">{cat.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. BEST SELLERS & POPULAR DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 border-t border-neutral-200/70">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121C2A]">
              Best Sellers & Crowd Favorites
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-neutral-600">
              Our highest-rated plates ordered every evening across Lahore.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('menu')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#121C2A] hover:text-[#D9232D] whitespace-nowrap self-start sm:self-auto"
          >
            <span>Browse Full Menu</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestSellers.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 4. SPECIAL DISCOUNTS & DEALS (DARK CHARCOAL CONTRAST BLOCK) */}
      <section className="bg-[#0B0F17] text-white py-16 sm:py-20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold text-[#FEA619] mb-2">
                Value Combos & Family Platters
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Special Deals & Discounts
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('deals')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FEA619] hover:text-[#FEF08A] whitespace-nowrap self-start sm:self-auto"
            >
              <span>View All Deals</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SPECIAL_DEALS.map((deal) => (
              <article
                key={deal.id}
                className="bg-[#111827] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <FoodImage src={deal.image} alt={deal.imageAlt} className="w-full h-full" />
                    <span className="absolute top-3 left-3 bg-[#D9232D] text-white text-xs font-extrabold px-3 py-1 rounded-md shadow">
                      {deal.badgeText}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-[#FEA619] mb-1">{deal.subtitle}</p>
                    <h3 className="font-display text-xl font-bold text-white">{deal.title}</h3>
                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                      {deal.description}
                    </p>
                    <ul className="mt-4 space-y-1 text-xs text-neutral-300">
                      {deal.itemsIncluded.map((line) => (
                        <li key={line}>· {line}</li>
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
                    className="inline-flex items-center gap-1.5 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap min-h-[42px]"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    <span>Add Deal</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT RESTAURANT PREVIEW & CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 space-y-16">
        {/* About Preview Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-md min-h-[280px]">
            <FoodImage
              src={FOOD_IMAGES.aboutKitchenChef}
              alt="Zaiqa Flame open kitchen chefs grilling burgers and plating biryani"
              className="w-full h-full"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col justify-center">
            <p className="text-xs font-bold text-[#D9232D] mb-2">Our Kitchen Philosophy</p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121C2A] text-balance">
              Crafted Daily from Whole Spices & Fresh Local Harvests
            </h2>
            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              At {RESTAURANT_CONFIG.name}, every burger patty is ground from fresh halal cuts, our basmati biryani steams over slow charcoal heat, and our gol gappay chutneys are blended fresh each morning without artificial preservatives.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 py-4 border-y border-neutral-200">
              <div>
                <span className="tabular-nums font-display text-2xl font-extrabold text-[#121C2A]">
                  100%
                </span>
                <span className="block text-xs text-neutral-500 mt-0.5">Fresh Halal Meat</span>
              </div>
              <div>
                <span className="tabular-nums font-display text-2xl font-extrabold text-[#121C2A]">
                  24+
                </span>
                <span className="block text-xs text-neutral-500 mt-0.5">Signature Dishes</span>
              </div>
              <div>
                <span className="tabular-nums font-display text-2xl font-extrabold text-[#121C2A]">
                  4.9/5
                </span>
                <span className="block text-xs text-neutral-500 mt-0.5">Guest Rating</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('about')}
                className="bg-[#0B0F17] hover:bg-neutral-800 text-white font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
              >
                Read Our Story
              </button>
              <a
                href={buildWhatsAppUrl('Hello Zaiqa Flame! I have a question about your menu.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-[#121C2A] border border-neutral-300 font-semibold text-sm px-5 py-3 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#D9232D]" aria-hidden="true" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="pt-8 border-t border-neutral-200">
          <div className="mb-8">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121C2A]">
              What Our Guests Say
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-neutral-600">
              Verified feedback from diners ordering dinner, street chaat, and office lunches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <article
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_4px_16px_-2px_rgba(17,24,39,0.05)] flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F59E0B] mb-3" aria-label={`${rev.rating} out of 5 stars`}>
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100">
                  <p className="text-sm font-bold text-[#121C2A]">{rev.name}</p>
                  <p className="text-xs text-neutral-500">
                    {rev.role} · {rev.location} · Ordered {rev.dishOrdered}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
