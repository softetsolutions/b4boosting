// app/dashboard/layout.tsx
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import Sidebar from "src/components/Sidebar"; // or a new UserSidebar
import type { ReactNode } from "react";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  affiliateId?: string;
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  let decoded: AuthTokenPayload;
  try {
    decoded = jwtDecode<AuthTokenPayload>(token!);
  } catch (error) {
    console.error("Error decoding token:", error);
    redirect("/login");
  }

  // ✅ Example: route restriction
  if (!["seller", "affiliate"].includes(decoded.role)) {
    redirect("/login");
  }

  const titleName = decoded.affiliateId ? "Affiliate Dashboard" : "Seller Dashboard";
  const roleName = decoded.affiliateId ? "affiliate" : "seller";

  // const navigation =
  //   decoded.affiliateId 
  //     ? ["createReflink", "performance"]
  //     : ["dashboard"];
  const navigation =
 roleName === "seller" 
    ? [
         { name: "Dashboard", href: "/seller/dashboard" },
        {key:"createOffers",  name: "Create Offers", href: "/seller/dashboard/createOffers" },
        { key : "manageOffers",name: "Manage Offers", href: "/seller/dashboard/manageOffers" },
        { key : "manageOrder",name: "Manage Orders", href: "/seller/dashboard/manageOrder" },
        { key : "transactionHistorys",name: "Transaction History", href: "/seller/dashboard/transactionHistorys" },
      ]
    : [
        { name: "Dashboard", href: "/seller/dashboard" },
      ];


  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
      role={roleName}
      navigation={navigation} 
      title={titleName} />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-hidden ml-64">
        <div className="h-full overflow-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
