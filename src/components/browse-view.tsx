// src/components/browse-view.tsx
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { listings } from "@/data/listings";
import { filterListings } from "@/lib/filter-listings";
import { FilterBar } from "@/components/filters/filter-bar";
import { ListingGrid } from "@/components/listings/listing-grid";
import type { Listing, ListingFilters } from "@/types/listing";

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
    <div className="flex flex-1 flex-col h-[calc(100vh-4rem)]">
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full lg:w-1/2 overflow-y-auto p-4 sm:p-6">
          <ListingGrid
            listings={filteredListings}
            onHover={setHoveredId}
            onSelect={handleListingSelect}
          />
        </div>
        <div className="hidden lg:block lg:w-1/2 h-full border-l border-border relative">
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
