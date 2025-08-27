import type { LucideIcon } from "lucide-react";
import {
  Home,
  Plus,
  Settings,
  ShoppingCart,
  User,
  HelpCircle,
  FileText,
  List,
  Package,
} from "lucide-react";

export const routeMapping: { [key: string]: string } = {
  // Admin routes
  dashboard: "Dashboard",
  createProduct: "Create Product",
  manageProducts: "Manage Products",
  createServices: "Create Services",
  manageServices: "Manage Services",
  sellerRequest: "Seller Request",

  // User routes
  home: "Home",
  productDetails: "Product Details",
  orders: "Orders",
  profile: "Profile",
  support: "Support",

  // Seller routes
  createOffer: "Create Offer",
  manageOffers: "Manage Offers",
};

export const iconMapping = (route: string): LucideIcon | null => {
  const iconMap: { [key: string]: LucideIcon } = {
    // Admin routes
    dashboard: Home,
    createProduct: Plus,
    manageProducts: Package,
    createServices: Settings,
    manageServices: List,
    sellerRequest: User,

    // User routes
    home: Home,
    productDetails: ShoppingCart,
    orders: ShoppingCart,
    profile: User,
    support: HelpCircle,

    // Seller routes
    createOffer: Plus,
    manageOffers: FileText,
  };

  return iconMap[route] || null;
};
