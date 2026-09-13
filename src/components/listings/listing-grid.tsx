import { Listing } from "@/types/listing";
import { ListingCard } from "./listing-card";

interface ListingGridProps {
  listings: Listing[];
  onHover?: (id: string | null) => void;
}

export function ListingGrid({ listings, onHover }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No listings match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} onHover={onHover} />
      ))}
    </div>
  );
}
