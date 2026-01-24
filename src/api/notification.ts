// src/api/notification.ts


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: "ORDER" | "SYSTEM" | "PROMOTION" | "PAYMENT" | "DELIVERY" | "OTHER";
  data: Record<string, any>;
  isRead: boolean;
  createdAt: string;
}

export const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await fetch(`${BASE_URL}/notifications`, {
    headers: {
          Accept: "application/json",
        },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch notifications");
  const json = await res.json();
  return json.data;
};

export const fetchUnreadCount = async (): Promise<number> => {
  const res = await fetch(`${BASE_URL}/notifications/unread-count`, {
     headers: {
          Accept: "application/json",
        },
     cache: "no-store",   
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch unread count");
  const json = await res.json();
  return json.count;
};

export const markNotificationAsRead = async (id: string) => {
  await fetch(`${BASE_URL}/notifications/${id}/read`, {
    method: "PATCH",
     headers: {
          Accept: "application/json",
        },
     cache: "no-store", 
    credentials: "include",
  });
};

export const markAllNotificationsAsRead = async () => {
  await fetch(`${BASE_URL}/notifications/read-all`, {
    method: "PATCH",
     headers: {
          Accept: "application/json",
        },
     cache: "no-store", 
    credentials: "include",
  });
};
