import { Listing, ListingFilters } from "@/types/listing";

export function filterListings(
  listings: Listing[],
  filters: ListingFilters
): Listing[] {
  return listings.filter((listing) => {
    if (
      filters.city &&
      !listing.city.toLowerCase().includes(filters.city.toLowerCase())
    ) {
      return false;
    }
    if (filters.type && filters.type !== "all" && listing.type !== filters.type) {
      return false;
    }
    if (filters.minBeds && listing.beds < filters.minBeds) {
      return false;
    }
    if (filters.minPrice && listing.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && listing.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}
