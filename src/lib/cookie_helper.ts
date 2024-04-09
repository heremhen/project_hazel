"use server";

import { cookies } from "next/headers";
import { getDecodedAccessToken } from "@/lib/utils";

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
  const cookie = cookies().get(name);

  if (cookie && cookie !== undefined) {
    return cookie.toString();
  }

  return false;
};

const destroyToken = async (name: string): Promise<void> => {
  cookies().delete(name);
};

async function isAuthenticated() {
  const token = cookies().get("authorization")?.value;
  if (!token) {
    return undefined;
  }
  const result = await getDecodedAccessToken(token);
  return result !== undefined;
}

export { setToken, getToken, destroyToken, isAuthenticated };
