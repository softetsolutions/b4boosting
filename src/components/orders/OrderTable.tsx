
"use client";

import toast from "react-hot-toast";
import { updateOrderStatus } from "src/api/orders";
import Image from "next/image";

export default function OrderTable({ orders, currentPage, totalPages, onPageChange, refresh }) {
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await updateOrderStatus(id, status);
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
            <th className="p-3">Seller</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Payment Status</th>
            <th className="p-3">Order Status</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Actions</th>
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

              <td className="p-3">
                <div className="flex items-center">
                  {/* <img src={order.sellerId?.profilePic}
                   className="w-5 h-5 rounded-full mr-2" 
                   alt="sellerId" /> */}
                   <Image
  src={order.sellerId?.profilePic || "/avatar-placeholder.png"}
  alt="seller profile"
  width={20}
  height={20}
  className="rounded-full mr-2 object-cover"
/>
                  {order.sellerId?.username}
                </div>
                {order.sellerId?.email}
              </td>

              <td className="p-3">${order.amount}</td>
              <td className="p-3">{order.paymentStatus}</td>
              <td className="p-3">{order.orderStatus}</td>
              <td className="p-3">{order.createdAt}</td>

              <td className="p-3">
                <select
                  className="bg-gray-900 border border-gray-700 px-2 py-1 rounded"
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  defaultValue={order.orderStatus}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end-safe gap-3 m-4">
        <button
          type="button"
          aria-label="prev button"
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        <button
          type="button"
          aria-label="next button"
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
