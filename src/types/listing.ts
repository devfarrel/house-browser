export type HouseType = "House" | "Apartment" | "Condo" | "Townhouse";

export interface Listing {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: HouseType;
  lat: number;
  lng: number;
  imageUrl: string;
  description: string;
}

export interface ListingFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  type?: HouseType | "all";
}
