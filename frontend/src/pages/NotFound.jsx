import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <span
        className="stamp mx-auto flex h-20 w-20 flex-col items-center justify-center text-ink"
        style={{ "--stamp-rotate": "-8deg" }}
      >
        <span className="text-lg font-semibold">404</span>
        <span className="text-[9px] font-semibold uppercase tracking-widest">Not found</span>
      </span>
      <h1 className="font-display mt-5 text-xl font-semibold tracking-tight text-ink">
        Page not found
      </h1>
      <Link
        to="/"
        className="mt-6 inline-block text-ink hover:text-brass font-medium text-sm transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
