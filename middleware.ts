import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/") && !token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (pathname === "/admin" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };