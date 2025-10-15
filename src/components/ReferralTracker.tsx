"use client";

import { useEffect } from "react";

export default function ReferralTracker({ refCode }: { refCode: string | null }) {
  useEffect(() => {
    if (refCode) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/?ref=${refCode}`, {
        method: "GET",
        credentials: "include",
      }).catch((err) => console.error(err));
    }
  }, [refCode]);

  return null; // No UI, just side-effect
}
