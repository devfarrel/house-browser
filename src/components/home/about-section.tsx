// src/components/home/about-section.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureShowcase } from "@/components/home/feature-showcase";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { TextReveal } from "@/components/text-reveal";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  previewImages: string[];
}

export function AboutSection({ previewImages }: AboutSectionProps) {
  return (
    <>
      <section className="bg-background py-16 sm:py-24">
        <Container>
          <div className="text-center">
            <TextReveal
              text="A house-listing app built to show how a map-driven browse experience works, from filters to saved favorites. Sample data, real features."
              by="words"
              dim={0.2}
              start={0.85}
              end={0.4}
              className="mx-auto max-w-5xl mt-2 font-heading text-3xl font-medium leading-snug text-foreground sm:text-3xl lg:text-4xl"
            />

            <Reveal>
              <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
                {previewImages.slice(0, 5).map((src, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "relative aspect-4/3 overflow-hidden rounded-xl border border-border shadow-sm transition-transform duration-300 hover:scale-105",
                      idx >= 3 && "hidden sm:block",
                    )}
                  >
                    <Image
                      src={src}
                      alt={`Featured listing photo ${idx + 1}`}
                      fill
                      sizes="(min-width: 1024px) 166px, (min-width: 640px) 20vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 flex justify-center">
              <Link href="/browse">
                <Button size="xl" className="cursor-pointer gap-2 px-6">
                  Browse homes
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Reveal>
        <section className="bg-background py-16 sm:py-24">
          <Container>
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
          </Container>
        </section>
      </Reveal>
    </>
  );
}
