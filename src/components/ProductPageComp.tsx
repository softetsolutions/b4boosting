// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   fetchOffersByProductAndService,
//   type ApiOffer,
//   type ServiceWithCount,
// } from 'src/api/offers';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// interface ProductPageCompProps {
//   serviceName: string;
//   productTitle: string;
//   initialOffers: ApiOffer[];
//   initialServices: ServiceWithCount[];
// }

// const ProductPageComp: React.FC<ProductPageCompProps> = ({ serviceName, productTitle }) => {
//   const router = useRouter();
//   const [offers, setOffers] = useState<ApiOffer[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [servicesWithCounts, setServicesWithCounts] = useState<ServiceWithCount[]>([]);
//   const [selectedServiceName, setSelectedServiceName] = useState<string>(serviceName);

//   const serviceIcons: Record<string, string> = {
//     'Gift Cards': '🎁',
//   };

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const { offers, services } = await fetchOffersByProductAndService(serviceName, productTitle);
//         setServicesWithCounts(services || []);
//         setOffers(offers || []);
//         setSelectedServiceName(serviceName);
//       } catch (err: any) {
//         setError(err.message || 'Something went wrong.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [serviceName, productTitle]);

//   const handleServiceClick = async (newServiceName: string) => {
//     setSelectedServiceName(newServiceName);
//     setLoading(true);
//     setError(null);

//     try {
//       const { offers } = await fetchOffersByProductAndService(newServiceName, productTitle);
//       setOffers(offers || []);
//     } catch (err: any) {
//       setError(err.message || 'Failed to fetch offers.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredOffers = offers.filter((offer) =>
//     offer.product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const ProductCard: React.FC<{ offer: ApiOffer }> = ({ offer }) => {
//     return (
//       <div
//         onClick={() => router.push(`/buy/${offer._id}`)}
//         className="relative bg-gray-800/50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden m-2 flex flex-col items-center justify-center text-center max-w-[250px] w-full aspect-square border border-gray-700/50 hover:border-cyan-500/40 ease-in-out hover:translate-y-1 cursor-pointer"
//       >
//         <img
//           src={
//             offer.images?.[0] ||
//             `https://placehold.co/100x100/CCCCCC/000000?text=${offer.product.title.charAt(0)}`
//           }
//           alt={offer.product.title}
//           className="absolute inset-0 w-full h-full object-cover blur-xs rounded-xl"
//         />
//         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl z-[5]" />
//         <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
//           {offer.quantityAvailable} available
//         </span>
//         <p className="absolute bottom-10 left-0 right-0 text-center text-gray-50 font-semibold text-base z-10 px-2">
//           {offer.product.title}
//         </p>
//         <p className="absolute bottom-4 left-0 right-0 text-center text-cyan-400 font-bold text-lg z-10 px-2">
//           ₹{offer.price} {offer.currency}
//         </p>
//       </div>
//     );
//   };

//   const serviceColorMap: Record<string, string> = {
//     'Gift Card': 'hover:bg-pink-400',
//     Account: 'hover:bg-green-400',
//     default: 'hover:bg-gray-500',
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-sans p-4 sm:p-6 text-white relative overflow-hidden">
//       <div className="max-w-7xl mx-auto relative z-20">
//         <nav className="text-sm text-gray-400 mb-6">
//           <Link href="/" className="hover:text-cyan-400">Home</Link> &gt;{' '}
//           <span className="text-cyan-400">{selectedServiceName}</span>
//         </nav>

//         <div className="flex items-center mb-6">
//           <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-400 flex justify-center items-center rounded-md mr-3 shadow-md">
//             <span className="text-xl">{serviceIcons[selectedServiceName] || '🛒'}</span>
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold">{selectedServiceName}</h1>
//         </div>

//         <div className="bg-gray-800/50 p-2 shadow-lg mb-6 flex flex-col sm:flex-row rounded-full items-center space-y-4 sm:space-y-0 sm:space-x-4 border border-gray-700/50">
//           <div className="relative w-full sm:w-auto flex-grow">
//             <input
//               type="text"
//               placeholder="Search offers by product title"
//               className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//         </div>

//         {servicesWithCounts.length > 0 && (
//           <div className="mt-10 p-4 shadow-md">
//             <ul className="flex space-y-2 gap-12">
//               {servicesWithCounts.map((service) => {
//                 const hoverColor = serviceColorMap[service.name] || serviceColorMap.default;
//                 return (
//                   <button
//                     key={service._id}
//                     className="flex flex-col gap-2"
//                     onClick={() => handleServiceClick(service.name)}
//                   >
//                     <li className={`flex flex-row text-white mt-6 w-25 h-25 justify-center relative bg-gray-500 rounded-4xl shadow-lg hover:shadow-xl hover:bg-amber-200 hover:text-black transition-shadow duration-300 overflow-hidden m-2 items-center border border-gray-700/50 hover:border-cyan-500/40 ease-in-out hover:translate-y-1 cursor-pointer ${hoverColor}`}>
//                       <span>{serviceIcons[service.name]}</span>
//                       <span className="font-medium">{service.name}</span>
//                     </li>
//                     <span className="text-cyan-300 font-bold">
//                       {service.offerCount} offers
//                     </span>
//                   </button>
//                 );
//               })}
//             </ul>
//           </div>
//         )}

//         <h2 className="text-2xl font-bold text-gray-200 mb-4 mt-20 text-center">
//           Available {selectedServiceName}
//         </h2>

//         {loading && <p className="text-gray-400 text-lg text-center">Loading offers...</p>}
//         {error && <p className="text-red-400 text-lg text-center">{error}</p>}
//         {!loading && !error && filteredOffers.length === 0 && (
//           <p className="text-gray-400 text-lg text-center">No offers found for this product and service.</p>
//         )}

//         <div className="flex flex-wrap justify-center -m-2">
//           {filteredOffers.map((offer) => (
//             <ProductCard key={offer._id} offer={offer} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPageComp;


'use client';

import React, { useState } from 'react';
import {
  fetchOffersByProductAndService,
  type ApiOffer,
  type ServiceWithCount,
} from 'src/api/offers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductPageCompProps {
  serviceName: string;
  productTitle: string;
  initialOffers: ApiOffer[];
  initialServices: ServiceWithCount[];
}

const ProductPageComp: React.FC<ProductPageCompProps> = ({
  serviceName,
  productTitle,
  initialOffers,
  initialServices,
}) => {
  const router = useRouter();
  const [offers, setOffers] = useState<ApiOffer[]>(initialOffers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [servicesWithCounts, setServicesWithCounts] = useState<ServiceWithCount[]>(initialServices);
  const [selectedServiceName, setSelectedServiceName] = useState<string>(serviceName);

  const serviceIcons: Record<string, string> = {
    'Gift Cards': '🎁',
  };

  const handleServiceClick = async (newServiceName: string) => {
    setSelectedServiceName(newServiceName);
    setLoading(true);
    setError(null);

    try {
      const { offers } = await fetchOffersByProductAndService(newServiceName, productTitle);
      setOffers(offers || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch offers.');
    } finally {
      setLoading(false);
    }
  };

  const filteredOffers = offers.filter((offer) =>
    offer.product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ProductCard: React.FC<{ offer: ApiOffer }> = ({ offer }) => (
    <Link
      href={(`/buy/${offer._id}`)}
      className="relative bg-gray-800/50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden m-2 flex flex-col items-center justify-center text-center max-w-[250px] w-full aspect-square border border-gray-700/50 hover:border-cyan-500/40 ease-in-out hover:translate-y-1 cursor-pointer"
    >
      <img
        src={
          offer.images?.[0] ||
          `https://placehold.co/100x100/CCCCCC/000000?text=${offer.product.title.charAt(0)}`
        }
        alt={offer.product.title}
        className="absolute inset-0 w-full h-full object-cover blur-xs rounded-xl"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl z-[5]" />
      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
        {offer.quantityAvailable} available
      </span>
      <p className="absolute bottom-10 left-0 right-0 text-center text-gray-50 font-semibold text-base z-10 px-2">
        {offer.product.title}
      </p>
      <p className="absolute bottom-4 left-0 right-0 text-center text-cyan-400 font-bold text-lg z-10 px-2">
        ₹{offer.price} {offer.currency}
      </p>
    </Link>
  );

  const serviceColorMap: Record<string, string> = {
    'Gift Card': 'hover:bg-pink-400',
    Account: 'hover:bg-green-400',
    default: 'hover:bg-gray-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-sans p-4 sm:p-6 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-20">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-cyan-400">
            Home
          </Link>{' '}
          &gt; <span className="text-cyan-400">{selectedServiceName}</span>
        </nav>

        <div className="flex items-center mb-6">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-400 flex justify-center items-center rounded-md mr-3 shadow-md">
            <span className="text-xl">{serviceIcons[selectedServiceName] || '🛒'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">{selectedServiceName}</h1>
        </div>

        <div className="bg-gray-800/50 p-2 shadow-lg mb-6 flex flex-col sm:flex-row rounded-full items-center space-y-4 sm:space-y-0 sm:space-x-4 border border-gray-700/50">
          <div className="relative w-full sm:w-auto flex-grow">
            <input
              type="text"
              placeholder="Search offers by product title"
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 placeholder-gray-500 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {servicesWithCounts.length > 0 && (
          <div className="mt-10 p-4 shadow-md">
            <ul className="flex space-y-2 gap-12">
              {servicesWithCounts.map((service) => {
                const hoverColor = serviceColorMap[service.name] || serviceColorMap.default;
                return (
                  <button
                    key={service._id}
                    className="flex flex-col gap-2"
                    onClick={() => handleServiceClick(service.name)}
                  >
                    <li
                      className={`flex flex-row text-white mt-6 w-25 h-25 justify-center relative bg-gray-500 rounded-4xl shadow-lg hover:shadow-xl hover:bg-amber-200 hover:text-black transition-shadow duration-300 overflow-hidden m-2 items-center border border-gray-700/50 hover:border-cyan-500/40 ease-in-out hover:translate-y-1 cursor-pointer ${hoverColor}`}
                    >
                      <span>{serviceIcons[service.name]}</span>
                      <span className="font-medium">{service.name}</span>
                    </li>
                    <span className="text-cyan-300 font-bold">
                      {service.offerCount} offers
                    </span>
                  </button>
                );
              })}
            </ul>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-200 mb-4 mt-20 text-center">
          Available {selectedServiceName}
        </h2>

        {loading && <p className="text-gray-400 text-lg text-center">Loading offers...</p>}
        {error && <p className="text-red-400 text-lg text-center">{error}</p>}
        {!loading && !error && filteredOffers.length === 0 && (
          <p className="text-gray-400 text-lg text-center">
            No offers found for this product and service.
          </p>
        )}

        <div className="flex flex-wrap justify-center -m-2">
          {filteredOffers.map((offer) => (
            <ProductCard key={offer._id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPageComp;

