"use client";

import FieldItem from "./FieldItem";

interface Field {
  id: number;
  name: string;
  type: "custom" | "range" | "text";
  customValues: string[];
  minValue: number;
  maxValue: number;
  required: boolean;
}

interface ProductFieldsProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

export default function ProductFields({ fields, setFields }: ProductFieldsProps) {
  // Add a new field
  const addField = () => {
    const newId = Math.max(...fields.map((f) => f.id), 0) + 1;
    setFields([
      ...fields,
      {
        id: newId,
        name: "",
        type: "custom",
        customValues: [],
        minValue: 0,
        maxValue: 100,
        required: false,
      },
    ]);
  };

  // Remove a field
  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Handle field changes
  const handleFieldChange = (
    id: number,
    property: keyof Field,
    value: string | number | boolean | string[]
  ) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [property]: value } : field
      )
    );
  };

  // Add a custom value to a field
  const addCustomValue = (fieldId: number, value: string) => {
    if (!value.trim()) return;

    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, customValues: [...field.customValues, value.trim()] }
          : field
      )
    );
  };

  // Remove a custom value from a field
  const removeCustomValue = (fieldId: number, index: number) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              customValues: field.customValues.filter((_, i) => i !== index),
            }
          : field
      )
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium text-white">Product Fields</h4>
        <button
          type="button"
          onClick={addField}
          className="flex items-center text-xs px-2 py-0.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/25"
        >
          <svg
            className="w-3 h-3 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Field
        </button>
      </div>

      {fields.map((field, index) => (
        <FieldItem
          key={field.id}
          field={field}
          index={index}
          onRemove={removeField}
          onChange={handleFieldChange}
          onAddCustomValue={addCustomValue}
          onRemoveCustomValue={removeCustomValue}
          canRemove={fields.length > 1}
        />
      ))}
    </div>
  );
}
