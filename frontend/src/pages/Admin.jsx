import { useState } from "react";

import {
  deletePackageDocument,
  listPackageDocuments,
  listPackagesForAdmin,
  uploadPackageDocument,
} from "../api/admin.js";
import { getErrorMessage, resolveFileUrl } from "../api/client.js";
import Flag from "../components/Flag.jsx";

// Not linked from the site nav on purpose - reach it directly at /admin.
// Auth is a single shared secret kept in memory only (never persisted), sent
// back as a header on every call. See backend/src/middleware/adminAuth.js.
export default function Admin() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [packages, setPackages] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const loadPackages = async (activeSecret) => {
    try {
      const data = await listPackagesForAdmin(activeSecret);
      setPackages(data);
      setAuthed(true);
      setAuthError(null);
    } catch (err) {
      setAuthError(getErrorMessage(err));
      setAuthed(false);
    }
  };

  const handleSubmitSecret = (event) => {
    event.preventDefault();
    loadPackages(secret);
  };

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 sm:px-6 py-24">
        <h1 className="text-2xl font-bold tracking-tight text-ink">Admin</h1>
        <p className="mt-2 text-sm text-warm-gray">Enter the admin secret to manage package documents.</p>
        <form onSubmit={handleSubmitSecret} className="mt-6 space-y-3">
          <input
            type="password"
            autoFocus
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            placeholder="Admin secret"
            className="w-full border border-hairline px-3 py-2 text-sm transition-all duration-200 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
          />
          {authError && <p className="text-sm text-burgundy">{authError}</p>}
          <button
            type="submit"
            className="w-full bg-ink px-4 py-2.5 text-sm font-semibold text-ivory transition-all duration-200 hover:bg-burgundy"
          >
            Continue
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-14">
      <h1 className="text-2xl font-bold tracking-tight text-ink">Package documents</h1>
      <p className="mt-2 text-sm text-warm-gray">
        {packages.length} packages across every country and visa type. Click one to upload or remove its files.
      </p>

      <div className="mt-8 divide-y divide-hairline border border-hairline">
        {packages.map((pkg) => (
          <PackageRow
            key={pkg.id}
            pkg={pkg}
            secret={secret}
            expanded={expandedId === pkg.id}
            onToggle={() => setExpandedId((current) => (current === pkg.id ? null : pkg.id))}
            onDocsChanged={() => loadPackages(secret)}
          />
        ))}
      </div>
    </div>
  );
}

function PackageRow({ pkg, secret, expanded, onToggle, onDocsChanged }) {
  const [documents, setDocuments] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const loadDocuments = async () => {
    try {
      const data = await listPackageDocuments(pkg.id, secret);
      setDocuments(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(getErrorMessage(err));
    }
  };

  const handleToggle = () => {
    onToggle();
    if (!expanded && documents === null) loadDocuments();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-3 p-4 text-left transition-colors duration-200 hover:bg-hairline/25"
      >
        <span className="flex items-center gap-2.5 min-w-0">
          <Flag code={pkg.visaType.country.code} />
          <span className="truncate text-sm text-ink">
            <span className="font-medium">{pkg.visaType.country.name}</span> · {pkg.visaType.name} ·{" "}
            <span className="font-semibold text-burgundy">{pkg.tier}</span>
          </span>
        </span>
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-warm-gray">
          {pkg._count.documents} file{pkg._count.documents === 1 ? "" : "s"}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-hairline bg-hairline/10 p-4">
          {loadError && <p className="text-sm text-burgundy">{loadError}</p>}
          {documents === null && !loadError && <p className="text-sm text-warm-gray">Loading...</p>}
          {documents && (
            <ul className="space-y-2">
              {documents.length === 0 && <p className="text-sm text-warm-gray">No documents uploaded yet.</p>}
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 border border-hairline bg-ivory p-3 text-sm"
                >
                  <a
                    href={resolveFileUrl(doc.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 truncate text-ink hover:text-burgundy"
                  >
                    <span className="font-medium">{doc.title}</span>{" "}
                    <span className="text-xs uppercase text-warm-gray">.{doc.fileType}</span>
                  </a>
                  <button
                    type="button"
                    onClick={async () => {
                      await deletePackageDocument(doc.id, secret);
                      loadDocuments();
                      onDocsChanged();
                    }}
                    className="shrink-0 text-xs font-semibold uppercase tracking-wide text-warm-gray hover:text-burgundy"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <UploadForm
            packageId={pkg.id}
            secret={secret}
            onUploaded={() => {
              loadDocuments();
              onDocsChanged();
            }}
          />
        </div>
      )}
    </div>
  );
}

function UploadForm({ packageId, secret, onUploaded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !title) return;
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      if (description) formData.append("description", description);
      await uploadPackageDocument(packageId, formData, secret);
      setTitle("");
      setDescription("");
      setFile(null);
      event.target.reset();
      onUploaded();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-hairline pt-4">
      <input
        type="text"
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Document title"
        className="border border-hairline bg-ivory px-3 py-2 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
      />
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description (optional)"
        className="border border-hairline bg-ivory px-3 py-2 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
      />
      <input
        type="file"
        required
        accept=".pdf,.docx,.html"
        onChange={(event) => setFile(event.target.files[0] ?? null)}
        className="sm:col-span-2 text-sm text-ink file:mr-3 file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:text-ivory file:transition-colors file:hover:bg-burgundy"
      />
      {error && <p className="sm:col-span-2 text-sm text-burgundy">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 bg-ink px-4 py-2 text-sm font-semibold text-ivory transition-all duration-200 hover:bg-burgundy disabled:opacity-60"
      >
        {submitting ? "Uploading..." : "Upload document"}
      </button>
    </form>
  );
}
