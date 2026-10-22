export type HouseType = "House" | "Apartment" | "Condo" | "Townhouse";
export type ListingStatus = "for-sale" | "pending" | "sold";

export interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  office: string;
}

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
  images: string[];
  description: string;
  state: string;
  zipCode: string;
  status: ListingStatus;
  agentId: string;
}

export interface ListingFilters {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  type?: HouseType | "all";
}
