import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-ivory/95 backdrop-blur-sm border-b border-hairline shadow-nav sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-burgundy" aria-hidden="true" />
          VisaPacks
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-warm-gray">
          <Link to="/" className="hover:text-ink transition-colors duration-200">
            Countries
          </Link>
          <a href="#how-it-works" className="hidden sm:inline hover:text-ink transition-colors duration-200">
            How it works
          </a>
        </nav>
      </div>
    </header>
  );
}
