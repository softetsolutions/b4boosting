"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import TrendingServices from "src/components/TrendingServices";
import { fetchProducts } from "src/api";
import PopularAccounts from "src/components/Sections/PopularAccounts";
import PopularCurrency from "src/components/Sections/PopularCurrency";
import PopularBoostingServices from "src/components/Sections/PopularBoostingServices";
import PopularItems from "src/components/Sections/PopularItems";


export default function Home() {
  
   const searchParams = useSearchParams();
  const ref = searchParams?.get("ref") || null;
  const [products, setProducts] = useState<any[]>([]);

 useEffect(() => {
  if (ref) {
    fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/?ref=${ref}`, {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
     
      .catch(err => console.error(err));
  }
}, [ref]);


  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchProducts();
      if (res?.data) setProducts(res.data);
    };
    getProducts();
  }, []); 
 


  return (
    <>
      <Navbar isLoggedIn={false} role={""} />
   {/* className="min-h-screen relative overflow-hidden" */}
      <main >
        <PopularCurrency />
      <PopularAccounts />
<PopularBoostingServices />
<PopularItems />

      </main>

      <Footer />
    </>
  );
}
