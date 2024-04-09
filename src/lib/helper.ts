import { jwtVerify, JWTPayload, decodeJwt } from "jose";
import { cookies } from "next/headers";

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT Secret key is not set");
  }

  const enc: Uint8Array = new TextEncoder().encode(secret);
  return enc;
}

export async function verifyJwtToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    return null;
  }
}

export async function getJwt() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    try {
      return await verifyJwtToken(token.value);
    } catch (error) {
      return null;
    }
  }
  return null;
}

export async function logout() {
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

export function setUserDataCookie(userData: any) {
  const cookieStore = cookies();

  cookieStore.set({
    name: "userData",
    value: JSON.stringify(userData),
    path: "/",
    maxAge: 86400, // 24 hours
    sameSite: "strict",
  });
}
