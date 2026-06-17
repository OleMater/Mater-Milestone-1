import { MileageLog, Receipt } from "../types/models";

export function prepareMileageForSheet(log: MileageLog): string[] {
  const miles = Math.max(0, log.endOdometer - log.startOdometer);
  return [
    String(log.id),
    new Date(log.date).toISOString(),
    String(log.startOdometer),
    String(log.endOdometer),
    String(miles),
    log.destination,
    log.purpose,
  ];
}

export function calculateTotalBusinessMiles(logs: MileageLog[]): number {
  return logs.reduce((acc, l) => {
    if (l.purpose === "Business") {
      const diff = l.endOdometer - l.startOdometer;
      return acc + Math.max(0, diff);
    }
    return acc;
  }, 0);
}

export function groupReceiptsByVendor(receipts: Receipt[]): Record<string, Receipt[]> {
  return receipts.reduce<Record<string, Receipt[]>>((acc, r) => {
    const key = r.vendorName.trim() || "(unknown)";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});
}
