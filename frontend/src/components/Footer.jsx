export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div>
            <p className="font-display text-lg font-semibold">VisaPacks</p>
            <p className="mt-2 max-w-xs text-sm text-ivory/60">
              Documents, checklists, and templates for self-filed visa applications - you file, we guide.
            </p>
          </div>
          <div className="text-sm text-ivory/60 sm:text-right">
            <p>© {new Date().getFullYear()} VisaPacks. Not a government agency.</p>
            <p className="mt-1">Not affiliated with any embassy, consulate, or immigration authority.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
