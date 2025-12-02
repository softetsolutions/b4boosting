// app/categories/[serviceName]/page.tsx
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import { Suspense } from "react";
import ServiceOffersStreamedComp from "src/components/StreamedServerComps/ServiceOffersStreamedComp";

interface Props {
  params: {
    serviceName: string;
    serviceId: string;
  };
}

export default async function ServiceOffersPage({ params }: Props) {

  // ❌ no need for `await` here – params is already a plain object
  const { serviceName } = await params;

  return (
    <>
      <Navbar activeService={serviceName} />

      <main className="min-h-[60vh] p-6">
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
          <ServiceOffersStreamedComp serviceName={serviceName} />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
