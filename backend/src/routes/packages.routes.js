import { Router } from "express";
import { getPackage } from "../controllers/packages.controller.js";

export const packagesRouter = Router();

packagesRouter.get("/:id", getPackage);
