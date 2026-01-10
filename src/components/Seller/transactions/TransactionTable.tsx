"use client";

import Image from "next/image";

export default function TransactionTable({ transactions }) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-600/20 text-green-400 border border-green-600/30";
      case "failed":
        return "bg-red-600/20 text-red-400 border border-red-600/30";
      case "pending":
        return "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30";
      default:
        return "bg-gray-600/20 text-gray-300 border border-gray-600/30";
    }
  };

  return (
    <div className="overflow-x-auto border border-gray-800 rounded-xl">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-3">Tx ID</th>
            <th className="p-3">Order</th>
            <th className="p-3">Buyer</th>

            <th className="p-3">Amount</th>
            <th className="p-3">Type</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map((tx) => (
            <tr key={tx._id} className="border-t border-gray-800">
              <td className="p-3">{tx.gatewayTransactionId}</td>
              <td className="p-3">{tx.orderId?._id}</td>

              <td className="p-3">
                <div className="flex items-center">
                  <Image
                    src={tx.buyerId?.profilePic}
                    className="w-5 h-5 rounded-full mr-2"
                    alt="buyer"
                    fill
                  />
                  {tx.buyerId?.username}
                </div>
                {tx.buyerId?.email}
              </td>

              <td className="p-3">${tx.amount}</td>
              <td className="p-3">{tx.transactionType}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                    tx.paymentStatus
                  )}`}
                >
                  {tx.paymentStatus.toUpperCase()}
                </span>
              </td>

              <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
