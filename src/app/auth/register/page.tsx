"use client";

import { FormEvent, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Role = "coach" | "academy";

// 1. We move your original logic into this inner component
function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialRole = (searchParams.get("role") as Role) || "coach";
  const [role, setRole] = useState<Role>(initialRole);

  const [fullName, setFullName] = useState("");
  const [academyName, setAcademyName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(
    () =>
      role === "coach"
        ? "Create your coach account"
        : "Create your academy account",
    [role]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const displayName =
        role === "coach" ? fullName : academyName || fullName || "";

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
            full_name: fullName,
            academy_name: academyName,
            city,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      // For now assume immediate login (with email confirmations disabled)
      // Redirect to relevant dashboard
      router.push(role === "coach" ? "/dashboard/coach" : "/dashboard/academy");
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Join Game Changer</h1>
      <p className="text-sm text-slate-300 mb-6">
        Because talent needs the right guidance. Choose how you want to use the
        platform.
      </p>

      {/* Role toggle */}
      <div className="mb-6 inline-flex rounded-full border border-white/10 bg-slate-900/70 p-1 text-xs">
        <button
          type="button"
          onClick={() => setRole("coach")}
          className={`px-4 py-1.5 rounded-full transition ${
            role === "coach"
              ? "bg-brand-primary text-slate-950"
              : "text-slate-300 hover:text-slate-50"
          }`}
        >
          I am a coach
        </button>
        <button
          type="button"
          onClick={() => setRole("academy")}
          className={`px-4 py-1.5 rounded-full transition ${
            role === "academy"
              ? "bg-brand-primary text-slate-950"
              : "text-slate-300 hover:text-slate-50"
          }`}
        >
          I am an academy
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm"
      >
        {/* Name fields */}
        {role === "coach" ? (
          <div className="space-y-1">
            <label className="text-xs text-slate-300">Full name</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            />
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">
                Academy / organisation name
              </label>
              <input
                required
                value={academyName}
                onChange={(e) => setAcademyName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Your name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
              />
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="text-xs text-slate-300">City</label>
          <input
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Mumbai, Pune, Bengaluru"
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-300">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
          />
        </div>

        {error && (
          <p className="text-[11px] text-red-400 mt-1">⚠️ {error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-brand-primary px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="text-brand-primary hover:text-emerald-300"
          >
            Login
          </button>
        </p>
      </form>
    </section>
  );
}

// 2. The main export wraps the content in Suspense
export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-slate-400 text-sm">
          Loading registration...
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
