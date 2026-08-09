import { Router } from "express";
import { getCountry, listCountries } from "../controllers/countries.controller.js";
import { getVisaType } from "../controllers/visaTypes.controller.js";

export const countriesRouter = Router();

countriesRouter.get("/", listCountries);
countriesRouter.get("/:slug", getCountry);
countriesRouter.get("/:countrySlug/visa-types/:visaTypeSlug", getVisaType);
