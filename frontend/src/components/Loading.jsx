export default function Loading({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-warm-gray">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-ink" />
      <p className="mt-4 text-sm">{label}</p>
    </div>
  );
}
