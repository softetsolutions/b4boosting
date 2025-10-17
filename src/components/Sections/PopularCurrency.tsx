import Image from "next/image";
import SeeMore from "../seeMore";

import pathExile from "src/assets/images/pathExileImg.jpg";
import sportsImg from "src/assets/images/sportsImg.jpg";
import worldOfwarcraft from "src/assets/images/worldOfwarcraftImg.jpg";
import oldSchool from "src/assets/images/oldSchoolImg.jpg";
import roblox from "src/assets/images/robloxImg.jpg";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

interface Account {
  name: string;
  src: string;
}

const accounts = [
  { title: "Old School RuneScape Gold", src: oldSchool },
  { title: "Roblox Robux", src: roblox },
  { src: pathExile, title: "Path of Exile 2 Currency" },
  { src: worldOfwarcraft, title: "World of Warcraft Gold" },
  { src: sportsImg, title: "EA Sports FC Coins" },
];

export default function PopularAccounts() {
  const [isMobile, setIsMobile] = useState(false);

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

  const handleToggle = () => {
    if (isMobile) {
    }
  };

  return (
    <section className="px-4 lg:py-10 md:px-8 mt-10 lg:mx-12">
      {/* Header Section */}
      <h2 className="text-3xl mb-4 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden ">
        POPULAR CURRENCY
      </h2>
      <div className="flex items-center justify-between mb-6 ">
        <h2 className="text-xl font-semibold text-foreground sm:block lg:hidden md:hidden">
          POPULAR CURRENCY
        </h2>

        <button
          type="button"
          onClick={handleToggle}
          className="text-sm font-medium yellow-text hover:underline"
        >
          See All
        </button>
      </div>

      {/* Grid Container */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
          overflow-x-auto scrollbar-hide
          justify-center
        "
      >
        {accounts.map((account, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg"
            onClick={() => redirect("/categories/Account/PUBG")}
          >
            <Image
              src={account.src}
              alt={account.title}
              className="object-fit w-full h-70 "
            />
            <div className="py-4 bg-black opacity-90 flex items-center justify-center text-white font-semibold text-lg">
              {account.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
