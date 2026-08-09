import { prisma } from "../lib/prisma.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateOrderNumber } from "../utils/orderNumber.js";
import { serializeOrder } from "../utils/serialize.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/orders
export const createOrder = asyncHandler(async (req, res) => {
  const { packageId, customerName, email, phone, travelDate, notes } = req.body;

  if (!packageId || !customerName || !email) {
    throw new ApiError(400, "packageId, customerName and email are required");
  }
  if (!EMAIL_RE.test(email)) {
    throw new ApiError(400, "A valid email address is required");
  }

  const pkg = await prisma.package.findUnique({ where: { id: packageId } });
  if (!pkg || !pkg.active) {
    throw new ApiError(404, "Selected package could not be found");
  }

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      packageId: pkg.id,
      customerName: customerName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      travelDate: travelDate ? new Date(travelDate) : null,
      notes: notes?.trim() || null,
      amount: pkg.price,
      currency: pkg.currency,
      // No real payment gateway is wired up yet, so orders start PENDING.
      // Plug a provider (Stripe, Razorpay, etc.) in here and flip to PAID on success.
      status: "PENDING",
    },
    include: {
      package: { include: { visaType: { include: { country: true } } } },
    },
  });

  res.status(201).json(serializeOrder(order));
});

// GET /api/orders/:id
export const getOrder = asyncHandler(async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: req.params.id },
    include: {
      package: { include: { visaType: { include: { country: true } } } },
    },
  });

  if (!order) {
    throw new ApiError(404, `Order "${req.params.id}" not found`);
  }

  res.json(serializeOrder(order));
});
