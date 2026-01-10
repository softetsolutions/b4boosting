
import BuyCardComp from "src/components/BuyCardComp";
import { fetchOfferById } from "src/api/offers";
import type { ApiOffer } from "src/api/offers";
import Footer from "src/components/Footer/Footer";
import Navbar from "src/components/Navbar/Navbar";

type PageProps = {
  params: Promise<{
    offerId: string;
  }>;
};

export default async function BuyPage({ params }: PageProps) {
 const { offerId } = await params;

  const data = await fetchOfferById(offerId); // OfferDetails

  const offer: ApiOffer = {
    _id: data._id,
    price: data.price,
    currency: data.currency,
    quantityAvailable: data.quantityAvailable,
    deliveryTime: data.deliveryTime,
    instantDelivery: data.instantDelivery,
    images: data.images,
    offerDetails: data.offerDetails,

    product: {
      _id: data.product._id,
      title: data.product.title,
      type: "Account", // ✅ OR data.product.type if backend provides it
      images: data.product.images || [],
    },

    seller: {
      _id: data.seller._id,
      displayName: data.seller.displayName,
    },
  };

  return (
    <>
      <Navbar />
      <main>
        <BuyCardComp offer={offer} />
      </main>
      <Footer />
    </>
  );
}