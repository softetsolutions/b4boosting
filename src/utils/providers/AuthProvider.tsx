"use client";
import { createContext } from "react";
const AuthContext = createContext(null);

const AuthProvider = ({ value, children }: any) => {
  console.log("Value geting in the comp", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
