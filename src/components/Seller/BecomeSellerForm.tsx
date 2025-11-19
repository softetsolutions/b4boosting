// src/components/seller/BecomeSellerForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import isValidDob from "src/utils/isValidDob";
import ImageUpload from "src/components/ui/ImageUpload"; // 🔹 same as SystemSettings
import { createSellerRequest } from "src/api/seller";

// 🔹 Helper for max allowed DOB (12+)
const getMaxDob = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 12);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function BecomeSellerForm() {
  const router = useRouter();

  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState<string | null>(null);

  const [aadharId, setAadharId] = useState("");
  const [panId, setPanId] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [pincode, setPincode] = useState("");

  const [idProofImages, setIdProofImages] = useState<(string | File)[]>([]);

  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isValidDob(dob)) {
    setDobError(
      "You must be at least 12 years old and DOB cannot be in the future."
    );
    return;
  }
  setDobError(null);
  setLoading(true);

  try {
    await createSellerRequest({
      dob,
      aadharId,
      panId,
      address,
      city,
      state: stateField,
      pincode,
      idProofImages, // contains File(s) from ImageUpload
    });

    toast.success("Seller request submitted!");
    router.push("/");
  } catch (error: any) {
    console.error(error);
    toast.error(error.message || "Failed to submit request");
  } finally {
    setLoading(false);
  }
};


  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Personal Details */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Personal Details</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-300">Date of Birth</label>
            <input
              type="date"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/40"
              value={dob}
              // 🔹 Disable future & <12y dates from being picked
              max={getMaxDob()}
              onChange={(e) => {
                const value = e.target.value;
                setDob(value);

                if (!value) {
                  setDobError("Date of birth is required");
                  return;
                }

                if (!isValidDob(value)) {
                  setDobError(
                    "You must be at least 12 years old and DOB cannot be in the future."
                  );
                } else {
                  setDobError(null);
                }
              }}
              required
            />
            {dobError && (
              <p className="text-xs text-red-400 mt-1">{dobError}</p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-300">Aadhar ID</label>
            <input
              type="text"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/40"
              value={aadharId}
              onChange={(e) => setAadharId(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-300">PAN ID</label>
            <input
              type="text"
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/40"
              value={panId}
              onChange={(e) => setPanId(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Billing Details */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Billing Details</h2>
        <div className="space-y-3">
          <div className="flex flex-col space-y-1">
            <label className="text-sm text-gray-300">Address</label>
            <textarea
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/40"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-300">City</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/40"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-300">State</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/40"
                value={stateField}
                onChange={(e) => setStateField(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-sm text-gray-300">Pincode</label>
              <input
                type="text"
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500/40"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* ID Proof Images */}
      <div className="space-y-2">
        <h2 className="text-lg font-medium">ID Proof Images</h2>
        <p className="text-xs text-gray-500">
          Upload clear images of your Aadhar, PAN or other valid ID proofs.
        </p>

        {/* 🔹 Reuse ImageUpload like SystemSettings */}
        <ImageUpload
          images={idProofImages}
          onImagesChange={(imgs) => setIdProofImages(imgs)}
          maxImages={3} // or 2 if you want just Aadhar + PAN
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium yellow-bg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}
