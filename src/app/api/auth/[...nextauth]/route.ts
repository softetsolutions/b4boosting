import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async signIn({ user}) {
     
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        if (!apiBaseUrl) {
          console.error("❌ No backend URL configured");
          return false;
        }

        const email = user.email;
        const name = user.name;

        if (!email) {
          console.error("❌ Google did not provide an email");
          return false;
        }

        const res = await fetch(`${apiBaseUrl}/auth/google-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name }),
        });

        if (!res.ok) {
          console.error(
            "❌ google-login backend failed",
            res.status,
            await res.text()
          );
          return false;
        }

        const data = (await res.json()) as {
        message: string;
        token: string;
        user: { id: string; username: string; role: string };
        provider?: string;
      };

      if (!data.token || !data.user?.id) {
        console.error("❌ Backend did not return token/user.id:", data);
        return false;
      }

        const cookieStore = cookies();

        cookieStore.set("token", data.token, {
          httpOnly: false,
          path: "/",
        });

        cookieStore.set("userId", data.user.id, {
          path: "/",
        });
        
        return true;
      } catch (err) {
        console.error("❌ Error in Google signIn callback:", err);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
