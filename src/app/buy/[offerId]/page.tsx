import BuyCardComp from "src/components/BuyCardComp"
import { fetchOfferById } from "src/api/offers";
import type { ApiOffer } from "src/api/offers";
import Footer from "src/components/Footer/Footer";
import Navbar from "src/components/Navbar/Navbar";

interface PageProps {
  params: {
    offerId: string;
  };
}

export default async function BuyPage({ params }: PageProps) {
  const offer: ApiOffer = await fetchOfferById(params.offerId);
  return  (
  <>
        <Navbar />
        
        <main>
           <BuyCardComp offer={offer} />;
          </main>
          

      <Footer />
    </>
  );
}