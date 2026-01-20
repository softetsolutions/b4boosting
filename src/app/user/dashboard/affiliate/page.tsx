// app/user/dashboard/affiliate/page.tsx
"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AffiliateLandingPage() {
  const router = useRouter();
  const [joining, setJoining] = useState(false);
  const [affiliateId, setAffiliateId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Read cookies on mount
  useEffect(() => {
    const storedAffiliateId = Cookies.get("affiliateId") || null;
    const storedUserId = Cookies.get("userId") || null;

    setAffiliateId(storedAffiliateId);
    setUserId(storedUserId);
  }, []);

  const handleJoin = async () => {
    if (!userId) {
      // not logged in, send to login
      router.push("/login");
      return;
    }

    try {
      setJoining(true);

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
      console.log("affiliate create response", data);

      // 🔴 ADJUST THIS LINE to match your backend response:
      // e.g. if response is { affiliate: { _id: "..." } }
      const newAffiliateId =
        data.affiliateId ||
        data.affiliate?._id ||
        data._id ||
        data.data?.affiliateId;

      if (!newAffiliateId) {
        console.error("No affiliateId found in response");
        return;
      }

      Cookies.set("affiliateId", newAffiliateId, { expires: 7 });
      setAffiliateId(newAffiliateId);

      // After joining, maybe redirect to create-ref-link or performance
      router.push("/user/dashboard/affiliate/create-reflink");
    } catch (err) {
      console.error(err);
    } finally {
      setJoining(false);
    }
  };

  // If already affiliate, show different UI
  if (affiliateId) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#050509] text-gray-100 px-4">
        <div className="max-w-md w-full border border-gray-800 rounded-2xl p-6 shadow-lg">
          <h1 className="text-2xl font-semibold mb-3">
            You&apos;re already an affiliate 🎉
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Your affiliate ID:{" "}
            <span className="text-emerald-400 font-mono break-all">
              {affiliateId}
            </span>
          </p>

          <div className="flex flex-col gap-3">
            <button
              aria-label="create Reflink"
              type="button"
              onClick={() =>
                router.push("/user/dashboard/affiliate/createReflink")
              }
              className="w-full px-4 py-2 rounded-md yellow-bg text-black text-sm font-medium hover:bg-yellow-200 transition"
            >
              Create Referral Link
            </button>

            <button
              type="button"
              aria-label="View Performance"
              onClick={() =>
                router.push("/user/dashboard/affiliate/performance")
              }
              className="w-full px-4 py-2 rounded-md border border-gray-700 text-sm text-gray-200 hover:bg-gray-800 transition"
            >
              View Performance
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default: not affiliate yet
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#050509] text-gray-100 px-4">
      <div className="max-w-md w-full border border-gray-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-semibold mb-3">
          Join our Affiliate Program
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Start earning by sharing products you love. Get your own referral
          link, share with your audience, and earn commission on every
          successful purchase.
        </p>

        <ul className="text-xs text-gray-400 mb-6 space-y-2 list-disc list-inside">
          <li>Instant approval for existing users</li>
          <li>Track clicks, signups, and earnings in real-time</li>
          <li>Share anywhere: social, WhatsApp, email, and more</li>
        </ul>

        <button
          aria-label="Join Affiliate Program"
          type="button"
          disabled={joining}
          onClick={handleJoin}
          className="w-full px-4 py-2 rounded-md yellow-bg text-black text-sm font-medium hover:bg-yellow-200 disabled:opacity-60 transition"
        >
          {joining ? "Joining..." : "Join Affiliate Program"}
        </button>

        <p className="mt-3 text-[11px] text-gray-500 text-center">
          By joining, you agree to our affiliate terms and conditions.
        </p>
      </div>
    </div>
  );
}
