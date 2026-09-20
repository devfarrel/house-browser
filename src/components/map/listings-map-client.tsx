"use client";

import dynamic from "next/dynamic";
import { Listing } from "@/types/listing";

const ListingsMap = dynamic(
  () => import("./listings-map").then((mod) => mod.ListingsMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
        Loading map…
      </div>
    ),
  },
);

interface ListingsMapClientProps {
  listings: Listing[];
  activeListingId?: string | null;
  selectedListingId?: string | null;
  onMarkerHover?: (id: string | null) => void;
}

export function ListingsMapClient(props: ListingsMapClientProps) {
  return <ListingsMap {...props} />;
}
