// import { getAuthInfo } from "../utils/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/reviews";


interface FetchAdminReviewsParams {
  page?: number;
  limit?: number;
  rating?: number;
  search?: string;
  from?: string;
  to?: string;
}

export const createReview = async (formData: FormData) => {
  // const { token } = getAuthInfo();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews`,
    {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
        // Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
      credentials: "include",
    }
  );

  return res.json();
};

export const updateReview = async (
  reviewId: string,
  formData: FormData
) => {
    //  const { token } = getAuthInfo();
  const res = await fetch(`${BASE_URL}/${reviewId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
       "Content-Type": "application/json",
        // Authorization: token ? `Bearer ${token}` : "",
      },

    body: formData,
  });

  return res.json();
};

export const deleteReview = async (reviewId: string) => {
  const res = await fetch(`${BASE_URL}/${reviewId}`, {
    method: "DELETE",
    headers: {
       "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return res.json();
};

export const getAllReviewsForAdmin = async (
  params: FetchAdminReviewsParams = {}
) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(
    `${BASE_URL}/admin?${query.toString()}`,
    {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
};

// src/api/reviews.ts
export const getReviewsByProductSlug = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/product/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  return res.json();
};


export const adminDeleteReview = async (reviewId: string) => {
  const res = await fetch(`${BASE_URL}/admin/${reviewId}`, {
    method: "DELETE",
    headers:{
       "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return res.json();
};
