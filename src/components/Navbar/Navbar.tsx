"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageSelector from "../LanguageSelector";

const dummyNavbarOptions = [
  { label: 'Currency', link: '#currency' },
  { label: 'Account', link: '#account' },
  { label: 'Top Ups', link: '#topups' },
  { label: 'Item', link: '#item' },
  { label: 'Boosting', link: '#boosting' },
  { label: 'Gift Cards', link: '#gift-card' },
]

const Navbar = ({
  isLoggedIn,
  role,
}: {
  isLoggedIn: boolean;
  role: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
  { label: "Account", href: "/account" },
  { label: "Boosting", href: "/boosting" },
  { label: "Games", href: "/games" },
];


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //   const handleLogout = async () => {
  //     try {
  //       await logout();
  //       setisloggedIn(false);
  //       toast.success("Logged out successfully!");
  //       navigate("/");
  //     } catch (error) {
  //       console.error("Logout error:", error);
  //       toast.error("Logout failed. Please try again.");
  //     }
  //   };


  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 mt-2"
    >
      <div className="max-w-7xl mx-auto px-4 bg-[#99a1af] rounded-[20px] p-3">
        <div
          className="transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
                <img
                  src="/svgIcons/LogoIcon.svg"
                  alt="Logo"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  GameStore
                </h1>
                <p className="text-xs text-amber-100">Pro Gaming Services</p>
              </div>
            </div>
            <div className="flex gap-4">
              {dummyNavbarOptions.map((option) => (
                // <Link href={option.link}>
                //   <span className="text-base font-sans">{option.label}</span></Link>
                <div className="relative group">
                  <Link href={option.link}>
                    <span className="text-base font-sans">{option.label}</span>
                  </Link>
                  <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-white border p-2 shadow-lg z-10">
                    links content yha dalne hai as per eldorado.
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 text-sm text-zinc-200 rounded-lg border border-cyan-400 focus:ring-2 focus:ring-cyan-500"
              >
                IN
              </button>
              {isOpen && <LanguageSelector onClose={() => setIsOpen(false)} />}

              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => { }}
                    className="px-4 py-2 text-sm text-white rounded-xl font-medium border border-cyan-200  hover:bg-gradient-to-r from-cyan-500 to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    Create Offer
                  </button>
                  <button
                    onClick={() => { }}
                    className="px-3 py-2 text-sm text-white rounded-xl font-medium border border-cyan-200  hover:bg-gradient-to-r from-cyan-500 to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    <i className="fa-solid fa-message"></i>
                  </button>
                  <button className="px-3 py-2 text-sm text-white rounded-xl font-medium border border-cyan-200  hover:bg-gradient-to-r from-cyan-500 to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                    <i className="fa-solid fa-bell"></i>
                  </button>
                  <div className="relative group inline-block">
                    <button
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-5 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      tabIndex={0}
                    >
                      <i className="fa-solid fa-circle-user text-3xl"></i>

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
                    <div
                      className="absolute right-0 mt-2 w-48 bg-zinc-800 text-zinc-300 rounded-lg shadow-lg
               opacity-0 invisible group-hover:opacity-100 group-hover:visible
               group-focus-within:opacity-100 group-focus-within:visible
               transition-all duration-300 z-50"
                    >
                      <button
                        onClick={() => { }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-500"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={() => { }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-500"
                      >
                        Settings
                      </button>

                      <button
                        onClick={() => { }}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="hidden md:block relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium group hover:cursor-pointer">
                      Sign in
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300 ease-out shadow-lg shadow-cyan-400/50"></span>
                    </button>
                  </Link>

                  {/* <Link href="/signup">
                    <button className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                      Register
                    </button>
                  </Link> */}
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white hover:text-cyan-400 transition-colors"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-cyan-500/20">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300 ease-out shadow-lg shadow-cyan-400/50"></span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
