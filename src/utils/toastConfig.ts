import type { ToastOptions } from "react-hot-toast";

export const toastConfig: ToastOptions = {
  duration: 2000,
  position: "top-center",
  style: {
    background: "#1f2937",
    color: "#fff",
    border: "1px solid #374151",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
};

export const toastStyles = {
  success: {
    style: {
      background: "#065f46",
      border: "1px solid #10b981",
      color: "#fff",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#fff",
    },
  },
  error: {
    style: {
      background: "#7f1d1d",
      border: "1px solid #ef4444",
      color: "#fff",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  },
  loading: {
    style: {
      background: "#1e40af",
      border: "1px solid #3b82f6",
      color: "#fff",
    },
  },
};
