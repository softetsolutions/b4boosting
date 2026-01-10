import { getAuthInfo } from "../utils/auth";

export interface OfferFormData {
  brand: string; //productId
  dynamicFields: Record<string, string>;
  price: string;
  currency: string;
  quantityAvailable: string;
  deliveryTime: string;
  instantDelivery: boolean;
  images: string[];
}

// export type ApiOffer = {
//   _id: string;
//   price: number;
//   currency: string;
//   quantityAvailable: number;
//   images?: string[];
//   product: {
//     _id: string;
//     title: string;
//     service: string;
//   };
// };
export type ApiOffer = {
  _id: string;
  price: number;
  currency: string;
  product: {
    _id: string;
    title: string;
    type: string;
    images: string[];
  };
  seller: {
    _id: string;
    displayName?: string;
    username?: string;
  };
  offerDetails: { fieldName: string; value: string }[];
  quantityAvailable: number;
  deliveryTime: string;
  instantDelivery: boolean;
  images: string[];
};

export type ServiceWithCount = {
  _id: string;
  name: string;
  offerCount: number;
  icon?: string;
};


export const createOffer = async (formData: FormData): Promise<ApiOffer> => {
 
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/offers`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: `Offer creation failed: ${response.status}`,
    }));
    throw new Error(errorData.message || "Failed to create offer");
  }

  return response.json();
};

export const fetchOffers = async (
  page?: number,
  limit?: number,
  from?: string,
  to?: string,
  status?: string,
  search?: string
): Promise<{
  success: boolean;
  data: ApiOffer[];
  totalPages: number;
  totalItems: number;
}> => {
  
  const params = new URLSearchParams();

  if (page) params.append("page", String(page));
  if (limit) params.append("limit", String(limit));
  if (from) params.append("from", from);
  if (to) params.append("to", to);
  if (status) params.append("status", status);
  if (search) params.append("search", search);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Failed to fetch offers: ${response.status}` }));
    throw new Error(errorData.message || "Failed to fetch offers");
  }

  return await response.json();
};


export const fetchOfferById = async (offerId: string): Promise<ApiOffer> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers/${offerId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Failed to fetch offer: ${response.status}` }));
    throw new Error(errorData.message || "Failed to fetch offer");
  }

  const result = await response.json();
  if (result.success && result.data) {
    return result.data as ApiOffer;
  }
  throw new Error("Invalid response format for fetching an offer.");
};

export const updateOffer = async (
  offerId: string,
  offerData: FormData
): Promise<ApiOffer> => {
 
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers/${offerId}`,
    {
      method: "PUT",
      credentials: "include",
      body: offerData,
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Offer update failed: ${response.status}` }));
    throw new Error(errorData.message || "Failed to update offer");
  }

  return response.json();
};

export const deleteOffer = async (
  offerId: string
): Promise<{ message: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers/${offerId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Offer deletion failed: ${response.status}` }));
    throw new Error(errorData.message || "Failed to delete offer");
  }

  return response.json();
};

export const fetchOffersBySellerId = async (): Promise<ApiOffer[]> => {
  const {userId}  = getAuthInfo();
  if (!userId) {
    throw new Error("User ID not found in fetchOffersBySellerId");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers/seller/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  const result = await response.json();
  if (result && Array.isArray(result.data)) {
    return result.data;
  }
  throw new Error("Invalid response format from server");
};

// export const fetchOffersByProductAndService = async (
//   productId: string,
//   serviceId: string
// ): Promise<{ offers: ApiOffer[]; services: ServiceWithCount[] }> => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers/filter?productId=${productId}&serviceId=${serviceId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     const errorData = await response
//       .json()
//       .catch(() => ({ message: `Failed to fetch offers: ${response.status}` }));
//     throw new Error(errorData.message || "Failed to fetch offers");
//   }

//   const result = await response.json();

//   if (result.success && Array.isArray(result.offers)) {
//     return {
//       offers: result.offers,
//       services: result.services,

//     };
//   }

//   throw new Error("Invalid response format from server");
// };

// export const fetchOffersByProductAndService = async (
//   serviceName: string,
//   productTitle: string
// ): Promise<{ offers: ApiOffer[]; services: ServiceWithCount[] }> => {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers/filter?serviceName=${encodeURIComponent(serviceName)}&productTitle=${encodeURIComponent(productTitle)}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     const errorData = await response
//       .json()
//       .catch(() => ({ message: `Failed to fetch offers: ${response.status}` }));
//     throw new Error(errorData.message || "Failed to fetch offers");
//   }

//   const result = await response.json();

//   if (result.success && Array.isArray(result.offers)) {
//     return {
//       offers: result.offers,
//       services: result.services,
//     };
//   }

//   throw new Error("Invalid response format from server");
// };

// src/api/offers.ts
export const fetchOffersByProductAndService = async (
  serviceName: string,
  productTitle: string
): Promise<{ offers: ApiOffer[]; services: ServiceWithCount[] }> => {

  
  console.log(`[fetchOffersByProductAndService] serviceName: ${serviceName}, productTitle: ${productTitle}`);
  let url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/offers/filter?serviceName=${encodeURIComponent(serviceName)}`;

  if (productTitle) {
    url += `&productTitle=${encodeURIComponent(productTitle)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: `Failed to fetch offers: ${response.status}` }));
    throw new Error(errorData.message || "Failed to fetch offers");
  }

  const result = await response.json();

  if (result.success && Array.isArray(result.offers)) {
    return {
      offers: result.offers,
      services: result.services,
    };
  }

  throw new Error("Invalid response format from server");
};
export const fetchOffersByServiceId = async (
  serviceId: string,
  page: number = 1,
  limit: number = 10
) => {
  const { token } = getAuthInfo();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/offers/service/${serviceId}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to fetch offers by serviceId"
      );
    }

    return await response.json(); // { success, data: offers, pagination }
  } catch (error) {
    console.error("API error (fetchOffersByServiceId):", error);
    throw error;
  }
};
