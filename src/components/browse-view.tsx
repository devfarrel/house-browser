// src/components/browse-view.tsx
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { listings } from "@/data/listings";
import { filterListings } from "@/lib/filter-listings";
import { FilterBar } from "@/components/filters/filter-bar";
import { ListingGrid } from "@/components/listings/listing-grid";
import type { Listing, ListingFilters } from "@/types/listing";
import { Button } from "@/components/ui/button";

const ListingsMapClient = dynamic(
  () =>
    import("@/components/map/listings-map-client").then(
      (mod) => mod.ListingsMapClient,
    ),
  { ssr: false },
);

interface BrowseViewProps {
  initialFilters?: ListingFilters;
}

export function BrowseView({ initialFilters = {} }: BrowseViewProps) {
  const [filters, setFilters] = useState<ListingFilters>(initialFilters);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const filteredListings = useMemo(() => {
    return filterListings(listings, filters);
  }, [filters]);

  const handleListingSelect = (id: string) => {
    const nextSelectedListing =
      filteredListings.find((listing) => listing.id === id) ?? null;

    setSelectedListing(nextSelectedListing);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-1">
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="p-4 pb-0">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {filteredListings.length > 0 ? (
            <ListingGrid
              listings={filteredListings}
              onHover={setHoveredId}
              onSelect={handleListingSelect}
            />
          ) : (
            <div className="flex h-full min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-8 text-center">
              <h2 className="font-heading text-xl">
                No homes match your filters
              </h2>
              <p className="max-w-sm text-sm text-muted-foreground">
                Try a different city, or remove a filter to see more listings.
              </p>
              <Button variant="outline" onClick={() => setFilters({})}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="hidden h-full p-4 pl-0 lg:block lg:w-1/2">
        <div className="isolate h-full w-full overflow-hidden rounded-xl border border-border">
          <ListingsMapClient
            listings={filteredListings}
            activeListingId={hoveredId}
            selectedListingId={selectedListing?.id}
            onMarkerHover={setHoveredId}
          />
        </div>
      </div>
    </div>
  );
}
