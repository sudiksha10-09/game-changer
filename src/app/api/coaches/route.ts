import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import type { Coach } from "@/lib/data/coaches";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// GET /api/coaches  -> list all coaches
export async function GET() {
  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase GET /coaches error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch coaches" },
      { status: 500 }
    );
  }

  const coaches: Coach[] =
    data?.map((row: any) => ({
      id: row.id,
      userId: row.user_id,
      slug: row.slug,
      name: row.name,
      sport: row.sport,
      city: row.city,
      pricePerSession: row.price_per_session,
      experienceYears: row.experience_years,
      rating: Number(row.rating ?? 4.5),
      tagline: row.tagline ?? "",
      specialties: row.specialties ?? [],
    })) ?? [];

  return NextResponse.json(coaches);
}

// POST /api/coaches  -> create or update coach for user (by slug)
export async function POST(req: Request) {
  const body = await req.json();

  const {
    userId,
    name,
    sport,
    city,
    pricePerSession,
    experienceYears,
    rating = 4.5,
    tagline,
    specialties,
  } = body as Partial<Coach>;

  if (!name || !sport || !city || pricePerSession == null) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const slug = slugify(`${name}-${sport}`);

  const { data, error } = await supabase
    .from("coaches")
    .upsert(
      {
        user_id: userId ?? null,
        slug,
        name,
        sport,
        city,
        price_per_session: pricePerSession,
        experience_years: experienceYears ?? 0,
        rating: rating ?? 4.5,
        tagline: tagline ?? "",
        specialties: specialties ?? [],
      },
      { onConflict: "slug" } // if same slug exists, update it
    )
    .select("*")
    .single();

  if (error || !data) {
    console.error("Supabase POST /coaches error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to save coach. Check Supabase table & permissions.",
      },
      { status: 500 }
    );
  }

  const coach: Coach = {
    id: data.id,
    userId: data.user_id,
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

  return NextResponse.json(coach, { status: 201 });
}
