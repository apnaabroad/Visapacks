// Shared price formatter used by every page that displays a package price
// (package cards, checkout, order confirmation) so currency formatting stays
// consistent in one place.
export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}
