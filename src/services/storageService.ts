import { DEFAULT_MENU_ITEMS } from '../data/menuData';
import { CartItem, ContactInquiry, CustomerInfo, MenuItem, OrderRecord } from '../types/restaurant';

const STORAGE_KEYS = {
  CART: 'zaiqa_flame_cart_v1',
  MENU: 'zaiqa_flame_menu_v1',
  CUSTOMER: 'zaiqa_flame_customer_v1',
  ORDERS: 'zaiqa_flame_orders_v1',
  INQUIRIES: 'zaiqa_flame_inquiries_v1',
  NEWSLETTER: 'zaiqa_flame_newsletter_v1',
} as const;

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or unavailable; ignore gracefully
  }
}

/**
 * Modular storage service designed for localStorage persistence today
 * and clean drop-in replacement with Supabase or Firebase later.
 */
export const storageService = {
  getCart(): CartItem[] {
    return safeRead<CartItem[]>(STORAGE_KEYS.CART, []);
  },
  saveCart(items: CartItem[]): void {
    safeWrite(STORAGE_KEYS.CART, items);
  },
  clearCart(): void {
    safeWrite(STORAGE_KEYS.CART, []);
  },

  getMenu(): MenuItem[] {
    const stored = safeRead<MenuItem[] | null>(STORAGE_KEYS.MENU, null);
    if (!stored || !Array.isArray(stored) || stored.length === 0) {
      return DEFAULT_MENU_ITEMS;
    }
    return stored;
  },
  saveMenu(items: MenuItem[]): void {
    safeWrite(STORAGE_KEYS.MENU, items);
  },
  resetMenu(): MenuItem[] {
    safeWrite(STORAGE_KEYS.MENU, DEFAULT_MENU_ITEMS);
    return DEFAULT_MENU_ITEMS;
  },

  getCustomerInfo(): CustomerInfo {
    return safeRead<CustomerInfo>(STORAGE_KEYS.CUSTOMER, {
      name: '',
      phone: '',
      address: '',
      instructions: '',
    });
  },
  saveCustomerInfo(info: CustomerInfo): void {
    safeWrite(STORAGE_KEYS.CUSTOMER, info);
  },

  getOrders(): OrderRecord[] {
    return safeRead<OrderRecord[]>(STORAGE_KEYS.ORDERS, []);
  },
  saveOrder(order: OrderRecord): OrderRecord[] {
    const existing = safeRead<OrderRecord[]>(STORAGE_KEYS.ORDERS, []);
    const updated = [order, ...existing].slice(0, 20);
    safeWrite(STORAGE_KEYS.ORDERS, updated);
    return updated;
  },

  saveInquiry(inquiry: ContactInquiry): void {
    const existing = safeRead<ContactInquiry[]>(STORAGE_KEYS.INQUIRIES, []);
    safeWrite(STORAGE_KEYS.INQUIRIES, [inquiry, ...existing].slice(0, 30));
  },

  subscribeNewsletter(email: string): { alreadySubscribed: boolean } {
    const existing = safeRead<string[]>(STORAGE_KEYS.NEWSLETTER, []);
    const normalized = email.trim().toLowerCase();
    if (existing.includes(normalized)) {
      return { alreadySubscribed: true };
    }
    safeWrite(STORAGE_KEYS.NEWSLETTER, [normalized, ...existing]);
    return { alreadySubscribed: false };
  },
};
