// src/components/home/hero-section.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  totalListings: number;
  totalCities: number;
  featuredCoverImage: string;
}

export function HeroSection({
  totalListings,
  totalCities,
  featuredCoverImage,
}: HeroSectionProps) {
  return (
    /* Full-width wrapper */
    <section className="w-full">
      {/* Edge-to-edge rounded hero card */}
      <div className="relative w-full overflow-hidden bg-card shadow-sm">
        {/* Atmospheric background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={featuredCoverImage}
            alt="Modern architectural home"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.4] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/30" />
        </div>

        {/* Hero Content: pt-24 sm:pt-28 gives clearance for the seamless navbar */}
        <div className="relative z-10 flex min-h-[calc(105vh-1.5rem)] flex-col justify-between p-6 pt-28 sm:p-12 sm:pt-36 lg:p-16 lg:pt-40">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Smart Property.
              <br />
              Secure Future.
            </h1>
            <p className="mt-4 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">
              Explore curated, high-quality residences across vibrant cities
              with interactive map synchronization and real-time filters.
            </p>

            {/* Native GET form search */}
            <form
              action="/browse"
              method="GET"
              className="mt-8 flex w-full max-w-md items-center gap-2 rounded-full bg-background/90 p-1.5 shadow-lg backdrop-blur-md border border-border"
            >
              <div className="flex flex-1 items-center pl-3">
                <Search className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
                <Input
                  type="text"
                  name="city"
                  placeholder="Search city (e.g. Austin, Seattle)..."
                  className="h-9 border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
                />
              </div>
              <Button
                type="submit"
                className="h-9 rounded-full px-5 cursor-pointer font-medium shrink-0"
              >
                Search
              </Button>
            </form>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/browse">
                <Button className="rounded-full px-6 cursor-pointer font-medium flex items-center gap-2">
                  <span>Explore Properties</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground text-xs">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="rounded-full px-6 cursor-pointer border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>

          {/* Truthful stats glass pill */}
          <div className="mt-12 flex self-start sm:self-end">
            <div className="rounded-2xl border border-white/20 bg-black/40 p-4 sm:p-5 text-white backdrop-blur-md shadow-lg">
              <div className="grid grid-cols-3 gap-6 sm:gap-8 divide-x divide-white/20 text-center">
                <div className="pr-4 sm:pr-6">
                  <div className="font-heading text-xl sm:text-2xl font-bold">
                    {totalListings}+
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">
                    Homes Available
                  </div>
                </div>
                <div className="px-4 sm:px-6">
                  <div className="font-heading text-xl sm:text-2xl font-bold">
                    {totalCities}
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">
                    Prime Cities
                  </div>
                </div>
                <div className="pl-4 sm:pl-6">
                  <div className="font-heading text-xl sm:text-2xl font-bold">
                    100%
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">
                    Verified Mock Data
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
