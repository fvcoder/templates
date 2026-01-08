"use server";
import { redirect } from "next/navigation";

import { getSession } from "../lib/jose";

export async function protectedRoute() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return session;
}
