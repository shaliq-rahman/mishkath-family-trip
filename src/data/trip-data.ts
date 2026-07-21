import {
  expenseCategories,
  families,
  payments,
  spends,
  type ExpenseCategory,
  type Family,
  type Payment,
  type Spend,
} from "@/data/config";

export type TripData = {
  families: Family[];
  payments: Payment[];
  spends: Spend[];
  expenseCategories: ExpenseCategory[];
};

export const initialTripData: TripData = {
  families,
  payments,
  spends,
  expenseCategories,
};
