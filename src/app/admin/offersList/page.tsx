"use client";

import { useEffect, useState, useCallback } from "react";
import OfferTable from "src/components/offers/OfferTable";
import OfferFilters from "src/components/offers/OfferFilters";
import { fetchOffers } from "src/api/offers";
import type { ApiOffer } from "src/api/offers";
export default function Offers() {
  const [offers, setOffers] = useState<ApiOffer[]>([]);
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

 
const fetchAllOffers = useCallback(async () => {
  try {
    setLoading(true);

    const res = await fetchOffers(
      filters.page,
      filters.limit,
      filters.from,
      filters.to,
      filters.status,
      filters.search
    );

    if (res.success) {
      setOffers(res.data || []);
      setTotalPages(res.totalPages || 1);
    } else {
      setOffers([]);
    }
  } catch (err) {
    console.error("Error fetching orders:", err);
    setOffers([]);
  } finally {
    setLoading(false);
  }
}, [ filters.page,
  filters.limit,
  filters.from,
  filters.to,
  filters.status,
  filters.search,]);

useEffect(() => {
  fetchAllOffers();
}, [fetchAllOffers]);

  return (
    <div className="text-white">
      <h1 className="text-4xl font-bold mb-4">All Offers</h1>

      <OfferFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="flex items-center justify-center p-6">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : (
        <OfferTable
          offers={offers}
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(p: number) => setFilters({ ...filters, page: p })}
          // refresh={fetchAllOffers}
        />
      )}
    </div>
  );
}
