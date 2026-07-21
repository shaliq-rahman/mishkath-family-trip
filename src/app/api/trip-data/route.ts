import { NextResponse } from "next/server";
import { getTripDataFromDatabase, saveTripDataToDatabase } from "@/data/supabase-trip";
import { type TripData } from "@/data/trip-data";
import { getAdminRoleFromRequest } from "@/data/admin-auth";

export async function GET() {
  const data = await getTripDataFromDatabase();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const role = getAdminRoleFromRequest(request);
  if (!role) {
    return NextResponse.json({ error: "Admin login required." }, { status: 401 });
  }

  const data = (await request.json()) as TripData;
  const result = await saveTripDataToDatabase(data);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
