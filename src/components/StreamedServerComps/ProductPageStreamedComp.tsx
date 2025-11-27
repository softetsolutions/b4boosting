import ProductPageComp from "src/components/ProductPageComp";
import { fetchOffersByProductAndService } from "src/api/offers";

interface Props {
  serviceName: string;
  productTitle: string;
}

export default async function ProductPageServer({
  serviceName,
  productTitle,
}: Props) {
  const { offers, services } = await fetchOffersByProductAndService(
    serviceName,
    productTitle
  );

  return (
    <ProductPageComp
      serviceName={serviceName}
      productTitle={productTitle}
      initialOffers={offers || []}
      initialServices={services || []}
    />
  );
}
