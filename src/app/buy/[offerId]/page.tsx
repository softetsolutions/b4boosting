import BuyCardComp from "src/components/BuyCardComp"
import { fetchOfferById } from "src/api/offers";
import type { ApiOffer } from "src/api/offers";

interface PageProps {
  params: {
    offerId: string;
  };
}

export default async function BuyPage({ params }: PageProps) {
  const offer: ApiOffer = await fetchOfferById(params.offerId);
  return <BuyCardComp offer={offer} />;
}
