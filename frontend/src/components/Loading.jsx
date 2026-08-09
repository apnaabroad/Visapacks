export default function Loading({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-slate-500">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-brand-600" />
      <p className="mt-4 text-sm">{label}</p>
    </div>
  );
}
