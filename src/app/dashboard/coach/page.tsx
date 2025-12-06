"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Coach } from "@/lib/data/coaches";
import CoachCard from "@/components/CoachCard";
import { supabase } from "@/lib/supabaseClient";

export default function CoachDashboardPage() {
  const [profile, setProfile] = useState<Coach>({
    slug: "my-temp-slug",
    name: "",
    sport: "",
    city: "",
    pricePerSession: 0,
    experienceYears: 0,
    rating: 4.5,
    tagline: "",
    specialties: [],
  });

  const [specialtiesInput, setSpecialtiesInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get current logged-in user
  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
    }
    loadUser();
  }, []);

  const handleChange =
    (field: keyof Coach) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "pricePerSession" || field === "experienceYears"
          ? Number(e.target.value)
          : e.target.value;

      setProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
      setSaved(false);
      setError(null);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError(null);

    const specialties =
      specialtiesInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || [];

    const payload = {
      userId,
      name: profile.name,
      sport: profile.sport,
      city: profile.city,
      pricePerSession: profile.pricePerSession,
      experienceYears: profile.experienceYears,
      rating: profile.rating,
      tagline: profile.tagline,
      specialties,
    };

    try {
      const res = await fetch("/api/coaches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save profile");
      }

      const savedCoach: Coach = await res.json();

      setProfile(savedCoach);
      setSpecialtiesInput(savedCoach.specialties.join(", "));
      setSaved(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Coach dashboard</h1>
      <p className="text-sm text-slate-300 mb-2">
        Set up your Game Changer profile. This is what players and academies
        will see when they search for coaches.
      </p>

      {!userId && (
        <p className="text-[11px] text-yellow-300 mb-4">
          You are not logged in with Supabase Auth. For now the profile will
          still save, but later we’ll restrict editing to your own account.
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form side */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm"
        >
          <h2 className="text-sm font-semibold mb-1">Coach profile details</h2>
          <p className="text-[11px] text-slate-400 mb-3">
            Fill this once properly – it becomes your profile on the
            marketplace. You can update it later.
          </p>

          <div className="space-y-1">
            <label className="text-xs text-slate-300">Full name</label>
            <input
              required
              value={profile.name}
              onChange={handleChange("name")}
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300">Primary sport</label>
            <input
              required
              placeholder="Cricket, football, badminton..."
              value={profile.sport}
              onChange={handleChange("sport")}
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-slate-300">City</label>
              <input
                required
                placeholder="e.g. Mumbai, Pune, Bengaluru"
                value={profile.city}
                onChange={handleChange("city")}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300">
                Years of coaching experience
              </label>
              <input
                type="number"
                min={0}
                value={profile.experienceYears || ""}
                onChange={handleChange("experienceYears")}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-slate-300">
                Price per session (₹)
              </label>
              <input
                type="number"
                min={0}
                value={profile.pricePerSession || ""}
                onChange={handleChange("pricePerSession")}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-300">
                Headline / tagline
              </label>
              <input
                placeholder="Ex-Ranji player helping batters go next level."
                value={profile.tagline}
                onChange={handleChange("tagline")}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300">
              Session focus / specialties
            </label>
            <input
              placeholder="Batting, match temperament, fitness..."
              value={specialtiesInput}
              onChange={(e) => {
                setSpecialtiesInput(e.target.value);
                setSaved(false);
                setError(null);
              }}
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            />
            <p className="text-[11px] text-slate-400">
              Separate each specialty with a comma. Example:{" "}
              <span className="italic">
                Batting, power hitting, fitness for T20
              </span>
              .
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-2 w-full rounded-full bg-brand-primary px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save profile to Game Changer"}
          </button>

          {saved && !error && (
            <p className="text-[11px] text-emerald-300 mt-2">
              Profile saved to Supabase. You’re now discoverable in the
              marketplace.
            </p>
          )}

          {error && (
            <p className="text-[11px] text-red-400 mt-2">⚠️ {error}</p>
          )}
        </form>

        {/* Preview side */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <h2 className="text-sm font-semibold mb-2">Profile preview</h2>
            <p className="text-[11px] text-slate-400 mb-3">
              This is how your card will look in search results on Game Changer.
            </p>

            {profile.name && profile.sport ? (
              <CoachCard coach={profile} />
            ) : (
              <p className="text-xs text-slate-400">
                Fill in your name and sport to see a live preview.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-xs text-slate-300">
            <h3 className="font-semibold mb-1">What happens next?</h3>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                This form saves into Supabase and is linked (when logged in) to
                your Supabase user id.
              </li>
              <li>
                The Find coaches page reads from the same table, so your profile
                appears there.
              </li>
              <li>
                Later we’ll restrict editing so only you (that user id) can
                update this profile.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
