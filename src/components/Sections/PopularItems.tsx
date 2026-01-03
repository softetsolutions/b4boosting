"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import popularItem1 from "src/assets/images/popularItem1.jpg";
import popularItem2 from "src/assets/images/popularItem2.jpg";

import searchIcon from "src/assets/svgIcons/search.svg";
import back2game from "src/assets/svgIcons/back2game.svg";
import dollar from "src/assets/svgIcons/dollar.svg";
import orderReceived from "src/assets/svgIcons/orderReceived.svg";

import visa from "src/assets/images/visa.svg";
import mastercard from "src/assets/images/mastercard.png";
import americanExpress from "src/assets/images/americanExpress.svg";
import gpay from "src/assets/images/gpay.svg";
import paypal from "src/assets/images/paypal.png";
import amex from "src/assets/images/amex.svg";
import applepay from "src/assets/images/applepay.svg";
import discover from "src/assets/images/discover.jpg";
import { ArrowRightIcon } from "lucide-react";
import hours from "src/assets/images/24hours.svg";
import badge1 from "src/assets/images/badge1.svg";
import chooseImage from "src/assets/images/chooseImage.jpg";

interface Product {
  _id: string;
  title: string;
  images?: string;
  // description?: string;
}

interface Service {
  _id: string;
  name: string;
  icon?: string;
  products: Product[];
}

interface HomePageData {
  services: Service[];
  settings: any;
}

interface PopularItemsProps {
  dynamicdata: HomePageData;
}

const options = ["Currency", "Accounts", "Top Ups", "Boosting"];

const orderEasily = [
  {
    src: searchIcon,
    title: "Find The Best Products",
    desc: "Thousands of offers available.",
  },
  { src: dollar, title: "Make a Payment", desc: "Secure payment guarantee." },
  {
    src: orderReceived,
    title: "Receive Your Order",
    desc: "Thousands of offers available.",
  },
  {
    src: back2game,
    title: "Back To Game",
    desc: "Try out your new gear today.",
  },
];

const support = [
  {
    src: badge1,
    title: "Money-Back Guarantee",
    desc: "Receive your order or get a refund. Feel safe with full trading protection!",
  },
  {
    src: hours,
    title: "24/7 Live Support",
    desc: "Eldorado support works around the clock. Contact us at any time!",
  },
];

const paymentImages = [
  { src: visa, title: "visa" },
  { src: paypal, title: "paypal" },
  { src: amex, title: "amex" },
  { src: mastercard, title: "mastercard" },
  { src: americanExpress, title: "American Express" },
  { src: gpay, title: "Gpay" },
  { src: applepay, title: "Apple Pay" },
  { src: discover, title: "Discover" },
];

export default function PopularItems({ dynamicdata }: PopularItemsProps) {
  const Items = dynamicdata?.services.find((s) => s.name === "items");

  const accounts = Items?.products;
  const [visible, setVisible] = useState(5);
  const [orderVisible, setOrderVisible] = useState(4);

  const [isMobile, setIsMobile] = useState(false);
  const maxVisible = 6;
  const extraCount = paymentImages.length - maxVisible;
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

  const handleToggleOrder = () => {
    if (isMobile) {
      setOrderVisible((prev) => (prev === 2 ? orderEasily.length : 2));
    }
  };

  return (
    <>
      <section className="px-4 py-10 md:px-8 mt-10 lg:mx-12 ">
        {/* Header Section */}
        <h2 className="text-3xl mb-4 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden ">
          POPULAR ITEMS
        </h2>
        <h2 className="text-xl mb-2 font-semibold text-foreground text-center sm:block lg:hidden md:hidden">
          POPULAR ITEMS
        </h2>
        <div className="flex items-center justify-end-safe mb-1">
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
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2
   justify-self-center
    overflow-x-auto scrollbar-hide   
        "
        >
          {accounts.slice(0, visible).map((account, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg"
            >
              <Image
                src={account?.images[0]}
                alt={account?.title}
                className="object-cover w-full h-[10.5rem] sm:h-[10.5rem] lg:h-[17.5rem] md:h-[12.5rem] rounded-lg"
                width={200}
                height={200}
              />
              <div className="py-4 bg-black/100 opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
                {account.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 lg:px-0 ">
        <h2 className="text-3xl my-4 font-semibold text-foreground text-center ">
          SAFE AND EASY TRADING
        </h2>

        <p className="text-[20px] font-medium text-foreground text-center">
          Trade without fear - Eldorado guarantees that all trades are legit and
          keeps you safe from scammers.
        </p>
        <p className="text-[20px] font-medium text-foreground text-center">
          It's quick and easy - find the best product for your favorite game,
          make a payment, receive your order, and get back to playing.
        </p>
        <p className="text-[20px] font-medium text-foreground text-center">
          Join us today to level up your gaming experience!
        </p>
      </section>

      <section className="px-4 py-10 md:px-8 mt-10 lg:mx-12 ">
        {/* Header Section */}
        <h2 className="text-3xl mb-6 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden ">
          ORDER EASILY
        </h2>
        <h2 className="text-xl font-semibold text-foreground sm:block lg:hidden md:hidden text-center mb-6">
          ORDER EASILY
        </h2>
        {/* <div className="flex items-center justify-between mb-6 flex-wrap">      
          {isMobile && (
            <button
              type="button"
              onClick={handleToggleOrder}
              className="text-sm font-medium yellow-text hover:underline"
            >
              {orderVisible === 2 ? "See All" : "See Less"}
            </button>
          )}
        </div> */}

        {/* Grid Container   xl:mx-100 lg:mx-70 md:mx-50*/}
        <div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4
    justify-self-center
    overflow-x-auto scrollbar-hide

 "
        >
          {orderEasily.slice(0, orderVisible).map((order, index) => (
            <div
              key={index}
              className=" border-zinc-600 border-3 relative group overflow-hidden rounded-lg bg-black/100 px-1  lg:px-15 flex items-center flex-col py-4 lg:py-10"
            >
              <Image
                src={order.src}
                alt={order.title}
                className="object-fit w-20 h-20 mb-5"
              />
              <p className=" flex items-center justify-center text-white font-semibold text-lg text-center">
                {order.title}
              </p>
              <p className="text-md flex items-center justify-center text-white text-center text-medium">
                {order.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex justify-center items-center my-10 px-4 md:px-8">
        <div className="relative w-200 h-200 rounded-xl overflow-hidden">
          {/* Background Image */}
          <Image
            src={chooseImage}
            alt="Choose Background"
            fill
            className="object-cover w-full h-full"
            priority
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 px-4">
            {/* Top text */}
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
              CHOOSE FROM
            </h2>

            {/* Stacked grey blocks */}
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-2xl py-5">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-700 opacity-80 text-white text-center py-10 rounded-lg font-semibold text-lg md:text-xl shadow-md"
                >
                  {opt}
                </div>
              ))}
            </div>

            {/* Bottom text */}
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg mt-4">
              SELLERS
            </h2>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 mt-10 lg:mx-24 ">
        <div
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4
    justify-self-center
    overflow-x-auto scrollbar-hide
    "
        >
          {support.map((support, index) => (
            <div
              key={index}
              className="mb-10 border-zinc-600 border-2 relative group overflow-hidden rounded-lg bg-black/100 px-5 
        flex flex-col lg:flex-row items-center justify-between py-10"
            >
              <Image
                src={support.src}
                alt={support.title}
                className="object-fit w-55 h-35 mb-4 md:mb-2"
              />

              <div className="flex items-center justify-center text-white font-semibold text-lg flex-col mx-4 text-center">
                <p>{support.title}</p>
                <p className="text-md flex items-center justify-center text-center py-5 text-zinc-500 ">
                  {support.desc}
                </p>
                <p className="flex items-center justify-center text-xl">
                  Learn More{" "}
                  <ArrowRightIcon className="w-4 h-4 mx-2 yellow-text" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-3.5 px-4 flex items-center justify-center">
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {paymentImages.slice(0, maxVisible).map((img, idx) => (
            <div
              key={idx}
              className="w-22 h-12  overflow-hidden flex-shrink-0 px-2"
            >
              <Image
                src={img.src}
                alt={`img-${idx}`}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
          ))}

          {extraCount > 0 && (
            <div className="rounded-md flex items-center justify-center text-gray-700 text-sm font-medium flex-shrink-0">
              +{extraCount} more
            </div>
          )}
        </div>
      </section>
    </>
  );
}
