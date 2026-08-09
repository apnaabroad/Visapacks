import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

// Normalizes Axios errors into a plain message string so components don't
// need to know about response shapes.
export function getErrorMessage(error) {
  return error?.response?.data?.error || error?.message || "Something went wrong";
}
