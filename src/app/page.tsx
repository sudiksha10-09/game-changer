import CoachCard from "@/components/CoachCard";
import { coaches } from "@/lib/data/coaches";

const topCoaches = coaches.slice(0, 3);

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">
      {/* Hero */}
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Early access • Coach marketplace for India
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Game Changer –{" "}
            <span className="text-brand-primary">
              because talent needs the right guidance.
            </span>
          </h1>
          <p className="mt-4 text-sm text-slate-300 sm:text-base">
            Your shortcut to better coaching decisions. Find verified sports
            coaches across cricket, football, badminton, strength & conditioning
            and more. Compare ratings, pricing and experience before you book a
            session.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <a
              href="/coaches"
              className="rounded-full bg-brand-primary px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400 transition"
            >
              Browse coaches
            </a>
            <button className="rounded-full border border-white/10 px-4 py-2 text-slate-100 hover:border-brand-accent hover:text-brand-accent transition">
              List as a coach
            </button>
            <span className="text-slate-400">
              No random WhatsApp forwards. Transparent profiles & reviews.
            </span>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative">
          <div className="absolute -left-10 -top-6 h-36 w-36 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -right-6 bottom-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur">
            <p className="mb-3 text-xs text-slate-300">
              Live snapshot • Top rated coaches this week
            </p>
            <div className="space-y-3">
              {topCoaches.map((coach) => (
                <div
                  key={coach.slug}
                  className="flex items-center justify-between rounded-2xl bg-slate-950/70 px-3 py-2"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-50">
                      {coach.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {coach.sport} • {coach.city}
                    </p>
                  </div>
                  <div className="text-right text-[11px] text-slate-300">
                    <p>⭐ {coach.rating.toFixed(1)}</p>
                    <p>₹{coach.pricePerSession}/session</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured coaches grid */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Featured Coaches</h2>
          <a
            href="/coaches"
            className="text-xs text-brand-primary hover:text-emerald-300"
          >
            View all →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topCoaches.map((coach) => (
            <CoachCard key={coach.slug} coach={coach} />
          ))}
        </div>
      </section>
    </section>
  );
}
