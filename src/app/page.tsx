"use client";

import { useMemo, useState } from "react";
import { listings } from "@/data/listings";
import { ListingFilters } from "@/types/listing";
import { filterListings } from "@/lib/filter-listings";
import { FilterBar } from "@/components/filters/filter-bar";
import { ListingGrid } from "@/components/listings/listing-grid";

export default function Home() {
  const [filters, setFilters] = useState<ListingFilters>({});

  const filtered = useMemo(
    () => filterListings(listings, filters),
    [filters]
  );

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">Find your next home</h1>
      <div className="mb-6">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>
      <ListingGrid listings={filtered} />
    </main>
  );
}
