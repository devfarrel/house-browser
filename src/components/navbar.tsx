"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { AuthWidget } from "@/components/auth-widget";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Browse" },
  { href: "/favorites", label: "Favorites" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Home className="h-5 w-5 text-primary" />
            <span className="font-heading text-lg">Hearth</span>
          </Link>

          <nav className="hidden items-center gap-4 sm:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors hover:text-foreground",
                    isActive
                      ? "font-medium text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <AuthWidget />
        </div>
      </div>
    </header>
  );
}
