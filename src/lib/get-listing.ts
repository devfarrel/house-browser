import { listings } from "@/data/listings";
import { Listing } from "@/types/listing";

export function getListingById(id: string): Listing | undefined {
  return listings.find((listing) => listing.id === id);
}

export function getAllListingByIds(): string[] {
  return listings.map((listing) => listing.id);
}
