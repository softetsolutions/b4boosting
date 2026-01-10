"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

interface AuthTokenPayload {
  id: string;
  username: string;
  affiliateId?: string;
  
}

export default function CreateReflinkPage() {
  const [refLink, setRefLink] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerateLink = () => {
    try {
      const token = getCookie("token");
      if (!token) return toast.error("You are not logged in.");

      const decoded = jwtDecode<AuthTokenPayload>(token);
    
      // if (!decoded.affiliateId) return toast.error("You are not an affiliate.");
      const affiliateId = getCookie("affiliateId");
      if (!affiliateId) return toast.error("You are not an affiliate.");

      const link = `${window.location.origin}/?ref=AFF${decoded.username}`;
      setRefLink(link);
      setGenerated(true);
      toast.success("Referral link generated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate referral link.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    toast.success("Referral link copied!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-12">
        Create Referral Link
      </h1>

      {!generated ? (
        <button
          type="button"
          onClick={handleGenerateLink}
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg flex items-center"
          aria-label="Generate Referral Link"
        >
          Generate Referral Link
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={refLink}
            readOnly
            // className="flex-1 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 px-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent hover:border-gray-500 transition-all duration-200"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg flex items-center"
            aria-label="Copy Referral Link"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
