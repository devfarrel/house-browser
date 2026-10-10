// src/components/footer.tsx
import Link from "next/link";
import { Home } from "lucide-react";
import { getCitySummaries } from "@/lib/get-listing";

export function Footer() {
  const cities = getCitySummaries();

  return (
    <footer className="mt-12 rounded-t-[2.5rem] border-t border-border bg-card text-muted-foreground">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-2xl font-bold text-primary transition-opacity hover:opacity-90 cursor-pointer"
            >
              <Home className="h-6 w-6" />
              <span>Hearth</span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">
              A modern real estate exploration platform built with Next.js,
              Tailwind CSS, Leaflet, and Supabase.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/browse"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Browse Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Saved Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Real Service Cities */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              {cities.map((c) => (
                <li key={c.city}>
                  <Link
                    href={`/browse?city=${encodeURIComponent(c.city)}`}
                    className="hover:text-foreground transition-colors cursor-pointer"
                  >
                    {c.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Repository & Open Source */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-semibold text-foreground">
              Project Code
            </h4>
            <p className="text-xs text-muted-foreground">
              Review the complete source code and technical architecture on
              GitHub.
            </p>
            <a
              href="https://github.com/devfarrel/house-browser"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} Hearth. Built as a portfolio project by
            Farrel.
          </p>
          <p className="text-muted-foreground/80 text-center sm:text-right">
            All property listings, pricing, and imagery are mock sample data.
          </p>
        </div>
      </div>
    </footer>
  );
}
