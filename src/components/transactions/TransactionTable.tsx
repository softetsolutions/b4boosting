"use client";

export default function TransactionTable({ transactions }) {
  return (
    <div className="overflow-x-auto border border-gray-800 rounded-xl">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-3">Tx ID</th>
            <th className="p-3">Order</th>
            <th className="p-3">Buyer</th>
            <th className="p-3">Seller</th>
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
              <td className="p-3">{tx.buyerId?.email}</td>
              <td className="p-3">{tx.sellerId?.email}</td>
              <td className="p-3">${tx.amount}</td>
              <td className="p-3">{tx.transactionType}</td>
              <td className="p-3">{tx.paymentStatus}</td>
              <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
