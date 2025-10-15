"use client";
import { useState } from 'react';
import type {ApiOffer} from 'src/api/offers';

interface BuyCardCompProps {
  offer: ApiOffer;
}

function BuyCardComp({ offer }: BuyCardCompProps) {

  const [onlineSellersOnly, setOnlineSellersOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('Recommended');
  const [count, setCount] = useState<number>(1);

  const handleInc = (): void => {
    setCount((prev) => prev + 1);
  };

  const handleDec = (): void => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalAmount: string = (count * (offer ? offer.price : 0)).toFixed(2);

  const getOfferDetail = (field: string): string | undefined => {
    if (!offer || !offer.offerDetails) return undefined;
    const found = offer.offerDetails.find((d) => d.fieldName === field);
    return found ? found.value : undefined;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-gray-200 pb-16 relative pt-26">
        {/* Top Navigation */}
        <div className="bg-gray-900/80 backdrop-blur-sm py-4 px-8 text-sm text-gray-400 border-b border-gray-800 relative z-10">
          <a href="#" className="hover:text-cyan-400 transition-colors">Home</a> &gt;
          <a href="#" className="hover:text-cyan-400 transition-colors">Gift Cards</a> &gt;
          <a href="#" className="hover:text-cyan-400 transition-colors">eGift Cards</a> &gt;
          <a href="#" className="hover:text-cyan-400 transition-colors">Xbox</a>
        </div>

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-8 px-4 lg:px-8 relative z-10">
          {/* Main Content Area */}
          <div className="flex-1 lg:pr-8 rounded-xl shadow-lg border border-gray-700 bg-gray-900/80 backdrop-blur-lg">
            {/* Product Title and Share Button */}
            <div className="p-6 mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-100 leading-tight">
                  {offer ? offer.product.title : 'Loading...'}
                </h1>
                {offer && offer.seller && (
                  <div className="mt-1 text-gray-400 text-sm">
                    Seller: <span className="text-gray-200 font-semibold">{offer.seller.displayName}</span>
                    <span className="ml-2 text-gray-500">(ID: {offer.seller._id})</span>
                  </div>
                )}
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-700 rounded-md text-gray-400 text-sm hover:bg-gray-800 hover:text-cyan-400 transition duration-150">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 110 2.684m0-2.684a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
            </div>
            {/* Product Image */}
            <div className="p-6 rounded-xl mb-6 flex justify-center">
              {offer ? (
                <img
                  src={offer.product.images[0]}
                  alt={offer.product.title}
                  className="max-w-full h-auto rounded-md"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-800 rounded-md animate-pulse" />
              )}
            </div>

            {/* Product Info */}
            <div className="p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Product info</h2>
              {offer ? (
                <div className="space-y-2">
                  {/* Price */}
                  <div className="flex items-center text-lg">
                    <span className="text-gray-400 mr-2">Price:</span>
                    <span className="text-cyan-400 font-bold">{offer.price} {offer.currency}</span>
                  </div>
                  {/* Quantity Available */}
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">Quantity Available:</span>
                    <span className="text-gray-200 font-semibold">{offer.quantityAvailable}</span>
                  </div>
                  {/* Delivery Speed */}
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">Delivery Speed:</span>
                    <span className="text-gray-200 font-semibold">{offer.deliveryTime}</span>
                  </div>
                  {/* Instant Delivery */}
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-2">Instant Delivery:</span>
                    <span className="font-semibold {offer.instantDelivery ? 'text-emerald-400' : 'text-red-400'}">
                      {offer.instantDelivery ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {/* Offer Details Fields */}
                  <div className="mt-4">
                    <h3 className="text-gray-300 font-semibold mb-2">Offer Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {offer.offerDetails && offer.offerDetails.length > 0 ? (
                        offer.offerDetails.map((detail, idx) => (
                          <div key={idx} className="flex flex-col bg-gray-800/60 rounded-lg p-2">
                            <span className="text-gray-400 text-xs">{detail.fieldName}</span>
                            <span className="text-gray-200 font-semibold">{detail.value}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400">No offer details.</span>
                      )}
                    </div>
                  </div>
                  {/* Seller Info */}
                  {offer.seller && (
                    <div className="mt-8 p-5 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-xl border border-cyan-700/40 shadow-lg flex items-center space-x-4">
                      <div className="flex-shrink-0 bg-cyan-700/20 rounded-full p-3 flex items-center justify-center">
                        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center">
                          <span className="text-gray-400 text-sm mr-2">Seller Name:</span>
                          <span className="text-cyan-300 font-semibold text-base">{offer.seller.displayName || offer.seller.username || offer.seller._id}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-400 text-sm mr-2">Seller ID:</span>
                          <span className="text-gray-200 font-mono text-sm">{offer.seller._id}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400">Loading product info...</p>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-96 lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start mt-6 lg:mt-0">
            <div className="flex flex-col items-center p-4 min-h-screen">
              <div id="box-1" className="shadow-lg p-6 w-full max-w-sm mb-6 bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-400 text-sm">{offer ? (getOfferDetail('level') || offer.quantityAvailable) : 'Loading...'} available</h3>
                  <button className="text-cyan-400 text-xs font-semibold px-2 py-1 rounded-full border border-cyan-500/50 hover:bg-cyan-500/10 transition-colors">
                    Volume discount
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-2 mb-6 shadow-inner shadow-gray-700/30 rounded-2xl p-2 bg-gray-800 border border-gray-700">
                  <button
                    onClick={handleDec}
                    disabled={count <= 1}
                    className={`
                    flex items-center justify-center w-8 h-8 rounded-full border
                    text-lg font-bold transition duration-300
                    ${count <= 1
                        ? "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 border-none text-white"
                      }
                  `}
                  >
                    -
                  </button>
                  <p className="w-12 text-center text-lg font-semibold text-gray-200">{count}</p>
                  <button
                    onClick={handleInc}
                    className="
                    flex items-center justify-center w-8 h-8 rounded-full border
                    text-lg font-bold transition duration-300
                    bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 border-none text-white
                  "
                  >
                    +
                  </button>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-gray-200 text-lg">Total Amount</h2>
                  <h2 className="text-cyan-400 text-xl font-bold">{totalAmount} USD</h2>
                </div>

                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md shadow-cyan-500/30">
                  Buy now
                </button>
              </div>

              <div id="box-2" className="rounded-2xl shadow-lg p-6 w-full max-w-sm bg-gray-900/80 backdrop-blur-lg border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">
                    <span className="text-emerald-400 font-bold mr-1">👍 100.00%</span>
                    <span className="text-gray-400">758 sold</span>
                  </p>

                  <a href="#" className="text-cyan-400 text-sm hover:underline">
                    Other sellers
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://placehold.co/40x40/4a90e2/ffffff?text=ES"
                      alt="Etechsquad"
                      className="w-10 h-10 rounded-full mr-3 border-2 border-cyan-500"
                    />
                    <div>
                      <p className="font-semibold text-gray-200">Etechsquads</p>
                      <p className="text-gray-400 text-sm">Level 91</p>
                    </div>
                  </div>

                  <button className="bg-emerald-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-emerald-700 transition duration-300 flex items-center shadow-md shadow-emerald-600/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 mb-6 max-w-7xl mx-auto py-8 px-4 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-100 mb-3 sm:mb-0">Other sellers </h2>
            <div className="flex items-center space-x-4">
              {/* Checkbox for online sellers */}
              <label className="flex items-center text-gray-400 text-sm cursor-pointer">
                Online sellers
                <input
                  type="checkbox"
                  className="ml-2 w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500 focus:ring-offset-gray-900"
                  checked={onlineSellersOnly}
                  onChange={() => setOnlineSellersOnly(!onlineSellersOnly)}
                />
              </label>
              {/* Radio buttons for sorting preference */}
              <div className="flex items-center text-gray-400 text-sm">
                Sort by
                <label className="ml-2 flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sort-by"
                    value="Recommended"
                    checked={sortBy === 'Recommended'}
                    onChange={() => setSortBy('Recommended')}
                    className="mr-1 text-cyan-500 bg-gray-800 border-gray-600 focus:ring-cyan-500 focus:ring-offset-gray-900"
                  /> Recommended
                </label>
                <label className="ml-2 flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sort-by"
                    value="Lowest Price"
                    checked={sortBy === 'Lowest Price'}
                    onChange={() => setSortBy('Lowest Price')}
                    className="mr-1 text-cyan-500 bg-gray-800 border-gray-600 focus:ring-cyan-500 focus:ring-offset-gray-900"
                  /> Lowest Price
                </label>
              </div>
            </div>
          </div>

          {/* List of Other Sellers */}
          <div className="space-y-4">
            {/* {filteredSellers.map((seller: OtherSeller, index: number) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={seller.profilePic}
                      alt={seller.name}
                      className="w-10 h-10 rounded-full mr-3 border-2 border-gray-700 object-cover"
                    />
                    Online/Offline indicator 
                    <div className={`absolute bottom-0 right-2 w-3 h-3 rounded-full border-2 border-gray-900 ${seller.isOnline ? 'bg-emerald-500' : 'bg-gray-500'}`}></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">{seller.name}</p>
                    <p className="text-gray-400 text-sm">Level {seller.level}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <p className="text-emerald-400 font-bold flex items-center">
                    👍 {seller.rating} <span className="text-gray-400 ml-1">{seller.sold} sold</span>
                  </p>
                  <span className="text-gray-400">Min.{seller.min}</span>
                  <span className="text-gray-400">{seller.available}</span>
                  <span className="text-gray-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {seller.delivery}
                  </span>
                  {seller.volumeDiscount && (
                    <span className="bg-cyan-500/20 text-cyan-400 text-xs font-semibold px-2 py-1 rounded-full">
                      Volume discount
                    </span>
                  )}
                  <span className="font-bold text-cyan-400">{seller.price} USD</span>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>

    </>

  );
}

export default BuyCardComp;