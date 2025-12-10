import { getAuthInfo } from "../utils/auth";

export interface ApiOrder {
  _id: string;
  buyerId: {
    _id: string;
    username?: string;
    email?: string;
  };
  sellerId: {
    _id: string;
    username?: string;
    email?: string;
  };
  productId: {
    _id: string;
    title?: string;
    type?: string;
    images?: string[];
  };
  amount: number;
  quantity: number;
  status: string;
  paypalTransactionId?: string;
  createdAt: string;
  updatedAt: string;
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
  } catch (err: any) {
    console.error("PayPal order error:", err);
    if (err.message.includes("authentication") || err.message.includes("token")) {
      window.location.href = "/login";
      return;
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
): Promise<{ success: boolean; data: ApiOrder[] }> => {
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
  updates: Record<string, any>
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
