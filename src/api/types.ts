export interface Service {
  _id: string;
  name: string;
  icon: string;
  products: Product[];
}
export interface HomePageProduct {
  _id: string;
  title: string;
  images:(File | string)[];
  offerCount: number;
}

export interface HomePageService {
  _id: string;
  name: string;
  icon: string;
  products: HomePageProduct[];
}

export interface Settings {
  _id: string;
  bannerImg: (string | File);
  bannerTitle: string;
  bannerSubtitle: string;
  bannerRedirectionLink: string;
  marqueeText: string;
  marqueeLink: string;
}

export interface HomePageData {
  services: HomePageService[];
  settings: Settings;
}

export interface ProductFormData {
  title: string;
  type: string;
  description: string;
  service: string;
  serviceName: string;
  productRequiredFields: ProductField[];
  images: (File | string)[];
}

export interface ProductField {
  fieldName: string;
  fieldType: "custom" | "range" | "text";
  options: string[];
  required: boolean;
}

export interface Product {
  _id: string;
  title: string;
  type: string;
  description: string;
  service: string;
  sellerId: string;
  productRequiredFields: ProductField[];
  images?: (File | string)[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductResponse {
  success?: boolean;
  data?: Product;
  message?: string;
}


export interface AccountDetails {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  email: string;
  role: string;
  walletBalance: number;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export interface Review {
  _id: string;
  orderId: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  rating: number;
  reviewText: string;
  images: string[];
  isEdited: boolean;
  createdAt?: string;
  updatedAt?: string;
}
