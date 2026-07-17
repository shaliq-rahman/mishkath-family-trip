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
export const TRIP_DATES = "Aug 15 – 22, 2026";

export interface Person {
  name: string;
  type: PersonType;
  paid: number;
}

export interface Family {
  id: string;
  familyName: string;
  members: Person[];
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
  type: PersonType;
  amount: number;
  date: string;
}

export const families: Family[] = [
  {
    id: "1",
    familyName: "Abdullah Family",
    members: [
      { name: "Abdullah", type: "adult",  paid: 1600 },
      { name: "Fatima",   type: "adult",  paid: 1000 },
      { name: "Sara",     type: "kid",    paid: 700  },
      { name: "Omar",     type: "infant", paid: 0    },
    ],
  },
  {
    id: "2",
    familyName: "Ibrahim Family",
    members: [
      { name: "Ibrahim", type: "adult", paid: 1600 },
      { name: "Khadija", type: "adult", paid: 1600 },
      { name: "Yusuf",   type: "kid",   paid: 300  },
    ],
  },
  {
    id: "3",
    familyName: "Hassan Family",
    members: [
      { name: "Hassan", type: "adult", paid: 1600 },
      { name: "Nadia",  type: "adult", paid: 0    },
    ],
  },
  {
    id: "4",
    familyName: "Khalid Family",
    members: [
      { name: "Khalid", type: "adult",  paid: 1600 },
      { name: "Amina",  type: "adult",  paid: 1600 },
      { name: "Zara",   type: "kid",    paid: 700  },
      { name: "Bilal",  type: "kid",    paid: 700  },
      { name: "Aisha",  type: "infant", paid: 0    },
    ],
  },
];

export const payments: Payment[] = [
  { id: "p1",  familyId: "1", familyName: "Abdullah Family", personName: "Abdullah", type: "adult", amount: 1600, date: "2026-07-01" },
  { id: "p2",  familyId: "2", familyName: "Ibrahim Family",  personName: "Ibrahim",  type: "adult", amount: 1600, date: "2026-07-03" },
  { id: "p3",  familyId: "2", familyName: "Ibrahim Family",  personName: "Khadija",  type: "adult", amount: 1600, date: "2026-07-03" },
  { id: "p4",  familyId: "1", familyName: "Abdullah Family", personName: "Fatima",   type: "adult", amount: 1000, date: "2026-07-05" },
  { id: "p5",  familyId: "3", familyName: "Hassan Family",   personName: "Hassan",   type: "adult", amount: 1600, date: "2026-07-06" },
  { id: "p6",  familyId: "4", familyName: "Khalid Family",   personName: "Khalid",   type: "adult", amount: 1600, date: "2026-07-08" },
  { id: "p7",  familyId: "4", familyName: "Khalid Family",   personName: "Amina",    type: "adult", amount: 1600, date: "2026-07-08" },
  { id: "p8",  familyId: "1", familyName: "Abdullah Family", personName: "Sara",     type: "kid",   amount: 700,  date: "2026-07-10" },
  { id: "p9",  familyId: "2", familyName: "Ibrahim Family",  personName: "Yusuf",    type: "kid",   amount: 300,  date: "2026-07-12" },
  { id: "p10", familyId: "4", familyName: "Khalid Family",   personName: "Zara",     type: "kid",   amount: 700,  date: "2026-07-14" },
  { id: "p11", familyId: "4", familyName: "Khalid Family",   personName: "Bilal",    type: "kid",   amount: 700,  date: "2026-07-15" },
];

export const expenseCategories: ExpenseCategory[] = [
  { name: "Transport",     icon: "🚌", expected: 30000 },
  { name: "Accommodation", icon: "🏨", expected: 50000 },
  { name: "Food & Dining", icon: "🍽️", expected: 25000 },
  { name: "Activities",    icon: "🎡", expected: 20000 },
  { name: "Miscellaneous", icon: "📦", expected: 10000 },
];

export const spends: Spend[] = [
  { id: "1", date: "2026-07-01", description: "Bus booking deposit",  category: "Transport",     amount: 5000  },
  { id: "2", date: "2026-07-05", description: "Hotel advance payment", category: "Accommodation", amount: 10000 },
  { id: "3", date: "2026-07-10", description: "Boat ride booking",     category: "Activities",    amount: 3000  },
];

// ── Helpers ───────────────────────────────────────────────────

export function getFamilyFee(family: Family): number {
  return family.members.reduce((sum, m) => sum + FEE[m.type], 0);
}

export function getFamilyCollected(family: Family): number {
  return family.members.reduce((sum, m) => sum + m.paid, 0);
}

export function fmt(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
