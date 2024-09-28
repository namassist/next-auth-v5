import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    AccessToken: string;
    User: {
      userRole: string;
    };
  }

  interface Session {
    accessToken: string;
    user: {
      role: string;
    };
  }
}
