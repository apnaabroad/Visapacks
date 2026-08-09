import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /api/countries
export const listCountries = asyncHandler(async (req, res) => {
  const countries = await prisma.country.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      _count: { select: { visaTypes: true } },
    },
  });
  res.json(countries);
});

// GET /api/countries/:slug
export const getCountry = asyncHandler(async (req, res) => {
  const country = await prisma.country.findUnique({
    where: { slug: req.params.slug },
    include: {
      visaTypes: {
        where: { active: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: { _count: { select: { packages: true } } },
      },
    },
  });

  if (!country || !country.active) {
    throw new ApiError(404, `Country "${req.params.slug}" not found`);
  }

  res.json(country);
});
