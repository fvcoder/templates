"use server";

import { hash } from "argon2";

import { getSession } from "@/auth/lib/jose";
import { prisma } from "@/core/lib/prisma";

interface ChangePasswordInput {
  userId: string;
  newPassword: string;
}

export async function changePassword(input: ChangePasswordInput) {
  const session = await getSession();

  if (!session) {
    return { code: 401, message: "sesión inválida" };
  }

  const { userId, newPassword } = input;

  // Validaciones
  if (!newPassword || newPassword.length < 8) {
    return { code: 400, message: "La contraseña debe tener al menos 8 caracteres" };
  }

  try {
    // Hash de la nueva contraseña
    const hashedPassword = await hash(newPassword);

    // Actualizar contraseña
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
        updateAt: new Date(),
      },
    });

    return {
      success: true,
      message: "Contraseña actualizada correctamente",
    };
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);

    return { code: 500, message: "Error al cambiar la contraseña" };
  }
}
