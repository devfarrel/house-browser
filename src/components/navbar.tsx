// src/components/navbar.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { AuthWidget } from "@/components/auth-widget";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isBrowseActive = pathname.startsWith("/browse");
  const isFavoritesActive = pathname.startsWith("/favorites");

  // Track scroll so navbar smoothly blurs when scrolling down past the hero
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isHome ? "-mb-16" : ""
      } ${
        isTransparent
          ? "border-b-transparent bg-transparent text-white"
          : "border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 text-foreground"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6 sm:px-10">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 font-heading text-xl font-bold transition-opacity hover:opacity-90 cursor-pointer ${
              isTransparent ? "text-white" : "text-primary"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Hearth</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/browse"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                isTransparent
                  ? isBrowseActive
                    ? "bg-white/20 text-white font-semibold backdrop-blur-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  : isBrowseActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              Browse
            </Link>
            <Link
              href="/favorites"
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                isTransparent
                  ? isFavoritesActive
                    ? "bg-white/20 text-white font-semibold backdrop-blur-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  : isFavoritesActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              Favorites
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div
          className={`flex items-center gap-3 ${
            isTransparent
              ? "[&_button]:text-white [&_button]:border-white/20"
              : ""
          }`}
        >
          <ThemeToggle />
          <AuthWidget />
        </div>
      </div>
    </header>
  );
}
