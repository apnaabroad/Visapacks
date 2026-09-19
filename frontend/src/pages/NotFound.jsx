import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <span className="font-display mx-auto flex h-20 w-20 flex-col items-center justify-center rounded-full bg-brass text-ink">
        <span className="text-lg font-extrabold">404</span>
      </span>
      <h1 className="font-display mt-5 text-xl font-bold tracking-tight text-ink">
        Page not found
      </h1>
      <Link
        to="/"
        className="mt-6 inline-block text-ink hover:opacity-60 font-medium text-sm transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
