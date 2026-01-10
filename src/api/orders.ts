import { getAuthInfo } from "../utils/auth";

export interface ApiUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "seller" | "admin";

  displayName: string;
  walletBalance: number;

  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isGoogleSignUp: boolean;
  twoFactorEnabled: boolean;

  socialAccounts: SocialAccounts;

  createdAt: string;
  updatedAt: string;
}
export interface SocialAccounts {
  facebook: string;
  google: string;
  paypal: string;
  twitter: string;
}
export interface ApiProduct {
  _id: string;
  title: string;
  type: "Account" | "Item" | "Currency" | "Service";

  description: string;
  service: string;

  productRequiredFields: ProductRequiredField[];
  additionalFields: unknown[];

  images: string[];

  createdAt: string;
  updatedAt: string;
}
export interface ProductRequiredField {
  fieldName: string;
  fieldType: "custom" | "range" | "text";
  options: string[];
  isrequired: boolean;
}

export interface ApiOrder {
  _id: string;

  buyerId: ApiUser;
  sellerId: ApiUser;
  productId: ApiProduct;

  offerId: string;
  amount: number;
  quantity: number;

  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "pending" | "accepted" | "rejected" | "completed" | "cancelled";

  paypalTransactionId: string;

  createdAt: string;
  updatedAt: string;
}

export interface ApiOrdersResponse {
  success: boolean;
  currentPage: number;
  totalOrders: number;
  totalPages: number;
  data: ApiOrder[];
}

export interface CreatePayPalOrderResponse {
  success: boolean;
  orderID: string;
}

export interface CapturePayPalOrderResponse {
  success: boolean;
  data?: ApiOrder;
  message?: string;
}


export const createPayPalOrder = async (
  amount: number
): Promise<CreatePayPalOrderResponse> => {
    try {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/paypal/create-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ amount }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create PayPal order");
  }

  return response.json();
 } catch (err: unknown) {
  console.error("PayPal order error:", err);

  if (err instanceof Error) {
    const msg = err.message.toLowerCase();

    if (msg.includes("authentication") || msg.includes("token")) {
      window.location.href = "/login";
      throw err;
    }
  }

  throw err;
}

};


export const capturePayPalOrder = async (
  orderId: string,
  offerId: string,
  quantity: number = 1
): Promise<CapturePayPalOrderResponse> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/paypal/capture-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ orderId, offerId, quantity }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to capture PayPal order");
  }

  return response.json();
};

/* ------------------  Get All Orders (Admin) ------------------ */
export const fetchAllOrders = async (
  page?: number,
  limit?: number,
  from?: string,
  to?: string,
  status?: string,
  search?: string,
  productId?: string,
  buyerId?: string,
  sellerId?: string
): Promise< ApiOrdersResponse> => {
  const { token } = getAuthInfo();
  const params = new URLSearchParams();

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (from) params.append("from", from);
  if (to) params.append("to", to);
  if (status) params.append("status", status);
  if (search) params.append("search", search.trim());
  if (productId) params.append("productId", productId);
  if (buyerId) params.append("buyerId", buyerId);
  if (sellerId) params.append("sellerId", sellerId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch orders");
  }

  return response.json();
};


export const updateOrderStatus = async (id: string, status: string) => {
   const { token } = getAuthInfo();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/admin/${id}`,
    {
      method: "PATCH",
      
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch all orders");
  }

  return res.json();
}

export const updateOrderStatusBySeller = async (id: string, status: string) => {
   const { token } = getAuthInfo();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/seller/${id}`,
    {
      method: "PATCH",
      
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
      body: JSON.stringify({ status }),
    }
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch all orders");
  }

  return res.json();
}

/* ------------------  Get Orders by Buyer  ------------------ */
export const fetchOrdersByBuyer = async (
  buyerId?: string
): Promise<{ success: boolean; data: ApiOrder[] }> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/buyer/${buyerId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    }
  );


  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch buyer orders");
  }

 
  return response.json();
};

/* ------------------  Get Orders by Seller  ------------------ */
export const fetchOrdersBySeller = async (
  page: number,
  limit: number,
  from?: string,
  to?: string,
  status?: string,
  search?: string
): Promise<{
  success: boolean;
  data: ApiOrder[];
  totalPages?: number;
  currentPage?: number;
}> => {
  const { token,userId } = getAuthInfo();

  const query = new URLSearchParams();

  if (page) query.append("page", String(page));
  if (limit) query.append("limit", String(limit));
  if (status) query.append("status", status);
  if (search) query.append("search", search);
  if (from) query.append("from", from);
  if (to) query.append("to", to);

  // const userId = cookieStore.get("userId");
  console.log("userId", userId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/seller/${userId}?${query.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch seller orders");
  }

  return response.json();
};


/* ------------------  Get Single Order ------------------ */
export const fetchOrderById = async (
  orderId: string
): Promise<{ success: boolean; data: ApiOrder }> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${orderId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch order details");
  }

  return response.json();
};

/* ------------------  Delete Order ------------------ */
export const deleteOrder = async (orderId: string): Promise<{ success: boolean; message: string }> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${orderId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete order");
  }

  return response.json();
};

/* ------------------  Update Order ------------------ */
export const updateOrder = async (
  orderId: string,
  updates: Record<string, string>
): Promise<{ success: boolean; data: ApiOrder }> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/${orderId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(updates),
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update order");
  }

  return response.json();
};

/* ------------------  Get Order Count by Status ------------------ */
export const fetchOrderCountByStatus = async (
  status?: string
): Promise<{ success: boolean; data: number }> => {
  const { token } = getAuthInfo();

  const query = status ? `?status=${status}` : "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/count${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch order count");
  }

  return response.json();
};
