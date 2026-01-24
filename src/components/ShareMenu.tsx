"use client";

import { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ShareMenuProps {
  shareUrl: string;
  title?: string;
//   UserId?: string; // pass logged in user id
}

export default function ShareMenu({ shareUrl, title = "Check this out!" }: ShareMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy link");
  const [isJoining, setIsJoining] = useState(false);
  const [affiliateId, setAffiliateId] = useState<string | null>(
    Cookies.get("affiliateId") || null
  );
  const [message, setMessage] = useState<{
  type: "success" | "error" | "info";
  text: string;
} | null>(null);


  const userId = Cookies.get("userId");

  const openModal = () => setIsOpen(true);


  const closeModal = () => {
    setMessage(null);
    setIsOpen(false);
  }

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(shareUrl);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy link"), 1500);
    } catch (err) {
      console.error("Failed to copy link", err);
      setCopyLabel("Failed, try again");
    } finally {
      setIsCopying(false);
    }
  };

  const handleJoinAffiliate = async () => {
    if (!userId) {
      setMessage({
    type: "error",
    text: "Please login to join the affiliate program.",
  });
      console.warn("No userId provided");
      router.push("/login");
      return;
    }
    if (affiliateId) {
     setMessage({
    type: "info",
    text: "You are already an affiliate.",
  });
    return;
  }

    try {
      setIsJoining(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/affiliate/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) {
        throw new Error("Failed to join affiliate");
      }
      const data = await res.json();
      const newAffiliateId = data.affiliate.affiliateId;
      Cookies.set("affiliateId", newAffiliateId, { expires: 7 }); // 7 days or whatever
      setAffiliateId(newAffiliateId);
      setMessage({
  type: "success",
  text: "You are now an affiliate! Start sharing your link.",
});
      setTimeout(() => {
  closeModal();
}, 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  };

  const isAffiliate = !!affiliateId;

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={openModal}
        className="flex items-center px-4 py-2 border border-gray-700 rounded-md text-gray-400 text-sm hover:bg-gray-600 hover:text-yellow-400/100 transition duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 0a3 3 0 110 2.684m0-2.684a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
          />
        </svg>
        Share
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#050509] border border-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl relative">
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold text-gray-100 mb-4">Share this</h2>
            {message && (
  <div
    className={`mb-4 rounded-md px-3 py-2 text-sm border ${
      message.type === "success"
        ? "bg-emerald-900/30 text-emerald-400 border-emerald-800"
        : message.type === "error"
        ? "bg-red-900/30 text-red-400 border-red-800"
        : "bg-yellow-900/30 text-yellow-400 border-yellow-800"
    }`}
  >
    {message.text}
  </div>
)}

            {/* Social Icons */}
            <div className="flex gap-3 mb-4">
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <WhatsappShareButton url={shareUrl} title={title} separator=" - ">
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <LinkedinShareButton url={shareUrl} title={title}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
            </div>

            {/* Link + Copy */}
            <div className="mb-4">
              <label className="block text-xs text-gray-400 mb-1">
                Shareable link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 bg-black/40 border border-gray-700 rounded-md px-3 py-2 text-xs text-gray-300 overflow-hidden text-ellipsis"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={isCopying}
                  className="px-3 py-2 text-xs border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800 disabled:opacity-60"
                >
                  {copyLabel}
                </button>
              </div>
            </div>

            {/* Join Affiliate */}
            {!isAffiliate && (
              <button
              type="button"
                onClick={handleJoinAffiliate}
                disabled={isJoining  || isAffiliate}

                className="w-full mt-2 px-4 py-2 rounded-md yellow-bg text-black text-sm font-medium hover:bg-yellow-200 disabled:opacity-60"
              >
                {isJoining ? "Joining..." : "Join Affiliate"}
              </button>
            )}

            {isAffiliate && (
              <p className="mt-2 text-xs text-emerald-400">
                You are already an affiliate (ID: {affiliateId}).
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
