import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";
import { JWTExtended } from "./types/Auth";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith("/auth");
  const isLoginOrRegister = pathname === "/auth/login" || pathname === "/auth/register";
  
  if (isLoginOrRegister && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  if (!token && !isAuthPage) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (token.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api/auth|favicon.ico|manifest.json|icons|images|.*\\.png|.*\\.jpg|.*\\.webp).*)",
  ],
};
