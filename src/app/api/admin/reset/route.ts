import { NextResponse } from "next/server";
import { getAdminRoleFromRequest } from "@/data/admin-auth";
import { initialTripData } from "@/data/trip-data";
import { saveTripDataToDatabase } from "@/data/supabase-trip";

export async function POST(request: Request) {
  const role = getAdminRoleFromRequest(request);
  if (role !== "superadmin") {
    return NextResponse.json({ error: "Superadmin login required." }, { status: 403 });
  }

  const result = await saveTripDataToDatabase(initialTripData);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(initialTripData);
}
