"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  fetchOffersByProductAndService,
  type ApiOffer,
  type ServiceWithCount,
} from "src/api/offers";
import Link from "next/link";

interface ProductPageCompProps {
  serviceName: string;
  productTitle: string;
  initialOffers: ApiOffer[];
  initialServices: ServiceWithCount[];
}

const ProductPageComp: React.FC<ProductPageCompProps> = ({
  serviceName,
  productTitle,
  initialOffers,
  initialServices,
}) => {

  const [offers, setOffers] = useState<ApiOffer[]>(initialOffers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [servicesWithCounts, setServicesWithCounts] =
    useState<ServiceWithCount[]>(initialServices);
  const [selectedServiceName, setSelectedServiceName] =
    useState<string>(serviceName);



  const handleServiceClick = async (newServiceName: string) => {
    setSelectedServiceName(newServiceName);

    setLoading(true);
    setError(null);

    try {
      const { offers } = await fetchOffersByProductAndService(
        newServiceName,
        productTitle
      );
      setOffers(offers || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch offers.");
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers = offers.filter((offer) =>
    offer.product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [sortBy, setSortBy] = useState<"low" | "high" | "recent" | null>(null);

  const handleSort = (type: "low" | "high" | "recent") => {
    setSortBy(type);

    let sortedOffers = [...offers];

    if (type === "low") {
      sortedOffers.sort((a, b) => a.price - b.price);
    } else if (type === "high") {
      sortedOffers.sort((a, b) => b.price - a.price);
    } else if (type === "recent") {
      sortedOffers.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setOffers(sortedOffers);
  };

  const ProductCard: React.FC<{ offer: ApiOffer }> = ({ offer }) => (
    <Link
      href={`/buy/${offer._id}`}
      className="relative group border-1 border-gray-400/20 rounded-xl transition-all duration-300 overflow-hidden flex flex-col  sm:mx-auto lg:mx-0 md:mx-0 mx-auto  w-full max-w-[260px] aspect-[4/5] cursor-pointer"
    >
      {/* Background Image */}
      <div className="relative w-full h-full overflow-hidden p-5">
        <Image
          src={
            offer.images?.[0] ||
            `https://placehold.co/300x200/1E293B/FFFFFF?text=${offer.product.title.charAt(
              0
            )}`
          }
          alt={offer.product.title}
          width={300}
          height={200}
          className="w-80 h-40 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 "></div>
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {offer.quantityAvailable} in stock
        </span>
      </div>

      {/* Title */}
      <div className="w-full px-3 mt-0">
        <p className="text-md font-semibold line-clamp-1 group-hover:text-yellow-300 transition-colors">
          {offer.product.title}
        </p>
      </div>

      {/* Info boxes */}
      <div className="flex justify-self-start gap-4 mt-2 px-3">
        <div className="relative group/info text-xs  bg-gray-400/60 px-2 py-1 rounded-md hover:bg-gray-700/90 transition-all">
          <span className="whitespace-nowrap">Min. 1</span>
          <span className="absolute opacity-0 group-hover/info:opacity-100 transition-all text-[11px] bg-black/80 text-white px-2 py-1 rounded-md -top-8 left-1/2 -translate-x-1/2">
            Minimum purchase: 1
          </span>
        </div>
        <div className="relative group/info text-xs  bg-gray-400/60 px-2 py-1 rounded-md hover:bg-gray-700/90 transition-all">
          <span className="whitespace-nowrap">
            {offer.quantityAvailable} stock
          </span>
          <span className="absolute opacity-0 group-hover/info:opacity-100 transition-all text-[11px] bg-black/80 text-white px-2 py-1 rounded-md -top-8 left-1/2 -translate-x-1/2">
            Available stock: {offer.quantityAvailable}
          </span>
        </div>
        <div className="relative group/info text-xs  bg-gray-400/60 px-2 py-1 rounded-md hover:bg-gray-700/90 transition-all">
          <span className="whitespace-nowrap">{offer.deliveryTime}</span>
          <span className="absolute opacity-0 group-hover/info:opacity-100 transition-all text-[11px] bg-black/80 text-white px-2 py-1 rounded-md -top-8 left-1/2 -translate-x-1/2">
            Delivery speed: {offer.deliveryTime}
          </span>
        </div>
      </div>

      {/* Footer - Seller Info */}
      <div className="flex items-center justify-between w-full px-3 mt-2 mb-3">
        {/* Seller section */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src={offer.images?.[0] || ` https://placehold.co/40x40/1E293B/FFFFFF?text=${offer.seller.displayName?.charAt(
                0
              )}`}
              alt="Icon"
              width={40}
              height={40}
              className="rounded-full w-8 h-8 object-cover"
            />
            {offer.status && (
              <span
                className={`absolute bottom-0 right-0 w-2.5 h-2.5 border border-black rounded-full ${
                  offer.status === "active"
                    ? "bg-green-500"
                    : offer.status === "inactive"
                    ? "bg-gray-400"
                    : offer.status === "soldout"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
                title={`Status: ${offer.status}`}
              ></span>
            )}
          </div>
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold">{offer.seller.displayName}</p>
            {/* <p className="text-[11px] text-gray-400">{offer.sellerLevel}</p> */}
          </div>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className=" text-md font-bold">
            {offer.price} {offer.currency}
          </p>
        </div>
      </div>
    </Link>
  );


  return (
    <div className="min-h-screen mt-24 mb-5  px-4 sm:px-6 lg:px-8  relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <nav className="text-sm text-gray-400 mb-4">
          <Link href="/" className="hover:text-amber-400">
            Home
          </Link>{" "}
          &gt; <span className="text-amber-400">{selectedServiceName}</span>
        </nav>

        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-3">
          {/* <div className="w-9 h-9 sm:w-10 sm:h-10 yellow-bg flex justify-center items-center rounded-md mr-3 shadow-md">
            <span className="text-xl">
              {selectedServiceName || "🛒"}
            </span>
          </div> */}
          <h1 className="text-2xl sm:text-3xl font-bold">
            {selectedServiceName}
          </h1>
        </div>

        {servicesWithCounts.length > 0 && (
          <div className="py-3 overflow-x-auto">
            <ul className="flex space-y-2 justify-items-start">
              {servicesWithCounts?.map((service) => {
               
                  const isSelected = service.name === selectedServiceName;
                return (
                  <button
                    type="button"
                    key={service._id}
                    className="flex flex-col"
                    onClick={() => handleServiceClick(service.name)}
                  >
                    <li
                      className={`border-0 flex flex-row mt-6 w-25 h-25 justify-center relative rounded-4xl hover:text-black transition-shadow duration-300 overflow-hidden m-2 items-center border border-gray-600 ease-in-out hover:translate-y-1 cursor-pointer 
                         ${
              isSelected
                ? "bg-yellow-400 text-black border-yellow-400"
                : " bg-gray-400/60 text-gray-300"
            }
                        `}
                    >
                      <span>
                        <img src={service.icon} alt="icon" className="p-6" />
                      </span>
                    </li>
                    <span   className={`font-medium ${
            isSelected ? "text-yellow-400" : "text-gray-400"
          }`}>{service.name}</span>
                    <span   className={`font-medium ${
            isSelected ? "text-yellow-400" : "text-gray-400"
          }`}>
                      ({service.offerCount})
                    </span>
                  </button>
                );
              })}
            </ul>
          </div>
        )}

        <div className=" p-5 mb-12 flex flex-col sm:flex-row rounded-full items-center space-y-4 sm:space-y-0 sm:space-x-4 border border-gray-600">
          <div className="relative w-full sm:w-auto flex-grow">
            <input
              type="text"
              placeholder="Search offers by product title"
              className="w-full pl-10 pr-4 py-2rounded-full focus:outline-none  text-gray-200 placeholder-gray-500 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Sort By Row */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 mb-4">
  {/* About results */}
  <h6 className="text-zinc-400 w-full sm:w-auto">
    About {offers.length} results
  </h6>

  {/* Sort By */}
  <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 w-full sm:w-auto">
    <span className="text-gray-400 mr-2 whitespace-nowrap">Sort by:</span>
    {[
      { label: "Lowest Price", value: "low" },
      { label: "Highest Price", value: "high" },
      { label: "Most Recent", value: "recent" },
    ].map((option) => (
      <label
        key={option.value}
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ${
          sortBy === option.value ? "font-semibold" : ""
        }`}
      >
        <input
          type="radio"
          name="sort"
          value={option.value}
          checked={sortBy === option.value}
          onChange={() => handleSort(option.value)}
          className="accent-yellow-400 w-4 h-4"
        />
        {option.label}
      </label>
    ))}
  </div>
</div>


        {loading && (
          <p className="text-gray-400 text-lg text-center">Loading offers...</p>
        )}
        {error && <p className="text-red-400 text-lg text-center">{error}</p>}
        {!loading && !error && filteredOffers.length === 0 && (
          <p className="text-gray-400 text-lg text-center">
            No offers found for this product and service.
          </p>
        )}

        <div className="flex flex-wrap justify-items-center-safe gap-4 sm:gap-6 md:gap-8">
          {filteredOffers?.map((offer) => (
            <ProductCard key={offer._id} offer={offer}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPageComp;
