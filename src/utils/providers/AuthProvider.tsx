"use client";
import { createContext, useContext, ReactNode } from "react";

export interface AuthContextType {
  token?: string;
  userId?: string;
  id ?: string;
  role?: "admin" | "user" | "seller" | string;
  login?: () => void;
  logout?: () => void;
}

interface AuthProviderProps {
  value: AuthContextType;
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
