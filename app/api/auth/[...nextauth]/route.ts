// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const handler = NextAuth(authConfig);

// Correct API route exports
export { handler as GET };
export { handler as POST };

// Force Node runtime so bcrypt/postgres works
export const runtime = "nodejs";
