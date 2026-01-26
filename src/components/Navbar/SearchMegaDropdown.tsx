"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavbarItem } from "./Navbar";

interface Props {
  navbarData: NavbarItem[];
  onClose: () => void;
}

export default function SearchMegaDropdown({ navbarData, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const allItems = navbarData.flatMap((service) =>
    service.items.map((item) => ({
      ...item,
      categoryLabel: service.label, // for UI
      categoryKey: service.key, // for logic (IMPORTANT)
    })),
  );

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const baseItems = searchTerm ? filteredItems : allItems;

  const visibleItems = baseItems
    .filter((item) =>
      activeCategory ? item.categoryKey === activeCategory : true,
    )
    .slice(0, 9);

  useEffect(() => {
    if (searchTerm) setActiveCategory(null);
  }, [searchTerm]);

  return (
    <div
      ref={ref}
      className="absolute top-full mt-3 w-[calc(100vw-2rem)] md:w-[900px] left-4 right-4 md:left-auto
       bg-zinc-900 rounded-xl shadow-2xl  p-4 md:p-6 z-50
       max-h-[80vh] overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Categories */}
        <div className="md:col-span-3 md:border-r border-white/10">
          <p className="hidden md:block text-sm text-gray-400 mb-3">
            Categories
          </p>

          <div className="flex md:block gap-2 overflow-x-auto pb-2 md:pb-0">
            {navbarData.map((service) => (
              <button
                type="button"
                key={service.key}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === service.key ? null : service.key,
                  )
                }
                className={`whitespace-nowrap px-3 py-2 rounded text-sm mt-2 mx-2
    ${
      activeCategory === service.key
        ? "bg-yellow-400 text-black"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search + Results */}
        <div className="md:col-span-9 mt-4 md:mt-0">
          <input
            autoFocus
            type="text"
            placeholder="Search Valorant boosting, PUBG UC…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg bg-black/50 text-white outline-none"
          />

          <p className="text-sm text-gray-400 mb-3">
            {searchTerm ? "Results" : "Popular"}
          </p>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
 gap-4 max-h-[320px] overflow-auto"
          >
            {visibleItems.map((item) => (
              <Link
                key={item.slug}
                href={item.slug}
                onClick={onClose}
                className="flex gap-3 p-3 bg-white/5 rounded-lg hover:bg-yellow-400 hover:text-black transition"
              >
                <Image
                  src={item.image || "/images/fallback.png"}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="flex-shrink-0 rounded"
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs opacity-70">{item.categoryLabel}</p>
                </div>
              </Link>
            ))}

            {searchTerm && filteredItems.length === 0 && (
              <p className="col-span-3 text-sm text-gray-400">
                No results found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
