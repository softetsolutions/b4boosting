"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Play, ChevronRight, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { routeMapping, iconMapping } from "src/utils/constants";
import { logoutUser } from "src/api/api";
import { logoutAction } from "src/utils/actions/actions";

interface Props {
  navigation: string[];
}

export default function AdminSidebar({ navigation }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

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

  const getRoutePath = (item: string) => {
    if (item === "dashboard") return "/admin";
    return `/admin/${item}`;
  };

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } h-screen fixed left-0 top-0 bg-gray-900 border-r border-gray-800 transition-all duration-300 z-30`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-1.5 rounded-lg">
              <Play className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">Admin Panel</span>
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

      {/* Navigation */}
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
                  ? "bg-cyan-900 text-cyan-400"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400"
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

      {/* Logout */}
      <div className="mt-auto border-t border-gray-800">
        <button
          onClick={logoutAction}
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
  );
}
