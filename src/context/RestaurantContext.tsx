import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { formatPKR, PAGE_SEO, RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { storageService } from '../services/storageService';
import {
  CartItem,
  CustomerInfo,
  FoodCategory,
  MenuItem,
  OrderRecord,
  PageRoute,
  SpecialDeal,
} from '../types/restaurant';

interface ToastState {
  id: number;
  message: string;
}

interface RestaurantContextValue {
  currentPage: PageRoute;
  navigate: (page: PageRoute, category?: 'All' | FoodCategory) => void;
  selectedCategory: 'All' | FoodCategory;
  setSelectedCategory: (cat: 'All' | FoodCategory) => void;

  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  resetMenuItems: () => void;

  cart: CartItem[];
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addToCart: (item: Pick<MenuItem, 'id' | 'name' | 'price' | 'originalPrice' | 'image' | 'category'>, quantity?: number) => void;
  addDealToCart: (deal: SpecialDeal) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  selectedProduct: MenuItem | null;
  setSelectedProduct: (item: MenuItem | null) => void;
  ownerModalOpen: boolean;
  setOwnerModalOpen: (open: boolean) => void;

  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  orders: OrderRecord[];
  placeWhatsAppOrder: (customer: CustomerInfo) => OrderRecord;
  formatWhatsAppOrderMessage: (customer: CustomerInfo, orderId?: string) => string;

  toast: ToastState | null;
  showToast: (message: string) => void;
}

const RestaurantContext = createContext<RestaurantContextValue | null>(null);

const VALID_PAGES: PageRoute[] = ['home', 'menu', 'deals', 'about', 'contact'];

function parseInitialPage(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').toLowerCase() as PageRoute;
  return VALID_PAGES.includes(hash) ? hash : 'home';
}

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageRoute>(parseInitialPage);
  const [selectedCategory, setSelectedCategory] = useState<'All' | FoodCategory>('All');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => storageService.getMenu());
  const [cart, setCart] = useState<CartItem[]>(() => storageService.getCart());
  const [customerInfo, setCustomerInfoState] = useState<CustomerInfo>(() => storageService.getCustomerInfo());
  const [orders, setOrders] = useState<OrderRecord[]>(() => storageService.getOrders());

  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [ownerModalOpen, setOwnerModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    window.setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  }, []);

  // Sync URL hash & SEO metadata
  useEffect(() => {
    const seo = PAGE_SEO[currentPage];
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }
    if (window.location.hash !== `#${currentPage}`) {
      window.history.replaceState(null, '', `#${currentPage}`);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(parseInitialPage());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist cart to Local Storage
  useEffect(() => {
    storageService.saveCart(cart);
  }, [cart]);

  // Persist menu to Local Storage
  useEffect(() => {
    storageService.saveMenu(menuItems);
  }, [menuItems]);

  const setCustomerInfo = useCallback((info: CustomerInfo) => {
    setCustomerInfoState(info);
    storageService.saveCustomerInfo(info);
  }, []);

  const navigate = useCallback((page: PageRoute, category?: 'All' | FoodCategory) => {
    setCurrentPage(page);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addMenuItem = useCallback(
    (itemData: Omit<MenuItem, 'id'>) => {
      const newItem: MenuItem = {
        ...itemData,
        id: `custom-${Date.now()}`,
      };
      setMenuItems((prev) => [newItem, ...prev]);
      showToast(`${newItem.name} added to menu`);
    },
    [showToast]
  );

  const updateMenuItem = useCallback(
    (updated: MenuItem) => {
      setMenuItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      showToast(`${updated.name} updated`);
    },
    [showToast]
  );

  const deleteMenuItem = useCallback(
    (id: string) => {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      setCart((prev) => prev.filter((item) => item.id !== id));
      showToast('Menu item removed');
    },
    [showToast]
  );

  const resetMenuItems = useCallback(() => {
    const defaults = storageService.resetMenu();
    setMenuItems(defaults);
    showToast('Menu restored to defaults');
  }, [showToast]);

  const addToCart = useCallback(
    (
      item: Pick<MenuItem, 'id' | 'name' | 'price' | 'originalPrice' | 'image' | 'category'>,
      quantity: number = 1
    ) => {
      setCart((prev) => {
        const existing = prev.find((c) => c.id === item.id);
        if (existing) {
          return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + quantity } : c));
        }
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            category: item.category,
            quantity,
          },
        ];
      });
      showToast(`Added ${quantity} × ${item.name} to cart`);
    },
    [showToast]
  );

  const addDealToCart = useCallback(
    (deal: SpecialDeal) => {
      setCart((prev) => {
        const existing = prev.find((c) => c.id === deal.id);
        if (existing) {
          return prev.map((c) => (c.id === deal.id ? { ...c, quantity: c.quantity + 1 } : c));
        }
        return [
          ...prev,
          {
            id: deal.id,
            name: `${deal.title} (Deal)`,
            price: deal.price,
            originalPrice: deal.originalPrice,
            image: deal.image,
            category: 'Special Deal',
            quantity: 1,
          },
        ];
      });
      showToast(`Added ${deal.title} to cart`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((c) => c.id !== id));
      return;
    }
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, quantity } : c)));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    storageService.clearCart();
    showToast('Shopping cart cleared');
  }, [showToast]);

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= RESTAURANT_CONFIG.ordering.freeDeliveryThreshold
      ? 0
      : RESTAURANT_CONFIG.ordering.deliveryFee;
  }, [cart.length, subtotal]);

  const total = subtotal + deliveryFee;

  const formatWhatsAppOrderMessage = useCallback(
    (customer: CustomerInfo, orderId?: string) => {
      const lines: string[] = [
        `*NEW ORDER — ${RESTAURANT_CONFIG.name.toUpperCase()}*`,
        orderId ? `Order Ref: #${orderId}` : '',
        '',
        '*Customer Details:*',
        `Name: ${customer.name.trim()}`,
        `Phone: ${customer.phone.trim()}`,
        `Address: ${customer.address.trim()}`,
        customer.instructions.trim() ? `Notes: ${customer.instructions.trim()}` : '',
        '',
        '*Order Items:*',
        ...cart.map(
          (item, idx) =>
            `${idx + 1}. ${item.name} — ${item.quantity} × ${formatPKR(item.price)} = ${formatPKR(
              item.price * item.quantity
            )}`
        ),
        '',
        `Subtotal: ${formatPKR(subtotal)}`,
        `Delivery Charges: ${deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}`,
        `*Final Total: ${formatPKR(total)}*`,
      ];

      return lines.filter((line, idx, arr) => !(line === '' && arr[idx - 1] === '')).join('\n');
    },
    [cart, deliveryFee, subtotal, total]
  );

  const placeWhatsAppOrder = useCallback(
    (customer: CustomerInfo): OrderRecord => {
      const orderId = `ZF-${Math.floor(100000 + Math.random() * 900000)}`;
      const whatsappMessage = formatWhatsAppOrderMessage(customer, orderId);
      const record: OrderRecord = {
        id: orderId,
        createdAt: new Date().toISOString(),
        items: [...cart],
        subtotal,
        deliveryFee,
        total,
        customer,
        whatsappMessage,
      };
      setCustomerInfo(customer);
      const updatedOrders = storageService.saveOrder(record);
      setOrders(updatedOrders);
      return record;
    },
    [cart, deliveryFee, formatWhatsAppOrderMessage, setCustomerInfo, subtotal, total]
  );

  const value: RestaurantContextValue = {
    currentPage,
    navigate,
    selectedCategory,
    setSelectedCategory,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    resetMenuItems,
    cart,
    totalItems,
    subtotal,
    deliveryFee,
    total,
    addToCart,
    addDealToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartOpen,
    setCartOpen,
    selectedProduct,
    setSelectedProduct,
    ownerModalOpen,
    setOwnerModalOpen,
    customerInfo,
    setCustomerInfo,
    orders,
    placeWhatsAppOrder,
    formatWhatsAppOrderMessage,
    toast,
    showToast,
  };

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
}

export function useRestaurant() {
  const ctx = useContext(RestaurantContext);
  if (!ctx) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return ctx;
}
