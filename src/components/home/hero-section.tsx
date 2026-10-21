// src/components/home/hero-section.tsx
import Link from "next/link";
import Image from "next/image";
import { CountUp } from "@/components/count-up";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  totalListings: number;
  totalCities: number;
}

export function HeroSection({ totalListings, totalCities }: HeroSectionProps) {
  const stats = [
    { value: totalListings, label: "Homes" },
    { value: totalCities, label: "Cities" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-card">
      {/* Background photo with a plain gradient overlay (no CSS filters, which are costly to repaint) */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={"/hero-background.jpg"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-black/60 via-black/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2 pb-14 bg-linear-to-t from-background to-transparent sm:h-56"
        />
      </div>

      {/* Same container as the sections below, so edges line up. pt clears the transparent navbar. */}
      <div className="relative flex min-h-svh w-full flex-col justify-between px-6 pt-28 pb-10 sm:px-10 sm:pt-36 lg:pt-40">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Smart Property.
            <br />
            Secure Future.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white">
            Browse homes in {totalCities} US cities on a map, filter by price,
            bedrooms and type, and save the ones you like.
          </p>

          {/* Native GET form: works without JavaScript */}
          <form
            action="/browse"
            method="GET"
            className="mt-8 flex w-full max-w-lg items-center gap-2 rounded-lg border border-border bg-background p-1.5 shadow-lg"
          >
            <label htmlFor="hero-city" className="sr-only">
              Search by city
            </label>
            <div className="flex flex-1 items-center pl-3">
              <Search
                className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="hero-city"
                type="text"
                name="city"
                placeholder="Search a city, e.g. Austin"
                className="h-10 border-0 bg-transparent p-0 text-base text-foreground shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button type="submit" className="h-10 shrink-0 px-5 cursor-pointer">
              Search
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/browse">
              <Button size="lg" className="cursor-pointer gap-2 px-6">
                Browse all homes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer border-white/30 bg-white/10 px-6 text-white hover:bg-white/20 hover:text-white"
              >
                Create account
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <dl className="mt-12 flex w-fit self-end divide-x divide-border rounded-lg border border-border bg-background text-foreground shadow-lg sm:mt-16">
          {stats.map(({ value, label }) => (
            <div key={label} className="px-6 py-4 text-center sm:px-8">
              <dd className="font-heading text-2xl font-bold">
                <CountUp value={value} />
              </dd>
              <dt className="mt-0.5 text-sm text-muted-foreground">{label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
