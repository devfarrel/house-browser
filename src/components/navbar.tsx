import Link from "next/link";
import { Home } from "lucide-react";
import { AuthWidget } from "@/components/auth-widget";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Home className="h-5 w-5 text-primary" />
          <span className="text-lg">Hearth</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/favorites"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Favorites
          </Link>
          <ThemeToggle />
          <AuthWidget />
        </nav>
      </div>
    </header>
  );
}
