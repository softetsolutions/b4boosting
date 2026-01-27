import { getAuthInfo, handleUnauthorized } from "../utils/auth";

export interface Service {
  _id: string;
  name: string;
  icon: string;
  showOnHome?: boolean;
  createdAt: string;
}

export interface CreateServiceRequest {
  name: string;
  type: string;
  icon: string;
}

export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/services`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  // if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};

export const createService = async (
  service: CreateServiceRequest | FormData
): Promise<Service> => {
  try {
    const headers: Record<string, string> = {};

    let body: string | FormData;

    if (service instanceof FormData) {
      body = service;
    } else {
      // For JSON requests
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(service);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/create`,
      {
        method: "POST",
        headers,
        credentials: "include",
        body,
      }
    );

    if (response.status === 401) await handleUnauthorized();
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Service creation failed:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Failed to create service: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    if (!data.success || !data.data) {
      throw new Error(data.message || "Failed to create service");
    }

    return data.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const fetchAllServices = async (): Promise<Service[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/services`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }
 const result = await response.json();
  console.log("service result", result);

  
  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Invalid service data");
  }

  return result.data;
};

export const deleteService = async (serviceId: string): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${serviceId}`,
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
    throw new Error("Failed to delete service");
  }
};

export const updateServiceVisibility = async (
  serviceId: string,
  show: boolean
): Promise<void> => {
  try {
    getAuthInfo();
  } catch {
    await handleUnauthorized();
    throw new Error("No authentication token found");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/select`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ serviceId, show }),
    }
  );
  if (response.status === 401) await handleUnauthorized();
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update visibility");
  }
};

export const fetchServiceById = async (serviceId: string): Promise<Service> => {
  try {
    getAuthInfo();
  } catch {
    await handleUnauthorized();
    throw new Error("No authentication token found");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${serviceId}`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (response.status === 401) await handleUnauthorized();
  if (!response.ok) {
    throw new Error("Failed to load service details");
  }
  return response.json();
};

export const updateService = async (
  serviceId: string,
  data: FormData
): Promise<void> => {
  try {
    getAuthInfo();
  } catch {
    await handleUnauthorized();
    throw new Error("No authentication token found");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/services/${serviceId}`,
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
      .catch(() => ({ message: "Failed to update service" }));
    throw new Error(errorData.message || "Failed to update service");
  }
};
