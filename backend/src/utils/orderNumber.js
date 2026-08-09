// Generates a human-friendly order reference, e.g. VP-8F2K9Q1A.
export function generateOrderNumber() {
  const random = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `VP-${random}`;
}
