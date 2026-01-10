
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StarRating from "./StarRating";
import ImageUpload from "src/components/ui/ImageUpload";
import { createReview, updateReview } from "src/api/reviews";
import { Review } from "src/api/types";

interface Props {
  orderId: string;
  existingReview?: Review;
  onClose: () => void;
}

export default function RateReviewModal({
  orderId,
  existingReview,
  onClose,
}: Props) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [images, setImages] = useState<(File | string)[]>([]);
  const [loading, setLoading] = useState(false);

  const isEdit = !!existingReview;

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.reviewText || "");
      setImages(existingReview.images || []);
    }
  }, [existingReview]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("orderId", orderId);
      formData.append("rating", rating.toString());
      formData.append("reviewText", reviewText);

      images.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img);
        }
      });

      const res = isEdit
        ? await updateReview(existingReview._id, formData)
        : await createReview(formData);

      if (res.success) {
        toast.success(isEdit ? "Review updated!" : "Review submitted!");
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-black rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4">
          {isEdit ? "Update Review" : "Rate & Review"}
        </h3>

        <StarRating value={rating} onChange={setRating} />

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-3 mt-4 rounded-lg bg-gray-900"
          rows={4}
        />

        <ImageUpload
          images={images}
          onImagesChange={(imgs) => setImages(imgs.slice(0, 3))}
          maxImages={3}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-500 px-4 py-2 rounded-lg"
          >
            {loading
              ? "Saving..."
              : isEdit
              ? "Update Review"
              : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
