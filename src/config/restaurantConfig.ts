import { PageRoute } from '../types/restaurant';

export const RESTAURANT_CONFIG = {
  name: 'Zaiqa Flame',
  shortMark: 'ZF',
  tagline: 'Fire-Grilled Burgers, Saffron Biryani & Crisp Street Classics',
  description:
    'Freshly prepared Pakistani favorites and contemporary fast food crafted daily with whole spices, premium halal cuts, and crisp farm produce.',
  contact: {
    whatsappNumber: '03282305784',
    phoneDisplay: '0328-2305784',
    email: 'shayankhan.1946a@gmail.com',
    whatsappEnabled: true,
    address: 'Plot 14-C, Street 6, Gulberg III, Lahore, Pakistan',
    city: 'Lahore',
  },
  hours: [
    { days: 'Monday – Thursday', time: '12:00 PM – 12:00 AM' },
    { days: 'Friday – Sunday', time: '12:00 PM – 1:30 AM' },
  ],
  ordering: {
    currency: 'PKR',
    deliveryFee: 150,
    freeDeliveryThreshold: 2000,
    estimatedDeliveryTime: '30–45 mins',
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://x.com',
  },
} as const;

/**
 * Converts a local Pakistani mobile number like 03282305784 to 923282305784
 * so updating RESTAURANT_CONFIG.contact.whatsappNumber automatically updates all WhatsApp links.
 */
export function getWhatsAppInternationalNumber(
  rawNumber: string = RESTAURANT_CONFIG.contact.whatsappNumber
): string {
  const digits = rawNumber.replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return `92${digits.slice(1)}`;
  }
  if (digits.startsWith('92')) {
    return digits;
  }
  return `92${digits}`;
}

export function buildWhatsAppUrl(message?: string): string {
  const intlNumber = getWhatsAppInternationalNumber();
  const base = `https://wa.me/${intlNumber}`;
  if (!message || !message.trim()) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function formatPKR(amount: number): string {
  return `PKR ${Math.round(amount).toLocaleString('en-PK')}`;
}

export const PAGE_SEO: Record<PageRoute, { title: string; description: string }> = {
  home: {
    title: 'Zaiqa Flame — Fast Food, Biryani, Gol Gappay & Chaat Ordering',
    description:
      'Order crispy Zinger Burgers, aromatic Biryani, crunchy Gol Gappay, Chaat, and chilled drinks online with instant WhatsApp delivery checkout.',
  },
  menu: {
    title: 'Full Menu | Zaiqa Flame — Burgers, Biryani, Gol Gappay, Chaat & Drinks',
    description:
      'Browse our full menu in PKR across Fast Food, Biryani, Drinks, Gol Gappay, and Chaat. Filter, sort, customize, and order via WhatsApp.',
  },
  deals: {
    title: 'Special Deals & Value Combos | Zaiqa Flame',
    description:
      'Save on family biryani platters, burger combos, and evening chaat bundles crafted fresh to order.',
  },
  about: {
    title: 'About Us | Zaiqa Flame — Fresh Ingredients & Kitchen Craft',
    description:
      'Discover our story, 100% halal fresh sourcing, spice craftsmanship, and hygiene-first open kitchen standards.',
  },
  contact: {
    title: 'Contact Us | Zaiqa Flame — Order & Support (03282305784)',
    description:
      'Reach Zaiqa Flame via WhatsApp at 03282305784 or email shayankhan.1946a@gmail.com for orders, catering, and feedback.',
  },
};
