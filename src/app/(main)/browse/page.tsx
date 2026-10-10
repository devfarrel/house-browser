// src/app/(main)/browse/page.tsx
import { BrowseView } from "@/components/browse-view";
import type { HouseType, ListingFilters } from "@/types/listing";

export const metadata = {
  title: "Browse Homes | Hearth",
  description:
    "Browse houses, apartments, condos, and townhouses with an interactive map.",
};

const VALID_HOUSE_TYPES: readonly HouseType[] = [
  "House",
  "Apartment",
  "Condo",
  "Townhouse",
] as const;

interface BrowsePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowsePage({ searchParams }: BrowsePageProps) {
  const rawParams = await searchParams;
  const initialFilters: ListingFilters = {};

  // Validate city
  if (typeof rawParams.city === "string" && rawParams.city.trim().length > 0) {
    initialFilters.city = rawParams.city.trim();
  }

  // Validate property type
  if (typeof rawParams.type === "string") {
    if (VALID_HOUSE_TYPES.includes(rawParams.type as HouseType)) {
      initialFilters.type = rawParams.type as HouseType;
    } else if (rawParams.type === "all") {
      initialFilters.type = "all";
    }
  }

  // Validate minPrice
  if (typeof rawParams.minPrice === "string") {
    const val = parseInt(rawParams.minPrice, 10);
    if (!Number.isNaN(val) && val >= 0) {
      initialFilters.minPrice = val;
    }
  }

  // Validate maxPrice
  if (typeof rawParams.maxPrice === "string") {
    const val = parseInt(rawParams.maxPrice, 10);
    if (!Number.isNaN(val) && val >= 0) {
      initialFilters.maxPrice = val;
    }
  }

  // Validate minBeds
  if (typeof rawParams.minBeds === "string") {
    const val = parseInt(rawParams.minBeds, 10);
    if (!Number.isNaN(val) && val >= 0) {
      initialFilters.minBeds = val;
    }
  }

  return <BrowseView initialFilters={initialFilters} />;
}
