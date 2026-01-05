"use client";

import { useEffect, useState } from "react";
import TransactionFilters from "src/components/Seller/transactions/TransactionFilters";
import TransactionTable from "src/components/Seller/transactions/TransactionTable";
import { fetchSellerTransactions } from "src/api/transaction";

export default function TransactionHistorys() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const loadTransactions = async (query = "") => {
    try {
      setLoading(true);

      const res = await fetchSellerTransactions(query);

      setTransactions(res.data || []);
    } catch (err) {
      console.error("Failed to load transactions:", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-4">Transaction History</h1>

      {/* Filter Component */}
      <TransactionFilters onFilter={loadTransactions} />

      {loading ? (
        <div className="flex items-center justify-center p-6">
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
            role="status"
          ></div>
        </div>
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </div>
  );
}
