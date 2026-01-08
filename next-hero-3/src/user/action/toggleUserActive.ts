"use server";

import { getSession } from "@/auth/lib/jose";
import { prisma } from "@/core/lib/prisma";

interface ToggleUserActiveInput {
  userId: string;
}

export async function toggleUserActive(input: ToggleUserActiveInput) {
  const session = await getSession();

  if (!session) {
    return { code: 401, message: "sesión inválida" };
  }

  const { userId } = input;

  try {
    // Obtener estado actual del usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!user) {
      return { code: 404, message: "Usuario no encontrado" };
    }

    // Cambiar el estado
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: !user.isActive,
        updateAt: new Date(),
      },
      select: {
        id: true,
        isActive: true,
      },
    });

    return {
      success: true,
      data: updatedUser,
      message: updatedUser.isActive ? "Cuenta activada correctamente" : "Cuenta desactivada correctamente",
    };
  } catch (error) {
    console.error("Error al cambiar estado de usuario:", error);

    return { code: 500, message: "Error al cambiar el estado del usuario" };
  }
}
