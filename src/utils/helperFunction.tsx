import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface MyJwtPayload extends jwt.JwtPayload {
  role: string;
  allowedRoutes: string[];
}

export const verifySessionTokenAndAuthorize = async (route: string) => {
  try {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
      redirect("/login");
    }
    const payload = jwt.verify(cookie, process.env.JWT_SECRET!) as MyJwtPayload;
    if (payload?.role && payload.allowedRoutes.includes(route)) {
      return;
    }
    redirect("/login");
  } catch (error) {
    console.error("Got some Error", error);
    redirect("/login");
  }
};
