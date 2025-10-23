"use client";
import { createContext, useContext } from "react";
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ value, children }: any) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
