"use client";

export default function TransactionFilters({ onFilter }) {
  const handleFilter = (e) => {
    const type = e.target.value;
    onFilter(type ? `?type=${type}` : "");
  };

  return (
    <div className="flex gap-4 mb-6">
      <select
        className="bg-gray-900 border border-gray-700 px-3 py-2 rounded-lg"
        onChange={handleFilter}
      >
        <option value="">All Types</option>
        <option value="order_payment">Order Payment</option>
        <option value="refund">Refund</option>
        <option value="seller_payout">My Payout</option>
      </select>
    </div>
  );
}
