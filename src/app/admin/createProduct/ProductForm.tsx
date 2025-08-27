"use client";

import type { ProductFormData } from "src/api/types";
import type { Service } from "src/api/services";
import CustomDropdown from "src/components/ui/CustomDropdown";

interface ProductFormProps {
  formData: ProductFormData;
  services: Service[];
  productTypes: string[];
  onInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onServiceChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function ProductForm({
  formData,
  services,
  productTypes,
  onInputChange,
  onServiceChange,
  onTypeChange,
}: ProductFormProps) {
  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Product Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          required
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
          placeholder="Enter product title"
        />
      </div>

      {/* Service Selection */}
      <div>
        <label
          htmlFor="service"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Service
        </label>
        <CustomDropdown
          value={formData.serviceName}
          onChange={onServiceChange}
          options={[...new Set(services.map((service) => service.name))]}
          placeholder="Select a service"
          required={true}
        />
      </div>

      {/* Product Type */}
      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Product Type
        </label>
        <CustomDropdown
          value={formData.type}
          onChange={onTypeChange}
          options={productTypes}
          placeholder="Select product type"
          required={true}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          rows={4}
          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
          placeholder="Enter product description"
        />
      </div>
    </div>
  );
}
