import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import { JWT_SECRET } from "@/core/lib/env";
import { prisma } from "@/core/lib/prisma";

const secret = new TextEncoder().encode(JWT_SECRET);

export async function createJWTToken(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  return token;
}

export async function getSession() {
  try {
    const cookie = await cookies();
    const token = cookie.get("sid");

    if (!token) {
      return false;
    }

    const { payload } = await jwtVerify(token.value, secret);

    const user = await prisma.user.findFirst({
      select: {
        id: true,
      },
      where: {
        id: payload.userId as string,
      },
    });

    if (!user) {
      return false;
    }

    return user;
  } catch {
    return false;
  }
}
