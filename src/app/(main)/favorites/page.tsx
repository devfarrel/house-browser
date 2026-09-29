"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/lib/use-favorites";
import { getListingById } from "@/lib/get-listing";
import { Listing } from "@/types/listing";
import { ListingGrid } from "@/components/listings/listing-grid";
import { ListingsMapClient } from "@/components/map/listings-map-client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "recent" | "price-asc" | "price-desc";

export default function FavoritesPage() {
  const { user, loading, favoriteIds } = useFavorites();
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [activeListingId, setActiveListingId] = useState<string | null>(null);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(
    null,
  );

  const favoriteListings = useMemo(() => {
    const withMeta = Array.from(favoriteIds.entries())
      .map(([id, savedAt]) => {
        const listing = getListingById(id);
        return listing ? { listing, savedAt } : null;
      })
      .filter(
        (entry): entry is { listing: Listing; savedAt: string } =>
          entry !== null,
      );

    const sorted = [...withMeta].sort((a, b) => {
      if (sortBy === "price-asc") return a.listing.price - b.listing.price;
      if (sortBy === "price-desc") return b.listing.price - a.listing.price;
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    });

    return sorted.map((entry) => entry.listing);
  }, [favoriteIds, sortBy]);

  const stats = useMemo(() => {
    if (favoriteListings.length === 0) return null;
    const prices = favoriteListings.map((l) => l.price);
    return {
      avg: Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length),
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [favoriteListings]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl p-4 sm:p-6">
        <p className="text-muted-foreground">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto flex max-w-7xl flex-col items-center gap-4 p-4 py-16 text-center sm:p-6">
        <h1 className="font-heading text-2xl font-semibold">
          Sign in to see your favorites
        </h1>
        <p className="text-muted-foreground">
          Save listings you like and find them here later.
        </p>
        <Button>
          <Link href="/login">Sign in</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">My Favorites</h1>
          <p className="text-sm text-muted-foreground">
            {favoriteListings.length}{" "}
            {favoriteListings.length === 1 ? "home" : "homes"} saved
          </p>
        </div>

        {favoriteListings.length > 0 && (
          <Select
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently added</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {stats && (
        <div className="mb-6 grid grid-cols-3 gap-3 rounded-xl border p-4 text-center sm:max-w-md">
          <div>
            <p className="font-heading text-lg font-semibold">
              ${stats.avg.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Average price</p>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold">
              ${stats.min.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Lowest</p>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold">
              ${stats.max.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Highest</p>
          </div>
        </div>
      )}

      {favoriteListings.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-muted-foreground">
            You haven&apos;t saved any listings yet.
          </p>
          <Button variant="outline">
            <Link href="/">Browse listings</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="order-2 lg:order-1 lg:col-span-3">
            <ListingGrid
              listings={favoriteListings}
              onHover={setActiveListingId}
              onSelect={setSelectedListingId}
            />
          </div>
          <div className="order-1 h-100 lg:sticky lg:top-20 lg:order-2 lg:col-span-2 lg:h-[calc(100vh-14rem)]">
            <ListingsMapClient
              listings={favoriteListings}
              activeListingId={activeListingId}
              selectedListingId={selectedListingId}
              onMarkerHover={setActiveListingId}
            />
          </div>
        </div>
      )}
    </main>
  );
}
