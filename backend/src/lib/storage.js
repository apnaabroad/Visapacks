import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Files live in Vercel Blob storage in production (set BLOB_READ_WRITE_TOKEN
// by connecting a Blob store to the Vercel project - same idea as the
// Postgres database in the deploy README). Locally, with no token, we fall
// back to writing under backend/uploads/ and serving it via the /uploads
// static route registered in app.js, so the whole upload -> download flow
// is fully testable without needing real Vercel credentials.
const LOCAL_UPLOAD_DIR = path.join(__dirname, "../../uploads");

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// Uploads a file buffer and returns its public URL, which is later stored
// verbatim on PackageDocument.fileUrl and is also all deletePackageFile
// needs to remove it again (Vercel Blob's del() takes the blob's own URL).
export async function uploadPackageFile(buffer, filename, contentType) {
  const key = `package-documents/${Date.now()}-${filename.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  if (hasBlobToken()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(key, buffer, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return blob.url;
  }

  if (process.env.NODE_ENV === "production") {
    // Never silently fall back to local disk in production - Vercel's
    // filesystem is ephemeral/read-only outside /tmp, so a "successful"
    // local write there would quietly vanish. Fail loudly instead.
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not configured - connect Vercel Blob storage to this project before uploading documents."
    );
  }

  await mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  const localFilename = path.basename(key);
  await writeFile(path.join(LOCAL_UPLOAD_DIR, localFilename), buffer);
  return `/uploads/${localFilename}`;
}

export async function deletePackageFile(fileUrl) {
  if (hasBlobToken()) {
    const { del } = await import("@vercel/blob");
    await del(fileUrl).catch(() => {});
    return;
  }

  const localFilename = path.basename(fileUrl);
  await unlink(path.join(LOCAL_UPLOAD_DIR, localFilename)).catch(() => {});
}

export const LOCAL_UPLOAD_DIR_FOR_STATIC = LOCAL_UPLOAD_DIR;
