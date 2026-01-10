"use client";

import { useState } from "react";

interface CustomValueInputProps {
  onAdd: (value: string) => void;
}

const CustomValueInput: React.FC<CustomValueInputProps> = ({ onAdd }) => {
  const [value, setValue] = useState<string>("");

  const handleAdd = () => {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue("");
  };

  return (
    <div className="flex gap-1">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-gray-700/50 border border-gray-600 rounded-l py-1.5 px-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
        placeholder="Enter a value"
      />
      <button
        type="button"
        onClick={handleAdd}
        className="bg-cyan-600 hover:bg-cyan-700 text-white px-2 rounded-r text-xs"
        aria-label=" Add value"
      >
        Add
      </button>
    </div>
  );
};

export default CustomValueInput;
