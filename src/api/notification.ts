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

type FetchNotificationsResult =
  | { data: Notification[] }
  | { unauthorized: true }
  | { error: true };


export const fetchNotifications = async (): Promise<FetchNotificationsResult> => {
  const res = await fetch(`${BASE_URL}/notifications`, {
    headers: {
          Accept: "application/json",
        },
    credentials: "include",
    cache: "no-store",
  });
 if (res.status === 401) {
    return { unauthorized: true };
  }

  if (!res.ok) {
    return { error: true };
  }
  // if (!res.ok) throw new Error("Failed to fetch notifications");
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

  // Token expired / unauthorized → treat as logged out
  if (res.status === 401) {
    return 0;
  }

  // Any other failure → safe fallback
  if (!res.ok) {
    return 0;
  }

  const json = await res.json();
  return typeof json.count === "number" ? json.count : 0;
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
