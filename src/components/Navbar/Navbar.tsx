"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../ThemeToggle";
import { SettingsIcon, SearchIcon, Menu, X } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import Marquee from "src/components/Marquee";
import { jwtDecode } from "jwt-decode";
import { logoutAction } from "src/utils/actions/actions";
import { HomePageData } from "src/api/types";
import { Bell } from "lucide-react";
import {
  fetchNotifications,
  fetchUnreadCount,
  markNotificationAsRead,
} from "src/api/notification";
import type { Notification } from "src/api/notification";
import SearchMegaDropdown from "./SearchMegaDropdown";

interface NavbarProps {
  activeService?: string;
  dynamicdata?: HomePageData;
}

interface AuthTokenPayload {
  id: string;
  role: string;
  allowedRoutes: string[];
  affiliateId?: string;
  [key: string]: unknown;
}

export interface Product {
  _id: string;
  title: string;
  images: string[];
}

export interface Service {
  _id: string;
  name: string;
  products: Product[];
}

export interface NavbarItem {
  label: string;
  key: string;
  items: {
    name: string;
    image?: string;
    slug: string;
  }[];
}

export default function Navbar({ dynamicdata }: NavbarProps) {
  const SettingsData = dynamicdata?.settings;
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [activeHover, setActiveHover] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  let hoverTimeout: NodeJS.Timeout;
  const navbarData: NavbarItem[] = (dynamicdata?.services ?? [])
    .filter((service) => service.products?.length > 0)
    .map((service: Service) => ({
      label: formatLabel(service.name),
      key: service.name,
      items: service.products.map((product) => ({
        name: formatLabel(product.title),
        image: product.images?.[0] || "/images/fallback.png",
        slug: `/categories/${service.name}/${product.title}`,
      })),
    }));

  function formatLabel(label: string) {
    return label
      .replace(/[-_]+/g, " ")
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    const loadNotifications = async () => {
      const [listResult, countResult] = await Promise.all([
        fetchNotifications(),
        fetchUnreadCount(),
      ]);

      // Token expired or unauthorized → silent reset
      if (listResult?.unauthorized) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }

      // Normal success
      if (Array.isArray(listResult?.data)) {
        setNotifications(listResult.data);
      } else {
        setNotifications([]);
      }

      setUnreadCount(typeof countResult === "number" ? countResult : 0);
    };

    loadNotifications();
  }, [isLoggedIn]);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    const token = Cookies.get("token");

    if (token && typeof token == "string") {
      try {
        const decoded = jwtDecode<AuthTokenPayload>(token);
        setIsLoggedIn(true);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("token");
        setIsLoggedIn(false);
        setUserRole("");
      }
    } else {
      setIsLoggedIn(false);
      setUserRole("");
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutAction();

      setIsLoggedIn(false);
      router.push("/login");
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  useEffect(() => {
    setActiveHover(null);
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="relative w-full">
        {/* Banner */}
        {isHomePage && (
          <div className="relative w-full">
            {SettingsData?.marqueeText?.trim() && (
              <Marquee
                text={SettingsData?.marqueeText}
                link={SettingsData?.marqueeLink}
                speed={150}
                className={`fixed top-0 left-0 right-0 z-50 ${
                  !SettingsData?.marqueeText ? "hidden" : ""
                } `}
              />
            )}
            <Image
              src={SettingsData?.bannerImg || "/images/fallback.png"}
              alt="Banner"
              className="w-full h-full object-cover"
              width={1920}
              height={1080}
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 pt-15">
              <h1 className="lg:text-4xl md:text-4xl text-2xl font-bold text-white lg:mb-4 md:mb-4 sm:mb-2 transition-all">
                {SettingsData?.bannerTitle}
              </h1>
              <p className="text-white sm:text-lg lg:text-lg lg:mb-6 md:mb-4 sm:mb-2 mb-2">
                {SettingsData?.bannerSubtitle}
              </p>
              <Link href={SettingsData?.bannerRedirectionLink || "/"}>
                <button
                  type="button"
                  className="lg:text-2xl md:text-2xl sm:text-lg  yellow-bg text-zinc-950 lg:px-16 md:px-12 sm:px-5 px-5  lg:py-3 py-1  rounded-xl font-bold shadow-lg transition-all duration-300"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Navbar */}
        <nav
          className={`fixed left-0 right-0 z-100 transition-all duration-300 ${
            isScrolled ? "backdrop-blur-md bg-black/60" : "bg-transparent"
          }
          ${isHomePage ? "top-9" : "top-0"}
          `}
        >
          <div className="max-w-11xl mx-auto px-4 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0">
            {/* Top row: Logo + Hamburger */}
            <div className="flex items-center justify-between w-full lg:w-auto">
              <Link href="/" className="flex items-center space-x-7">
                <div className="bg-gradient-to-r yellow-bg p-2 rounded-xl shadow-lg">
                  <Image
                    src="/svgIcons/LogoIcon.svg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <div className="hidden md:block">
                  <h1 className="text-2xl yellow-text font-bold bg-clip-text text-transparent">
                    B4Boosting
                  </h1>
                  <p className="text-xs text-amber-100">Pro Gaming Services</p>
                </div>
              </Link>

              {/* Hamburger icon for mobile */}
              <div className="flex items-center">
                {/* Notification Bell */}
                {isLoggedIn && (
                  <div className="relative lg:hidden">
                    <button
                      type="button"
                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                      className="relative p-2 rounded-full hover:bg-white/10 transition"
                    >
                      <Bell
                        className={`text-white ${isNotificationOpen || unreadCount > 0 ? "text-yellow-400" : ""}`}
                      />

                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {isNotificationOpen && (
                      <div className="absolute right-0 mt-2 w-80 bg-zinc-900 rounded-lg shadow-xl z-50 max-h-96 overflow-auto">
                        <div className="px-4 py-2 font-semibold text-white border-b border-white/10">
                          Notifications
                        </div>

                        {notifications.length === 0 ? (
                          <p className="px-4 py-4 text-sm text-gray-400">
                            No notifications
                          </p>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n._id}
                              className={`px-4 py-3 cursor-pointer border-b border-white/5 ${
                                !n.isRead ? "bg-white/5" : ""
                              }`}
                              onClick={async () => {
                                if (!n.isRead) {
                                  await markNotificationAsRead(n._id);
                                  setUnreadCount((c) => c - 1);
                                }

                                // Optional redirect
                                if (n.data?.orderId) {
                                  router.push(`/chats`);
                                }

                                setIsNotificationOpen(false);
                              }}
                            >
                              <p className="text-sm font-medium text-white">
                                {n.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                {n.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  className="lg:hidden  hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
            {/* Desktop Links */}
            {/* {isHomePage && (
              <div className="hidden lg:flex items-center xl:gap-10 lg:gap-6">
                {dummyNavbarOptions.map((option) => {
                  const isActive =
                    activeService?.toLowerCase() === option.label.toLowerCase();

                  return (
                    <Link
                      key={option.link}
                      href={option.link}
                      className="text-xl hover:text-yellow-400 transition-colors duration-200 font-medium relative group"
                    >
                      {option.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            )} */}

            <div className="hidden lg:flex items-center xl:gap-10 lg:gap-6 relative">
              {navbarData.map((menu) => (
                <div
                  key={menu.key}
                  className="relative"
                  onMouseEnter={() => {
                    setSearchTerm("");
                    clearTimeout(hoverTimeout);
                    setActiveHover(menu.key);
                  }}
                  onMouseLeave={() => {
                    setSearchTerm("");
                    hoverTimeout = setTimeout(() => setActiveHover(null), 150);
                  }}
                >
                  {/* NAV ITEM */}
                  <button
                    type="button"
                    className="text-2xl cursor-pointer hover:text-yellow-400 font-medium"
                  >
                    {menu.label}
                  </button>

                  {activeHover === menu.key && (
                    <div className="absolute left-0 top-full mt-5 w-[420px] bg-zinc-900 rounded-xl shadow-2xl p-4 z-50">
                      {/* Search inside dropdown */}
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder={`Search ${menu.label}`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 text-white outline-none placeholder-gray-400"
                        />
                      </div>

                      {/* Filtered Items */}
                      <div className="grid grid-cols-2 gap-2">
                        {menu.items
                          .filter((item) =>
                            item.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()),
                          )
                          .map((item) => (
                            <Link
                              key={item.slug}
                              href={item.slug}
                              className="px-3 py-2 rounded-lg text-md text-gray-300 hover:bg-yellow-400 hover:text-black transition"
                            >
                              <span className="flex items-center gap-2 ">
                                <Image
                                  src={item.image || "images/fallback.png"}
                                  alt="product image"
                                  width={50}
                                  height={50}
                                  className="rounded-xs"
                                />
                                {item.name}
                              </span>
                            </Link>
                          ))}

                        {menu.items.filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        ).length === 0 && (
                          <p className="col-span-2 text-sm text-gray-400">
                            No results found
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Right Items */}
            <div className="hidden lg:flex flex-row items-center gap-4 w-xl">
              {/* Search */}
              {isHomePage && (
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen((prev) => !prev)}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors w-full"
                  >
                    <SearchIcon />
                    <span className="text-white/70">Search…</span>
                  </button>

                  {isSearchOpen && (
                    <SearchMegaDropdown
                      navbarData={navbarData}
                      onClose={() => setIsSearchOpen(false)}
                    />
                  )}
                </div>
              )}

              {/* Notification Bell */}
              {isLoggedIn && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2 rounded-full hover:bg-white/10 transition"
                  >
                    <Bell
                      className={`text-white ${isNotificationOpen || unreadCount > 0 ? "text-yellow-400" : ""}`}
                    />

                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-1.5">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {isNotificationOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-zinc-900 rounded-lg shadow-xl z-50 max-h-96 overflow-auto">
                      <div className="px-4 py-2 font-semibold text-white border-b border-white/10">
                        Notifications
                      </div>

                      {notifications.length === 0 ? (
                        <p className="px-4 py-4 text-sm text-gray-400">
                          No notifications
                        </p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id}
                            className={`px-4 py-3 cursor-pointer border-b border-white/5 ${
                              !n.isRead ? "bg-white/5" : ""
                            }`}
                            onClick={async () => {
                              if (!n.isRead) {
                                await markNotificationAsRead(n._id);
                                setUnreadCount((c) => c - 1);
                              }

                              // Optional redirect
                              if (n.data?.orderId) {
                                router.push(`/chats`);
                              }

                              setIsNotificationOpen(false);
                            }}
                          >
                            <p className="text-sm font-medium text-white">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-400">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {userRole === "user" && (
                <Link
                  href="/becomeSeller"
                  className="inline-flex items-center px-4 py-2 rounded-3xl text-sm font-medium yellow-bg text-zinc-950 "
                >
                  Become a Seller
                </Link>
              )}
              {userRole === "seller" && (
                <Link
                  href="/seller/dashboard"
                  className="text-white hover:text-yellow-400 text-left"
                >
                  Seller Dashboard
                </Link>
              )}

              {/* Login */}
              {!isLoggedIn && (
                <Link href="/login">
                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 yellow-bg text-zinc-950 font-semibold hover:text-white-400 transition-colors duration-200"
                  >
                    SignIn
                  </button>
                </Link>
              )}

              {/* Settings */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="flex items-center gap-2 font-semibold px-4 py-2 rounded-xl border-1 border-gray-400/20 transition-all duration-300"
                >
                  <SettingsIcon />
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isSettingsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-800 text-zinc-300 rounded-lg shadow-lg z-50">
                    {/* <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-500 cursor-pointer">
                      In
                    </div> */}

                    <Link
                      href="/user/dashboard/affiliate"
                      className="px-4 py-2 flex justify-between items-center hover:bg-gray-500 cursor-pointer"
                    >
                      Affiliate Program
                    </Link>

                    <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-500 cursor-pointer">
                      <ThemeToggle />
                    </div>
                    {isLoggedIn && (
                      <>
                        <Link
                          href="/profile"
                          className="w-full text-left px-4 py-2 hover:bg-gray-500"
                        >
                          Profile
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Slide-Down Menu */}
          {isMenuOpen && (
            <div className=" mt-2 pt-4 border-t border-yellow-400 bg-black/80 backdrop-blur-sm rounded-b-xl">
              <div className="flex flex-col space-y-4 px-4 pb-4">
                {/* Search */}
                {isHomePage && (
                  <div className="relative w-full">
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen((prev) => !prev)}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors w-full"
                    >
                      <SearchIcon />
                      <span className="text-white/70">Search…</span>
                    </button>

                    {isSearchOpen && (
                      <SearchMegaDropdown
                        navbarData={navbarData}
                        onClose={() => setIsSearchOpen(false)}
                      />
                    )}
                  </div>
                )}

                {navbarData.map((menu) => (
                  <div key={menu.key} className="border-b border-white/10 pb-2">
                    {/* Service Header */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileMenu(
                          openMobileMenu === menu.key ? null : menu.key,
                        )
                      }
                      className="w-full flex justify-between items-center text-white text-lg font-medium"
                    >
                      {menu.label}
                      <span>{openMobileMenu === menu.key ? "−" : "+"}</span>
                    </button>

                    {/* Expanded Products */}
                    {openMobileMenu === menu.key && (
                      <div className="mt-3 space-y-2">
                        <input
                          type="text"
                          placeholder={`Search ${menu.label}`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/40 text-white outline-none placeholder-gray-400"
                        />

                        {menu.items
                          .filter((item) =>
                            item.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()),
                          )
                          .map((item) => (
                            <Link
                              key={item.slug}
                              href={item.slug}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-yellow-400 hover:text-black"
                            >
                              <Image
                                src={item.image || "/images/fallback.png"}
                                alt={item.name}
                                width={40}
                                height={40}
                              />
                              {item.name}
                            </Link>
                          ))}

                        {menu.items.filter((item) =>
                          item.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                        ).length === 0 && (
                          <p className="text-sm text-gray-400">No results</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Settings */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="flex items-center justify-between  font-semibold px-4 py-2 rounded-xl "
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  >
                    <span className="text-white">Settings</span>
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isSettingsOpen && (
                    <div className="flex flex-col mt-2 space-y-2 px-4">
                      {isLoggedIn && (
                        <button
                          type="button"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="text-red-500 hover:text-red-400 text-left"
                        >
                          Logout
                        </button>
                      )}
                      <Link
                        href="/profile"
                        className="text-white hover:text-yellow-400 text-left"
                      >
                        Profile
                      </Link>
                      {userRole === "seller" && (
                        <Link
                          href="/seller/dashboard"
                          className="text-white hover:text-yellow-400 text-left"
                        >
                          Seller Dashboard
                        </Link>
                      )}

                      <ThemeToggle />
                    </div>
                  )}
                </div>

                {/* Language Selector */}
                {/* <div>
                <LanguageSelector />
              </div> */}

                {userRole === "user" && (
                  <Link
                    href="/becomeSeller"
                    className="inline-flex items-center px-4 py-2 rounded-3xl text-sm font-medium yellow-bg text-zinc-950 "
                  >
                    Become a Seller
                  </Link>
                )}

                {/* Login if not logged in */}
                {!isLoggedIn && (
                  <Link
                    href="/login"
                    className="text-white hover:text-yellow-400 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
