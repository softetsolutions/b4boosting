export interface ProductInfo {
  id: string;
  productTitle: string;
  DeliverySpeed: string;
  DeliveryMethod: string;
  ProductType: string;
  Denomination: string;
  Description: string;
  level: number;
  pricePerItem: number;
  productImg: string;
}

export interface OtherSeller {
  name: string;
  level: number;
  profilePic: string;
  rating: string;
  sold: number;
  min: number;
  available: number;
  delivery: string;
  volumeDiscount: boolean;
  price: string; 
  isOnline: boolean;
}

export const productInfo: ProductInfo = {
  id: "xbox-game-pass-ultimate-1-month-us",
  productTitle: "Xbox Game Pass Ultimate (US) > Xbox Game Pass Ultimate Membership 1 Month (US)",
  DeliverySpeed: "Instant",
  DeliveryMethod: "Auto Delivery",
  ProductType: "Xbox Game Pass Ultimate (US)",
  Denomination: "Xbox Game Pass Ultimate Membership 1 Month (US)",
  Description: "Works with both the OLD and NEW Xbox accounts as long as there is no active subscription, the previous subscription has to be cancelled. In order to activate the code, a payment method must be added to the Xbox account.",
  level: 61,
  pricePerItem: 10.59,
  productImg:"https://assets.g2g.com/img/offer/d_2a3bf543.webp"
};

export const otherSellers: OtherSeller[] = [
  {
    name: "Etechsquads",
    level: 91,
    profilePic: "https://placehold.co/40x40/4a90e2/ffffff?text=ES",
    rating: "100.00%",
    sold: 758,
    min: 1,
    available: 61,
    delivery: "Instant",
    volumeDiscount: true,
    price: "10.59",
    isOnline: true,
  },
  {
    name: "HaythamQS",
    level: 120,
    profilePic: "https://placehold.co/40x40/6366f1/ffffff?text=HQ",
    rating: "98.86%",
    sold: 1521,
    min: 1,
    available: 42,
    delivery: "Instant",
    volumeDiscount: true,
    price: "10.93",
    isOnline: true,
  },
  {
    name: "Shazam47",
    level: 137,
    profilePic: "https://placehold.co/40x40/c084fc/ffffff?text=SH",
    rating: "100.00%",
    sold: 1,
    min: 1,
    available: 18,
    delivery: "Instant",
    volumeDiscount: false,
    price: "16.42",
    isOnline: false,
  },
  {
    name: "ExpressKodes",
    level: 123,
    profilePic: "https://placehold.co/40x40/22d3ee/ffffff?text=EK",
    rating: "100.00%",
    sold: 1,
    min: 1,
    available: 3,
    delivery: "Instant",
    volumeDiscount: false,
    price: "21.72",
    isOnline: true,
  },
  {
    name: "D7MYHIMSELF",
    level: 90,
    profilePic: "https://placehold.co/40x40/fb7185/ffffff?text=D7",
    rating: "0.00%",
    sold: 0,
    min: 1,
    available: 1,
    delivery: "Instant",
    volumeDiscount: false,
    price: "10.75",
    isOnline: false,
  },
];