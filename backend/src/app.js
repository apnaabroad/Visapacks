import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
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

  app.use("/api/countries", countriesRouter);
  app.use("/api/packages", packagesRouter);
  app.use("/api/orders", ordersRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
