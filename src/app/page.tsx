"use client";

import { useMemo, useState } from "react";
import { listings } from "@/data/listings";
import { ListingFilters } from "@/types/listing";
import { filterListings } from "@/lib/filter-listings";
import { FilterBar } from "@/components/filters/filter-bar";
import { ListingGrid } from "@/components/listings/listing-grid";
import { ListingsMapClient } from "@/components/map/listings-map-client";

export default function Home() {
  const [filters, setFilters] = useState<ListingFilters>({});
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null,
  );

  const filtered = useMemo(() => filterListings(listings, filters), [filters]);

  return (
    <main className="mx-auto p-4 sm:p-6">
      <h1 className="mb-4 text-2xl font-semibold font-heading">
        Find your next home
      </h1>

      <div className="mb-6">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <ListingGrid
            listings={filtered}
            onHover={setActiveListingId}
            onSelect={setSelectedListingId}
          />
        </div>
        <div className="order-1 h-[100] lg:sticky lg:top-20 lg:order-2 lg:h-[calc(100vh-10rem)]">
          <ListingsMapClient
            listings={filtered}
            activeListingId={activeListingId}
            selectedListingId={selectedListingId}
            onMarkerHover={setActiveListingId}
          />
        </div>
      </div>
    </main>
  );
}
