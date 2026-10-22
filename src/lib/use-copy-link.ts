"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RESET_MS = 2000;

export function useCopyLink() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (path: string) => {
    try {
      const url = new URL(path, window.location.origin).href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), RESET_MS);
    } catch {
      // The clipboard can be blocked (permissions, non-HTTPS). Don't claim success.
    }
  }, []);

  return { copied, copy };
}
