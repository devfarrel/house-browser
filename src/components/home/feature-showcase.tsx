"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Map, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const features: Feature[] = [
  {
    id: "map",
    icon: Map,
    title: "Map and list, in sync",
    description:
      "Hover a home to highlight its pin on the map. Click a card to zoom in on it and open its details.",
    image: "/showcase/map.png",
    alt: "Browse page with a selected map pin and its popup open next to the listing grid",
  },
  {
    id: "filters",
    icon: SlidersHorizontal,
    title: "Filters",
    description: "Narrow the list by city, property type, bedrooms and price.",
    image: "/showcase/filters.png",
    alt: "Filter bar with city, type, bedrooms and price set, and the grid narrowed to matching homes",
  },
  {
    id: "favorites",
    icon: Heart,
    title: "Saved favorites",
    description:
      "Sign in to save homes. They're stored in Supabase with row-level security, so each account only sees its own.",
    image: "/showcase/favorites.png",
    alt: "Favorites page showing saved homes with price statistics and a map",
  },
];

export function FeatureShowcase() {
  const [activeId, setActiveId] = useState(features[0].id);

  return (
    <div className="rounded-2xl border border-border bg-card p-3 sm:p-4">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <ul className="space-y-2">
          {features.map(({ id, icon: Icon, title, description }, index) => {
            const active = id === activeId;
            return (
              <li key={id}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveId(id)}
                  className={cn(
                    "w-full cursor-pointer rounded-2xl p-5 text-left transition-colors duration-300",
                    active
                      ? "bg-primary text-background shadow-md"
                      : "hover:bg-accent/50",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {active ? (
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    )}
                    <span className="font-heading text-lg font-medium">
                      {title}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed",
                      active ? "text-white" : "text-muted-foreground",
                    )}
                  >
                    {description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="rounded-2xl bg-linear-to-br from-primary/15 via-accent/40 to-secondary/20 p-4 sm:p-6">
          {features.map(({ id, image, alt }, index) => (
            <div key={id} className={id === activeId ? "block" : "hidden"}>
              <Image
                src={image}
                alt={alt}
                width={1600}
                height={1000}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading={index === 0 ? "lazy" : "eager"}
                fetchPriority="low"
                className="h-auto w-full rounded-lg border border-border shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
