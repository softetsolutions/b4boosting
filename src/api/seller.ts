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

export interface CreateSellerRequestPayload {
  dob: string;
  aadharId: string;
  panId: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  idProofImages: (string | File)[];
}

export const createSellerRequest = async (
  payload: CreateSellerRequestPayload
): Promise<SellerRequest> => {
  const { token } = getAuthInfo();

  if (!token) {
    throw new Error("No authentication token found");
  }

  const formData = new FormData();
  formData.append("dob", payload.dob);
  formData.append("aadharId", payload.aadharId);
  formData.append("panId", payload.panId);
  formData.append("address", payload.address);
  formData.append("city", payload.city);
  formData.append("state", payload.state);
  formData.append("pincode", payload.pincode);

  // 🔹 Append images
  payload.idProofImages.forEach((img) => {
    if (img instanceof File) {
      formData.append("idProofImages", img);
    } else if (typeof img === "string" && img.trim()) {
      // in case you also support URLs
      formData.append("idProofImageUrls", img);
    }
  });


  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/seller-requests`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        // ❌ Do NOT set "Content-Type" here; browser sets correct boundary.
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: formData,
    }
  );

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Failed to create seller request");
  }

  const res = await response.json();
  return res.data as SellerRequest;
};


export const fetchAllSellerRequests = async (): Promise<SellerRequest[]> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

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
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/${requestId}/approve`,
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

export const rejectSellerRequest = async (requestId: string, adminNote: string): Promise<void> => {
  const { token } = getAuthInfo();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/seller/${requestId}/reject`,
    {
      method: "PATCH",
      headers: {
        Accept: "application/json",
         "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ adminNote}),
    }
  );

  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to reject seller request");
  }
};
