import { API_BASE_URL } from "./config";

export interface ProductServiceSearchResult {
  productName: string;
  services: {
    id: string;
    servicename: string;
  }[];
}

// Search product and service details by search string.
export const fetchProductAndServiceDetailBySearch = async (
  searchString: string
): Promise<ProductServiceSearchResult[]> => {
  const response = await fetch(
    `${API_BASE_URL}/products/search/${encodeURIComponent(searchString)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Log raw response status
  console.log(`[Search API] Status: ${response.status}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: `Search failed: ${response.status}`,
    }));
    throw new Error(errorData.message || "Search failed");
  }

  const result = await response.json();

  // Debug result structure
  console.log("[Search API] Result:", result);

  if (result.success && Array.isArray(result.data)) {
    return result.data;
  }

  throw new Error("Invalid response format for fetchProductAndServiceDetailBySearch");
};
