import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Expose NextAuth handlers for API routes
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
