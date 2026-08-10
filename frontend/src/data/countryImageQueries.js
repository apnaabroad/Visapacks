// Unsplash search query per country, keyed by Country.slug. Falls back to
// "<name> landmark skyline" for any country added later without an entry
// here (see CountryImage.jsx) - add a more specific query if the generic
// fallback doesn't return a good result.
export const countryImageQueries = {
  "united-states": "New York City skyline landmark",
  "united-kingdom": "London landmark Big Ben",
  canada: "Toronto skyline landmark",
  schengen: "Europe landmark architecture",
  australia: "Sydney Opera House landmark",
  uae: "Dubai skyline landmark",
  germany: "Berlin landmark architecture",
  "new-zealand": "Auckland New Zealand skyline",
};
