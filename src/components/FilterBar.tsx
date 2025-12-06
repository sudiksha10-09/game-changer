type SortBy =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "experience-desc"
  | "rating-desc";

type Props = {
  sport: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  minExperience: string;
  minRating: string;
  sortBy: SortBy;
  setSport: (value: string) => void;
  setCity: (value: string) => void;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  setMinExperience: (value: string) => void;
  setMinRating: (value: string) => void;
  setSortBy: (value: SortBy) => void;
  onReset: () => void;
};

export default function FilterBar({
  sport,
  city,
  minPrice,
  maxPrice,
  minExperience,
  minRating,
  sortBy,
  setSport,
  setCity,
  setMinPrice,
  setMaxPrice,
  setMinExperience,
  setMinRating,
  setSortBy,
  onReset,
}: Props) {
  return (
    <div className="mb-4 space-y-4 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur">
      {/* Top row: sport + city */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          placeholder="Sport (cricket, football, badminton...)"
          className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />
        <input
          placeholder="City"
          className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* Middle row: price + experience + rating */}
      <div className="grid gap-3 md:grid-cols-4">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-300">Min price (₹)</label>
          <input
            type="number"
            min={0}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-slate-300">Max price (₹)</label>
          <input
            type="number"
            min={0}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-slate-300">
            Min experience (yrs)
          </label>
          <input
            type="number"
            min={0}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            value={minExperience}
            onChange={(e) => setMinExperience(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-slate-300">Min rating</label>
          <input
            type="number"
            min={1}
            max={5}
            step={0.1}
            className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-xs outline-none focus:border-brand-primary"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />
        </div>
      </div>

      {/* Bottom row: sort + reset */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-[11px] text-slate-300">
          <span className="hidden sm:inline text-slate-400">
            Sort coaches by
          </span>
          <select
            className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-[11px] outline-none focus:border-brand-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="relevance">Relevance (default)</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
            <option value="experience-desc">Experience: high → low</option>
            <option value="rating-desc">Rating: high → low</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
          <p className="hidden sm:inline">
            Smart filters help academies make better coaching decisions.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-slate-200 hover:border-brand-accent hover:text-brand-accent transition"
          >
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
}
