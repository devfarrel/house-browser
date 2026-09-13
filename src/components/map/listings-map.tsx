"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { Listing } from "@/types/listing";

// Leaflet's default marker icons reference image paths that break under
// bundlers like Webpack/Turbopack. Rebuilding the icon from a CDN avoids
// broken/missing marker images.
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ListingsMapProps {
  listings: Listing[];
  activeListingId?: string | null;
  onMarkerHover?: (id: string | null) => void;
}

function FitBounds({ listings }: { listings: Listing[] }) {
  const map = useMap();

  useEffect(() => {
    if (listings.length === 0) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [listings, map]);

  return null;
}

export function ListingsMap({
  listings,
  activeListingId,
  onMarkerHover,
}: ListingsMapProps) {
  const center: [number, number] =
    listings.length > 0 ? [listings[0].lat, listings[0].lng] : [39.5, -98.35];

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds listings={listings} />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.lat, listing.lng]}
          icon={defaultIcon}
          opacity={activeListingId && activeListingId !== listing.id ? 0.5 : 1}
          eventHandlers={{
            mouseover: () => onMarkerHover?.(listing.id),
            mouseout: () => onMarkerHover?.(null),
          }}
        >
          <Popup>
            <p className="font-semibold">{listing.title}</p>
            <p>${listing.price.toLocaleString()}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
