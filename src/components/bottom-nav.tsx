"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Search, type LucideIcon } from "lucide-react";
import { AuthWidget } from "@/components/auth-widget";
import { cn } from "@/lib/utils";

interface Tab {
  href: string;
  label: string;
  icon: LucideIcon;
}

const tabs: Tab[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/favorites", label: "Favorites", icon: Heart },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-border bg-background md:hidden"
    >
      {tabs.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
      <AuthWidget variant="tab" />
    </nav>
  );
}
