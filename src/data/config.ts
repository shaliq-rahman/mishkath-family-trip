export type PersonType = "adult" | "kid" | "infant";

// adult  = Above 12  → ₹1600
// kid    = 6–12      → ₹700
// infant = 0–6       → Free
export const FEE: Record<PersonType, number> = {
  adult: 1600,
  kid: 700,
  infant: 0,
};

export const AGE_LABEL: Record<PersonType, string> = {
  adult: "Above 12",
  kid: "6–12",
  infant: "0–6",
};

export const TRIP_NAME = "Mishkath Banasura Family Trip 2026";
export const TRIP_HEADLINE = ["MISHKATH", "BANASURA"];
export const TRIP_DESTINATION = "Kerala, India";
export const TRIP_DATES = "July 25 – 26, 2026";

export interface Person {
  name: string;
  type: PersonType;
  paid: number;
}

export interface Family {
  id: string;
  familyName: string;
  members: Person[];
  familyPaid?: number; // lump-sum amount recorded at the family level
}

export interface ExpenseCategory {
  name: string;
  icon: string;
  expected: number;
}

export interface Spend {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
}

export interface Payment {
  id: string;
  familyId: string;
  familyName: string;
  personName: string;
  type?: PersonType;
  amount: number;
  date: string;
  kind?: "member" | "family";
}

export const families: Family[] = [];

export const payments: Payment[] = [];

export const expenseCategories: ExpenseCategory[] = [];

export const spends: Spend[] = [];

// ── Helpers ───────────────────────────────────────────────────

export function getFamilyFee(family: Family): number {
  return family.members.reduce((sum, m) => sum + FEE[m.type], 0);
}

// A family's paid amount is tracked at the family level. The admin flow can
// append multiple family payments, and their running total is stored here.
export function getFamilyCollected(family: Family): number {
  return family.familyPaid ?? 0;
}

export function fmt(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
