"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { getAllReviewsForAdmin, adminDeleteReview } from "src/api/reviews";
import { Trash2 } from "lucide-react";
import ReviewFilters from "src/components/Reviews/ReviewFilters";

interface AdminReview {
  _id: string;
  rating: number;
  reviewText: string;
  createdAt: string;
  buyerId: { username?: string; email?: string };
  sellerId: { username?: string; email?: string };
  productId: { title: string };
  orderId?: string;
}

export default function AdminReviewsTable() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    rating: undefined as number | undefined,
    search: "",
    from: "",
    to: "",
  });

 const fetchReviews = useCallback(async () => {
  try {
    setLoading(true);

    const res = await getAllReviewsForAdmin({
      ...filters,
      rating: filters.rating ? Number(filters.rating) : undefined,
    });

    setReviews(res.data || []);
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Failed to load reviews");
    }
  } finally {
    setLoading(false);
  }
}, [filters]);

useEffect(() => {
  fetchReviews();
}, [fetchReviews]);

  const handleDelete = async (reviewId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(reviewId);

      await adminDeleteReview(reviewId); // ⭐ API call
      toast.success("Review deleted successfully");

      await fetchReviews(); // ⭐ refresh list
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-400">Loading reviews...</p>;
  }

  return (
    <div className="min-h-screen px-2 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        Ratings & Reviews
      </h1>

      <ReviewFilters filters={filters} setFilters={setFilters} />

{(reviews.length) ? (
      <div className="overflow-x-auto border border-gray-800 rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-900/80">
            <tr>
              <th className="px-4 py-3 text-left">Buyer</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Review</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Seller</th>
              <th className="px-4 py-3 text-right">Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800 bg-gray-950/60">
            {reviews?.map((review) => (
              <tr key={review._id} className="hover:bg-gray-900/60">
                {/* Buyer */}
                <td className="px-4 py-3">
                  <p className="font-medium">
                    {review.buyerId?.username || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {review.buyerId?.email}
                  </p>
                </td>

                {/* Product */}
                <td className="px-4 py-3 text-xs text-gray-300">
                  {review.productId?.title}
                </td>

                {/* Review */}
                <td className="px-4 py-3 text-xs text-gray-300 max-w-xs">
                  {review.reviewText || "—"}
                </td>

                {/* Rating */}
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/40">
                    ⭐ {review.rating}
                  </span>
                </td>

                {/* Seller */}
                <td className="px-4 py-3 text-xs text-gray-300">
                  <p>{review.sellerId?.username || "N/A"}</p>
                  <p className="text-gray-500">{review.sellerId?.email}</p>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-right text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    aria-label="delete review"
                    type="button"
                    onClick={() => handleDelete(review._id)}
                    disabled={deletingId === review._id}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-red-400 hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                    title="Delete review"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
)
      :
      <>
        <p className="text-sm text-gray-400">No reviews found.</p>
      </>}
    </div>
  );
}
