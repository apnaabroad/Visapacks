import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-primary-600 sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-cream">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-white">
            ✈
          </span>
          VisaPacks
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-primary-100">
          <Link to="/" className="hover:text-cream transition-colors">
            Countries
          </Link>
          <a
            href="#how-it-works"
            className="hidden sm:inline hover:text-cream transition-colors"
          >
            How it works
          </a>
        </nav>
      </div>
    </header>
  );
}
