export type FoodCategory = 'Fast Food' | 'Biryani' | 'Drinks' | 'Gol Gappay' | 'Chaat';

export type PageRoute = 'home' | 'menu' | 'deals' | 'about' | 'contact';

export type SpiceLevel = 'Mild' | 'Medium' | 'Spicy' | 'Chilled' | 'Tangy';

export interface MenuItem {
  id: string;
  name: string;
  category: FoodCategory;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageAlt: string;
  isPopular?: boolean;
  isBestSeller?: boolean;
  offerLabel?: string;
  prepTime: string;
  spiceLevel: SpiceLevel;
  servingSize?: string;
}

export interface SpecialDeal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  itemsIncluded: string[];
  price: number;
  originalPrice: number;
  badgeText: string;
  image: string;
  imageAlt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  instructions: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  whatsappMessage: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  dishOrdered: string;
  comment: string;
  date: string;
}
