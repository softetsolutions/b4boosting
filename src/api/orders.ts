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
  status?: string
): Promise<{ success: boolean; data: ApiOrder[] }> => {
  const { token } = getAuthInfo();

  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (status) params.append("status", status);

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
    throw new Error(error.message || "Failed to fetch all orders");
  }

  return response.json();
};

/* ------------------  Get Orders by Buyer  ------------------ */
export const fetchOrdersByBuyer = async (
  status?: string
): Promise<{ success: boolean; data: ApiOrder[] }> => {
  const { token } = getAuthInfo();

  const query = status ? `?status=${status}` : "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/buyer${query}`,
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
  status?: string
): Promise<{ success: boolean; data: ApiOrder[] }> => {
  const { token } = getAuthInfo();

  const query = status ? `?status=${status}` : "";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders/seller${query}`,
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
