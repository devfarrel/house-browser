"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Ellipsis } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
      className="relative mx-auto flex h-full w-full max-w-sm flex-col pt-0"
      onMouseEnter={() => onHover?.(listing.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onSelect?.(listing.id)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
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

      <CardHeader className="flex-1">
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  onClick={(e) => e.stopPropagation()}
                  aria-label="More options"
                >
                  <Ellipsis className="h-4 w-4" />
                </button>
              }
            />
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              {user && (
                <DropdownMenuItem onClick={() => toggleFavorite(listing.id)}>
                  <Heart
                    className={cn(
                      "mr-2 h-4 w-4",
                      isFavorited ? "fill-primary text-primary" : "",
                    )}
                  />
                  {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                render={
                  <Link href={`/listing/${listing.id}`}>View Details</Link>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
        <CardTitle className="font-heading truncate text-xl">
          ${listing.price.toLocaleString()}
        </CardTitle>
        <CardDescription>
          {listing.title} · {listing.city} · {listing.beds} bd / {listing.baths}{" "}
          ba
        </CardDescription>
      </CardHeader>

      <CardFooter className="pt-2" onClick={(e) => e.stopPropagation()}>
        <Link href={`/listing/${listing.id}`} className="block w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
