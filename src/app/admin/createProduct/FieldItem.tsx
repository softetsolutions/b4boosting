"use client";

import CustomValueInput from "./CustomValueInput";

interface Field {
  id: number;
  name: string;
  type: "custom" | "range" | "text";
  customValues: string[];
  minValue: number;
  maxValue: number;
  required: boolean;
}

interface FieldItemProps {
  field: Field;
  index: number;
  onRemove: (id: number) => void;
  onChange: (
    id: number,
    property: keyof Field,
    value: string | number | boolean | string[]
  ) => void;
  onAddCustomValue: (fieldId: number, value: string) => void;
  onRemoveCustomValue: (fieldId: number, index: number) => void;
  canRemove: boolean;
}

export default function FieldItem({
  field,
  index,
  onRemove,
  onChange,
  onAddCustomValue,
  onRemoveCustomValue,
  canRemove,
}: FieldItemProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/30 rounded-lg p-2 space-y-2">
      {/* Header with Remove Button */}
      <div className="flex justify-between items-center">
        <h5 className="text-xs font-medium text-white">Field #{index + 1}</h5>
        <button
          type="button"
          onClick={() => onRemove(field.id)}
          className="text-red-400 hover:text-red-300 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={!canRemove}
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* Name + Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <label
            htmlFor={`field-name-${field.id}`}
            className="block text-xs font-medium text-gray-300 mb-0.5"
          >
            Field Name
          </label>
          <input
            type="text"
            id={`field-name-${field.id}`}
            value={field.name}
            onChange={(e) => onChange(field.id, "name", e.target.value)}
            required
            className="w-full bg-gray-700/50 border border-gray-600 rounded py-1.5 px-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
            placeholder="e.g. Town Hall Level, Rank, etc."
          />
        </div>

        <div>
          <label
            htmlFor={`field-type-${field.id}`}
            className="block text-xs font-medium text-gray-300 mb-0.5"
          >
            Field Type
          </label>
          <div className="relative group">
            <select
              id={`field-type-${field.id}`}
              value={field.type}
              onChange={(e) =>
                onChange(field.id, "type", e.target.value as Field["type"])
              }
              className="appearance-none w-full bg-gray-700/50 border border-gray-600 rounded py-1.5 px-2 pr-8 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200 cursor-pointer hover:bg-gray-700/70"
            >
              <option value="custom">Custom Values</option>
              <option value="range">Value Range</option>
              <option value="text">Text Input</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
              <svg
                className="h-3 w-3"
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
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rendering */}
      {field.type === "range" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label
              htmlFor={`field-min-${field.id}`}
              className="block text-xs font-medium text-gray-300 mb-0.5"
            >
              Minimum Value
            </label>
            <input
              type="number"
              id={`field-min-${field.id}`}
              value={field.minValue}
              onChange={(e) =>
                onChange(field.id, "minValue", parseInt(e.target.value))
              }
              className="w-full bg-gray-700/50 border border-gray-600 rounded py-1.5 px-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor={`field-max-${field.id}`}
              className="block text-xs font-medium text-gray-300 mb-0.5"
            >
              Maximum Value
            </label>
            <input
              type="number"
              id={`field-max-${field.id}`}
              value={field.maxValue}
              onChange={(e) =>
                onChange(field.id, "maxValue", parseInt(e.target.value))
              }
              className="w-full bg-gray-700/50 border border-gray-600 rounded py-1.5 px-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : field.type === "custom" ? (
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-0.5">
            Custom Values
          </label>
          <CustomValueInput onAdd={(value) => onAddCustomValue(field.id, value)} />

          {field.customValues.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {field.customValues.map((value, valueIndex) => (
                <div
                  key={valueIndex}
                  className="bg-gray-700 text-gray-200 px-1.5 py-0.5 rounded flex items-center text-xs"
                >
                  {value}
                  <button
                    type="button"
                    onClick={() => onRemoveCustomValue(field.id, valueIndex)}
                    className="ml-1 text-gray-400 hover:text-gray-200"
                  >
                    <svg
                      className="w-2.5 h-2.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}

      {/* Required Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`field-required-${field.id}`}
          checked={field.required}
          onChange={(e) => onChange(field.id, "required", e.target.checked)}
          className="h-3 w-3 text-cyan-600 focus:ring-cyan-500 border-gray-600 rounded"
        />
        <label
          htmlFor={`field-required-${field.id}`}
          className="ml-1.5 block text-xs text-gray-300"
        >
          Required field
        </label>
      </div>
    </div>
  );
}
