import { ApiError } from "../utils/ApiError.js";

// A single shared secret, not a full auth system - appropriate for a
// solo-operator admin surface (uploading package documents) with no other
// user accounts anywhere in this app. Set ADMIN_UPLOAD_SECRET in the
// backend's environment and send it back as the x-admin-secret header.
export function requireAdminSecret(req, res, next) {
  const expected = process.env.ADMIN_UPLOAD_SECRET;
  if (!expected) {
    throw new ApiError(500, "ADMIN_UPLOAD_SECRET is not configured on the server");
  }
  if (req.get("x-admin-secret") !== expected) {
    throw new ApiError(401, "Invalid or missing admin secret");
  }
  next();
}
