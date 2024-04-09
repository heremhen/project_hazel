import { jwtVerify } from "jose";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api")
  )
    return NextResponse.next();

  const auth = req.headers.get("Cookie");
  let token;

  if (auth) {
    token = auth.split("=")[1];
  }

  if (!token && pathname !== "/register" && pathname !== "/login") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  if (token) {
    try {
      const decodedToken = await jwtVerify(
        token,
        new TextEncoder().encode(`${process.env.JWT_SECRET}`)
      );

      if (decodedToken) {
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return NextResponse.rewrite(new URL("/dashboard", req.url));
        }
        return NextResponse.next();
      }
    } catch (err) {
      console.log("Invalid token");
      if (pathname !== "/login" && pathname !== "/register") {
        return NextResponse.rewrite(new URL("/login", req.url));
      }
    }
  }

  return NextResponse.next();
}
