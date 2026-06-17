export const VALID_EXPENSE_CATEGORIES = [
  "Car Expenses",
  "Bookkeeping",
  "Gas",
  "Marketing",
  "Travel",
  "Software",
  "Office Supplies",
  "Utilities",
  "Tools",
  "Repairs",
] as const;

export type ExpenseCategory = typeof VALID_EXPENSE_CATEGORIES[number];

export interface Receipt {
  id: number;
  amount: number;
  vendorName: string;
  category: ExpenseCategory;
  receiptDate: string; // ISO date string
  note?: string;
}

export type MileagePurpose = "Business" | "Personal";

export interface MileageLog {
  id: number;
  date: string; // ISO date string
  startOdometer: number;
  endOdometer: number;
  destination: string;
  purpose: MileagePurpose;
}
