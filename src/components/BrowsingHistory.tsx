"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Define your API type
export interface ApiOffer {
  _id: string;
  price: number;
  currency: string;
  images?: string[];
  product?: {
    title?: string;
  };
  seller?: {
    displayName?: string;
    username?: string;
  };
}

function BrowsingHistory() {
  const [history, setHistory] = useState<ApiOffer[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure browser environment
    const key = "browsing_history";
    try {
      const data = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(data)) {
        setHistory(data);
      }
    } catch (err) {
      console.error("Failed to load browsing history:", err);
      setHistory([]);
    }
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-5xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl text-white font-bold w-[90%] text-center">
            Browsing History
          </h2>
          <button
            onClick={() => {
              if (typeof window === "undefined") return;
              localStorage.removeItem("browsing_history");
              setHistory([]);
            }}
            className="text-sm text-blue-500 hover:underline"
            type="button"
            aria-label="Remove all"
          >
            Remove all
          </button>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-wrap gap-4 justify-start">
          {history.map((offer) => (
            <div
              key={offer._id}
              className="relative w-[180px] bg-zinc-900 border border-cyan-500/10 rounded-xl shadow-md transition-transform hover:scale-[1.02]"
            >
              {/* Remove single item */}
              <button
                type="button"
                aria-label="Remove"
                onClick={() => {
                  const updated = history.filter(
                    (item) => item._id !== offer._id
                  );
                  setHistory(updated);
                  if (typeof window !== "undefined") {
                    localStorage.setItem(
                      "browsing_history",
                      JSON.stringify(updated)
                    );
                  }
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 text-xl font-bold"
              >
                ×
              </button>

              <Image
                src={offer.images?.[0] || "/fallback-imgjpg.jpg"}
                alt={offer.product?.title || "Offer"}
                width={400}
                height={96}
                className="w-full h-24 object-cover rounded-t-lg"
              />

              <div className="p-2 inset-0 bg-gradient-to-b from-transparent to-black/30 text-white">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{offer.product?.title}</p>
                  <p className="text-xs">
                    {offer.price} {offer.currency}
                  </p>
                </div>

                <div className="flex items-center mt-2">
                  <Image
                    src="/default-avatar.png"
                    alt="Seller"
                    width={20}
                    height={20}
                    className="rounded-full object-cover mr-2"
                  />
                  <p className="text-xs truncate">
                    {offer.seller?.displayName || offer.seller?.username}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrowsingHistory;
