import { NextResponse } from "next/server";
import { getAdminRoleFromRequest } from "@/data/admin-auth";

export async function GET(request: Request) {
  const role = getAdminRoleFromRequest(request);
  return NextResponse.json({
    isAdmin: Boolean(role),
    role,
  });
}
