import { fetchProductsByServiceName } from "src/api/products";
import Link from "next/link";

type Props = {
  serviceName: string;
};

type Offer = {
  _id: string;
  title: string;
  type: string;
  productRequiredFields: {
    fieldName: string;
    fieldType: string;
    isrequired: boolean;
    options: string[];
  }[];
  additionalFields: unknown[]; // or type properly if known
};

export default async function ServiceOffersStreamedComp({ serviceName }: Props) {
 
   const products = await fetchProductsByServiceName(serviceName);
   console.log(products,"products");

  return (
    <section className="space-y-6 min-h-screen mt-24 mb-5 px-4 sm:px-6 lg:px-8  relative overflow-hidden">
      <h1 className="text-2xl font-semibold mb-4 capitalize">
        {serviceName} – All Products
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((offer: Offer) => (
          <Link
            key={offer.title}
            href={`/categories/${serviceName}/${offer.title}`}
            className="border border-gray-400/20 bg-black/80 rounded-lg p-4 hover:border-yellow-400/100 hover:shadow-md transition"
          >
            <h2 className="text-lg font-medium mb-2">{offer.title.replace(/-/g, " ")
                  .replace(
                    /\w\S*/g,
                    (word) => word.charAt(0).toUpperCase() + word.slice(1)
                  )}</h2>
           
            <p className="mt-3 text-sm text-yellow-400/100 font-semibold">
              View details →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
