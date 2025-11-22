import ProductPageComp from "src/components/ProductPageComp";
import { fetchOffersByProductAndService } from "src/api/offers";

interface Props {
  serviceName: string;
  productId: string;
}

export default async function ProductPageServer({
  serviceName,
  productId,
}: Props) {
  const { offers, services } = await fetchOffersByProductAndService(
    serviceName,
    productId
  );

  return (
    <ProductPageComp
      serviceName={serviceName}
      productId={productId}
      initialOffers={offers || []}
      initialServices={services || []}
    />
  );
}
