"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type {
  Service,
  ProductFormData,
  CreateProductResponse,
} from "src/api/types";
import { fetchServices } from "src/api/services";
import { createProduct } from "src/api/products";
import ProductForm from "./ProductForm";
import ProductFields from "./ProductFields";
import FormHeader from "./FormHeader";
import FormActions from "./FormActions";
import ImageUpload from "src/components/ui/ImageUpload";

interface Field {
  id: number;
  name: string;
  type: "custom" | "range" | "text";
  customValues: string[];
  minValue: number;
  maxValue: number;
  required: boolean;
}

// Product types
const PRODUCT_TYPES = ["Account", "Item", "Currency", "Service"];

interface LocalProductFormState {
  title: string;
  type: string;
  description: string;
  service: string;
  serviceName: string;
  productRequiredFields: any[];
  images: File[];
}

export default function CreateProduct() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Service[]>([]);

  const [formData, setFormData] = useState<LocalProductFormState>({
    title: "",
    type: "",
    description: "",
    service: "",
    serviceName: "",
    productRequiredFields: [],
    images: [],
  });

  // Fields configuration
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      name: "",
      type: "custom",
      customValues: [],
      minValue: 0,
      maxValue: 100,
      required: false,
    },
  ]);

  // Fetch services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices();
        setServices(
          data.map((service: any) => ({
            ...service,
            type: service.type ?? "",
          }))
        );
      } catch (error) {
        console.error("Error loading services:", error);
        setError("Failed to load services");
      }
    };
    loadServices();
  }, []);

  const transformFieldsForApi = () => {
    return fields.map((field) => ({
      fieldName: field.name,
      fieldType: field.type,
      options:
        field.type === "custom"
          ? field.customValues
          : field.type === "range"
          ? [`${field.minValue}-${field.maxValue}`]
          : [],
      isrequired: field.required,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!formData.images || formData.images.length === 0) {
      setError("Please upload at least one product image.");
      setIsSubmitting(false);
      return;
    }

    try {
      const productRequiredFields = transformFieldsForApi();
      const data = new FormData();
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("description", formData.description);
      data.append("service", formData.service);
      data.append("serviceName", formData.serviceName);
      data.append("productRequiredFields", JSON.stringify(productRequiredFields));
      formData.images.forEach((file) => {
        data.append("images", file);
      });

      const response = (await createProduct(data)) as CreateProductResponse;

      if (response.success) {
        router.push("/admin");
      } else {
        throw new Error(response.message || "Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (value: string) => {
    const service = services.find((s) => s.name === value);
    setFormData((prev) => ({
      ...prev,
      service: service?._id || "",
      serviceName: value,
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  return (
    <div>
      <FormHeader />

      {/* Form Container */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-gray-700/50">
          <h3 className="text-base font-medium text-white">Product Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <ProductForm
            formData={formData}
            services={services}
            productTypes={PRODUCT_TYPES}
            onInputChange={handleInputChange}
            onServiceChange={handleServiceChange}
            onTypeChange={handleTypeChange}
          />

          <ProductFields fields={fields} setFields={setFields} />

          <ImageUpload
            images={formData.images}
            onImagesChange={(imgs) =>
              setFormData((prev) => ({ ...prev, images: imgs }))
            }
            maxImages={5}
          />

          <FormActions isSubmitting={isSubmitting} onCancel={handleCancel} />
        </form>
      </div>
    </div>
  );
}
