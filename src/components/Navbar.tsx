import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { PageRoute } from '../types/restaurant';

const NAV_ITEMS: { label: string; page: PageRoute }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Menu', page: 'menu' },
  { label: 'Deals', page: 'deals' },
  { label: 'About', page: 'about' },
  { label: 'Contact', page: 'contact' },
];

export function Navbar() {
  const { currentPage, navigate, totalItems, setCartOpen } = useRestaurant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: PageRoute) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17] text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavigate('home')}
          className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEA619] rounded"
        >
          {RESTAURANT_CONFIG.name}
        </button>

        {/* Zone 2: 5 Clean Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Primary Navigation">
          {NAV_ITEMS.map((item) => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavigate(item.page)}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEA619] rounded ${
                  active ? 'text-[#FEA619]' : 'text-neutral-200 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#D9232D] transition-transform duration-200 origin-left ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open shopping cart, ${totalItems} items`}
            className="inline-flex items-center gap-2.5 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-[0_6px_20px_-4px_rgba(217,35,45,0.45)] transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEA619]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Cart</span>
            <span className="tabular-nums bg-[#FEA619] text-[#0B0F17] text-xs font-extrabold px-1.5 py-0.5 rounded min-w-[20px] text-center">
              {totalItems}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEA619]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden bg-[#111827] border-t border-white/10 px-4 py-3 space-y-1"
          aria-label="Mobile Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = currentPage === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNavigate(item.page)}
                aria-current={active ? 'page' : undefined}
                className={`w-full text-left px-3 py-3 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${
                  active
                    ? 'bg-[#D9232D] text-white'
                    : 'text-neutral-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {active && <span className="text-xs text-[#FEF08A]">Current</span>}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
