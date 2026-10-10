// src/lib/get-listing.ts
import { listings } from "@/data/listings";
import type { Listing } from "@/types/listing";

export interface CitySummary {
  city: string;
  count: number;
  coverImage: string;
}

export function getAllListings(): Listing[] {
  return listings;
}

export function getListingById(id: string): Listing | undefined {
  return listings.find((listing) => listing.id === id);
}

export function getAllListingIds(): string[] {
  return listings.map((listing) => listing.id);
}

/**
 * Derives unique cities, listing counts, and representative cover photos
 * deterministically from mock listings data.
 */
export function getCitySummaries(): CitySummary[] {
  const cityMap = new Map<string, { count: number; coverImage: string }>();

  for (const listing of listings) {
    const existing = cityMap.get(listing.city);
    if (!existing) {
      cityMap.set(listing.city, {
        count: 1,
        coverImage: listing.images[0] ?? "",
      });
    } else {
      existing.count += 1;
    }
  }

  return Array.from(cityMap.entries())
    .map(([city, data]) => ({
      city,
      count: data.count,
      coverImage: data.coverImage,
    }))
    .sort((a, b) => a.city.localeCompare(b.city));
}

/**
 * Deterministically selects featured listings:
 * 1. Takes the first listing from each distinct city for regional variety.
 * 2. Fills remaining slots up to `count` by highest price.
 * Avoids Math.random() to prevent hydration mismatches.
 */
export function getFeaturedListings(count: number = 6): Listing[] {
  const selected: Listing[] = [];
  const selectedIds = new Set<string>();
  const seenCities = new Set<string>();

  // 1. One listing per city
  for (const listing of listings) {
    if (!seenCities.has(listing.city)) {
      seenCities.add(listing.city);
      selected.push(listing);
      selectedIds.add(listing.id);
    }
  }

  // 2. Fill remaining slots by highest price
  if (selected.length < count) {
    const remaining = listings
      .filter((listing) => !selectedIds.has(listing.id))
      .sort((a, b) => b.price - a.price);

    for (const listing of remaining) {
      if (selected.length >= count) break;
      selected.push(listing);
      selectedIds.add(listing.id);
    }
  }

  return selected.slice(0, count);
}
