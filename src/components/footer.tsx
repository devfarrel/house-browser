// src/components/footer.tsx
import Link from "next/link";
import { Home } from "lucide-react";
import { getCitySummaries } from "@/lib/get-listing";

const GITHUB_URL = "https://github.com/devfarrel/house-browser";

const exploreLinks = [
  { href: "/browse", label: "Browse homes" },
  { href: "/favorites", label: "Favorites" },
  { href: "/signup", label: "Create account" },
];

const linkClass =
  "cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.76 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export function Footer() {
  const cities = getCitySummaries();

  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 space-y-5 md:col-span-1">
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center gap-2 font-heading text-2xl font-bold text-primary transition-opacity hover:opacity-90"
            >
              <Home className="h-6 w-6" />
              <span>Hearth</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              A house-listing browser built to show map-driven search, filters
              and saved favorites. Sample data, real features.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <GithubMark className="h-4 w-4" />
              View source on GitHub
            </a>
          </div>

          {/* Explore */}
          <nav aria-label="Explore" className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Explore
            </h2>
            <ul className="space-y-2.5">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cities */}
          <nav aria-label="Cities" className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Cities
            </h2>
            <ul className="space-y-2.5">
              {cities.map((c) => (
                <li key={c.city}>
                  <Link
                    href={`/browse?city=${encodeURIComponent(c.city)}`}
                    className={linkClass}
                  >
                    {c.city}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Hearth. A portfolio project by Farrel.
          </p>
          <p>
            Built with Next.js, Tailwind CSS, Leaflet and Supabase. All
            listings, prices and photos are sample data.
          </p>
        </div>
      </div>
    </footer>
  );
}
