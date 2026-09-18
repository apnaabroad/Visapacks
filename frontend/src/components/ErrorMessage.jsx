import { Link } from "react-router-dom";

export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <span
        className="stamp font-display mx-auto flex h-16 w-16 items-center justify-center text-2xl font-semibold text-brass"
        style={{ "--stamp-rotate": "-5deg" }}
        aria-hidden="true"
      >
        !
      </span>
      <p className="font-display mt-5 text-lg font-medium text-ink">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-block text-ink hover:text-brass font-medium text-sm transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
