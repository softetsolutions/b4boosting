import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
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
  console.log("serviceName", serviceName, "productTitle", productTitle);
  const { offers, services } = await fetchOffersByProductAndService(
    serviceName,
    productTitle
  );

  return (
   <>
      <Navbar activeService={serviceName} />
      
      <main>
        <ProductPageComp
          serviceName={serviceName}
          productTitle={productTitle}
          initialOffers={offers || []}
          initialServices={services || []}
        />
      </main>

      <Footer />
    </>
  );
}
