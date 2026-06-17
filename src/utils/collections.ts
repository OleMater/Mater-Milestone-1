import { Receipt, ExpenseCategory, MileageLog } from "../types/models";

export function filterReceiptsByCategory(receipts: Receipt[], category: ExpenseCategory): Receipt[] {
  return receipts.filter(r => r.category === category);
}

export function sortMileageByDate(logs: MileageLog[], order: "asc" | "desc" = "asc"): MileageLog[] {
  const copy = [...logs];
  copy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return order === "asc" ? copy : copy.reverse();
}
