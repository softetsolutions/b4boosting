import { jwtDecode } from "jwt-decode";
import { logoutUser } from "src/api/api";
import toast from "react-hot-toast";

interface AuthTokenPayload {
  id: string;
  role: string;
  [key: string]: any;
}

export const getAuthInfo = () => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const decoded = jwtDecode<AuthTokenPayload>(token);
  const userId = decoded.id;
  const role = decoded.role;

  if (!userId) {
    throw new Error("No user ID found in token");
  }

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
