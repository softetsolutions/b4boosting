
import Image from "next/image";
import SeeMore from "../seeMore";

import pathExile from "src/assets/images/pathExileImg.jpg";
import sportsImg from "src/assets/images/sportsImg.jpg";
import worldOfwarcraft from "src/assets/images/worldOfwarcraftImg.jpg";
import oldSchool from "src/assets/images/oldSchoolImg.jpg";
import roblox from "src/assets/images/robloxImg.jpg";

const accounts = [
  { title: "Old School RuneScape Gold", src: oldSchool },
  { title: "Roblox Robux", src: roblox },
  { title: "Path of Exile 2 Currency", src: pathExile },
  { title: "World of Warcraft Gold", src: worldOfwarcraft },
  { title: "EA Sports FC Coins", src: sportsImg },
];

export default function PopularCurrency() {
  return (
    <section className="px-4 lg:mx-12 mb-4 lg:py-10 md:px-8 mt-12">

      {/* Desktop Title */}
      <h2 className="lg:text-3xl text-2xl mb-8 font-semibold text-foreground text-center md:block sm:hidden hidden">
        POPULAR CURRENCY
      </h2>

      {/* ✅ Mobile Only: SeeMore Logic */}
      <div className="block md:hidden">
        <SeeMore
          title="POPULAR CURRENCY"
          data={accounts}
          initialVisible={1} // Show single item initially on mobile
          renderItem={(account, index) => (
            <div key={index} className="relative group overflow-hidden rounded-md">
              <Image
                src={account.src}
                alt={account.title}
                width={200}
                height={200}
                className="object-fit w-full h-70 "
              />
              <div className="py-4 bg-black opacity-90 flex items-center justify-center text-white font-semibold text-lg">
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
              // width={200}
              // height={200}
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
