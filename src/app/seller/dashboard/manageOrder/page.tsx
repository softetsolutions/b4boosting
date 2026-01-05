"use client";

import { useEffect, useState } from "react";
import OrderTable from "src/components/seller/orders/OrderTable";
import OrderFilters from "src/components/seller/orders/OrderFilters";
import { fetchOrdersBySeller } from "src/api/orders";

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  // Global filters (shared by table + filters)
  const [filters, setFilters] = useState({
    status: "",
    search: "",
    from: "",
    to: "",
    page: 1,
    limit: 10,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetchOrdersBySeller(
        filters.page,
        filters.limit,
        filters.from,
        filters.to,
        filters.status,
        filters.search
      );

      if (res.success) {
        setOrders(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]); // refresh whenever filters change

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-4">Manage Orders</h1>

      <OrderFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="flex items-center justify-center p-6">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : (
        <OrderTable
          orders={orders}
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(p) => setFilters({ ...filters, page: p })}
          refresh={fetchOrders}
        />
      )}
    </div>
  );
}
