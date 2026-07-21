import "server-only";

import { initialTripData, type TripData } from "@/data/trip-data";

const TABLE_NAME = process.env.SUPABASE_TRIP_TABLE ?? "trip_data";
const ROW_ID = process.env.SUPABASE_TRIP_ROW_ID ?? "default";

type SupabaseTripRow = {
  data: TripData;
};

function readableSupabaseError(errorText: string) {
  try {
    const payload = JSON.parse(errorText) as { code?: string; message?: string };
    if (payload.code === "PGRST205") {
      return "Supabase table public.trip_data is missing. Run supabase-trip-data.sql in the Supabase SQL Editor, then restart the app.";
    }
    return payload.message ?? errorText;
  } catch {
    return errorText;
  }
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    key,
  };
}

function headers(key: string) {
  return {
    apikey: key,
    authorization: `Bearer ${key}`,
    "content-type": "application/json",
  };
}

function mergeWithInitialData(data: Partial<TripData> | null | undefined): TripData {
  return {
    families: data?.families ?? initialTripData.families,
    payments: data?.payments ?? initialTripData.payments,
    spends: data?.spends ?? initialTripData.spends,
    expenseCategories: data?.expenseCategories ?? initialTripData.expenseCategories,
  };
}

export async function getTripDataFromDatabase(): Promise<TripData> {
  const config = getSupabaseConfig();
  if (!config) return initialTripData;

  try {
    const response = await fetch(
      `${config.url}/rest/v1/${TABLE_NAME}?id=eq.${encodeURIComponent(ROW_ID)}&select=data`,
      {
        headers: headers(config.key),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return initialTripData;
    }

    const rows = (await response.json()) as SupabaseTripRow[];
    return mergeWithInitialData(rows[0]?.data);
  } catch {
    return initialTripData;
  }
}

export async function saveTripDataToDatabase(data: TripData) {
  const config = getSupabaseConfig();
  if (!config) {
    return { ok: false, error: "Missing Supabase environment variables." };
  }

  try {
    const response = await fetch(`${config.url}/rest/v1/${TABLE_NAME}?on_conflict=id`, {
      method: "POST",
      headers: {
        ...headers(config.key),
        prefer: "resolution=merge-duplicates",
      },
      body: JSON.stringify({
        id: ROW_ID,
        data,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return { ok: false, error: readableSupabaseError(await response.text()) };
    }

    return { ok: true, error: null };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unable to save trip data.",
    };
  }
}
