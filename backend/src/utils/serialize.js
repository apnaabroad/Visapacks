// Prisma stores Package.features as a JSON-encoded string (SQLite has no
// native JSON/array type). These helpers parse it back into a real array
// for API responses, recursively through nested include shapes.
export function serializePackage(pkg) {
  if (!pkg) return pkg;
  return { ...pkg, features: JSON.parse(pkg.features) };
}

export function serializeVisaType(visaType) {
  if (!visaType) return visaType;
  return {
    ...visaType,
    packages: visaType.packages?.map(serializePackage),
  };
}

export function serializeOrder(order) {
  if (!order) return order;
  return {
    ...order,
    package: serializePackage(order.package),
  };
}
