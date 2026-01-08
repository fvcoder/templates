"use server";

import { getSession } from "@/auth/lib/jose";
import { prisma } from "@/core/lib/prisma";

interface UpdateUserInput {
  userId: string;
  name: string;
  email: string;
}

export async function updateUser(input: UpdateUserInput) {
  const session = await getSession();

  if (!session) {
    return { code: 401, message: "sesión inválida" };
  }

  const { userId, name, email } = input;

  // Validaciones
  if (!name || name.trim().length < 2) {
    return { code: 400, message: "El nombre debe tener al menos 2 caracteres" };
  }

  if (!email || !email.includes("@")) {
    return { code: 400, message: "El email no es válido" };
  }

  try {
    // Verificar si el email ya existe en otro usuario
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
    });

    if (existingUser) {
      return { code: 400, message: "El email ya está en uso por otro usuario" };
    }

    // Actualizar usuario
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        updateAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        isActive: true,
        createAt: true,
        updateAt: true,
      },
    });

    return {
      success: true,
      data: updatedUser,
      message: "Usuario actualizado correctamente",
    };
  } catch (error) {
    console.error("Error al actualizar usuario:", error);

    return { code: 500, message: "Error al actualizar el usuario" };
  }
}
