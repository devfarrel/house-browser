"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useFavorites } from "@/lib/use-favorites";
import { getListingById } from "@/lib/get-listing";
import type { Listing } from "@/types/listing";
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
import { Skeleton } from "@/components/ui/skeleton";
import { ListingGridSkeleton } from "@/components/listings/listing-grid-skeleton";
import { SplitView } from "@/components/split-view";
import { Metadata } from "next";

type SortOption = "recent" | "price-asc" | "price-desc";

export const metadata: Metadata = { title: "Favorites" };

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recently added" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function SplitLayout({
  children,
  map,
}: {
  children: ReactNode;
  map: ReactNode;
}) {
  return (
    <main className="flex h-[calc(100vh-4rem)]">
      <div className="w-full overflow-y-auto p-4 lg:w-1/2">{children}</div>
      <div className="hidden h-full p-4 pl-0 lg:block lg:w-1/2">
        <div className="isolate h-full w-full overflow-hidden rounded-xl border border-border">
          {map}
        </div>
      </div>
    </main>
  );
}

export function FavoritesView() {
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
      <SplitView
        map={<Skeleton className="h-full w-full rounded-none" />}
        list={
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Skeleton className="mb-2 h-8 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-9 w-44" />
            </div>
            <div className="mb-4 grid grid-cols-3 gap-3 rounded-xl border p-4 sm:max-w-md">
              <Skeleton className="mx-auto h-10 w-20" />
              <Skeleton className="mx-auto h-10 w-20" />
              <Skeleton className="mx-auto h-10 w-20" />
            </div>
            <ListingGridSkeleton />
          </div>
        }
      />
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-4 text-center">
        <h1 className="font-heading text-2xl font-semibold">
          Sign in to see your favorites
        </h1>
        <p className="text-muted-foreground">
          Save listings you like and find them here later.
        </p>
        <Link href="/login">
          <Button>Sign in</Button>
        </Link>
      </main>
    );
  }

  if (favoriteListings.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-4 text-center">
        <h1 className="font-heading text-2xl font-semibold">My Favorites</h1>
        <p className="text-muted-foreground">
          You haven&apos;t saved any listings yet.
        </p>
        <Link href="/browse">
          <Button variant="outline">Browse listings</Button>
        </Link>
      </main>
    );
  }

  return (
    <SplitLayout
      map={
        <ListingsMapClient
          listings={favoriteListings}
          activeListingId={activeListingId}
          selectedListingId={selectedListingId}
          onMarkerHover={setActiveListingId}
        />
      }
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-semibold">My Favorites</h1>
          <p className="text-sm text-muted-foreground">
            {favoriteListings.length}{" "}
            {favoriteListings.length === 1 ? "home" : "homes"} saved
          </p>
        </div>

        <Select
          items={sortOptions}
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {stats && (
        <div className="mb-4 grid grid-cols-3 gap-3 rounded-xl border p-4 text-center sm:max-w-md">
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

      <ListingGrid
        listings={favoriteListings}
        onHover={setActiveListingId}
        onSelect={setSelectedListingId}
      />
    </SplitLayout>
  );
}
