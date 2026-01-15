"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import backgroundImg from "src/assets/images/boostingServices.svg";
import { useRouter } from "next/navigation";
import type { HomePageData } from "src/api/types";

interface PopularBoostingServicesProps {
  dynamicdata: HomePageData;
}

export default function PopularBoostingServices({
  dynamicdata,
}: PopularBoostingServicesProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);
 const boostingServices = dynamicdata?.services.find(
    (s) => s.name === "boosting-services"
  );

  const services = boostingServices?.products;

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services?.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [ services?.length]);

  // Get visible cards (previous, current, next)
  const getVisibleCards = () => {
    const prev = (currentIndex - 1 + services?.length) % services?.length;
    const next = (currentIndex + 1) % services?.length;
    return [prev, currentIndex, next];
  };

  const visibleCards = getVisibleCards();

  return (
    <section
      className="relative py-16 px-6 lg:px-16 flex flex-col items-center justify-center bg-center bg-cover overflow-hidden opacity-80"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Title */}
      <h2 className="relative text-3xl md:text-4xl font-semibold text-white mb-10 text-center z-10 hidden md:block lg:block">
        Popular Boosting Services
      </h2>

      {/* Carousel */}
      <div className="relative flex justify-center items-center gap-4 md:gap-8 z-10">
        {visibleCards?.map((index) => {
          const service = services?.[index];
          if (!service) return null;
          const isCenter = index === currentIndex;
          return (
            <div
              key={service._id}
              className={`relative transition-all duration-500 ${
                isCenter
                  ? "scale-110 opacity-100 z-20"
                  : "scale-90 opacity-50 z-10 bg-black/100 "
              }`}
               onClick={() =>
              router.push(`/categories/${boostingServices?.name}/${service._id}`)
            }
            >
              <div className="w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px]  overflow-hidden shadow-lg bg-black/100 backdrop-blur-md  text-white text-center ">
                <Image
                  src={service?.images[0] || "/images/fallback.png"}
                  alt={service?.title}
                  width={500}
                  height={500}
                  className="object-fit w-full h-60"
                />
              </div>
              <div className="p-3 bg-black/100 text-center mt-2 mx-5">
                <h3 className="text-[20px] font-semibold">{service.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2 z-10">
        {services?.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
