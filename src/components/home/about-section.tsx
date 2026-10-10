// src/components/home/about-section.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map, SlidersHorizontal, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AboutSectionProps {
  previewImages: string[];
}

export function AboutSection({ previewImages }: AboutSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Core belief statement matching reference text styling */}
        <p className="mx-auto max-w-3xl font-heading text-xl sm:text-2xl font-medium text-foreground leading-relaxed">
          At our core, we believe real estate is more than just property—it is a
          long-term commitment to comfort, stability, and thoughtful
          architecture.
        </p>

        {/* Thumbnail Preview Strip */}
        <div className="mt-8 flex items-center justify-center gap-3 overflow-hidden py-2">
          {previewImages.slice(0, 5).map((src, idx) => (
            <div
              key={idx}
              className="relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-border shadow-sm transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={src}
                alt={`Property architectural view ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href="/browse">
            <Button className="rounded-full px-6 cursor-pointer text-sm font-medium flex items-center gap-2">
              <span>Explore All Homes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Honest Portfolio Disclaimer & Feature Cards */}
        <div className="mt-16 text-left">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-8">
            Portfolio Project Demo • All Listings Are Sample Data
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-2xl border-border/80 bg-card/60 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Map className="h-5 w-5" />
                </div>
                <CardTitle className="font-heading text-lg">
                  Map-Synced Browsing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Interactive Leaflet map synced dynamically with listing grid
                  hover and active selection states.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card/60 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <CardTitle className="font-heading text-lg">
                  Multi-Criteria Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Refine properties on the fly by city, property type, minimum
                  bedroom count, and price range.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-border/80 bg-card/60 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <Heart className="h-5 w-5" />
                </div>
                <CardTitle className="font-heading text-lg">
                  Saved Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Save homes to your personal collection, persisted with
                  Supabase auth and database row-level security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
