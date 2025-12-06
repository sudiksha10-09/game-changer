"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Role = "coach" | "academy";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("coach");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      router.push(role === "coach" ? "/dashboard/coach" : "/dashboard/academy");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <p className="text-sm text-slate-300 mb-6">
        Access your Game Changer account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm"
      >
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-300">Login as</label>
          <div className="inline-flex rounded-full border border-white/10 bg-slate-900/70 p-1 text-xs">
            <button
              type="button"
              onClick={() => setRole("coach")}
              className={`px-4 py-1.5 rounded-full transition ${
                role === "coach"
                  ? "bg-brand-primary text-slate-950"
                  : "text-slate-300 hover:text-slate-50"
              }`}
            >
              Coach
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
              Academy
            </button>
          </div>
        </div>

        {error && (
          <p className="text-[11px] text-red-400 mt-1">⚠️ {error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-full bg-brand-primary px-4 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          New to Game Changer?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/register")}
            className="text-brand-primary hover:text-emerald-300"
          >
            Create an account
          </button>
        </p>
      </form>
    </section>
  );
}
