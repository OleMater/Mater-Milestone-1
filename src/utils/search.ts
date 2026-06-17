import { Receipt, MileageLog } from "../types/models";

export function findReceiptById(receipts: Receipt[], id: string): Receipt | null {
  const numeric = Number(id);
  if (Number.isNaN(numeric)) return null;
  return receipts.find(r => r.id === numeric) ?? null;
}

// Assumes `sortedLogs` is sorted ascending by startOdometer.
export function binarySearchMileageByReading(sortedLogs: MileageLog[], target: number): number {
  let left = 0;
  let right = sortedLogs.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const entry = sortedLogs[mid];
    const start = entry.startOdometer;
    const end = entry.endOdometer;

    if (target < start) {
      right = mid - 1;
    } else if (target > end) {
      left = mid + 1;
    } else {
      return mid; // target is within this trip's odometer range
    }
  }

  return -1;
}
