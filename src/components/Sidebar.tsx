// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { LogOut, Play, ChevronRight, ChevronLeft } from "lucide-react";
// import toast from "react-hot-toast";
// import { routeMapping, iconMapping } from "src/utils/constants";
// import { logoutUser } from "src/api/api";
// import { logoutAction } from "src/utils/actions/actions";

// // interface Props {
// //   navigation: string[];
// // }


// interface NavigationItem {
//   name: string;
//   href: string;
// }

// interface Props {
//   navigation: (string | NavigationItem)[];
//   title?: string;
//   role?: string;
// }
// export default function AdminSidebar({ navigation, title, role }: Props) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   const handleLogOut = async () => {
//     try {
//       await logoutUser();
//       toast.success("Logged out successfully!");
//       router.push("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//     // ✅ Helper to derive path
//   const getRoutePath = (item: string | NavigationItem) => {
//     if (typeof item === "string") {
//       if (item === "dashboard") return `/${role}/dashboard`;
//       return `/${role}/${item}`;
//     }
//     return item.href; // when object
//   };

//   const getRouteName = (item: string | NavigationItem) => {
//     if (typeof item === "string") return routeMapping[item] || item;
//     return item.name;
//   };

//   // const getRoutePath = (item: string) => {
//   //   if (item === "dashboard") return "/admin";
//   //   return `/${role}/${item}`;
//   // };

//   return (
//     <div
//       className={`${
//         collapsed ? "w-16" : "w-64"
//       } h-screen fixed left-0 top-0 bg-gray-900 border-r border-gray-800 transition-all duration-300 z-30`}
//     >
//       {/* Logo */}
//       <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
//         {!collapsed && (
//           <div className="flex items-center space-x-2">
//             <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-1.5 rounded-lg">
//               <Play className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-white font-bold text-lg">{title}</span>
//           </div>
//         )}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
//         >
//           {collapsed ? (
//             <ChevronRight className="w-5 h-5" />
//           ) : (
//             <ChevronLeft className="w-5 h-5" />
//           )}
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-2 space-y-1 mt-6 overflow-y-auto">
//         {navigation.map((item) => {
//           // const Icon = iconMapping(item);
//           // const routePath = getRoutePath(item);
//           // const isActive =
//           //   pathname === routePath ||
//           //   (item === "manageOffers" && pathname.includes("/offers"));
//            const routePath = getRoutePath(item);
//           const routeName = getRouteName(item);
//           const Icon = iconMapping(
//             typeof item === "string" ? item : item.key
//           );
//           const isActive = pathname === routePath;

//           return (
//             <Link
//               key={routePath} // ✅ now unique!
//               href={routePath}
//               className={`group flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
//                 isActive
//                   ? "bg-cyan-900 text-cyan-400"
//                   : "text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400"
//               }`}
//             >
//               <div className="flex items-center">
//                 <div className="relative w-5 mr-3">
//                   {Icon && (
//                     <Icon className="h-5 w-5 text-gray-500 group-hover:text-cyan-400" />
//                   )}
//                 </div>
//                 {!collapsed && <span>{routeName}</span>}
//               </div>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="mt-auto border-t border-gray-800">
//         <button
//           onClick={logoutAction}
//           className="group flex items-center px-4 py-3 text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 rounded-lg w-full transition-colors hover:cursor-pointer"
//         >
//           <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-400" />
//           {!collapsed && "Logout"}
//         </button>
//         {!collapsed && (
//           <div className="p-4">
//             <p className="text-xs text-gray-500">© 2025 GameStore.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Play, ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { iconMapping, routeMapping } from "src/utils/constants";
import { logoutAction } from "src/utils/actions/actions";

interface NavigationItem {
  name: string;
  href?: string;
  key?: string;
}

interface Props {
  navigation: (string | NavigationItem)[];
  title?: string;
  role?: string;
   collapsed?: boolean;
  // setCollapsed?: (val: boolean) => void;
}

export default function AdminSidebar({ navigation, title, role }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getRoutePath = (item: string | NavigationItem) => {
    if (typeof item === "string") {
      if (item === "dashboard") return `/${role}/dashboard`;
      return `/${role}/${item}`;
    }
    return item.href || `/${role}/${item.key}`;
  };

  const getRouteName = (item: string | NavigationItem) => {
    if (typeof item === "string") return routeMapping[item] || item;
    return item.name;
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-900 text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 border-r border-gray-800 z-40 transform transition-transform duration-300
          ${collapsed ? "w-16" : "w-64"} 
          md:translate-x-0 
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-1.5 rounded-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">{title}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors hidden md:block"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1 mt-6 overflow-y-auto">
          {navigation?.map((item) => {
            const routePath = getRoutePath(item);
            const routeName = getRouteName(item);
            const Icon = iconMapping(typeof item === "string" ? item : item.key);
            const isActive = pathname === routePath;

            return (
              <Link
                key={routePath}
                href={routePath}
                className={`group flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-900 text-cyan-400"
                    : "text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400"
                }`}
                onClick={() => setMobileOpen(false)} // close sidebar on mobile after click
              >
                <div className="flex items-center">
                  <div className="relative w-5 mr-3">
                    {Icon && <Icon className="h-5 w-5 text-gray-500 group-hover:text-cyan-400" />}
                  </div>
                  {!collapsed && <span>{routeName}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto border-t border-gray-800">
          <button
            type="button"
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

      {/* Empty div to push content right when sidebar is open */}
      <div className={`md:ml-${collapsed ? "16" : "64"}`}></div>
    </>
  );
}
