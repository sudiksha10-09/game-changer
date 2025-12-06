export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/90 mt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Game Changer. All rights reserved.</p>
        <div className="flex gap-4">
          <button className="hover:text-slate-300">Privacy</button>
          <button className="hover:text-slate-300">Terms</button>
        </div>
      </div>
    </footer>
  );
}
