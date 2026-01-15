"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const Footer = () => {
  const [hoverEffect, setHoverEffect] = useState(false);

  // Trigger animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setHoverEffect(true);
      setTimeout(() => setHoverEffect(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    {
      icon: "svgIcons/facebook.svg",
      href: "#",
      label: "Facebook",
      hoverClass: "group-hover:text-[#1877F2]",
    },
    {
      icon: "svgIcons/instagram.svg",
      href: "#",
      label: "Instagram",
      hoverClass: "group-hover:text-[#E4405F]",
    },
    {
      icon: "svgIcons/twitter.svg",
      href: "#",
      label: "Twitter",
      hoverClass: "group-hover:text-[#1DA1F2]",
    },
    {
      icon: "svgIcons/youtube.svg",
      href: "#",
      label: "YouTube",
      hoverClass: "group-hover:text-[#FF0000]",
    },
    {
      icon: "svgIcons/discord.svg",
      href: "#",
      label: "Discord",
      hoverClass: "group-hover:text-[#5865F2]",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Gaming Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
            backgroundBlendMode: "color-burn",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30 z-10"></div>
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-cyan-500 blur-xl transition-all duration-1000 ease-in-out ${
          hoverEffect ? "opacity-40 w-96" : "opacity-20 w-64"
        } z-10`}
      ></div>
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5 z-0">
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
          <path d="M7.5 12a.75.75 0 01-.75-.75v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5a.75.75 0 011.5 0v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-.75.75zm7.5-6a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm3-1.5h12a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H6A1.5 1.5 0 014.5 18V6A1.5 1.5 0 016 4.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="absolute top-10 left-10 w-48 h-48 opacity-5 z-0 rotate-12">
        <svg viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
          <path d="M14.25 6c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM17.25 6c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM14.25 9c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM17.25 9c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM14.25 12c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM17.25 12c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM14.25 15c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM17.25 15c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM10 6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1zM6 7c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Company Info*/}
          <div className="relative">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-r yellow-bg p-2 rounded-xl shadow-lg shadow-cyan-500/20">
                <Image
                  src="/svgIcons/LogoIcon.svg"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r yellow-bg bg-clip-text text-transparent">
                GameStore
              </h3>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Professional gaming services for competitive players. Elevate your
              gameplay with our premium boosting, account, and coaching services
              tailored for serious gamers.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-5">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300 group relative"
                  aria-label={social.label}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="absolute inset-0 rounded-full blur-md"
                      style={{
                        background:
                          social.label === "Facebook"
                            ? "rgba(24, 119, 242, 0.3)"
                            : social.label === "Instagram"
                            ? "rgba(228, 64, 95, 0.3)"
                            : social.label === "Twitter"
                            ? "rgba(29, 161, 242, 0.3)"
                            : social.label === "YouTube"
                            ? "rgba(255, 0, 0, 0.3)"
                            : "rgba(88, 101, 242, 0.3)",
                      }}
                    />
                  </div>
                  <div className="relative w-5 h-5">
                    <Image
                      src={social.icon || "/svgIcons/facebook.svg"}
                      alt={social.label}
                      fill
                      className={`object-contain transition-colors relative z-10 ${social.hoverClass}`}
                    />
                  </div>
                </a>
              ))}
            </div>
            {/* <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-50"></div> */}
          </div>

          {/* Quick Links */}
          <div className="relative">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b yellow-bg rounded-full mr-3"></span>
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
              {[
                "Home",
                "About Us",
                "Services",
                "Games",
                "Blog",
                "Contact",
                "FAQ",
                "Support",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-amber-400 transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
            {/* <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-50"></div> */}
          </div>

          {/* Services*/}
          <div className="relative">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b yellow-bg rounded-full mr-3"></span>
              Our Services
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  name: "Game Boosting",
                  icon: "/svgIcons/boostingArrow.svg",
                },
                {
                  name: "Account Sales",
                  icon: "/svgIcons/userIcon.svg",
                },
                {
                  name: "In-Game Currency",
                  icon: "/svgIcons/currencyIcon.svg",
                },
                {
                  name: "Pro Coaching",
                  icon: "/svgIcons/coachIcon.svg",
                },
                {
                  name: "Tournaments",
                  icon: "/svgIcons/tournamentIcon.svg",
                },
              ].map((service, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex items-center p-3 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-cyan-500/40 hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center mr-3 group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-300">
                    <div className="relative w-4 h-4">
                      <Image
                        src={service.icon || "/svgIcons/boostingArrow.svg"}
                        alt=""
                        fill
                        className="object-contain transition-colors"
                      />
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-amber-400 transition-colors text-sm">
                    {service.name}
                  </span>
                </a>
              ))}
            </div>
            {/* <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-50"></div> */}
          </div>
        </div>

        {/* Bottom Bar  */}
        <div className="pt-8 mt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()}{" "}
            <span className="yellow-text">GameStore</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-amber-400 transition-colors text-sm"
                >
                  {link}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
