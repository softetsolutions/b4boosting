"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "src/components/Footer/Footer";
import Navbar from "src/components/Navbar/Navbar";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { fetchOrdersByBuyer } from "src/api/orders";
import { getAccountDetails } from "src/api/api";
import { useSearchParams } from "next/navigation";
import RateReviewModal from "src/components/Reviews/RateReviewModal";
import StarRating from "src/components/Reviews/StarRating";
import type {AccountDetails} from "src/api/types";
import type { BuyerOrder, OrderReview } from "src/api/orders";
import {getImageSrc} from "src/utils/imageUtils";



interface DecodedToken {
  id: string;
  name?: string;
  email?: string;
  username?: string;
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const defaultTabFromUrl = searchParams.get("tab") || "profile";

  const [activeTab, setActiveTab] = useState(defaultTabFromUrl);
  const [orders, setOrders] = useState<BuyerOrder[]>([]);
  const [accountDetails, setAccountDetails] =  useState<AccountDetails | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(false);
  const [openReviewOrderId, setOpenReviewOrderId] = useState<string | null>(
    null
  );
  const [reviewToEdit, setReviewToEdit] =  useState<OrderReview | undefined>(undefined);
  const tabs = [
    { key: "profile", label: "My Profile" },
    { key: "orders", label: "My Orders" },
    { key: "settings", label: "Settings" },
  ];

  useEffect(() => {
    const token = getCookie("token");
    if (!token) return;

    try {
      const decoded: DecodedToken = jwtDecode(token as string);
      setUser(decoded);
      fetchOrders(decoded.id);
      fetchAccountDetails();
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }, []);

  const fetchOrders = async (buyerId: string) => {
    setLoading(true);
    try {
      const response = await fetchOrdersByBuyer(buyerId);

      if (response?.data) setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountDetails = async () => {
    setLoading(true);
    try {
      const response = await getAccountDetails();
      const data = await response?.data;
      setAccountDetails(data);
    } catch (error) {
      console.error("Failed to fetch account details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if URL changes (e.g. user navigates), sync tab
    const tab = searchParams.get("tab");
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab]);

  return (
    <>
      <Navbar />
      <main>
        <div className="min-h-screen mt-35">
          <div className="max-w-5xl mx-auto rounded-2xl border border-gray-400/20 overflow-hidden">
            {/* Header Section */}
            <div className="relative h-38">
              <div className="absolute bottom-0 left-6 flex items-end space-x-4">
                <Image
                  src="/images/profile-avatar.png"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <div className="pb-2">
                  <h2 className="text-2xl font-semibold">
                    {user?.username || "User"}
                  </h2>
                  <p className="text-sm opacity-90">
                    Member since{" "}
                     {accountDetails?.createdAt
    ? new Date(accountDetails.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mt-10 py-5 px-6 border-b border-gray-400/20 flex space-x-4">
              {tabs?.map((tab) => (
                <button
                  aria-label="active tab"
                  type="button"
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-2 px-5 text-sm font-medium rounded-full transition-all ${
                    activeTab === tab.key
                      ? "yellow-bg text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "profile" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Profile Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Full Name</p>
                      <p className="font-medium">
                        {accountDetails?.displayName || "Kumari"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium">
                        {accountDetails?.email || "abc@gmail.com"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">My Orders</h3>
                  {loading ? (
                    <p className="text-gray-500">Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <p className="text-gray-500">No orders found.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders?.map((order) => (
                        <div
                          key={order._id}
                          className="border border-gray-400/20 bg-black rounded-lg p-4 hover:shadow-sm transition"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-300">
                                Order #{order._id.toUpperCase()}
                              </p>
                              <p className="text-sm text-gray-400">
                                {order.quantity} item(s) • ₹{order.amount} •
                                Paid via PayPal
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(order.createdAt).toLocaleString(
                                  "en-IN",
                                  {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                  }
                                )}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500"> Order : </span>
                              <span
                                className={`text-sm font-semibold ${
                                  order.orderStatus === "accepted"
                                    ? "text-green-500"
                                    : order.orderStatus === "pending"
                                    ? "text-yellow-500"
                                    : "text-gray-500"
                                }`}
                              >
                                {order.orderStatus.charAt(0).toUpperCase() +
                                  order.orderStatus.slice(1)}
                              </span>
                              <br />
                              <span className="text-gray-500"> Payment : </span>
                              <span
                                className={`text-sm font-semibold ${
                                  order.paymentStatus === "paid"
                                    ? "text-green-500"
                                    : order.paymentStatus === "pending"
                                    ? "text-yellow-500"
                                    : "text-gray-500"
                                }`}
                              >
                                {order.paymentStatus.charAt(0).toUpperCase() +
                                  order.paymentStatus.slice(1)}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <div className="mt-3 border-t border-gray-700 pt-3 text-sm text-gray-400">
                              <p>
                                <span className="text-gray-500">Product:</span>{" "}
                                {order.product?.title || "N/A"}{" "}
                              </p>
                              <p>
                                <span className="text-gray-500">Offer:</span>{" "}
                                {order.offer?._id || "N/A"}{" "}
                              </p>
                              <p>
                                <span className="text-gray-500">
                                  PayPal Transaction ID:
                                </span>{" "}
                                <span className="text-gray-300 font-mono">
                                  {order.paypalTransactionId}
                                </span>
                              </p>
                              <p>
                                <span className="text-gray-500">Seller:</span>{" "}
                                {order.seller?.username || "Unknown"}{" "}
                                <span className="text-xs text-gray-500">
                                  ({order.seller?.email || "No Email"})
                                </span>
                              </p>
                            </div>

                            <span>
                              <Image
                                // src={
                                //   order.product?.images?.[0] ||
                                //   "/placeholder.png"
                                // }
                                src={getImageSrc(order.product?.images?.[0] || "/images/placeholder.png")}
                                alt="product image"
                                width={140}
                                height={60}
                                className="w-35 h-15"
                                priority={false}
                              />
                              {order.orderStatus === "delivered" &&
                                !order?.review && (
                                  <>
                                    <p
                                      onClick={() => {
                                        setOpenReviewOrderId(order._id);
                                        setReviewToEdit(undefined);
                                      }}
                                      className="text-yellow-400 cursor-pointer hover:underline mt-2"
                                    >
                                      Rate & Review
                                    </p>
                                  </>
                                )}

                              {order?.review &&
                                order.orderStatus === "delivered" && (
                                  <>
                                    <div className="mt-3 text-sm">
                                      <StarRating
                                        value={order.review.rating}
                                        onChange={() => {}}
                                        disabled
                                        readOnly
                                      />

                                      {order.review.reviewText && (
                                        <p className="text-gray-400 mt-1 line-clamp-2">
                                          {order.review.reviewText}
                                        </p>
                                      )}
                                    </div>
                                  </>
                                )}
                              {/* UPDATE ONLY ONCE */}
                              {order.review &&
                                order?.orderStatus === "delivered" &&
                                !order.review.isEdited && (
                                  <span
                                    onClick={() => {
                                       if (!order.review) return;
                                      setReviewToEdit(order.review);
                                      setOpenReviewOrderId(order._id);
                                    }}
                                    className="text-yellow-400 cursor-pointer text-xs hover:underline mt-1 inline-block"
                                  >
                                    Update
                                  </span>
                                )}

                              {openReviewOrderId === order._id && (
                                <RateReviewModal
                                  orderId={order._id}
                                  existingReview={reviewToEdit}
                                  onClose={() => {
                                    setOpenReviewOrderId(null);
                                    setReviewToEdit(undefined);
                                  }}
                                />
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "settings" && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Settings</h3>
                  <p className="text-gray-600">
                    Here you can update your password, privacy settings, or
                    notification preferences.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
