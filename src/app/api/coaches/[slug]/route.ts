import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import type { Coach } from "@/lib/data/coaches";

type Params = {
  params: { slug: string };
};

export async function GET(_req: Request, { params }: Params) {
  const slug = decodeURIComponent(params.slug);

  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Coach not found" }, { status: 404 });
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

  return NextResponse.json(coach);
}
