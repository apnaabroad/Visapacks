import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

// Normalizes Axios errors into a plain message string so components don't
// need to know about response shapes.
export function getErrorMessage(error) {
  return error?.response?.data?.error || error?.message || "Something went wrong";
}

// PackageDocument.fileUrl is a full URL in production (Vercel Blob), but the
// local-dev fallback storage returns a path like "/uploads/xyz.pdf" that's
// relative to the *backend's* origin, not the frontend's - resolve it
// against the API base so download links work in both environments.
export function resolveFileUrl(fileUrl) {
  if (!fileUrl || /^https?:\/\//.test(fileUrl)) return fileUrl;
  const apiOrigin = new URL(apiClient.defaults.baseURL, window.location.origin).origin;
  return `${apiOrigin}${fileUrl}`;
}
