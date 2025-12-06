"use client";

import { useEffect, useMemo, useState } from "react";
import type { Coach } from "@/lib/data/coaches";
import CoachCard from "@/components/CoachCard";
import FilterBar from "@/components/FilterBar";

type SortBy =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "experience-desc"
  | "rating-desc";

export default function CoachesPage() {
  const [sport, setSport] = useState("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minExperience, setMinExperience] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("relevance");

  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoaches() {
      try {
        const res = await fetch("/api/coaches", { cache: "no-store" });
        const data = await res.json();
        setCoaches(data);
      } catch (err) {
        console.error("Failed to load coaches", err);
      } finally {
        setLoading(false);
      }
    }

    loadCoaches();
  }, []);

  const filteredAndSorted = useMemo(() => {
    const minPriceNum = minPrice ? Number(minPrice) : undefined;
    const maxPriceNum = maxPrice ? Number(maxPrice) : undefined;
    const minExpNum = minExperience ? Number(minExperience) : undefined;
    const minRatingNum = minRating ? Number(minRating) : undefined;

    // 1. Filter
    let result = coaches.filter((c) => {
      const sportMatch = sport
        ? c.sport.toLowerCase().includes(sport.toLowerCase())
        : true;

      const cityMatch = city
        ? c.city.toLowerCase().includes(city.toLowerCase())
        : true;

      const priceMatch =
        (minPriceNum === undefined ||
          c.pricePerSession >= minPriceNum) &&
        (maxPriceNum === undefined || c.pricePerSession <= maxPriceNum);

      const expMatch =
        minExpNum === undefined || c.experienceYears >= minExpNum;

      const ratingMatch =
        minRatingNum === undefined || c.rating >= minRatingNum;

      return sportMatch && cityMatch && priceMatch && expMatch && ratingMatch;
    });

    // 2. Sort
    if (sortBy === "price-asc") {
      result = [...result].sort(
        (a, b) => a.pricePerSession - b.pricePerSession
      );
    } else if (sortBy === "price-desc") {
      result = [...result].sort(
        (a, b) => b.pricePerSession - a.pricePerSession
      );
    } else if (sortBy === "experience-desc") {
      result = [...result].sort(
        (a, b) => b.experienceYears - a.experienceYears
      );
    } else if (sortBy === "rating-desc") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    // "relevance" keeps Supabase order (created_at desc from the API)

    return result;
  }, [
    coaches,
    sport,
    city,
    minPrice,
    maxPrice,
    minExperience,
    minRating,
    sortBy,
  ]);

  const handleReset = () => {
    setSport("");
    setCity("");
    setMinPrice("");
    setMaxPrice("");
    setMinExperience("");
    setMinRating("");
    setSortBy("relevance");
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Browse coaches</h1>
        <p className="mt-1 text-sm text-slate-300">
          Use filters to quickly find the right coach for your players and
          programs.
        </p>
      </div>

      <FilterBar
        sport={sport}
        city={city}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minExperience={minExperience}
        minRating={minRating}
        sortBy={sortBy}
        setSport={setSport}
        setCity={setCity}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setMinExperience={setMinExperience}
        setMinRating={setMinRating}
        setSortBy={setSortBy}
        onReset={handleReset}
      />

      {loading ? (
        <p className="mt-6 text-sm text-slate-400">Loading coaches...</p>
      ) : filteredAndSorted.length === 0 ? (
        <p className="mt-6 text-sm text-slate-400">
          No coaches match these filters yet. Try clearing some filters or
          expanding your price/experience range.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSorted.map((coach) => (
            <CoachCard key={coach.slug} coach={coach} />
          ))}
        </div>
      )}
    </section>
  );
}
