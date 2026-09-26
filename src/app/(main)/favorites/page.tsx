"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/use-favorites";
import { getListingById } from "@/lib/get-listing";
import { ListingGrid } from "@/components/listings/listing-grid";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { user, loading, favoriteIds } = useFavorites();

  const favoriteListings = Array.from(favoriteIds)
    .map((id) => getListingById(id))
    .filter((listing) => listing !== undefined);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl p-4 sm:p-6">
        <p className="text-muted-foreground">Loading...</p>
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
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      <h1 className="mb-4 font-heading text-2xl font-semibold">My Favorites</h1>

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
        <ListingGrid listings={favoriteListings} />
      )}
    </main>
  );
}
