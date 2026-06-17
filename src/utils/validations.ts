import { MileageLog, Receipt, VALID_EXPENSE_CATEGORIES } from "../types/models";

export function validateMileageEntry(log: MileageLog): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (typeof log.startOdometer !== "number" || typeof log.endOdometer !== "number") {
    errors.push("startOdometer and endOdometer must be numbers");
  } else {
    if (log.startOdometer < 0 || log.endOdometer < 0) {
      errors.push("Odometer readings must be >= 0");
    }
    if (log.endOdometer <= log.startOdometer) {
      errors.push("endOdometer must be greater than startOdometer");
    }
    const miles = log.endOdometer - log.startOdometer;
    if (miles > 1000) {
      errors.push("Unrealistic single-trip mileage (>1000 miles)");
    }
  }

  if (log.purpose !== "Business" && log.purpose !== "Personal") {
    errors.push("purpose must be either 'Business' or 'Personal'");
  }

  const parsed = new Date(log.date);
  if (isNaN(parsed.getTime())) {
    errors.push("date must be a valid ISO date string");
  }

  return { valid: errors.length === 0, errors };
}

export function validateReceiptEntry(receipt: Receipt): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (typeof receipt.amount !== "number" || receipt.amount <= 0) {
    errors.push("amount must be a number greater than 0");
  }

  if (!receipt.vendorName || receipt.vendorName.trim() === "") {
    errors.push("vendorName cannot be empty");
  }

  if (!VALID_EXPENSE_CATEGORIES.includes(receipt.category)) {
    errors.push(`category '${receipt.category}' is not a valid ExpenseCategory`);
  }

  const parsed = new Date(receipt.receiptDate);
  if (isNaN(parsed.getTime())) {
    errors.push("receiptDate must be a valid ISO date string");
  }

  return { valid: errors.length === 0, errors };
}
