import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import { Suspense } from "react";
// import ProductPageServer from "src/components/ProductPageServer";
import ProductPageStreamedComp from "src/components/StreamedServerComps/ProductPageStreamedComp";

interface Props {
  params: {
    serviceName: string;
    productTitle : string;
  };
}

export default async function CategoryProductPage({ params }: Props) {
  const { serviceName, productTitle  } = await params;

  return (
    <>
      <Navbar activeService={serviceName} />

      <main className="min-h-[60vh] p-6">
        {/* Suspense allows streaming while staying SSR */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-6">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
                role="status"
              ></div>
            </div>
          }
        >
          <ProductPageStreamedComp
            serviceName={serviceName}
            productTitle ={productTitle }
          />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
