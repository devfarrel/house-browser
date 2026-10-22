import type { Listing } from "@/types/listing";

export function formatAddress(
  listing: Pick<Listing, "address" | "city" | "state" | "zipCode">,
) {
  return `${listing.address}, ${listing.city}, ${listing.state} ${listing.zipCode}`;
}
