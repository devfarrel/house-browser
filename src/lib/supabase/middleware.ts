import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/supabase";

// Supabase's client retries a failed token refresh with growing waits for up to
// ~25s. That's too long to hold up every page, so stop waiting after this.
const AUTH_DEADLINE_MS = 3000;

function withDeadline<T>(promise: Promise<T>, ms: number) {
  return new Promise<T | undefined>((resolve, reject) => {
    const timer = setTimeout(() => resolve(undefined), ms);
    promise.then(resolve, reject).finally(() => clearTimeout(timer));
  });
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refreshes the session token if it's expired. Required — without this
  // call, Server Components can end up reading a stale/expired session.
  try {
    await withDeadline(supabase.auth.getUser(), AUTH_DEADLINE_MS);
  } catch {
    // Auth unreachable: serve the page as signed-out instead of failing every request.
  }

  return response;
}
