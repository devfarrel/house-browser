"use client";

import Image from "next/image";
import Link from "next/link";
import { Bath, Bed, Heart, MapPin, Share2, Square } from "lucide-react";
import {
  Card,
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
  onHover?: (id: string | null) => void;
  onSelect?: (id: string) => void;
}

export function ListingCard({ listing, onHover, onSelect }: ListingCardProps) {
  const { user, favoriteIds, toggleFavorite } = useFavorites();
  const isFavorited = favoriteIds.has(listing.id);

  return (
    <Card
      className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-primary/40 select-none cursor-pointer"
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onSelect?.(listing.id)}
    >
      <div className="group relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute left-2 top-2" variant="secondary">
          {listing.type}
        </Badge>
      </div>

      {user && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(listing.id);
          }}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
          aria-pressed={isFavorited}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow-sm backdrop-blur-sm transition hover:bg-background cursor-pointer"
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

      <CardHeader className="flex-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{listing.city}</span>
        </div>
        <CardTitle className="font-heading truncate text-xl font-bold">
          ${listing.price.toLocaleString()}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center text-xs gap-2 text-muted-foreground border-y border-border/60 py-2.5">
            <p className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" />
              {listing.beds} Beds
            </p>
            <p className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {listing.baths} Baths
            </p>
            <p className="flex items-center gap-1">
              <Square className="h-3.5 w-3.5" />
              {listing.sqft.toLocaleString()} sqft
            </p>
          </div>
        </CardDescription>
      </CardHeader>

      <CardFooter className="pt-2" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="outline"
          className="mr-1 cursor-pointer hover:bg-background/50 hover:border-primary/40"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Link href={`/listing/${listing.id}`} className="block w-full">
          <Button className="w-full cursor-pointer">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
