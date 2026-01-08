import { NextResponse } from "next/server";

interface responseErrorProps {
  code: number;
  message: string;
}
export function responseError(props: responseErrorProps) {
  return NextResponse.json(
    {
      error: true,
      message: props.message,
    },
    { status: props.code },
  );
}
