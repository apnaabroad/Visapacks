import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { countriesRouter } from "./routes/countries.routes.js";
import { ordersRouter } from "./routes/orders.routes.js";
import { packagesRouter } from "./routes/packages.routes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
    })
  );
  app.use(morgan(process.env.NODE_ENV === "test" ? "silent" : "dev"));
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ status: "ok" }));

  app.use("/api/countries", countriesRouter);
  app.use("/api/packages", packagesRouter);
  app.use("/api/orders", ordersRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
