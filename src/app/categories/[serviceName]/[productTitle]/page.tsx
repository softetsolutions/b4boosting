import ProductPageComp from 'src/components/ProductPageComp';
import { fetchOffersByProductAndService } from 'src/api/offers';

interface Props {
  params: {
    serviceName: string;
    productTitle: string;
  };
}

// Deslugify helper
function deslugify(slug: string) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function CategoryProductPage({ params }: Props) {
  const serviceName = deslugify(params.serviceName);
  const productTitle = deslugify(params.productTitle);

  const { offers, services } = await fetchOffersByProductAndService(serviceName, productTitle);

  return (
    <ProductPageComp
      serviceName={serviceName}
      productTitle={productTitle}
      initialOffers={offers || []}
      initialServices={services || []}
    />
  );
}
