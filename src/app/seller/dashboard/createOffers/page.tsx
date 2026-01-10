"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import ImageUpload from "src/components/ui/ImageUpload";
import { fetchAllServices } from "src/api/services";
import { fetchProductsByService } from "src/api/products";
import { createOffer, updateOffer, fetchOfferById } from "src/api/offers";
import type { ProductField } from "src/api/types";

interface OfferDetail {
  fieldName: string;
  value: string;
}

interface Product {
  _id: string;
  title: string;
  type: string;
   images:(File | string)[];
}

// interface Offerproduct {
//   _id: string;
//   title: string;
//   service: string;
//   images:(File | string)[];
//   description?: string;
// }

interface Product {
  _id: string;
  title: string;
  type: string;
  service: string;              // ✅ ADD THIS
  images: (File | string)[];
  description?: string;
  productRequiredFields?: ProductField[];
  additionalFields?: ProductField[];
}


export interface Service {
  _id: string;
  name: string;
  icon: string;
  showOnHome?: boolean;
  createdAt: string;
}

export default function CreateOfferPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const offerId = searchParams.get("id");
  const isEditMode = !!offerId;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedProduct, setSelectedProduct] =  useState<Product | null>(null);
  const [productDetails, setProductDetails] = useState<Record<string, string>>(
    {}
  );
  const [offerImages, setOfferImages] = useState<(File | string)[]>([]);

  const [formData, setFormData] = useState({
    price: "",
    quantityAvailable: "",
    deliveryTime: "",
    currency: "INR",
    offerDesc: "",
    instantDelivery: false,
  });

  // ✅ Fetch offer for edit mode
  useEffect(() => {
    const loadOffer = async () => {
      if (!offerId) return;
      try {
        // const res = await fetchOfferById(offerId);
        const data = await fetchOfferById(offerId);

        setSelectedService(data.product.service);
        // setSelectedProduct(data.product);
        setSelectedProduct({
        _id: data.product._id,
        title: data.product.title,
        service: data.product.service,
        type: "Account", // 👈 REQUIRED (or backend-provided)
        images: data.product.images || [],
        description: data.product.description,
        productRequiredFields: [], // filled after product fetch
        additionalFields: [],
      });
        setProductDetails(
          data.offerDetails?.reduce<Record<string, string>>(
            (acc, item: OfferDetail) => {
              acc[item.fieldName] = item.value;
              return acc;
            },
            {}
          ) || {}
        );

        setFormData({
         price: String(data.price),
  quantityAvailable: String(data.quantityAvailable),
          deliveryTime: data.deliveryTime || "",
          currency: data.currency || "INR",
          offerDesc: data.offerDesc || "",
          instantDelivery: data.instantDelivery || false,
        });
        setOfferImages(data.images || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load offer details");
      }
    };
    loadOffer();
  }, [offerId]);

  // ✅ Fetch all services
  useEffect(() => {
    (async () => {
      try {
        const res = await fetchAllServices();
        setServices(res || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load services");
      }
    })();
  }, []);

  // ✅ Fetch products for selected service
  useEffect(() => {
    if (!selectedService) {
      setProducts([]);
      setSelectedProduct(null);
      return;
    }
    (async () => {
      try {
        const res = await fetchProductsByService(selectedService);
        setProducts(res || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      }
    })();
  }, [selectedService]);

  // ✅ Handlers
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
    setSelectedProduct(null);
    setProductDetails({});
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = products.find((p) => p._id === e.target.value);
    setSelectedProduct(product || null);
    setProductDetails({});
  };

  const handleProductDetailChange = (fieldName: string, value: string) => {
    setProductDetails((prev: Record<string, string>) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Submit Handler (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!selectedProduct) {
      setError("Please select a product before submitting");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("product", selectedProduct._id);

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "offerDetails") {
          data.append(key, String(value));
        }
      });

      const offerDetails = Object.entries(productDetails).map(
        ([key, value]) => ({
          fieldName: key,
          value,
        })
      );

      data.append("offerDetails", JSON.stringify(offerDetails));
      // Images
      offerImages.forEach((file) => data.append("images", file));

      console.log([...data.entries()], "FormData before submit");

      if (isEditMode) {
        await updateOffer(offerId!, data);
        toast.success("Offer updated successfully!");
      } else {
        await createOffer(data);
        toast.success("Offer created successfully!");
      }

      router.push("/seller/dashboard/manageOffers");
    } catch (err) {
      console.error(err);
      toast.error(isEditMode ? "Error updating offer" : "Error creating offer");
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => router.back();
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-4">
            {isEditMode ? "Update Offer" : "Create Offer"}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Add a new offer linked to an existing product
          </p>
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-gray-700/50">
          <h3 className="text-base font-medium text-white">Offer Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Select Service */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Service
            </label>
            <select
              value={selectedService}
              onChange={handleServiceChange}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">-- Select Service --</option>
              {services?.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Select Product */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Select Product
            </label>
            <select
              value={selectedProduct?._id || ""}
              onChange={handleProductChange}
              disabled={!selectedService}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
            >
              <option value="">-- Select Product --</option>
              {products?.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Product Required Fields */}
          {selectedProduct &&
            selectedProduct.productRequiredFields?.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-gray-200 text-sm font-medium">
                  Product Details
                </h3>
                {selectedProduct.productRequiredFields?.map(
                  (field: ProductField, i: number) => (
                    <div key={i}>
                      <label className="block text-sm text-gray-300 mb-1">
                        {field.fieldName}{" "}
                        {field.isrequired && (
                          <span className="text-red-400">*</span>
                        )}
                      </label>

                      {field.fieldType === "text" && (
                        <input
                          type="text"
                          value={productDetails[field.fieldName] || ""}
                          onChange={(e) =>
                            handleProductDetailChange(
                              field.fieldName,
                              e.target.value
                            )
                          }
                          required={field.isrequired}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
                        />
                      )}

                      {field.fieldType === "range" && (
                        <select
                          value={productDetails[field.fieldName] || ""}
                          onChange={(e) =>
                            handleProductDetailChange(
                              field.fieldName,
                              e.target.value
                            )
                          }
                          required={field.isrequired}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="">Select Range</option>
                          {field.options.map((opt: string) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.fieldType === "custom" && (
                        <select
                          value={productDetails[field.fieldName] || ""}
                          onChange={(e) =>
                            handleProductDetailChange(
                              field.fieldName,
                              e.target.value
                            )
                          }
                          required={field.isrequired}
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="">Select Option</option>
                          {field.options.map((opt: string) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )
                )}
              </div>
            )}

          {/* Step 4: Additional Fields */}
          {selectedProduct && selectedProduct.additionalFields?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-gray-200 text-sm font-medium">
                Additional Fields
              </h3>
              {selectedProduct.additionalFields?.map(
                (field: ProductField, i: number) => (
                  <div key={i}>
                    <label className="block text-sm text-gray-300 mb-1">
                      {field.fieldName}
                    </label>
                    <input
                      type="text"
                      value={productDetails[field.fieldName] || ""}
                      onChange={(e) =>
                        handleProductDetailChange(
                          field.fieldName,
                          e.target.value
                        )
                      }
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                )
              )}
            </div>
          )}

          {/* Offer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Quantity Available
              </label>
              <input
                type="number"
                name="quantityAvailable"
                value={formData.quantityAvailable}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Delivery Time (days)
              </label>
              <input
                type="text"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Currency
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Offer Description
            </label>
            <textarea
              name="offerDesc"
              value={formData.offerDesc}
              onChange={handleInputChange}
              rows={3}
              placeholder="Enter offer description"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="instantDelivery"
              checked={formData.instantDelivery}
              onChange={handleInputChange}
              className="w-4 h-4 text-cyan-500 focus:ring-cyan-600 border-gray-500 rounded"
            />
            <span className="text-sm text-gray-300">Instant Delivery</span>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Offer Images
            </label>
            <ImageUpload
              images={offerImages}
              onImagesChange={setOfferImages}
              maxImages={5}
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              aria-label="cancel "
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-600 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 cursor-pointer hover:border-gray-500"
            >
              Cancel
            </button>
            <button
              aria-label="submit"
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 
              hover:from-cyan-600 hover:to-blue-800 text-white 
              text-sm font-medium rounded-lg shadow-lg transition-all 
              duration-200 cursor-pointer disabled:opacity-70`}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Offer"
                : "Create Offer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
