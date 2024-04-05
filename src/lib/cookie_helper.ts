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

const getToken = (name: string): string | boolean => {
  const cookie = cookies().get(name);

  if (cookie && cookie !== undefined) {
    return cookie.toString();
  }

  return false;
};

const destroyToken = (name: string): void => {
  cookies().delete(name);
};

export { setToken, getToken, destroyToken };
