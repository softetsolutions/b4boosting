import { getAuthInfo, handleUnauthorized } from "../utils/auth";

export interface SellerRequest {
  _id: string;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  dob: string;
  Nationalidentitynumber?: string;
  Taxregistrationnumber?: string;
  Address: string;
  City: string;
  Postalcode: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export const fetchAllSellerRequests = async (): Promise<SellerRequest[]> => {
  const { token } = getAuthInfo();

  const response = await fetch(`${process.env.BACKEND_URL}/seller`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to fetch seller requests");
  }

  const res = await response.json();
  return Array.isArray(res.data) ? res.data : [];
};

export const approveSellerRequest = async (
  requestId: string
): Promise<void> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.BACKEND_URL}/seller/${requestId}/approve`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to approve seller request");
  }
};

export const rejectSellerRequest = async (requestId: string): Promise<void> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.BACKEND_URL}/seller/${requestId}/reject`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to reject seller request");
  }
};
