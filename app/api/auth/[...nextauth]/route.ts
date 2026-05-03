import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Force Node runtime so bcrypt/postgres works
export const runtime = "nodejs";
