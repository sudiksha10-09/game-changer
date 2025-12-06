"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? "text-slate-50"
      : "text-slate-300 hover:text-slate-50";

  return (
    <nav className="border-b border-white/5 bg-slate-950/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent" />
          <span className="text-lg font-semibold tracking-tight">
            Game Changer
          </span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/coaches" className={isActive("/coaches")}>
            Find coaches
          </Link>

          <Link
            href="/auth/login"
            className="hidden sm:inline text-slate-300 hover:text-slate-50"
          >
            Login
          </Link>

          <Link
            href="/auth/register?role=coach"
            className="rounded-full bg-brand-primary px-4 py-1.5 text-xs font-medium text-slate-950 hover:bg-emerald-400 transition"
          >
            List as coach
          </Link>
        </div>
      </div>
    </nav>
  );
}
