// src/components/home/city-listings-section.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Listing } from "@/types/listing";
import { Button } from "@/components/ui/button";

interface CityListingsSectionProps {
  listings: Listing[];
}

export function CityListingsSection({ listings }: CityListingsSectionProps) {
  // Extract all unique cities
  const cities = useMemo(() => {
    return Array.from(new Set(listings.map((l) => l.city))).sort();
  }, [listings]);

  // Active city selection
  const [selectedCity, setSelectedCity] = useState<string>(
    cities[0] ?? "Austin",
  );

  // Listings for the active city
  const cityListings = useMemo(() => {
    return listings.filter((l) => l.city === selectedCity);
  }, [listings, selectedCity]);

  // Bento layout distribution: Left (2 cards), Center (1 tall card), Right (remaining cards)
  const leftListings = cityListings.slice(0, 2);
  const centerListing = cityListings[2];
  const rightListings = cityListings.slice(3, 5);

  return (
    <section className="py-20 border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Homes by City
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Select a city to explore available properties and architectural
            styles.
          </p>

          {/* City Choice Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {cities.map((city) => {
              const isSelected = city === selectedCity;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`rounded-md px-5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid with Photo-Overlay Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Stacked Cards */}
          <div className="flex flex-col gap-5">
            {leftListings.map((listing) => (
              <BentoListingCard
                key={listing.id}
                listing={listing}
                height="h-60"
              />
            ))}
          </div>

          {/* Column 2: Tall Center Showcase Card */}
          {centerListing && (
            <div className="flex">
              <BentoListingCard
                listing={centerListing}
                height="h-full min-h-[300px] md:min-h-[500px]"
                isFeatured
              />
            </div>
          )}

          {/* Column 3: Stacked or Remaining Cards */}
          <div className="flex flex-col gap-5">
            {rightListings.map((listing) => (
              <BentoListingCard
                key={listing.id}
                listing={listing}
                height={
                  rightListings.length === 1
                    ? "h-full min-h-[240px] md:min-h-[500px]"
                    : "h-60"
                }
              />
            ))}
          </div>
        </div>

        {/* Real Link to Browse with Map Sync */}
        <div className="mt-12 text-center">
          <Link href={`/browse?city=${encodeURIComponent(selectedCity)}`}>
            <Button
              variant="outline"
              className="p-4 cursor-pointer text-sm gap-2"
            >
              <span>
                Explore all {cityListings.length} {selectedCity} homes on map
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Bento / Photo-Overlay Card matching the reference aesthetic
 */
function BentoListingCard({
  listing,
  height,
  isFeatured = false,
}: {
  listing: Listing;
  height: string;
  isFeatured?: boolean;
}) {
  return (
    <Link
      href={`/listing/${listing.id}`}
      className={`group relative w-full ${height} overflow-hidden rounded-2xl border border-border bg-card shadow-sm cursor-pointer block`}
    >
      {/* Full-bleed property cover image */}
      <Image
        src={listing.images[0]}
        alt={listing.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Atmospheric gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/15 transition-colors group-hover:from-black/90" />

      {/* Top Left: Property Type Tag */}
      <div className="absolute top-4 left-4">
        <span className="rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white/90 border border-white/10">
          {isFeatured ? `Featured • ${listing.type}` : listing.type}
        </span>
      </div>

      {/* Top Right: Price Badge */}
      <div className="absolute top-4 right-4">
        <span className="rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white border border-white/20">
          ${listing.price.toLocaleString()}
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1 group-hover:text-white/95 transition-colors">
            {listing.title}
          </h3>
          <p className="text-xs text-white/80 font-medium mt-1 truncate">
            {listing.address} • {listing.beds} beds • {listing.baths} baths
          </p>
        </div>

        {/* Hover Arrow Circle */}
        <div className="shrink-0 rounded-full bg-white/20 p-2 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/30">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
