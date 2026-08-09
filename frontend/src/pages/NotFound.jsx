import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <p className="text-4xl mb-4">🧭</p>
      <h1 className="text-xl font-bold text-slate-900">Page not found</h1>
      <Link
        to="/"
        className="mt-6 inline-block text-brand-600 hover:text-brand-700 font-medium text-sm"
      >
        ← Back to home
      </Link>
    </div>
  );
}
