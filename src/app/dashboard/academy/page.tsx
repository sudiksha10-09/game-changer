export default function AcademyDashboardPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Academy dashboard</h1>
      <p className="text-sm text-slate-300 mb-6">
        Use Game Changer to discover and manage your coaching bench strength.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
          <h2 className="text-sm font-semibold mb-2">What you can do</h2>
          <ul className="list-disc space-y-1 pl-5 text-slate-200 text-xs">
            <li>Search coaches by sport, city and experience.</li>
            <li>Shortlist coaches and track who you like.</li>
            <li>Later: invite coaches to trials or part-time roles.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm">
          <h2 className="text-sm font-semibold mb-2">Start by</h2>
          <p className="text-xs text-slate-300">
            Go to <span className="font-semibold">Find coaches</span> in the
            navbar and explore talent using filters. This is not a recruitment
            portal – it’s your discovery layer for good coaches.
          </p>
        </div>
      </div>
    </section>
  );
}
