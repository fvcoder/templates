import { NextResponse } from "next/server";

import { getSession } from "@/auth/lib/jose";
import { responseError } from "@/core/utils/responseError";

export async function GET(_: Request) {
  const session = await getSession();

  if (!session) {
    return responseError({
      code: 401,
      message: "No authenticated",
    });
  }

  return NextResponse.json(session);
}
