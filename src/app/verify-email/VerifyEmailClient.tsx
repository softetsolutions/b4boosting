"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (!token) {
      setStatus("Invalid verification link");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus("Email verified successfully 🎉");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setStatus(data.message || "Verification failed");
        }
      })
      .catch(() => {
        setStatus("Server error. Try again later.");
      });
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>{status}</h2>
    </div>
  );
}
