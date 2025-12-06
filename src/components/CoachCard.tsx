import Link from "next/link";
import type { Coach } from "@/lib/data/coaches";

export default function CoachCard({ coach }: { coach: Coach }) {
  return (
    <Link
      href={`/coaches/${coach.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur hover:border-brand-primary/70 hover:bg-white/10 transition"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold">{coach.name}</h3>
          <span className="rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
            {coach.sport}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400">{coach.city}</p>
        <p className="mt-2 text-sm text-slate-100">{coach.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {coach.specialties.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-slate-300">
        <span>₹{coach.pricePerSession} / session</span>
        <span>
          ⭐ {coach.rating.toFixed(1)} • {coach.experienceYears} yrs
        </span>
      </div>
    </Link>
  );
}
