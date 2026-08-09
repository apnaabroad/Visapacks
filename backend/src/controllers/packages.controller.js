import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /api/packages/:id
export const getPackage = asyncHandler(async (req, res) => {
  const pkg = await prisma.package.findUnique({
    where: { id: req.params.id },
    include: {
      visaType: {
        include: { country: true },
      },
    },
  });

  if (!pkg || !pkg.active) {
    throw new ApiError(404, `Package "${req.params.id}" not found`);
  }

  res.json(pkg);
});
