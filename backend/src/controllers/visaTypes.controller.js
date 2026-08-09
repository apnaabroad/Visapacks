import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { serializeVisaType } from "../utils/serialize.js";

// GET /api/countries/:countrySlug/visa-types/:visaTypeSlug
export const getVisaType = asyncHandler(async (req, res) => {
  const { countrySlug, visaTypeSlug } = req.params;

  const country = await prisma.country.findUnique({ where: { slug: countrySlug } });
  if (!country || !country.active) {
    throw new ApiError(404, `Country "${countrySlug}" not found`);
  }

  const visaType = await prisma.visaType.findFirst({
    where: { countryId: country.id, slug: visaTypeSlug, active: true },
    include: {
      packages: {
        where: { active: true },
        orderBy: { price: "asc" },
      },
    },
  });

  if (!visaType) {
    throw new ApiError(404, `Visa type "${visaTypeSlug}" not found for ${country.name}`);
  }

  res.json({ ...serializeVisaType(visaType), country });
});
