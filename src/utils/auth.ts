import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { logoutUser } from "src/api/api";
import toast from "react-hot-toast";

interface AuthTokenPayload {
  id: string;
  role: "admin" | "user" | "seller" | string;
  iat?: number;
  exp?: number;
  [key: string]: unknown; // replace 'any' with 'unknown'
}


export const getAuthInfo = () => {

  const userId = getCookie("userId") as string | undefined;
  const token = getCookie("token") as string | undefined;
  if (!token) {
    throw new Error("No authentication token found");
  }

  const decoded = jwtDecode<AuthTokenPayload>(token);
  const role = decoded.role;

  if (!userId) {
    throw new Error("No user ID found in token");
  }

  console.log("token", token, "userId", userId, "role", role, "decoded", decoded);

  return { token, userId, role };
};

export const logout = async () => {
  try {
    await logoutUser();
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    localStorage.removeItem("userToken");
  }
};

export const isAuthenticated = (): boolean => {
  try {
    getAuthInfo();
    return true;
  } catch {
    return false;
  }
};

export const handleUnauthorized = async (navigate?: (path: string) => void) => {
  await logout();
  toast.error("Session expired. Please login again.");
  if (navigate) {
    navigate("/login");
  } else {
    window.location.href = "/login";
  }
};
