import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Clock, Send } from 'lucide-react';
import { buildWhatsAppUrl, RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { storageService } from '../services/storageService';
import { FoodCategory, PageRoute } from '../types/restaurant';

export function Footer() {
  const { navigate } = useRestaurant();
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    const result = storageService.subscribeNewsletter(trimmed);
    setEmail('');
    setNewsletterStatus({
      type: 'success',
      text: result.alreadySubscribed
        ? 'You are already subscribed to Zaiqa Flame updates.'
        : 'Subscribed! Watch your inbox for weekly deals.',
    });
  };

  const quickLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Full Menu', page: 'menu' },
    { label: 'Special Deals', page: 'deals' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const categoryLinks: FoodCategory[] = ['Fast Food', 'Biryani', 'Gol Gappay', 'Chaat', 'Drinks'];

  return (
    <footer className="bg-[#0B0F17] text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-white">
              {RESTAURANT_CONFIG.name}
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {RESTAURANT_CONFIG.description}
            </p>
            <div className="space-y-2.5 pt-1 text-sm">
              <a
                href={buildWhatsAppUrl('Hello Zaiqa Flame, I would like to inquire about an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white hover:text-[#FEA619] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#FEA619] shrink-0" aria-hidden="true" />
                <span className="tabular-nums font-semibold">
                  WhatsApp: {RESTAURANT_CONFIG.contact.whatsappNumber}
                </span>
              </a>
              <a
                href={`tel:${RESTAURANT_CONFIG.contact.whatsappNumber}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D9232D] shrink-0" aria-hidden="true" />
                <span className="tabular-nums">{RESTAURANT_CONFIG.contact.whatsappNumber}</span>
              </a>
              <a
                href={`mailto:${RESTAURANT_CONFIG.contact.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#D9232D] shrink-0" aria-hidden="true" />
                <span>{RESTAURANT_CONFIG.contact.email}</span>
              </a>
              <div className="flex items-start gap-2.5 text-neutral-400">
                <MapPin className="w-4 h-4 text-[#D9232D] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{RESTAURANT_CONFIG.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-white mb-4">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    onClick={() => navigate(link.page)}
                    className="hover:text-[#FEA619] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-2.5 text-sm">
              {categoryLinks.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => navigate('menu', cat)}
                    className="hover:text-[#FEA619] transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours & Newsletter */}
          <div className="lg:col-span-4 space-y-5">
            <div>
              <h3 className="font-display text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FEA619]" aria-hidden="true" />
                <span>Opening Hours</span>
              </h3>
              <ul className="space-y-1.5 text-sm text-neutral-400">
                {RESTAURANT_CONFIG.hours.map((slot) => (
                  <li key={slot.days} className="flex justify-between gap-4">
                    <span>{slot.days}</span>
                    <span className="tabular-nums text-neutral-200 font-medium">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-white/10">
              <h3 className="font-display text-sm font-bold text-white mb-2">
                Weekly Deals Newsletter
              </h3>
              <p className="text-xs text-neutral-400 mb-3">
                Get weekend biryani offers and new burger launches straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterStatus) setNewsletterStatus(null);
                  }}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-3.5 py-2.5 text-sm bg-white/10 border border-white/15 rounded-lg text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FEA619]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="inline-flex items-center justify-center gap-1.5 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors shrink-0"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Join</span>
                </button>
              </form>
              {newsletterStatus && (
                <p
                  className={`mt-2 text-xs font-medium ${
                    newsletterStatus.type === 'error' ? 'text-red-400' : 'text-[#FEA619]'
                  }`}
                >
                  {newsletterStatus.text}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>
            © {new Date().getFullYear()} {RESTAURANT_CONFIG.name}. All rights reserved.
          </p>
          <p>
            Direct WhatsApp Ordering: <span className="text-white font-semibold tabular-nums">{RESTAURANT_CONFIG.contact.whatsappNumber}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
