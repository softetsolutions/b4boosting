"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createService } from "src/api/services"; // adjust path if needed
import ImageUpload from "src/components/ui/ImageUpload";
import SpinnerIcon from "../../../../public/svgIcons/SpinnerIcon.svg"; // adjust import

export default function CreateServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });
  const [icon, setIcon] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (newImages: (File | string)[]) => {
    if (newImages.length > 0) {
      const firstImage = newImages[0];
      if (firstImage instanceof File) {
        setIcon(firstImage);
        toast.success("Icon uploaded successfully!");
      }
    } else {
      setIcon(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!icon) {
      setError("Please upload a service icon.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("type", formData.type);
      data.append("icon", icon);

      await createService(data);
      toast.success("Service created successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Error creating service:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Create Service</h1>
          <p className="mt-1 text-sm text-gray-400">
            Add a new service to your platform
          </p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
        <div className="px-5 py-4 border-b border-gray-700/50">
          <h3 className="text-base font-medium text-white">Service Details</h3>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {/* Service Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Service Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter service name"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
              // style={{ backgroundColor: "rgb(55 65 81 / 0.5)" }}
            />
          </div>

          {/* Service Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Service Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              placeholder="Enter service type"
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
              // style={{ backgroundColor: "rgb(55 65 81 / 0.5)" }}
            />
          </div>

          {/* Service Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Service Icon
            </label>
            <ImageUpload
              images={icon ? [icon] : []}
              onImagesChange={handleIconChange}
              maxImages={1}
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-400">
              Recommended: 512x512px, PNG or JPG
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-600 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200 cursor-pointer hover:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg flex items-center"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-white" />
                  Creating...
                </>
              ) : (
                "Create Service"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
