"use server";

import { verify } from "argon2";
import { cookies } from "next/headers";

import { prisma } from "@/core/lib/prisma";

import { createJWTToken } from "../lib/jose";

export interface loginActionProps {
  email: string;
  password: string;
}

export async function loginAction(props: loginActionProps) {
  const user = await prisma.user.findFirst({
    select: {
      id: true,
      password: true,
    },
    where: {
      email: props.email,
      isActive: true,
    },
  });

  if (!user) {
    return false;
  }

  const isPswValid = await verify(user.password, props.password);

  if (!isPswValid) {
    return false;
  }

  const token = await createJWTToken(user.id);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastLogin: new Date(),
    },
  });

  const cookie = await cookies();

  cookie.set("sid", token, { httpOnly: true });

  return user.id;
}
