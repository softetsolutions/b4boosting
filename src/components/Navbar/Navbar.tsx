// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import LanguageSelector from "../LanguageSelector";
// import ThemeToggle from "../ThemeToggle";

// const dummyNavbarOptions = [
//   { label: 'Currency', link: '#currency' },
//   { label: 'Account', link: '#account' },
//   { label: 'Top Ups', link: '#topups' },
//   { label: 'Item', link: '#item' },
//   { label: 'Boosting', link: '#boosting' },
//   { label: 'Gift Cards', link: '#gift-card' },
// ]

// const Navbar = ({
//   isLoggedIn,
//   role,
// }: {
//   isLoggedIn: boolean;
//   role: string;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const menuItems = [
//   { label: "Account", href: "/account" },
//   { label: "Boosting", href: "/boosting" },
//   { label: "Games", href: "/games" },
// ];

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   //   const handleLogout = async () => {
//   //     try {
//   //       await logout();
//   //       setisloggedIn(false);
//   //       toast.success("Logged out successfully!");
//   //       navigate("/");
//   //     } catch (error) {
//   //       console.error("Logout error:", error);
//   //       toast.error("Logout failed. Please try again.");
//   //     }
//   //   };

//   return (
//     <nav
//       className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
//     >
//       <div className="max-w-11xl mx-auto px-4  rounded-[20px] p-3">
//         <div
//           className="transition-all duration-300"
//         >
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="bg-gradient-to-r from-cyan-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-cyan-500/20">
//                 <img
//                   src="/svgIcons/LogoIcon.svg"
//                   alt="Logo"
//                   className="w-6 h-6"
//                 />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
//                   GameStore
//                 </h1>
//                 <p className="text-xs text-amber-100">Pro Gaming Services</p>
//               </div>
//             </div>
//             <div className="flex gap-4">
//               {dummyNavbarOptions.map((option) => (
//                 // <Link href={option.link}>
//                 //   <span className="text-base font-sans">{option.label}</span></Link>
//                 <div key={option.link} className="relative group">
//                   <Link href={option.link}>
//                     <span className="text-base font-sans">{option.label}</span>
//                   </Link>
//                   <div className="absolute left-0 top-full mt-2 hidden group-hover:block border p-2 shadow-lg z-10">
//                     links content yha dalne hai as per eldorado.
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex items-center space-x-4">

//                <ThemeToggle />

//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="px-4 py-2 text-sm text-zinc-200 rounded-lg border border-cyan-400 focus:ring-2 focus:ring-cyan-500"
//               >
//                 IN
//               </button>
//               {isOpen && <LanguageSelector onClose={() => setIsOpen(false)} />}

//               {isLoggedIn ? (
//                 <>
//                   <button
//                     onClick={() => { }}
//                     className="px-4 py-2 text-sm text-white rounded-xl font-medium border border-cyan-200  hover:bg-gradient-to-r from-cyan-500 to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
//                   >
//                     Create Offer
//                   </button>
//                   <button
//                    type="button"
//                     onClick={() => { }}
//                     className="px-3 py-2 text-sm text-white rounded-xl font-medium border border-cyan-200  hover:bg-gradient-to-r from-cyan-500 to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
//                   >
//                     <i className="fa-solid fa-message"></i>
//                   </button>
//                   <button  type="button" className="px-3 py-2 text-sm text-white rounded-xl font-medium border border-cyan-200  hover:bg-gradient-to-r from-cyan-500 to-blue-700 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
//                     <i className="fa-solid fa-bell"></i>
//                   </button>
//                   <div className="relative group inline-block">
//                     <button
//                      type="button"
//                       className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800  text-white font-semibold px-5 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
//                       tabIndex={0}
//                     >
//                       <i className="fa-solid fa-circle-user text-3xl"></i>

//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </button>
//                     <div
//                       className="absolute right-0 mt-2 w-48 bg-zinc-800 text-zinc-300 rounded-lg shadow-lg
//                opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                group-focus-within:opacity-100 group-focus-within:visible
//                transition-all duration-300 z-50"
//                     >
//                       <button
//                         onClick={() => { }}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-500"
//                       >
//                         View Profile
//                       </button>

//                       <button
//                         onClick={() => { }}
//                         className="w-full text-left px-4 py-2 hover:bg-gray-500"
//                       >
//                         Settings
//                       </button>

//                       <button
//                         onClick={() => { }}
//                         className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <Link href="/login">
//                     <button className="hidden md:block relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium group hover:cursor-pointer">
//                       Sign in
//                       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300 ease-out shadow-lg shadow-cyan-400/50"></span>
//                     </button>
//                   </Link>

//                   {/* <Link href="/signup">
//                     <button className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
//                       Register
//                     </button>
//                   </Link> */}
//                 </>
//               )}

//               {/* Mobile Menu Button */}
//               <button
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="md:hidden text-white hover:text-cyan-400 transition-colors"
//               >
//                 {isMenuOpen ? (
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pt-4 border-t border-cyan-500/20">
//             <div className="flex flex-col space-y-3">
//               {menuItems.map((item) => (
//                 <a
//                   key={item.href}
//                   href={item.href}
//                   className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-medium group"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.label}
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300 ease-out shadow-lg shadow-cyan-400/50"></span>
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import bannerImg from "src/assets/images/banner.svg";
import ThemeToggle from "../ThemeToggle";
import LanguageSelector from "../LanguageSelector";
import { SettingsIcon, SearchIcon, Menu,X } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const dummyNavbarOptions = [
  { label: "Currency", link: "#currency" },
  { label: "Accounts", link: "#account" },
  { label: "Top Ups", link: "#topups" },
  { label: "Items", link: "#item" },
  { label: "Boosting", link: "#boosting" },
  { label: "Gift Cards", link: "#gift-card" },
];

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="relative w-full">
      {/* Banner */}
      <div className="relative w-full">
        <Image
          src={bannerImg}
          alt="Banner"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 pt-15">
          <h1 className="lg:text-4xl md:text-4xl text-2xl font-bold text-white lg:mb-4 md:mb-4 sm:mb-2 transition-all">
            Welcome to GameStore
          </h1>
          <p className="text-white sm:text-lg lg:text-lg lg:mb-6 md:mb-4 sm:mb-2 mb-2">
            Pro Gaming Services at Your Fingertips
          </p>
          <Link href="/boosting">
            <button type="button" className="lg:text-2xl md:text-2xl sm:text-lg  yellow-bg text-zinc-950 lg:px-16 md:px-12 sm:px-5 px-5  lg:py-3 py-1  rounded-xl font-bold shadow-lg transition-all duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-black/60" : "bg-transparent"
        }`}
      >
        <div className="max-w-11xl mx-auto px-4 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-0">
          {/* Top row: Logo + Hamburger */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div className="flex items-center space-x-7">
              <div className="bg-gradient-to-r yellow-bg p-2 rounded-xl shadow-lg shadow-cyan-500/20">
                <img
                  src="/svgIcons/LogoIcon.svg"
                  alt="Logo"
                  className="w-6 h-6"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl yellow-text font-bold bg-clip-text text-transparent">
                  GameStore
                </h1>
                <p className="text-xs text-amber-100">Pro Gaming Services</p>
              </div>
            </div>

            {/* Hamburger icon for mobile */}
            <button
              type="button"
              className="lg:hidden text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X/>
              ) : (
               <Menu />
              )}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center xl:gap-10 lg:gap-6">
            {dummyNavbarOptions.map((option) => (
              <Link
                key={option.link}
                href={option.link}
                className="text-xl text-white hover:text-yellow-400 transition-colors duration-200 font-medium relative group"
              >
                {option.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Right Items */}
          <div className="hidden lg:flex flex-row items-center gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
              <SearchIcon />
              <input
                type="text"
                className="bg-transparent border-none outline-none text-white placeholder-white/70"
                placeholder="Search ..."
              />
            </div>

            {/* Language selector */}
            {/* <LanguageSelector /> */}

            {/* Login */}
            {!isLoggedIn && (
              <Link href="/login">
                <button className="rounded-lg px-3 py-2 yellow-bg text-zinc-950 font-semibold hover:text-white-400 transition-colors duration-200">
                  Sign In
                </button>
              </Link>
            )}

            {/* Settings */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
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
                  {isLoggedIn && (
                    <button
                     type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  )}
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-500">
                    Profile
                  </button>
                 
                  <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-500 cursor-pointer">
                    <ThemeToggle />
                  </div>
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
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors w-full">
                <SearchIcon />
                <input
                  type="text"
                  className="bg-transparent border-none outline-none w-full text-white placeholder-white/70"
                  placeholder="Search ..."
                />
              </div>

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
                  className="flex items-center justify-between text-white font-semibold px-4 py-2 rounded-xl shadow-lg bg-white/10 hover:bg-white/20"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                >
                  <span>Settings</span>
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
                    <button className="text-white hover:text-yellow-400 text-left">
                      Profile
                    </button>
                   
                    <ThemeToggle />
                  </div>
                )}
              </div>

              {/* Language Selector */}
              {/* <div>
                <LanguageSelector />
              </div> */}

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
  );
};

export default Navbar;
