// src/app/(main)/page.tsx
import {
  getAllListings,
  getCitySummaries,
  getFeaturedListings,
} from "@/lib/get-listing";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { CityListingsSection } from "@/components/home/city-listings-section";
import { FeaturedListings } from "@/components/home/featured-listings";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Hearth | Smart Property, Secure Future",
  description:
    "Explore curated residential house listings across Austin, Denver, Seattle, Portland, and Nashville.",
};

export default function HomePage() {
  const allListings = getAllListings();
  const citySummaries = getCitySummaries();
  const featuredListings = getFeaturedListings(6);

  const previewImages = featuredListings.map((l) => l.images[0]);
  const heroCover = featuredListings[0]?.images[0] ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <HeroSection
          totalListings={allListings.length}
          totalCities={citySummaries.length}
          featuredCoverImage={heroCover}
        />
        <AboutSection previewImages={previewImages} />
        {/* Interactive city tab section */}
        <CityListingsSection listings={allListings} />
        <FeaturedListings listings={featuredListings} />
      </main>
      <Footer />
    </div>
  );
}
