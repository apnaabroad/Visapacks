import { apiClient } from "./client.js";

// The admin document-upload surface isn't a full auth system - every call
// here sends the shared secret back as a header. See backend/src/middleware/adminAuth.js.
const authHeaders = (secret) => ({ headers: { "x-admin-secret": secret } });

export const listPackagesForAdmin = (secret) =>
  apiClient.get("/admin/packages", authHeaders(secret)).then((res) => res.data);

export const listPackageDocuments = (packageId, secret) =>
  apiClient.get(`/admin/packages/${packageId}/documents`, authHeaders(secret)).then((res) => res.data);

export const uploadPackageDocument = (packageId, formData, secret) =>
  apiClient
    .post(`/admin/packages/${packageId}/documents`, formData, authHeaders(secret))
    .then((res) => res.data);

export const deletePackageDocument = (documentId, secret) =>
  apiClient.delete(`/admin/documents/${documentId}`, authHeaders(secret));
