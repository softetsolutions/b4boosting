"use client";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { ApiOffer } from "src/api/offers";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { createPayPalOrder, capturePayPalOrder } from "src/api/orders";


interface BuyCardCompProps {
  offer: ApiOffer;
}

function BuyCardComp({ offer }: BuyCardCompProps) {
  const [onlineSellersOnly, setOnlineSellersOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("Recommended");
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

  const createOrder = async (): Promise<string> => {
  try {
    const response = await createPayPalOrder(Number(totalAmount));
    if (!response.success) throw new Error("Failed to create order");
    return response.orderID;
  } catch (error) {
    toast.error("Failed to create PayPal order");
    throw error;
  }
};


const onApprove = async (data: any) => {
  try {
    const result = await capturePayPalOrder(data.orderID, offer._id, count);
    if (result.success) toast.success("Payment successful!");
    else toast.error(result.message || "Payment failed!");
  } catch (error) {
    toast.error("Payment error");
  }
};



  return (
    <>
      <div className="min-h-screen pb-16 relative mt-20">
        {/* Top Navigation */}
        <div className=" backdrop-blur-sm max-w-7xl mx-auto py-4 px-4 lg:px-8text-sm text-gray-400 relative z-10">
          <a href="#" className="hover:text-amber-400 transition-colors">
            Home
          </a>{" "}
          &gt;
          <a href="#" className="hover:text-amber-400 transition-colors">
            Gift Cards
          </a>{" "}
          &gt;
        
          <a href="#" className="hover:text-amber-400 transition-colors">
            Xbox
          </a>
        </div>

        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto py-8 px-4 lg:px-8 relative z-10">
          {/* Main Content Area */}
          <div className="flex-1 lg:pr-8 rounded-xl border border-gray-400/20 backdrop-blur-lg">
            {/* Product Title and Share Button */}
            <div className="p-6 mb-6 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-100 leading-tight">
                  {offer ? offer.product.title : "Loading..."}
                </h1>
             
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-700 rounded-md text-gray-400 text-sm hover:bg-gray-800 hover:text-cyan-400 transition duration-150">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 110 2.684m0-2.684a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share
              </button>
            </div>

            <div className="p-6 rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Left: Product Info */}
                <div className="flex-1 w-full">
                  <h2 className="text-xl font-bold text-gray-100 mb-4">
                    Product Info
                  </h2>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="text-gray-400 mr-2">
                        Delivery Speed:
                      </span>
                      <span className="text-gray-200 font-semibold">
                        {offer.deliveryTime}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-400 mr-2">
                        Instant Delivery:
                      </span>
                      <span
                        className={`font-semibold ${
                          offer.instantDelivery
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {offer.instantDelivery ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                 
                </div>

                {/* Right: Product Image */}
                <div className="flex-1 w-full flex justify-center">
                  <img
                    src={offer.product.images?.[0]}
                    alt={offer.product.title}
                    className="w-50 max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg object-cover"
                  />
                </div>
              </div>

               <div className="p-6">
                    {offer ? (
                      <div className="space-y-2">
                        {/* Offer Details Fields */}
                        <div className="mt-4">
                          <h3 className="text-gray-300 font-semibold mb-2">
                            Offer Details
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {offer.offerDetails &&
                            offer.offerDetails.length > 0 ? (
                              offer.offerDetails.map((detail, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col border-1 border-gray-400/20 rounded-lg p-2"
                                >
                                  <span className="text-gray-400 text-xs">
                                    {detail.fieldName}
                                  </span>
                                  <span className="text-gray-200 font-semibold">
                                    {detail.value}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <span className="text-gray-400">
                                No offer details.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400">Loading product info...</p>
                    )}
                  </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-96 lg:flex-shrink-0 lg:sticky lg:top-8 lg:self-start mt-6 lg:mt-0 ">
            <div className="flex flex-col items-center p-4 min-h-screen ">
              <div
                id="box-1"
                className="bg-gray-400/20  p-6 w-full max-w-sm mb-6  backdrop-blur-lg rounded-2xl border border-gray-400/20"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-gray-400 text-sm">
                    {offer
                      ? getOfferDetail("level") || offer.quantityAvailable
                      : "Loading..."}{" "}
                    available
                  </h3>
                  <button className="text-cyan-400 text-xs font-semibold px-2 py-1 rounded-full border border-gray-400/20 hover:bg-cyan-500/10 transition-colors">
                    Volume discount
                  </button>
                </div>

                <div className="text-center">
                  <h6>
                    Unit Price : {offer.price} {offer.currency}
                  </h6>
                </div>
                <hr className="my-6 text-gray-400/20" />

                <div className="flex items-center justify-center rounded-full mb-6 shadow-gray-700/30 p-2 border-1 border-gray-400/20">
                  <button
                    onClick={handleDec}
                    disabled={count <= 1}
                    className={`
                    flex items-center justify-center w-8 h-8 rounded-full border
                    text-lg font-bold transition duration-300
                    ${
                      count <= 1
                        ? "bg-gray-700 border-gray-400/20 text-gray-500 cursor-not-allowed"
                        : " border-none text-white yellow-bg"
                    }
                  `}
                  >
                    -
                  </button>
                  <p className="w-12 text-center text-lg font-semibold">
                    {count}
                  </p>
                  <button
                    onClick={handleInc}
                    className="
                    flex items-center justify-center w-8 h-8 rounded-full border
                    text-lg font-bold transition duration-300
                    border-none text-white yellow-bg
                  "
                  >
                    +
                  </button>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg">Total Amount</h2>
                  <h2 className="text-xl font-bold">{totalAmount} USD</h2>
                </div>

              <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "USD",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "gold" }}
          createOrder={() => createOrder()}
          onApprove={onApprove}
          onError={() => toast.error("Something went wrong!")}
        />
      </PayPalScriptProvider>
       {/* <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
      <PayPalButtons
        createOrder={async () => {
          const res = await fetch("/api/order", { method: "POST" });
          const data = await res.json();
          return data.orderID;
        }}
        onApprove={async (data) => {
          const res = await fetch(`/api/order?orderID=${data.orderID}`, {
            method: "PUT",
          });
          const paymentResult = await res.json();
          console.log("Payment captured:", paymentResult);
        }}
      />
    </PayPalScriptProvider> */}
              </div>

              <div
                id="box-2"
                className="bg-gray-400/20  p-6 w-full max-w-sm mb-6  backdrop-blur-lg rounded-2xl border border-gray-400/20"
              >
                {/* Seller Info */}
                {offer.seller && (
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="flex-shrink-0 bg-cyan-700/20 rounded-full p-3 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 "
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">
                          Seller Name:
                        </span>
                        <span className="text-cyan-300 font-semibold text-base">
                          {offer.seller.displayName ||
                            offer.seller.username ||
                            offer.seller._id}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">ID:</span>
                        <span className="text-gray-200 font-mono text-sm">
                          {offer.seller._id}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                id="box-3"
                className="bg-gray-400/20  p-6 w-full max-w-sm mb-6  backdrop-blur-lg rounded-2xl border border-gray-400/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">
                    <span className="text-emerald-400 font-bold mr-1">
                      👍 100.00%
                    </span>
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

                  <button
                    className="bg-emerald-600 text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-emerald-700 transition duration-300 flex items-center shadow-md shadow-emerald-600/30"
                    onClick={() => redirect("/chat")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BuyCardComp;
