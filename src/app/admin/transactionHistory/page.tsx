"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";

import TransactionFilters from "src/components/transactions/TransactionFilters";
import TransactionTable from "src/components/transactions/TransactionTable";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTx = async (query = "") => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transactions${query}`
      );
      const data = await res.json();
      setTransactions(data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTx();
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-4">Transaction History</h1>

      <TransactionFilters onFilter={fetchTx} />

      {loading ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center p-6">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"
                role="status"
              ></div>
            </div>
          }
        />
      ) : (
        <TransactionTable transactions={transactions} />
      )}
    </div>
  );
}
