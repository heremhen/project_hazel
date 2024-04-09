"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

interface DecodedTokenDto {
  exp?: number;
  sub?: string;
}

const setToken = async (name: string, token: string): Promise<void> => {
  const data = await getDecodedAccessToken(token);

  if (data) {
    cookies().set({
      name: name,
      value: token,
      httpOnly: true,
      path: "/",
    });
  } else {
    console.error("Access token is invalid or expired");
  }
};

const getToken = async (name: string): Promise<string | boolean> => {
  const cookieStore = cookies();
  const cookie = cookieStore.get("token")?.value;

  if (cookie && cookie !== undefined) {
    return cookie.toString();
  }

  return false;
};

const destroyToken = async (name: string): Promise<void> => {
  cookies().delete(name);
};

const getDecodedAccessToken = async (
  token: string
): Promise<DecodedTokenDto | undefined> => {
  try {
    const decodedToken = await jose.jwtVerify(
      token,
      new TextEncoder().encode(`${process.env.JWT_SECRET}`)
    );
    if (decodedToken) {
      return {
        exp: decodedToken.payload.exp,
        sub: decodedToken.payload.sub,
      };
    } else {
      console.error("Decoded token is null.");
      return undefined;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return undefined;
  }
};

const checkTokenIsExpired = async (token: string): Promise<boolean> => {
  if (!token) {
    return true;
  }

  const decodedToken = await getDecodedAccessToken(token);

  if (
    decodedToken &&
    decodedToken.exp &&
    decodedToken.exp > Math.floor(Date.now() / 60000) + 10080
  ) {
    return false;
  }

  return true;
};

async function logout() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    try {
      cookieStore.delete("token");
    } catch (_) {}
  }

  const userData = cookieStore.get("userData");
  if (userData) {
    try {
      cookieStore.delete("userData");
      return true;
    } catch (_) {}
  }

  return null;
}

export {
  setToken,
  getToken,
  destroyToken,
  checkTokenIsExpired,
  getDecodedAccessToken,
  logout,
};
