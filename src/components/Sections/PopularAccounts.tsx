"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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



interface Account {
  name: string;
  src: string;
}

const accounts= [
   { src: clashRoyale, title: "Clash Royale" },
  { src: cod, title: "Call of Duty" },
  { src: valorant, title: "Valorant" },
  {  title:  "Rainbow Six", src: rainbowsix },
  { title:  "Roblox", src: roblox },
  {  title:  "Grand Theft Auto", src: grandTheft },
  {  title:  "League of Legends", src: leagueOfLegends },
  {  title:  "Old School Runescape", src: oldSchool },
  {  title:  "Counter Strike", src: counterStrike },
  {  title:  "Fortnite", src: fortnite },
];

export default function PopularAccounts() {
 const [visible, setVisible] = useState(10);
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
    <section className="px-4 lg:mx-12  py-10 md:px-8 mt-12 ">
      {/* Header Section */}
       <h2 className="text-3xl mb-4 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden">
          POPULAR ACCOUNTS
        </h2>
      <div className="flex items-center justify-between  mb-6 ">
        <h2 className="text-xl font-semibold text-foreground text-center sm:block lg:hidden md:hidden">
          POPULAR ACCOUNTS
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
            className="relative group overflow-hidden rounded-md"
          >
            <Image
              src={account.src}
              alt={account.title}
              width={200}
              height={200}
              className="object-cover w-full h-20 "
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
              {account.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
