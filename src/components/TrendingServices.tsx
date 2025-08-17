"use client";

import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopularGameCard from "./PopularGameCard";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  title: string;
  images: string[];
  offerCount: number;
  service?: string; // This would be the service ID associated with the product
};

type Section = {
  _id: string;
  name: string;
  products: Product[];
};

const CARDS_PER_VIEW = 4;

const TrendingServices = ({ data }: { data: Section[] }) => {
  const router = useRouter();

  const [startIdx, setStartIdx] = useState<{ [key: string]: number }>({});
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // const handleCardClick = async (product: Product, title: string) => {
  //   if (isDragging) return;
  //   try {
  //     if (!product.service || !product._id) {
  //       throw new Error("Product or Service ID not found");
  //     }

  //     const serviceName = title.toLowerCase().replace(/\s+/g, '-');

  //     // Navigate to URL
  //     router.push(`/categories/${serviceName}`);

  //     console.log("Navigated to:", `/api/categories/${serviceName}`);
  //   } catch (error) {
  //     console.error("Error navigating:", error);
  //     toast.error("Failed to load product offers");
  //   }
  // };

  const handleCardClick = (product: Product, serviceName: string) => {
    if (isDragging) return;

    try {
      const serviceSlug = serviceName.toLowerCase().replace(/\s+/g, '-');
      const productSlug = product.title.toLowerCase().replace(/\s+/g, '-');

      router.push(`/categories/${serviceSlug}/${productSlug}`);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Failed to load product offers");
    }
  };


  const handleMouseDown = (e: React.MouseEvent, sectionId: string) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRefs.current[sectionId]?.offsetLeft || 0));
    setScrollLeft(containerRefs.current[sectionId]?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent, sectionId: string) => {
    if (!isDragging || !containerRefs.current[sectionId]) return;
    e.preventDefault();
    const x = e.pageX - (containerRefs.current[sectionId]?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRefs.current[sectionId]!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  const handlePrev = (sectionId: string, maxIdx: number) => {
    setStartIdx((prev) => ({
      ...prev,
      [sectionId]: Math.max(0, (prev[sectionId] || 0) - CARDS_PER_VIEW),
    }));
  };

  const handleNext = (sectionId: string, maxIdx: number) => {
    setStartIdx((prev) => ({
      ...prev,
      [sectionId]: Math.min(maxIdx, (prev[sectionId] || 0) + CARDS_PER_VIEW),
    }));
  };


  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-2 gap-6 items-center">
        {data.map((service) => (
          <div className="bg-blue-300 flex flex-col rounded-lg py-6 px-4" key={service._id}>
            <span className="flex items-center text-lg font-bold font-lato mb-7">{service.name}</span>
            <div className="grid grid-cols-2">
              {
                service.products.map((product) => (
                  <div className="bg-blue-300 flex gap-2 items-center" key={product._id}>
                    <div><img src={product.images[0]} className="w-[32px] h-[32px] rounded-lg"></img></div>
                    <span className="text-[16px] font-bold font-lato">{product.title}</span>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>



      {/* <div className="flex flex-col gap-20">
        {data.map((section) => {
          const products = section.products.map((p) => ({
            ...p,
            service: section._id, // Assign the section's _id as the product's service ID
          }));
          const currentStart = startIdx[section._id] || 0;
          const maxIdx = Math.max(0, products.length - CARDS_PER_VIEW);

          return (
            <div
              key={section._id}
              className="mb-12 relative max-w-5xl mx-auto w-full"
            >
              <div className="flex justify-between items-center mb-6 px-4">
                <h2 className="text-3xl text-white font-bold w-[90%] text-center">{`Popular ${section.name}`}</h2>
                <button
                  onClick={() => {
                    console.log("hello");
                  }}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Discover all
                </button>
              </div>

             
              {currentStart > 0 && (
                <div className="absolute inset-y-0 -left-3 flex items-center z-10">
                  <button
                    onClick={() => handlePrev(section._id, maxIdx)}
                    className="group transform transition-all duration-300 hover:scale-110"
                    aria-label="Show previous cards"
                  >
                    <div className="bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              )}

            
              {currentStart < maxIdx && (
                <div className="absolute inset-y-0 -right-3 flex items-center z-10 ">
                  <button
                    onClick={() => handleNext(section._id, maxIdx)}
                    className="group transform transition-all duration-300 hover:scale-110"
                    aria-label="Show next cards"
                  >
                    <div className="bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              )}

            
              <div
                ref={(el: HTMLDivElement | null) => {
                  containerRefs.current[section._id] = el;
                }}
                className="overflow-hidden px-8 py-6 relative cursor-grab flex justify-center"
                onMouseDown={(e) => handleMouseDown(e, section._id)}
                onMouseUp={handleMouseUp}
                onMouseMove={(e) => handleMouseMove(e, section._id)}
                onMouseLeave={handleMouseLeave}
                style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
              >
                <div
                  className="flex gap-6 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${
                      (currentStart / CARDS_PER_VIEW) * 100
                    }%)`,
                    width: `${(products.length / CARDS_PER_VIEW) * 100}%`, 
                  }}
                >
                  {products.map((product) => (
                    <div key={product._id} className="flex-shrink-0 w-[220px]">
                      <PopularGameCard
                        image={product.images?.[0] || ""}
                        title={product.title}
                        offerCount={product.offerCount}
                        onClick={() => handleCardClick(product, section.name)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div> 
          );
        })}
      </div>*/}
    </>
  );
};

export default TrendingServices;