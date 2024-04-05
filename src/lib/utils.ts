import * as jose from "jose";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DecodedTokenDto {
  exp?: number;
  sub?: string;
}

const getDecodedAccessToken = (token: string): DecodedTokenDto | null => {
  try {
    const decodedToken = jose.decodeJwt(token);
    if (decodedToken) {
      return decodedToken;
    } else {
      console.error("Decoded token is null.");
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const checkTokenIsExpired = (token: string): boolean => {
  if (!token) {
    return true;
  }

  const decodedToken = getDecodedAccessToken(token);

  if (
    decodedToken &&
    decodedToken.exp &&
    decodedToken.exp > Math.floor(Date.now() / 60000) + 2600
  ) {
    return false;
  }

  return true;
};

export { cn, getDecodedAccessToken, checkTokenIsExpired };
