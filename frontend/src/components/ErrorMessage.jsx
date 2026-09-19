import { Link } from "react-router-dom";

export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <span
        className="font-display mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl font-bold text-ivory"
        aria-hidden="true"
      >
        !
      </span>
      <p className="font-display mt-5 text-lg font-bold text-ink">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-block text-ink hover:opacity-60 font-medium text-sm transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}
