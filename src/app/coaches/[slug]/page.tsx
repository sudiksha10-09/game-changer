import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Coach } from "@/lib/data/coaches";

type Props = {
  params: { slug: string };
};

export default async function CoachDetailPage({ params }: Props) {
  const slug = decodeURIComponent(params.slug);

  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    notFound();
  }

  const coach: Coach = {
    id: data.id,
    slug: data.slug,
    name: data.name,
    sport: data.sport,
    city: data.city,
    pricePerSession: data.price_per_session,
    experienceYears: data.experience_years,
    rating: Number(data.rating ?? 4.5),
    tagline: data.tagline ?? "",
    specialties: data.specialties ?? [],
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <a
        href="/coaches"
        className="text-xs text-slate-400 hover:text-slate-200"
      >
        ← Back to coaches
      </a>

      <div className="mt-4 grid gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <h1 className="text-2xl font-semibold">{coach.name}</h1>
          <p className="text-sm text-slate-300">{coach.tagline}</p>

          <div className="flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="rounded-full bg-slate-900/80 px-3 py-1">
              {coach.sport}
            </span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1">
              {coach.city}
            </span>
            <span className="rounded-full bg-slate-900/80 px-3 py-1">
              ⭐ {coach.rating.toFixed(1)} • {coach.experienceYears} yrs
              experience
            </span>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            <h2 className="mb-2 text-sm font-semibold">About this coach</h2>
            <p>
              This is a placeholder bio. Later you can let coaches write their
              own stories, upload certificates and share match footage. For now,
              we’re focusing on getting the marketplace UX right.
            </p>
          </div>

          <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
            <h2 className="mb-2 text-sm font-semibold text-emerald-300">
              Session focus
            </h2>
            <ul className="list-disc space-y-1 pl-5 text-slate-200">
              {coach.specialties.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="text-xs text-slate-400">Starting from</p>
            <p className="mt-1 text-xl font-semibold text-emerald-300">
              ₹{coach.pricePerSession}
            </p>
            <p className="text-xs text-slate-400">per 60-minute session</p>

            <button className="mt-4 w-full rounded-full bg-brand-primary px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400 transition">
              Request a session
            </button>

            <p className="mt-3 text-[11px] text-slate-400">
              No payment integration yet. Next step: Razorpay / Stripe & slot
              booking.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs text-slate-300">
            <p className="mb-1 font-semibold">Upcoming features</p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Verified certificates (NIS, BCCI, AIFF, etc.)</li>
              <li>Availability calendar & time-slot booking</li>
              <li>Video intros and drill libraries</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
