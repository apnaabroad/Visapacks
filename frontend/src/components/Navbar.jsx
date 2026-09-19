import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-ivory/95 backdrop-blur-sm border-b border-hairline shadow-nav sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink">
          <span className="h-2.5 w-2.5 rounded-full bg-brass" aria-hidden="true" />
          VisaPacks
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium text-stone">
          <Link to="/" className="hidden sm:inline hover:text-ink transition-colors duration-200">
            Countries
          </Link>
          <a href="#how-it-works" className="hidden sm:inline hover:text-ink transition-colors duration-200">
            How it works
          </a>
          <a
            href="#choose-destination"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ivory transition-transform duration-200 hover:scale-[1.03]"
          >
            Get started
          </a>
        </nav>
      </div>
    </header>
  );
}
