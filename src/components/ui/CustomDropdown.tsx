import { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  required: boolean;
  disabled?: boolean;
}

function CustomDropdown({
  value,
  onChange,
  options,
  placeholder,
  required,
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2.5 px-3 text-sm text-left text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200 flex justify-between items-center disabled:bg-gray-800/50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        <span
          className={`${
            value ? "text-white" : "text-gray-400"
          } ${disabled ? 'text-gray-500' : ''}`}
        >
          {value || placeholder}
        </span>
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M7 7l3 3 3-3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-700/70 transition-colors duration-150
                ${
                  value === option
                    ? "text-cyan-400 bg-gray-700/40"
                    : "text-white"
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {required && (
        <input
          type="text"
          tabIndex={-1}
          className="sr-only"
          required
          value={value}
          onChange={() => {}}
        />
      )}
    </div>
  );
}

export default CustomDropdown;
