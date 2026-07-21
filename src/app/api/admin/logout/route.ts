import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/data/admin-auth";

export async function POST() {
  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "set-cookie": clearSessionCookie(),
      },
    },
  );
}
