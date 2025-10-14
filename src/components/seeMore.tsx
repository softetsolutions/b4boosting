
"use client";

import { useState } from "react";

export default function SeeMore<T>({
  data,
  initialVisible,
  renderItem,
  title, // ✅ New optional title prop
}: {
  data: T[];
  initialVisible: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
}) {
  const [visible, setVisible] = useState(initialVisible);
  const isExpanded = visible >= data.length;

  return (
    <div className="w-full">
      {/* ✅ Top Bar: See More Left | Title Right */}
      <div className="flex items-center justify-between mb-4">
          {title && (
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>
        )}
        {data.length > initialVisible && (
          <button
            type="button"
            className="text-sm font-medium yellow-text hover:underline"
            onClick={() => setVisible(isExpanded ? initialVisible : data.length)}
          >
            {isExpanded ? "See Less" : "See More"}
          </button>
        )}
      
      </div>

      {/* ✅ Grid Section */}
      <div className="grid gap-4">
        {data.slice(0, visible).map((item, index) => renderItem(item, index))}
      </div>
    </div>
  );
}
