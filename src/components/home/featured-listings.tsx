// src/components/home/featured-listings.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Bed, Bath, Square } from "lucide-react";
import type { Listing } from "@/types/listing";
import { Button } from "@/components/ui/button";

interface FeaturedListingsProps {
  listings: Listing[];
}

export function FeaturedListings({ listings }: FeaturedListingsProps) {
  const router = useRouter();

  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Newest Deals for Your Needs
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Explore high-demand, newly launched listings carefully selected to
            match different lifestyles and budgets.
          </p>
        </div>

        {/* 3-Column Listing Grid matching the reference cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div
              key={listing.id}
              onClick={() => router.push(`/listing/${listing.id}`)}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40 cursor-pointer"
            >
              {/* Image Frame with Floating Type Badge */}
              <div className="relative h-56 w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-md shadow-sm border border-border/50">
                    {listing.type}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="pt-4 px-1 pb-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>{listing.city}</span>
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {listing.title}
                </h3>

                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground border-y border-border/60 py-2.5">
                  <span className="flex items-center gap-1">
                    <Bed className="h-3.5 w-3.5" />
                    {listing.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-3.5 w-3.5" />
                    {listing.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-3.5 w-3.5" />
                    {listing.sqft.toLocaleString()} sqft
                  </span>
                </div>

                {/* Bottom Bar: Price & Pill CTA with Arrow */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="font-heading text-xl font-bold text-foreground">
                      ${listing.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      /Total
                    </span>
                  </div>

                  <Button
                    size="sm"
                    className="rounded-full px-4 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Home</span>
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link href="/browse">
            <Button
              variant="outline"
              className="rounded-full px-6 cursor-pointer text-sm"
            >
              Explore All Listings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
