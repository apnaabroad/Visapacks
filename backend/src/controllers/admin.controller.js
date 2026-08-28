import { prisma } from "../lib/prisma.js";
import { deletePackageFile, uploadPackageFile } from "../lib/storage.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const ALLOWED_MIME = new Set([
  "application/pdf",
  "text/html",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
]);
const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB - comfortably above a 70-page PDF

// GET /api/admin/packages - every package across every country/visa type,
// for the admin upload picker, with its current document count.
export const listPackagesForAdmin = asyncHandler(async (req, res) => {
  const packages = await prisma.package.findMany({
    include: {
      visaType: { include: { country: true } },
      _count: { select: { documents: true } },
    },
    orderBy: [
      { visaType: { country: { sortOrder: "asc" } } },
      { visaType: { sortOrder: "asc" } },
      { tier: "asc" },
    ],
  });
  res.json(packages);
});

// GET /api/admin/packages/:packageId/documents
export const listPackageDocuments = asyncHandler(async (req, res) => {
  const documents = await prisma.packageDocument.findMany({
    where: { packageId: req.params.packageId },
    orderBy: { sortOrder: "asc" },
  });
  res.json(documents);
});

// POST /api/admin/packages/:packageId/documents (multipart, field name "file")
export const uploadPackageDocument = asyncHandler(async (req, res) => {
  const pkg = await prisma.package.findUnique({ where: { id: req.params.packageId } });
  if (!pkg) {
    throw new ApiError(404, `Package "${req.params.packageId}" not found`);
  }

  if (!req.file) {
    throw new ApiError(400, "No file uploaded (expected multipart field \"file\")");
  }
  if (req.file.size > MAX_FILE_BYTES) {
    throw new ApiError(400, `File exceeds the ${MAX_FILE_BYTES / 1024 / 1024}MB limit`);
  }
  if (!ALLOWED_MIME.has(req.file.mimetype)) {
    throw new ApiError(400, `Unsupported file type "${req.file.mimetype}" - use PDF, DOCX, XLSX, or HTML`);
  }

  const { title, description } = req.body;
  if (!title) {
    throw new ApiError(400, "title is required");
  }

  const fileUrl = await uploadPackageFile(req.file.buffer, req.file.originalname, req.file.mimetype);
  const fileType =
    req.file.mimetype === "application/pdf" ? "pdf" :
    req.file.mimetype === "text/html" ? "html" :
    req.file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "xlsx" :
    "docx";

  const lastDoc = await prisma.packageDocument.findFirst({
    where: { packageId: pkg.id },
    orderBy: { sortOrder: "desc" },
  });

  const document = await prisma.packageDocument.create({
    data: {
      packageId: pkg.id,
      title,
      description: description || null,
      fileUrl,
      fileType,
      sizeBytes: req.file.size,
      sortOrder: (lastDoc?.sortOrder ?? -1) + 1,
    },
  });

  res.status(201).json(document);
});

// DELETE /api/admin/documents/:documentId
export const deletePackageDocument = asyncHandler(async (req, res) => {
  const document = await prisma.packageDocument.findUnique({ where: { id: req.params.documentId } });
  if (!document) {
    throw new ApiError(404, `Document "${req.params.documentId}" not found`);
  }

  await prisma.packageDocument.delete({ where: { id: document.id } });
  await deletePackageFile(document.fileUrl);

  res.status(204).end();
});
