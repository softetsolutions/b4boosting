"use client";

import { useEffect, useState, useCallback } from "react";
import OrderTable from "src/components/orders/OrderTable";
import OrderFilters from "src/components/orders/OrderFilters";
import { fetchAllOrders, ApiOrder } from "src/api/orders";

export interface OrderUI {
  _id: string;
  orderStatus: string;
  paymentStatus: string;
  amount: number;
  quantity: number;

  buyerName: string;
  sellerName: string;
  productTitle: string;

  createdAt: string;
}

const mapApiOrderToUI = (o: ApiOrder): OrderUI => ({
  _id: o._id,
  orderStatus: o.orderStatus,
  paymentStatus: o.paymentStatus,
  amount: o.amount,
  quantity: o.quantity,
  buyerName: o.buyerId.displayName,
  sellerName: o.sellerId.displayName,
  productTitle: o.productId.title,
  createdAt: o.createdAt,
});

export default function ManageOrders() {
  const [orders, setOrders] = useState<OrderUI[]>([]);
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

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetchAllOrders(
        filters.page,
        filters.limit,
        filters.from,
        filters.to,
        filters.status,
        filters.search
      );

      if (res.success) {
        setOrders(res.data.map(mapApiOrderToUI));
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
  }, [
    filters.page,
    filters.limit,
    filters.from,
    filters.to,
    filters.status,
    filters.search,
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
          onPageChange={(p:number) => setFilters({ ...filters, page: p })}
          refresh={fetchOrders}
        />
      )}
    </div>
  );
}
