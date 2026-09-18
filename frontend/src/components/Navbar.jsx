import { Link } from "react-router-dom";

// A small wax-seal / passport-corner mark instead of the obligatory plane
// icon every travel site reaches for - a rounded ink square with a brass
// monogram, like foil stamped into a passport cover.
function Mark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-[7px] bg-ink text-brass shadow-card">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d="M6 4.5h9.5L18 7v12.5H6a1.5 1.5 0 0 1-1.5-1.5V6A1.5 1.5 0 0 1 6 4.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="10.75" cy="11" r="2.1" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9.2 15.6c.4-1.2 1.9-1.6 3.1-1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  return (
    <header className="bg-ivory/95 backdrop-blur-sm border-b border-hairline shadow-nav sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink">
          <Mark />
          VisaPacks
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-stone">
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
