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

const dummyNavbarOptions = [
  { label: "Currency", link: "#currency" },
  { label: "Accounts", link: "#account" },
  { label: "Top Ups", link: "#topups" },
  { label: "Items", link: "#item" },
  { label: "Boosting", link: "#boosting" },
  { label: "Gift Cards", link: "#gift-card" },
];

export default function Navbar({ activeService, dynamicdata }: NavbarProps) {
  const SettingsData = dynamicdata?.settings;
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

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

  return (
    <>
      <header className="relative w-full">
        {/* Banner */}
        {isHomePage && (
          <div className="relative w-full">
            <Marquee
              text={SettingsData?.marqueeText}
              link={SettingsData?.marqueeLink}
              speed={150}
              className="fixed top-0 left-0 right-0 z-50"
            />
            <Image
              src={SettingsData?.bannerImg}
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
              <Link href={SettingsData?.bannerRedirectionLink}>
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
              <button
                type="button"
                className="lg:hidden  hover:text-yellow-400 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

            {/* Desktop Links */}
            {isHomePage && (
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
            )}
            {/* Desktop Right Items */}
            <div className="hidden lg:flex flex-row items-center gap-4">
              {/* Search */}
              {isHomePage && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors w-full">
                  <SearchIcon />
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-white placeholder-white/70"
                    placeholder="Search ..."
                  />
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
                    <Link
                      href="/profile"
                      className="w-full text-left px-4 py-2 hover:bg-gray-500"
                    >
                      Profile
                    </Link>

                    <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-500 cursor-pointer">
                      <ThemeToggle />
                    </div>
                    {isLoggedIn && (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                      >
                        Logout
                      </button>
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
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors w-full">
                    <SearchIcon />
                    <input
                      type="text"
                      className="bg-transparent border-none outline-none w-full text-white placeholder-white/70"
                      placeholder="Search ..."
                    />
                  </div>
                )}
                {/* <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors w-full">
                  <SearchIcon />
                  <input
                    type="text"
                    className="bg-transparent border-none outline-none w-full text-white placeholder-white/70"
                    placeholder="Search ..."
                  />
                </div> */}

                {/* Links */}
                {dummyNavbarOptions.map((option) => (
                  <Link
                    key={option.link}
                    href={option.link}
                    className="text-white hover:text-yellow-400 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {option.label}
                  </Link>
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
