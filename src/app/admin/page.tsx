"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  [key: string]: any;
}

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const decoded = jwtDecode<AuthTokenPayload>(token);

      if (decoded.role === "admin") {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        // optionally redirect to user dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthorized(false);
    }
  }, [router]);

  if (isAuthorized === null) {
    return <p className="p-8 text-gray-400">Loading...</p>;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Manage your gaming products and services
        </p>
      </div>
    </div>
  );
}
