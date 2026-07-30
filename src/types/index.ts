export type ProductStatus = 'Available' | 'Out of Stock' | 'Sold Out' | 'Hidden' | 'Archived';

export type RequestStatus = 'Pending' | 'Contacted' | 'Completed' | 'Cancelled';

export type Language = 'en' | 'fr' | 'rw';

export type ProductCondition = 'New' | 'Used' | 'Refurbished' | 'Original' | 'Compatible / Aftermarket';

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string; // 'Epson' | 'Brother' | 'HP' | string
  compatibleModels: string[]; // e.g. ['Epson L382', 'Epson L383', 'Epson L802']
  categoryId: string;
  subcategoryId?: string;
  description: string;
  price: number; // Advertised price in FRW
  currency?: string; // Default 'FRW'
  minOrderQty?: number;
  unit?: string; // e.g. "Pcs", "Sets", "Kit"
  status: ProductStatus;
  condition?: ProductCondition | string;
  specifications?: Record<string, string>;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  availableSizes?: string[];
  availableColors?: string[];
  images: string[];
  isFeatured: boolean;
  isNewArrival?: boolean;
  viewsCount?: number;
  likesCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomerRequest {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  quantity: number;
  compatibleModel?: string;
  selectedSize?: string;
  selectedColor?: string;
  message: string;
  requestDate: string;
  status: RequestStatus;
  notes?: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'superadmin' | 'admin';
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  categoryId: string;
  subcategoryId?: string;
  brand: string;
  compatibleModel?: string;
  condition?: string;
  minPrice: number | null;
  maxPrice: number | null;
  status: ProductStatus | 'All';
  selectedSize?: string;
  selectedColor?: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'popular';
}

export interface SellerContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  businessHours: string;
  location: string;
  paymentInstructions?: string;
}
