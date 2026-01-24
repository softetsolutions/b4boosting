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
   affiliateId?: string;
  [key: string]: unknown;
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

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
    
    <div className="flex min-h-screen bg-gray-900">
    
    <Sidebar
      title="Admin Dashboard"
      navigation={navigation}
      role="admin"
    />

    
    <main
      className={`flex-1 min-h-screen transition-all duration-300
        lg:ml-64
        md:ml-5
        ml-0`}
    >
      <div className="min-h-screen overflow-y-auto p-6 md:p-8">
        {children}
      </div>
    </main>
  </div>
  );
}
