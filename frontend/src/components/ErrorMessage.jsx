import { Link } from "react-router-dom";

export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <p className="text-4xl mb-4">⚠️</p>
      <p className="text-ink font-medium">{message}</p>
      <Link
        to="/"
        className="mt-6 inline-block text-cognac-600 hover:text-cognac-700 font-medium text-sm"
      >
        ← Back to home
      </Link>
    </div>
  );
}
