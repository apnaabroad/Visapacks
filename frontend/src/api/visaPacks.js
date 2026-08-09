import { apiClient } from "./client.js";

export const getCountries = () => apiClient.get("/countries").then((res) => res.data);

export const getCountry = (slug) => apiClient.get(`/countries/${slug}`).then((res) => res.data);

export const getVisaType = (countrySlug, visaTypeSlug) =>
  apiClient
    .get(`/countries/${countrySlug}/visa-types/${visaTypeSlug}`)
    .then((res) => res.data);

export const getPackage = (id) => apiClient.get(`/packages/${id}`).then((res) => res.data);

export const createOrder = (payload) =>
  apiClient.post("/orders", payload).then((res) => res.data);

export const getOrder = (id) => apiClient.get(`/orders/${id}`).then((res) => res.data);
