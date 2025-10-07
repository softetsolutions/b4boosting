"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  affiliateId?: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<{ title: string; subtitle: string }>({
    title: "Dashboard",
    subtitle: "Welcome to your account",
  });

  useEffect(() => {
    try {
      const token = getCookie("token");
      if (!token) return;
      const decoded = jwtDecode<AuthTokenPayload>(token);

      setData({
        title:
          decoded.affiliateId
            ? "Affiliate Dashboard"
            : "User Dashboard",
        subtitle: "Welcome to your dashboard",
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white">{data.title}</h1>
      <p className="mt-2 text-gray-400">{data.subtitle}</p>
    </div>
  );
}

