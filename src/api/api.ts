import { handleUnauthorized } from "../utils/auth";

export interface UserData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  message?: string;
}

export interface AccountUser {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  walletBalance: number;
  role: string;
  email: string;
  createdAt: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  twoFactorEnabled: boolean;
}


export const signupUser = async (userData: UserData): Promise<AuthResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    }
  );

  if (res.status === 401) await handleUnauthorized();
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Signup failed");
  return data;
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEXT_PUBLIC_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    }
  );

  if (res.status === 401) await handleUnauthorized();
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  if (data.token) {
    localStorage.setItem("userToken", data.token);
  }

  return data;
};

export const logoutUser = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (res.status === 401) await handleUnauthorized();
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Logout failed");
  return data;
};


export const getAccountDetails = async (): Promise<AccountUser> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  if (res.status === 401) await handleUnauthorized();
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Logout failed");
  return data;
}
