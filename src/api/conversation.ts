import { getAuthInfo } from "../utils/auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const getConversationsByUser = async (userId: string) => {
  const { token } = getAuthInfo();

  const res = await fetch(`${BASE_URL}/conversations/user/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  return res.json();
};


export const getConversationBetween = async (userId1: string, userId2: string) => {
  const { token } = getAuthInfo();

  try {
    const res = await fetch(`${BASE_URL}/conversations/between/${userId1}/${userId2}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    if(res.status === 404) throw new Error("No conversation found between the users");
    console.log(res,"res");

    return res.json();
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

export const getConversationByOrderId = async (orderId: string) => {
  const { token } = getAuthInfo();

  const res = await fetch(`${BASE_URL}/conversations/order/${orderId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store",
  });

  return res.json();
};

export const sendMessage = async (payload: {
  senderId: string;
  receiverId: string;
  orderId: string;
  text?: string;
  fileUrl?: string;
}) => {
  const { token } = getAuthInfo();

  const res = await fetch(`${BASE_URL}/conversations/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const uploadChatFile = async (file: File) => {
  const { token } = getAuthInfo();

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/conversations/upload-file`, {
    method: "POST",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: formData,
  });

   const data = await res.json();

  return data; 
};


export const markDelivered = async (payload: {
  senderId: string;
  orderId: string;
}) => {
  const { token } = getAuthInfo();

  const res = await fetch(`${BASE_URL}/conversations/mark-delivered`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const markOrderComplete = async (payload: {
  senderId: string;
  orderId: string;
}) => {
  const { token } = getAuthInfo();

  const res = await fetch(`${BASE_URL}/conversations/complete-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};

export async function startConversation(sellerId: string) {
  const { token } = getAuthInfo();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/start`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ sellerId }),
    }
  );

  return res.json();
}
