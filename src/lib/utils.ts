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

const getDecodedAccessToken = async (
  token: string
): Promise<DecodedTokenDto | null> => {
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
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
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

export { cn, getDecodedAccessToken, checkTokenIsExpired };
