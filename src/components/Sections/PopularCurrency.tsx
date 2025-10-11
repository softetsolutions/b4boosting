"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import pathExile from "src/assets/images/pathExileImg.jpg";
import sportsImg from "src/assets/images/sportsImg.jpg";
import worldOfwarcraft from "src/assets/images/worldOfwarcraftImg.jpg";
import oldSchool from "src/assets/images/oldSchoolImg.jpg";
import roblox from "src/assets/images/robloxImg.jpg";




interface Account {
  name: string;
  src: string;
}

const accounts= [
  {  title:  "Old School RuneScape Gold", src: oldSchool },
  { title:  "Roblox Robux", src: roblox },
   { src: pathExile, title: "Path of Exile 2 Currency" },
  { src: worldOfwarcraft, title: "World of Warcraft Gold" },
    { src: sportsImg, title: "EA Sports FC Coins" },
];

export default function PopularAccounts() {
 const [visible, setVisible] = useState(5);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setVisible(2);
      } else {
        setIsMobile(false);
        setVisible(accounts.length);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setVisible((prev) => (prev === 2 ? accounts.length : 2));
    }
  };

  return (
    <section className="px-4 py-10 md:px-8 mt-10 lg:mx-12">
      {/* Header Section */}
       <h2 className="text-3xl mb-4 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden ">
          POPULAR CURRENCY
        </h2>
      <div className="flex items-center justify-between mb-6 ">
        <h2 className="text-xl font-semibold text-foreground sm:block lg:hidden md:hidden">
          POPULAR CURRENCY
        </h2>
       {isMobile && (
          <button
            type="button"
            onClick={handleToggle}
            className="text-sm font-medium yellow-text hover:underline"
          >
            {visible === 2 ? "See All" : "See Less"}
          </button>
        )}
      </div>

      {/* Grid Container */}
      <div
        className="
          grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4
          overflow-x-auto scrollbar-hide
          justify-center
        "
      >
        {accounts.slice(0, visible).map((account, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg"
          >
            <Image
              src={account.src}
              alt={account.title}
             
              className="object-fit w-full h-70 "
            />
            <div className="py-4 bg-black/100 opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
              {account.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
