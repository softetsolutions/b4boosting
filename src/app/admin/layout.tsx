import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { routeMapping } from "src/utils/constants";
import Sidebar from "src/components/Sidebar";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  [key: string]: any;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get("userToken")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded: AuthTokenPayload;
  try {
    decoded = jwtDecode<AuthTokenPayload>(token!);
  } catch (error) {
    console.error("Error decoding token:", error);
    redirect("/login");
  }

  if (decoded.role !== "admin") {
    redirect("/login");
  }

  const allowedRoutesForAdmin = decoded.allowedRoutes || [];
  const navigation = allowedRoutesForAdmin.filter((item) =>
    Object.keys(routeMapping).includes(item)
  );

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar (Client Component) */}
      <Sidebar navigation={navigation} />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-hidden ml-64">
        <div className="h-full overflow-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
