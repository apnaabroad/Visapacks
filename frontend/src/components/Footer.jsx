export default function Footer() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-sm text-warm-gray flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} VisaPacks. We help you self-apply, not a government agency.</p>
        <p>Not affiliated with any embassy, consulate, or immigration authority.</p>
      </div>
    </footer>
  );
}
