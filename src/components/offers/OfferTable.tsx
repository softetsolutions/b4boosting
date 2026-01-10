"use client";

import Image from "next/image";

export default function OfferTable({
  offers,
  currentPage,
  totalPages,
  onPageChange,
  // refresh
 
}) {
  const statusColors = {
    active: "bg-green-600/20 text-green-400",
    inactive: "bg-red-600/20 text-red-400",
    soldout: "bg-yellow-600/20 text-yellow-400",
  };

  return (
    <div className="overflow-x-auto border border-gray-800 rounded-xl">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-3">Offer</th>
            <th className="p-3">Product</th>
            <th className="p-3">Seller</th>
            <th className="p-3">Price</th>
            <th className="p-3">Delivery</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Details</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {offers?.map((offer) => (
            <tr key={offer._id} className="border-t border-gray-800">
              {/* Offer ID */}
              <td className="p-3 text-sm text-gray-300">
                <span className="font-mono">{offer._id}</span>
              </td>

              {/* Product Info */}
              <td className="p-3">
                <div className="flex items-center gap-3">
               <Image
  src={offer.images?.[0] || "/fallback-img.jpg"} // fallback if image is missing
  alt={offer.product?.title || "Offer"}
  width={48}  // match w-12 (12 * 4px)
  height={48} // match h-12
  className="object-cover rounded"
/>
                  <div>
                    <div className="font-semibold">{offer.product?.title}</div>
                    <div className="text-xs text-gray-400">{offer.product?.type}</div>
                  </div>
                </div>
              </td>

              {/* Seller Info */}
              <td className="p-3">
                <div className="flex items-center gap-3">
                <Image
  src={offer.seller?.profilePic || "/fallback-profile.png"} // fallback if profile pic is missing
  alt={offer.seller?.name || "Seller"}
  width={32}  // corresponds to w-8 (8 * 4px)
  height={32} // corresponds to h-8
  className="rounded-full object-cover"
/>
                  <div>
                    <div className="font-medium">{offer.seller?.username}</div>
                    <div className="text-xs text-gray-400">{offer.seller?.email}</div>
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="p-3 font-semibold text-gray-200">
                ₹{offer.price}
              </td>

              {/* Delivery */}
              <td className="p-3 text-gray-300">
                <div>
                  <span className="text-sm">
                     <span>{offer.deliveryTime} hours</span>
                     <br />
                    {offer.instantDelivery === true ? (
                      <span className="text-green-400 font-medium">Instant Delivery</span>
                    ) : (
                      <span className="text-red-400 font-medium">Not Instant</span>
                    )}
                                   
                  </span>
                </div>
              </td>

               <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {offer.quantityAvailable}
                </span>
              </td>

              {/* Offer Details */}
              <td className="p-3 text-gray-300">
                <div className="text-sm">{offer.offerDesc}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {offer.offerDetails?.map((d, idx) => (
                    <div key={idx}>
                      <span className="font-medium">{d.fieldName}: </span>
                      <span>{d.value}</span>
                    </div>
                  ))}
                </div>
              </td>

              {/* Status */}
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[offer.status]}`}
                >
                  {offer.status}
                </span>
              </td>

              {/* Date */}
              <td className="p-3 text-gray-400 text-sm">
                {new Date(offer.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between p-4 text-gray-300">
        <span>Page {currentPage} of {totalPages}</span>

        <div className="flex gap-3">
          <button
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Prev
          </button>

          <button
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
