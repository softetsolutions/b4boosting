"use client";

import { Search, X } from "lucide-react";

export default function ReviewFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-4 bg-gray-900 p-4 rounded-lg mb-4 justify-between">

      {/* ⭐ NEW: Rating Filter (1–5) */}
      <select
        value={filters.rating}
        onChange={(e) =>
          setFilters({ ...filters, rating: e.target.value, page: 1 })
        }
        className="bg-gray-800 p-2 rounded border border-gray-700"
      >
        <option value="">All Ratings</option>
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            ⭐ {r}
          </option>
        ))}
      </select>

      {/* 📅 Date Filters */}
      <div className="flex gap-4">
        <input
          type="date"
          className="bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded"
          value={filters.from}
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value, page: 1 })
          }
        />

        <input
          type="date"
          className="bg-gray-800 text-white border border-gray-700 px-3 py-2 rounded"
          value={filters.to}
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value, page: 1 })
          }
        />
      </div>

      {/* 🔍 Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

        <input
          type="text"
          placeholder="Search product, buyer, seller, order..."
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value, page: 1 })
          }
          className="bg-gray-800 pl-10 pr-10 p-2 rounded border border-gray-700 w-full"
        />

        {filters.search.length > 0 && (
          <X
            onClick={() =>
              setFilters({ ...filters, search: "", page: 1 })
            }
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-300 cursor-pointer hover:text-white"
          />
        )}
      </div>
    </div>
  );
}
