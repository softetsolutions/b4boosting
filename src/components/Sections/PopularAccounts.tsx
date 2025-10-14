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

  return (
    <section className="px-4 lg:mx-12 mb-4  lg:py-10 md:px-8 mt-12 ">

        <h2 className="lg:text-3xl text-2xl mb-8 font-semibold text-foreground text-center md:block sm:hidden hidden">
        POPULAR ACCOUNTS
      </h2>

      {/* ✅ Mobile Only: SeeMore Logic */}
      <div className="block md:hidden">
        <SeeMore
        title="POPULAR ACCOUNTS"
          data={accounts}
          initialVisible={2} // show 2 items by default on mobile
          renderItem={(account, index) => (
            <div key={index} className="relative group overflow-hidden rounded-md">
              <Image
                src={account.src}
                alt={account.title}
                width={200}
                height={200}
                className="object-cover w-full h-20"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
                {account.title}
              </div>
            </div>
          )}
        />
      </div>

      {/* ✅ Desktop: Show All Without Toggle */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account, index) => (
          <div key={index} className="relative group overflow-hidden rounded-md">
            <Image
              src={account.src}
              alt={account.title}
              width={200}
              height={200}
              className="object-cover w-full h-20"
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

