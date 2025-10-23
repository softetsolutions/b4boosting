import ProductPageComp from "src/components/ProductPageComp";
import { fetchOffersByProductAndService } from "src/api/offers";

interface Props {
  params: {
    serviceName: string;
    productTitle: string;
  };
}

export default async function CategoryProductPage({ params }: Props) {
  const { serviceName, productTitle } = await params;
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
