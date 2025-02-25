import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const loginUrl = new URL("/login", request.url);
  const homeUrl = new URL("/", request.url);

  if (!token && !authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(loginUrl);
  }

  if (token && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*|favicon.ico).*)"],
};
