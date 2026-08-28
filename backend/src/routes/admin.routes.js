import { Router } from "express";
import multer from "multer";

import {
  deletePackageDocument,
  listPackageDocuments,
  listPackagesForAdmin,
  uploadPackageDocument,
} from "../controllers/admin.controller.js";
import { requireAdminSecret } from "../middleware/adminAuth.js";

// Memory storage, not disk - serverless functions don't have a writable
// filesystem to speak of, and files get handed straight to storage.js
// (Vercel Blob or the local dev fallback) as a buffer.
const upload = multer({ storage: multer.memoryStorage() });

export const adminRouter = Router();

adminRouter.use(requireAdminSecret);
adminRouter.get("/packages", listPackagesForAdmin);
adminRouter.get("/packages/:packageId/documents", listPackageDocuments);
adminRouter.post("/packages/:packageId/documents", upload.single("file"), uploadPackageDocument);
adminRouter.delete("/documents/:documentId", deletePackageDocument);
