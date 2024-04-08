import { jwtVerify, type JWTPayload } from "jose";
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

  if (!auth && pathname !== "/register" && pathname !== "/login") {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  let token;
  if (auth) {
    token = auth.split("=")[1];
  }

  if (!token || token === "") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  let decodedToken;
  try {
    decodedToken = await jwtVerify(
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
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  if (!decodedToken) {
    console.log("Token is null or undefined");
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return NextResponse.next();
}
