import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            ✈
          </span>
          VisaPacks
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-brand-700 transition-colors">
            Countries
          </Link>
          <a
            href="#how-it-works"
            className="hidden sm:inline hover:text-brand-700 transition-colors"
          >
            How it works
          </a>
        </nav>
      </div>
    </header>
  );
}
