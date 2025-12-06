export type Coach = {
  id?: string;
  userId?: string | null; // Supabase auth user id
  slug: string;
  name: string;
  sport: string;
  city: string;
  pricePerSession: number;
  experienceYears: number;
  rating: number;
  tagline: string;
  specialties: string[];
};


export const coaches: Coach[] = [
  {
    slug: "arjun-mehta-cricket",
    name: "Arjun Mehta",
    sport: "Cricket",
    city: "Mumbai",
    pricePerSession: 1200,
    experienceYears: 8,
    rating: 4.8,
    tagline: "Ex-Ranji player helping batters go next level.",
    specialties: ["Batting", "Match temperament", "T20 mindset"],
  },
  {
    slug: "riya-kulkarni-football",
    name: "Riya Kulkarni",
    sport: "Football",
    city: "Pune",
    pricePerSession: 900,
    experienceYears: 5,
    rating: 4.6,
    tagline: "Positioning, passing and game IQ for modern football.",
    specialties: ["Midfield", "Passing drills", "Game awareness"],
  },
  {
    slug: "akash-singh-strength",
    name: "Akash Singh",
    sport: "Strength & Conditioning",
    city: "Bengaluru",
    pricePerSession: 1500,
    experienceYears: 10,
    rating: 4.9,
    tagline: "Strength & injury-proofing for serious athletes.",
    specialties: ["Strength", "Mobility", "Injury prevention"],
  },
];
