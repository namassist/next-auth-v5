import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./lib/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);
        try {
          const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) return null;

          const parsedResponse = await response.json();

          return parsedResponse.results;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const ProtectedRoutes = ["/admin/dashboard", "/user/dashboard"];

      if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/auth/login")) {
        switch (auth?.user?.role) {
          case "ADMIN":
            return Response.redirect(new URL("/admin/dashboard", nextUrl));
          case "USER":
            return Response.redirect(new URL("/user/dashboard", nextUrl));
          default:
            return Response.redirect(new URL("/", nextUrl));
        }
      }

      if (
        isLoggedIn &&
        auth?.user?.role === "ADMIN" &&
        nextUrl.pathname.startsWith("/user")
      ) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl));
      }

      if (
        isLoggedIn &&
        auth?.user?.role === "USER" &&
        nextUrl.pathname.startsWith("/admin")
      ) {
        return Response.redirect(new URL("/user/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.AccessToken;
        token.role = user.User.userRole;
      }

      return token;
    },
    session({ session, token }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }

      if (typeof token.role === "string") {
        session.user.role = token.role;
      }

      return session;
    },
  },
});
