import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "src/api/types";

interface PopularAccountsProps {
  service?: {
    products: Product[];
  };
}

export default function PopularAccounts({ service }: PopularAccountsProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const accounts = service?.products || [];

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(accounts.length / 2);

  // Slice for mobile (2 per slide)
  const displayedAccounts = isMobile
    ? accounts.slice(currentSlide * 2, currentSlide * 2 + 2)
    : accounts;

  return (
    <section className="px-4 lg:mx-12 mb-4  lg:py-10 md:px-8 mt-12 ">
      {/* Header Section */}
      <h2 className="text-3xl mb-4 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden">
        POPULAR ACCOUNTS
      </h2>
      <h2 className="text-xl font-semibold text-foreground text-center sm:block lg:hidden md:hidden mb-2">
        POPULAR ACCOUNTS
      </h2>
      <div className="mb-1 flex items-center justify-end-safe">
        <button
          type="button"
          className="text-sm font-medium yellow-text hover:underline text-end"
          onClick={() => router.push(`/categories/${service?.name}`)}
        >
          See All
        </button>
      </div>

      {/* Grid Container */}
      <div
        className="
          grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4
          overflow-x-auto scrollbar-hide
          justify-center
        "
      >
        {displayedAccounts?.map((account, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-md"
            onClick={() =>
              router.push(`/categories/${service?.name}/${account.title}`)
            }
          >
            <Image
              src={account.images[0]}
              alt={account.title}
              width={400}
              height={200}
              className="object-fit w-full  h-full"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
              <p className="text-md font-semibold line-clamp-1 group-hover:text-yellow-300 transition-colors">
                {account.title
                  .replace(/-/g, " ")
                  .replace(
                    /\w\S*/g,
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  )}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator for mobile */}
      {isMobile && (
        <div className="flex items-center justify-center gap-2 mt-4 mb-4">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-yellow-400 scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      )}
    </section>
  );
}
