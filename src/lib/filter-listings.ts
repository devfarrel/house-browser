// src/lib/filter-listings.ts
import type { Listing, ListingFilters } from "@/types/listing";

export function filterListings(
  listings: Listing[],
  filters: ListingFilters,
): Listing[] {
  return listings.filter((listing) => {
    // City filter (case-insensitive substring match)
    if (filters.city && filters.city.trim() !== "") {
      const targetCity = filters.city.trim().toLowerCase();
      if (!listing.city.toLowerCase().includes(targetCity)) {
        return false;
      }
    }

    // Property Type filter
    if (filters.type && filters.type !== "all") {
      if (listing.type !== filters.type) {
        return false;
      }
    }

    // Min price
    if (typeof filters.minPrice === "number" && filters.minPrice > 0) {
      if (listing.price < filters.minPrice) {
        return false;
      }
    }

    // Max price
    if (typeof filters.maxPrice === "number" && filters.maxPrice > 0) {
      if (listing.price > filters.maxPrice) {
        return false;
      }
    }

    // Min beds
    if (typeof filters.minBeds === "number" && filters.minBeds > 0) {
      if (listing.beds < filters.minBeds) {
        return false;
      }
    }

    return true;
  });
}
