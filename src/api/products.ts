import { getAuthInfo, handleUnauthorized } from "../utils/auth";

// export interface ProductFormData {
//   title: string;
//   type: string;
//   description: string;
//   service: string;
//   serviceName: string;
//   productRequiredFields: Array<{
//     fieldName: string;
//     fieldType: string;
//     options: string[];
//     isrequired: boolean;
//   }>;
//   additionalFields?: any[];
//   images?: (File | string)[];
// }

export interface Product {
  _id: string;
  title: string;
  type: string;
  description: string;
  service: {
    _id: string;
    name: string;
  };
  productRequiredFields: Array<{
    fieldName: string;
    fieldType: string;
    options: string[];
    isrequired: boolean;
  }>;
  images:(File | string)[];
  createdAt: string;
  updatedAt: string;
}

export interface HomePageProduct {
  _id: string;
  title: string;
  images: (File | string)[];
  offerCount: number;
}

export interface HomePageService {
  _id: string;
  name: string;
  icon: string;
  products: HomePageProduct[];
}
export interface HomePageData {
  services: HomePageService[];
  settings: {
     _id: string;
    bannerImg: (string | File);
    bannerTitle: string;
    bannerSubtitle: string;
    bannerRedirectionLink: string;
    marqueeText: string;
    marqueeLink: string;
  };
}


export interface ServiceAndProductResponse {
  success: boolean;
  data: {
    serviceId: string;
    productId: string;
  };
}

export const createProduct = async (
  productData: FormData
): Promise<Product> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: productData,
    }
  );

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  const data = await response.json();
  return data;
};

export const fetchProductsByService = async (
  serviceId: string
): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/service/${serviceId}`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to fetch products for the service");
  }

  const res = await response.json();
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};

export const fetchProductsByServiceName = async (
  serviceName: string
): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/service/by-name/${serviceName}`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );
  console.log(response,"response");

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to fetch products for the service");
  }

  const res = await response.json();
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
};


export const fetchProductById = async (productId: string): Promise<Product> => {
  try {
    getAuthInfo();
  } catch {
    await handleUnauthorized();
    throw new Error("No authentication token found");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to load product details");
  }
  return response.json();
};

export const fetchHomePageData = async (): Promise<HomePageData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/home`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to fetch homepage data");
  }

  const res = await response.json();
  
  if (res.success && res.data) {
    return res.data;
  }
  throw new Error("Invalid homepage data format");
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return Array.isArray(data.data) ? data.data : [];
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    getAuthInfo();
  } catch {
    await handleUnauthorized();
    throw new Error("No authentication token found");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
};

export const updateProduct = async (
  productId: string,
  data: FormData
): Promise<void> => {
  try {
    getAuthInfo();
  } catch {
    await handleUnauthorized();
    throw new Error("No authentication token found");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${productId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      body: data,
    }
  );
  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Failed to update product" }));
    throw new Error(errorData.message || "Failed to update product");
  }
};

export const fetchServiceAndProductBySlug = async (
  serviceName: string
): Promise<ServiceAndProductResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/slug/${serviceName}`,
    {
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    }
  );

  if (response.status === 401) await handleUnauthorized();

  if (!response.ok) {
    throw new Error("Failed to fetch service and product data");
  }

  const data = await response.json();
  return data;
};
