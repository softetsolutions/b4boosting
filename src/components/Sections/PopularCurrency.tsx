import Image from "next/image";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

interface PopularClientsProps {
  service?: {
    products: any[];
  };
}

export default function PopularCurrency({ service }: PopularClientsProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const accounts = service?.products || [];

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

  const displayedAccounts = isMobile ? accounts.slice(0, 4) : accounts;

  return (
    <section className="px-4 lg:py-10 md:px-8 mt-10 lg:mx-12">
      {/* Header Section */}
      <h2 className="text-3xl mb-4 font-semibold text-foreground text-center lg:block md:block sm:hidden hidden ">
        POPULAR CURRENCY
      </h2>
      <h2 className="mb-2 text-xl text-center font-semibold text-foreground sm:block lg:hidden md:hidden">
        POPULAR CURRENCY
      </h2>
      <div className="flex items-center justify-end-safe mb-1 ">
        <button
          type="button"
          onClick={() => router.push(`/categories/${service?.name}`)}
          className="text-sm font-medium yellow-text hover:underline"
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
            className="relative group overflow-hidden rounded-lg"
            onClick={() =>
              router.push(`/categories/${service?.name}/${account.title}`)
            }
          >
            <Image
              src={account?.images[0]}
              alt={account.title}
              width={150}
              height={150}
              className="object-fit w-full h-[10.5rem] sm:h-[10.5rem] lg:h-[17.5rem] md:h-[12.5rem] rounded-lg"
            />
            <div className="py-4 bg-black opacity-90 flex items-center justify-center text-white font-semibold text-lg text-center">
              {account.title
                .replace(/-/g, " ")
                .replace(
                  /\w\S*/g,
                  (word) => word.charAt(0).toUpperCase() + word.slice(1)
                )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
