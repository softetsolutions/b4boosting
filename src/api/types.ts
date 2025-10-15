export interface Service {
  _id: string;
  name: string;
  type: string;
  icon: string;
}

export interface ProductFormData {
  title: string;
  type: string;
  description: string;
  service: string;
  serviceName: string;
  productRequiredFields: ProductField[];
  images?: string[];
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
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductResponse {
  success: boolean;
  data?: Product;
  message?: string;
}
