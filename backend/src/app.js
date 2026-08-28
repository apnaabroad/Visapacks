import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { LOCAL_UPLOAD_DIR_FOR_STATIC } from "./lib/storage.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { adminRouter } from "./routes/admin.routes.js";
import { countriesRouter } from "./routes/countries.routes.js";
import { ordersRouter } from "./routes/orders.routes.js";
import { packagesRouter } from "./routes/packages.routes.js";
import { buildCorsOrigin } from "./utils/corsOrigins.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: buildCorsOrigin(process.env.CORS_ORIGIN),
    })
  );
  app.use(morgan(process.env.NODE_ENV === "test" ? "silent" : "dev"));
  app.use(express.json());

  const health = (req, res) => res.json({ status: "ok" });
  // Kept at both paths: "/health" for local dev convenience, "/api/health"
  // because that's the only path guaranteed to reach this app in production -
  // Vercel routes the /api directory to this app's Serverless Function
  // natively, but nothing outside of /api is guaranteed to without extra
  // platform-specific routing config.
  app.get("/health", health);
  app.get("/api/health", health);

  // Local-dev-only fallback for uploaded package documents when Vercel Blob
  // isn't configured (see storage.js) - never used in production, where
  // fileUrl always points at a real Blob URL served from vercel-storage.com.
  app.use("/uploads", express.static(LOCAL_UPLOAD_DIR_FOR_STATIC));

  app.use("/api/countries", countriesRouter);
  app.use("/api/packages", packagesRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/admin", adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
