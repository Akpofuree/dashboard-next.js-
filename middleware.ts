// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'; // uses the `auth` exported from auth.ts

export async function middleware(req: NextRequest) {
  // Get session info (auth() returns session-like data)
  const session = await auth();

  // Protect dashboard routes
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isDashboard && !session?.user) {
    // redirect unauthenticated users to /login with callbackUrl
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
