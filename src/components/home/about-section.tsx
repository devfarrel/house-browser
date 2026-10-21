// src/components/home/about-section.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureShowcase } from "@/components/home/feature-showcase";

interface AboutSectionProps {
  previewImages: string[];
}

export function AboutSection({ previewImages }: AboutSectionProps) {
  return (
    <>
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl font-heading text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            A house-listing app built to show how a map-driven browse experience
            works, from filters to saved favorites. Sample data, real features.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3 overflow-hidden py-2">
            {previewImages.slice(0, 5).map((src, idx) => (
              <div
                key={idx}
                className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-border shadow-sm transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-28"
              >
                <Image
                  src={src}
                  alt={`Featured listing photo ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link href="/browse">
              <Button size="lg" className="cursor-pointer gap-2 px-6">
                Browse homes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid items-end gap-6 sm:mb-12 md:grid-cols-2 md:gap-12">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                Features
              </p>
              <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
                Search homes on a <em className="italic">map</em>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              The listing grid and the map sit side by side. Hover one and the
              other responds. Filter by city, type, bedrooms and price, then
              save the homes you like to your account.
            </p>
          </div>

          <FeatureShowcase />
        </div>
      </section>
    </>
  );
}
