import { NextResponse } from "next/server";
import { createSessionCookie, verifyAdminCredentials } from "@/data/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;

  const role = verifyAdminCredentials(body?.username ?? "", body?.password ?? "");
  if (!role) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  return NextResponse.json(
    { role },
    {
      headers: {
        "set-cookie": createSessionCookie(role),
      },
    },
  );
}
