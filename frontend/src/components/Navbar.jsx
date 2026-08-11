import { Link } from "react-router-dom";

function FlightIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21,16V14L13,9V3.5C13,2.67 12.33,2 11.5,2C10.67,2 10,2.67 10,3.5V9L2,14V16L10,13.5V19L7.5,20.5V22L11.5,21L15.5,22V20.5L13,19V13.5L21,16Z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="bg-ivory/95 backdrop-blur-sm border-b border-hairline shadow-nav sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-ink">
          <FlightIcon className="h-5 w-5 text-burgundy" />
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
