"use client";

import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  [key: string]: any;
}

export default function Dashboard() {
  const [dashboardContent, setDashboardContent] = useState<{
    title: string;
    subtitle: string;
  }>({ title: "", subtitle: "" });

  useEffect(() => {
    try {
      const token = localStorage.getItem("userToken");
      if (token) {
        const decoded = jwtDecode<AuthTokenPayload>(token);
        const role = decoded.role;

        switch (role) {
          case "admin":
            setDashboardContent({
              title: "Admin Dashboard",
              subtitle: "Manage your gaming products and services",
            });
            break;
          case "seller":
            setDashboardContent({
              title: "Seller Dashboard",
              subtitle: "Manage your offers and track sales performance",
            });
            break;
          case "user":
            setDashboardContent({
              title: "User Dashboard",
              subtitle: "View your orders and manage your account",
            });
            break;
          default:
            setDashboardContent({
              title: "Dashboard",
              subtitle: "Welcome to your dashboard",
            });
        }
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setDashboardContent({
        title: "Dashboard",
        subtitle: "Welcome to your dashboard",
      });
    }
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          {dashboardContent.title}
        </h1>
        <p className="mt-2 text-gray-400">{dashboardContent.subtitle}</p>
      </div>
    </div>
  );
}
