import { Router } from "express";
import { createOrder, getOrder } from "../controllers/orders.controller.js";

export const ordersRouter = Router();

ordersRouter.post("/", createOrder);
ordersRouter.get("/:id", getOrder);
