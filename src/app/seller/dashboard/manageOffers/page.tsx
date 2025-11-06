"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "src/components/ui/ConfirmationModal";
import { fetchOffersBySellerId, deleteOffer } from "src/api/offers";

/** Local Offer type (adjust if your ApiOffer differs) */
type OfferDetail = { fieldName: string; value: string };
type OfferProduct = { _id: string; title?: string; images?: string[] };
type Offer = {
  _id: string;
  product?: OfferProduct | null;
  price?: number;
  quantityAvailable?: number;
  deliveryTime?: string;
  status?: string;
  currency?: string;
  offerDesc?: string;
  offerDetails?: OfferDetail[];
  instantDelivery?: boolean;
  images?: string[];
  createdAt?: string;
};

type GroupedOffers = {
  productId: string;
  productName: string;
  offers: Offer[];
};

export default function ManageOffers() {
  const router = useRouter();

  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [collapsedProducts, setCollapsedProducts] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const data = await fetchOffersBySellerId();
      setOffers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching offers:", err);
      toast.error("Failed to fetch offers");
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  // Memoize grouping for performance
  const groupedOffers = useMemo(() => {
    return offers.reduce((groups: GroupedOffers[], offer) => {
      const productName = offer.product?.title || "Unknown Product";
      const productId = offer.product?._id || "no-product";

      const existing = groups.find((g) => g.productId === productId);
      if (existing) {
        existing.offers.push(offer);
      } else {
        groups.push({
          productName,
          productId,
          offers: [offer],
        });
      }
      return groups;
    }, []);
  }, [offers]);

  const handleEditOffer = (offerId: string) => {
    // Navigate to createOffers page with query param to prefill for edit
    router.push(`/seller/dashboard/createOffers?id=${offerId}`);
  };

  const handleDeleteClick = (offerId: string, productTitle: string) => {
    setOfferToDelete({ id: offerId, title: productTitle });
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!offerToDelete) return;
    setShowDeleteModal(false);

    try {
      await deleteOffer(offerToDelete.id);
      setOffers((prev) => prev.filter((o) => o._id !== offerToDelete.id));
      toast.success("Offer deleted successfully");
    } catch (err) {
      console.error("Error deleting offer:", err);
      toast.error("Failed to delete offer");
    } finally {
      setOfferToDelete(null);
    }
  };

  const toggleProductCollapse = (productId: string) => {
    setCollapsedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const renderOfferImage = (images?: string[]) => {
    if (!images || images.length === 0) return null;
    const firstImage = images[0];
    return (
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700/50 flex items-center justify-center">
        <img
          src={firstImage}
          alt="Offer image"
          className="w-full h-full object-cover"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = "none";
          }}
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Manage Offers</h1>
        <p className="mt-2 text-gray-400">
          View, update, and manage all offers you created
        </p>
      </div>

      {groupedOffers.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">No offers found</div>
          <p className="text-gray-500">
            Create your first offer to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedOffers.map((group) => (
            <div
              key={group.productId}
              className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden"
            >
              {/* Product Header */}
              <div
                className="flex items-center justify-between p-4 bg-gray-800/50 border-b border-gray-700 cursor-pointer hover:bg-gray-800/70 transition-colors"
                onClick={() => toggleProductCollapse(group.productId)}
                role="button"
                aria-expanded={!collapsedProducts.has(group.productId)}
              >
                <div className="flex items-center space-x-3">
                  {collapsedProducts.has(group.productId) ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                  <h3 className="text-xl font-semibold text-white">
                    {group.productName}
                  </h3>
                  <span className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full">
                    {group.offers.length}{" "}
                    {group.offers.length === 1 ? "offer" : "offers"}
                  </span>
                </div>
              </div>

              {/* Offers Grid */}
              {!collapsedProducts.has(group.productId) && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.offers.map((offer) => (
                      <div
                        key={offer._id}
                        className={`relative bg-gray-800/50 border border-gray-700 rounded-lg p-4 cursor-default group transition-all duration-300 
   `}
                      >
                        {offer.status && (
                          <span
                            className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                              offer.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-400/40"
                                : "bg-yellow-500/20 text-yellow-400 border-yellow-400/40"
                            }`}
                          >
                            {offer.status === "active" ? "Active" : "Inactive"}
                          </span>
                        )}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {renderOfferImage(offer.images)}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-semibold text-white group-hover:text-cyan-400 transition-colors truncate">
                                {offer.product?.title || "Unnamed Offer"}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {offer.currency ?? "INR"}{" "}
                                {typeof offer.price === "number"
                                  ? offer.price.toFixed(2)
                                  : "—"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-300 line-clamp-2">
                            {offer.offerDesc || "No description available"}
                          </p>
                        </div>

                        <div className="mb-2 flex justify-between">
                          {offer.offerDetails?.length ? (
                            <div className="mb-3 text-xs text-gray-400">
                              {offer.offerDetails.slice(0, 3).map((d, i) => (
                                <div key={i} className="truncate">
                                  <strong className="text-gray-300">
                                    {d.fieldName}:
                                  </strong>{" "}
                                  <span className="text-gray-400">
                                    {d.value}
                                  </span>
                                </div>
                              ))}
                              {offer.offerDetails.length > 3 && (
                                <div className="text-gray-500">
                                  +{offer.offerDetails.length - 3} more
                                </div>
                              )}
                            </div>
                          ) : null}
                          <div className="mb-3 text-xs text-gray-400 space-y-1">
                            <div>
                              <strong className="text-gray-300">
                                Quantity:
                              </strong>{" "}
                              {offer.quantityAvailable ?? "—"}
                            </div>
                            <div>
                              <strong className="text-gray-300">
                                Delivery Time:
                              </strong>{" "}
                              {offer.deliveryTime
                                ? `${offer.deliveryTime} hrs`
                                : "—"}
                            </div>
                            <div>
                              <strong className="text-gray-300">
                                Instant Delivery:
                              </strong>{" "}
                              {offer.instantDelivery ? "✅ Yes" : "❌ No"}
                            </div>
                          </div>
                        </div>

                        {/* Optional: show small preview of offerDetails */}

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            {offer.createdAt
                              ? `Created ${new Date(
                                  offer.createdAt
                                ).toLocaleDateString()}`
                              : "Created —"}
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditOffer(offer._id)}
                              className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded transition-colors"
                              title="Edit offer"
                              aria-label={`Edit offer ${offer._id}`}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteClick(
                                  offer._id,
                                  offer.product?.title || "Offer"
                                )
                              }
                              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded transition-colors"
                              title="Delete offer"
                              aria-label={`Delete offer ${offer._id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Offer"
        message={`Are you sure you want to delete "${offerToDelete?.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setOfferToDelete(null);
        }}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
