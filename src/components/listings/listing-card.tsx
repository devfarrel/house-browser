import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/listing";
import { useFavorites } from "@/lib/use-favorites";
import { cn } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { user, favoriteIds, toggleFavorite } = useFavorites();
  const isFavorited = favoriteIds.has(listing.id);

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <Link href={`/listing/${listing.id}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>

      {user && (
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(listing.id);
          }}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
          aria-pressed={isFavorited}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow-sm backdrop-blur-sm transition hover:bg-background"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isFavorited
                ? "fill-primary text-primary"
                : "text-muted-foreground",
            )}
          />
        </button>
      )}

      <Link href={`/listing/${listing.id}`}>
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{listing.type}</Badge>
          </CardAction>
          <CardTitle>${listing.price.toLocaleString()}</CardTitle>
          <CardDescription>
            {listing.title} · {listing.city} · {listing.beds} bd /{" "}
            {listing.baths} ba
          </CardDescription>
        </CardHeader>

        <CardFooter className="pt-2">
          <Button className="w-full">View Details</Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
