// src/components/admin/SellerRequestsTable.tsx
"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { approveSellerRequest, rejectSellerRequest, fetchAllSellerRequests, } from "src/api/seller";

interface SellerRequests {
  _id: string;
  user: { _id: string; name?: string; email?: string };
  dob: string;
  aadharId: string;
  panId: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  idProofImages: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  adminNote?: string;
}

export default function SellerRequests() {
  const [requests, setRequests] = useState<SellerRequests[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

 const fetchRequests = async () => {
  try {
    setLoading(true);

    const res = await fetchAllSellerRequests(); // res is SellerRequest[]

    if (!res || res.length === 0) {
      // If you want a toast when there's no data
      // toast.error("No seller requests found");
      setRequests([]); // or keep previous, up to you
    } else {
      setRequests(res); // res *is* the array
    }
  } catch (error: any) {
    console.error(error);
    toast.error(error?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchRequests();
  }, []);

   const updateStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
   
    const adminNote =
      status === "rejected"
        ? window.prompt("Reason for rejection? (optional)") || ""
        : "";

    setUpdatingId(id);
    try {
    
      if (status === "approved") {
        await approveSellerRequest(id);         
      } else {
        await rejectSellerRequest(id, adminNote);          
      }

      toast.success(`Request ${status}`);       
      await fetchRequests();                   
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong"); 
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-400">Loading requests...</p>;
  }

  if (!requests.length) {
    return <p className="text-sm text-gray-400">No seller requests found.</p>;
  }


  return (
    <>
     <div className="min-h-screen px-4 py-8">
     
        <h1 className="text-2xl md:text-3xl font-semibold mb-6">
          Seller Requests
        </h1>
         <div className="overflow-x-auto border border-gray-800 rounded-2xl">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-900/80">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-300">
              Basic Info
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-300">
              Personal Details
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-300">
              Billing Details
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-300">
              ID Proofs
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-300">
              Status
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-950/60">
          {requests?.map((req) => (
            <tr key={req._id} className="hover:bg-gray-900/60">
              <td className="px-4 py-3 align-top">
                <div className="space-y-0.5">
                  <p className="font-medium">
                    {req.user?.displayName || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {req.user?.email}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>
              </td>
              <td className="px-4 py-3 align-top text-xs text-gray-300">
                <p>DOB: {new Date(req.dob).toLocaleDateString()}</p>
                <p>Aadhar: {req?.Nationalidentitynumber}</p>
                <p>PAN: {req?.Taxregistrationnumber}</p>
              </td>
              <td className="px-4 py-3 align-top text-xs text-gray-300">
                <p>{req.address}</p>
                <p>
                  {req.city}, {req.state} - {req.pincode}
                </p>
              </td>
              <td className="px-4 py-3 align-top text-xs text-blue-400">
                {req.idProofImages?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {req.idProofImages.map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:no-underline"
                      >
                        Image {idx + 1}
                      </a>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500">No images</span>
                )}
              </td>
              <td className="px-4 py-3 align-top">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    req.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/40"
                      : req.status === "approved"
                      ? "bg-green-500/10 text-green-400 border border-green-500/40"
                      : "bg-red-500/10 text-red-400 border border-red-500/40"
                  }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-3 align-top text-right space-x-2">
                {req.status === "pending" && (
                  <>
                    <button
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-green-600 hover:bg-green-500 disabled:opacity-50"
                      onClick={() => updateStatus(req._id, "approved")}
                      disabled={!!updatingId}
                    >
                      {updatingId === req._id && "Updating..."}
                      {updatingId !== req._id && "Approve"}
                    </button>
                    <button
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 hover:bg-red-500 disabled:opacity-50"
                      onClick={() => updateStatus(req._id, "rejected")}
                      disabled={!!updatingId}
                    >
                      {updatingId === req._id && "Updating..."}
                      {updatingId !== req._id && "Reject"}
                    </button>
                  </>
                )}
                {req.status !== "pending" && (
                  <span className="text-xs text-gray-500">
                    No actions
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     
    </div>
    </>
  
  );
}
