import "next-auth/jwt"
import NextAuth, { DefaultSession } from "next-auth";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    userRole?: "admin",
    accessToken?: string,
    refreshToken?: string,
    accessTokenExpires?: number,
    data: any
  }
}

declare module "next-auth/client" {
  interface JWT {
    userRole?: "admin",
    accessToken?: string,
    refreshToken?: string,
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: {
      accessToken: string
    } & DefaultSession["token"],
    error: string,
    api_data: any
  }
}