"use client";

import { useEffect, useState } from "react";
import { getReviewsByProductSlug } from "src/api/reviews";
import StarRating from "./StarRating";

import Image from "next/image";

interface Review {
  _id: string;
  rating: number;
  reviewText: string;
  images: (string | File)[];
  buyerId: { username: string };
  createdAt: string;
}

export default function ReviewsCarousel({
  productSlug,
}: {
  productSlug: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!productSlug) return;

    getReviewsByProductSlug(productSlug).then((res) => {
      if (res?.data) setReviews(res.data);
    });
  }, [productSlug]);

  const visibleReviews = reviews.slice(index, index + 3);

  if (!reviews.length) return null;

  return (
    <div className="px-4 lg:mx-12 mb-4  lg:py-10 md:px-8 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>

        <div className="space-x-2">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
            className="px-3 py-1 rounded disabled:opacity-50 border-1"
          >
            ←
          </button>
          <button
            type="button"
            disabled={index >= reviews.length - 3}
            onClick={() => setIndex(index + 1)}
            className="px-3 py-1 rounded disabled:opacity-50 border-1"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleReviews.map((review) => (
          <div
            key={review._id}
            className="border border-gray-500/30 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">{review.buyerId.username}</p>
              <StarRating value={review.rating} readonly />
            </div>

            <p className="text-sm text-gray-500 line-clamp-3">
              {review.reviewText}
            </p>

            {review.images?.length > 0 && (
              <div className="flex space-x-2 mt-3">
                {review.images.map((img, i) => (
                <div key={i} className="relative w-14 h-14">
        <Image
          src={img || "/images/fallback.png"}
          alt="review"
          fill
          className="object-cover rounded-lg"
        />
      </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
