
"use client";

import AuthProvider, { AuthContextType } from "./AuthProvider";
import { getAuthInfo } from "../auth";

export default function AuthRootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
   let value: AuthContextType;

  try {
    const info = getAuthInfo();
    value = { ...info, isAuthenticated: true };
  } catch {
    value = { isAuthenticated: false };
  }

  return <AuthProvider value={value}>{children}</AuthProvider>;
}
