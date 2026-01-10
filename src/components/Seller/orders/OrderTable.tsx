"use client";

import toast from "react-hot-toast";
import { updateOrderStatusBySeller } from "src/api/orders";
import StarRating from "src/components/Reviews/StarRating";
import Image from "next/image";

export default function OrderTable({
  orders,
  currentPage,
  totalPages,
  onPageChange,
  refresh,
}) {
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateOrderStatusBySeller(id, status);
      if (res.success) {
        toast.success("Order status updated");
        refresh();
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto border border-gray-800 rounded-xl">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-3">Order ID</th>
            {/* <th className="p-3">Transc. ID</th> */}
            <th className="p-3">Product</th>
            <th className="p-3">Buyer</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Payment Status</th>
            <th className="p-3">Order Status</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Actions</th>
            <th className="p-3">Ratings/Reviews</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((order) => (
            <tr key={order._id} className="border-t border-gray-800">
              <td className="p-3">{order._id}</td>
              {/* <td className="p-3">{order.paypalTransactionId}</td> */}
              <td className="p-3">{order.productId?.title}</td>

              <td className="p-3">
                <div className="flex items-center">
                 <div className="relative w-5 h-5 mr-2">
  <Image
    src={order.buyerId?.profilePic || "/default-avatar.png"}
    alt="buyerId"
    fill
    className="rounded-full object-cover"
  />
</div>
                  {order.buyerId?.username}
                </div>
                {order.buyerId?.email}
              </td>

              <td className="p-3">${order.amount}</td>
              <td className="p-3">{order.paymentStatus}</td>
              <td className="p-3">{order.orderStatus}</td>
              <td className="p-3">{order.createdAt}</td>

              <td className="p-3">
                <select
                  className="bg-gray-900 border border-gray-700 px-2 py-1 rounded"
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  defaultValue={order.orderStatus}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>

              <td className="px-4 py-3 max-w-sm">
                {order.review ? (
                  <div className="space-y-2">
                    {/* Rating */}
                    <StarRating value={order.review.rating} disabled readOnly/>

                    {/* Review text */}
                    <p className="text-sm text-gray-500 italic">
                      “{order.review.reviewText}”
                    </p>

                    {/* Created date */}
                    <p className="text-xs text-gray-400">
                      {new Date(order.review.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    {/* Edited badge */}
                    {order.review.isEdited && (
                      <span className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Edited
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No Review</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end-safe gap-3 m-4">
        <button
          type="button"
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        <button
          type="button"
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
