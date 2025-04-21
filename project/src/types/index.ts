export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  inStock: boolean;
  rating: number;
  numReviews: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  paymentMethod: string;
  isPaid: boolean;
  paidAt?: string;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}