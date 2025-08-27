"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { LogOut, Play, ChevronRight, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { routeMapping, iconMapping } from "src/utils/constants";
import { logoutUser } from "src/api/api";

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  [key: string]: any;
}

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [navigation, setNavigation] = useState<string[]>([]);
  const [panelTitle, setPanelTitle] = useState("Admin Panel");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const decoded = jwtDecode<AuthTokenPayload>(token);
      const allowedRoutesForRole = decoded.allowedRoutes || [];
      const role = decoded.role;

      setUserRole(role);

      const allowedNavigation = allowedRoutesForRole.filter((item) =>
        Object.keys(routeMapping).includes(item)
      );

      setNavigation(allowedNavigation);

      switch (role) {
        case "admin":
          setPanelTitle("Admin Panel");
          break;
        case "seller":
          setPanelTitle("Seller Panel");
          break;
        case "user":
          setPanelTitle("User Panel");
          break;
        default:
          setPanelTitle("Dashboard");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/login");
    }
  }, [router]);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const getBasePath = () => {
    switch (userRole) {
      case "admin":
        return "/admin";
      case "seller":
        return "/seller";
      case "user":
        return "/user";
      default:
        return "/admin";
    }
  };

  const getRoutePath = (item: string) => {
    const basePath = getBasePath();

    if (item === "dashboard" || item === "home") return basePath;
    if (item === "manageOffers") return `${basePath}/offers`;

    return `${basePath}/${item}`;
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } h-screen fixed left-0 top-0 bg-gray-900 border-r border-gray-800 transition-all duration-300 z-30`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-1.5 rounded-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">{panelTitle}</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2 space-y-1 mt-6 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = iconMapping(item);
            const routePath = getRoutePath(item);
            const isActive =
              pathname === routePath ||
              (item === "manageOffers" && pathname.includes("/offers"));

            return (
              <Link
                key={item}
                href={routePath}
                className={`group flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-700/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20"
                }`}
              >
                <div className="flex items-center">
                  <div className="relative w-5 mr-3">
                    {Icon && (
                      <Icon className="h-5 w-5 text-gray-500 group-hover:text-cyan-400" />
                    )}
                  </div>
                  {!collapsed && <span>{routeMapping[item]}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout + Footer */}
        <div className="mt-auto border-t border-gray-800">
          <button
            onClick={handleLogOut}
            className="group flex items-center px-4 py-3 text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 rounded-lg w-full transition-colors hover:cursor-pointer"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-400" />
            {!collapsed && "Logout"}
          </button>
          {!collapsed && (
            <div className="p-4">
              <p className="text-xs text-gray-500">© 2025 GameStore.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 h-screen overflow-hidden ${
          collapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="h-full overflow-auto p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
