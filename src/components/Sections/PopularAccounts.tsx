import Image from "next/image";
import SeeMore from "../seeMore";
import clashRoyale from "src/assets/images/clashRoyale.jpg";
import cod from "src/assets/images/cod.png";
import valorant from "src/assets/images/valorant.png";
import rainbowsix from "src/assets/images/rainbowsix.png";
import roblox from "src/assets/images/roblox.png";
import grandTheft from "src/assets/images/grandTheft.png";
import leagueOfLegends from "src/assets/images/leagueOfLegends.png";
import oldSchool from "src/assets/images/oldSchool.png";
import counterStrike from "src/assets/images/counterStrike.jpg";
import fortnite from "src/assets/images/fortnite.jpg";
import { useEffect, useState } from "react";

interface Account {
  name: string;
  src: string;
}

const accounts = [
  { src: clashRoyale, title: "Clash Royale" },
  { src: cod, title: "Call of Duty" },
  { src: valorant, title: "Valorant" },
  { title: "Rainbow Six", src: rainbowsix },
  { title: "Roblox", src: roblox },
  { title: "Grand Theft Auto", src: grandTheft },
  { title: "League of Legends", src: leagueOfLegends },
  { title: "Old School Runescape", src: oldSchool },
  { title: "Counter Strike", src: counterStrike },
  { title: "Fortnite", src: fortnite },
];

export default function PopularAccounts() {
  const [isMobile, setIsMobile] = useState(false);
const [currentSlide, setCurrentSlide] = useState(0);
  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    const totalSlides = Math.ceil(accounts.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Slice for mobile (2 per slide)
  const displayedAccounts = isMobile
    ? accounts.slice(currentSlide * 2, currentSlide * 2 + 2)
    : accounts;

  return (
    <section className="px-4 lg:mx-12 mb-4  lg:py-10 md:px-8 mt-12 ">
      {/* Header Section */}
      <h2 className="text-3xl mb-4 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden">
        POPULAR ACCOUNTS
      </h2>
       <h2 className="text-xl font-semibold text-foreground text-center sm:block lg:hidden md:hidden mb-2">
          POPULAR ACCOUNTS
        </h2>
      <div className="mb-1 flex items-center justify-end-safe">
       

        <button
          type="button"
          className="text-sm font-medium yellow-text hover:underline text-end"
          onClick={() => {}}
        >
          See All
        </button>
      </div>

      {/* Grid Container */}
      <div
        className="
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4
          overflow-x-auto scrollbar-hide
          justify-center
        "
      >
        {displayedAccounts?.map((account, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-md"
          >
            <Image
              src={account.src}
              alt={account.title}
              width={200}
              height={200}
              className="object-fit w-full  h-full"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
              {account.title}
            </div>
          </div>
        ))}
      </div>

       {/* Dots Indicator for mobile */}
      {isMobile && (
        <div className="flex items-center justify-center gap-2 mt-4 mb-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
            type="button"
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-yellow-400 scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
}
