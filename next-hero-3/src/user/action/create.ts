"use server";
import { hash } from "argon2";
import { randomUUID } from "node:crypto";

import { prisma } from "@/core/lib/prisma";

export interface createUserProps {
  name: string;
  email: string;
  password: string;
}

export async function createUser(props: createUserProps) {
  const userCount = await prisma.user.count({
    where: {
      email: props.email,
    },
  });
  if (userCount !== 0) {
    return {
      error: true,
      message: `El usuario con el email ${props.email} ya existe`,
    };
  }

  const id = randomUUID();
  await prisma.user.create({
    data: {
      id,
      name: props.name,
      email: props.email,
      password: await hash(props.password),
    },
  });

  return id;
}
