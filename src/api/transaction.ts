import { getAuthInfo } from "src/utils/auth";


export const fetchSellerTransactions = async (
  query: string = ""
) => {

  const { token, userId } = getAuthInfo();

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions/seller/${userId}${query}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch seller transactions");
  }

  const data = await res.json();
  return data;
};
