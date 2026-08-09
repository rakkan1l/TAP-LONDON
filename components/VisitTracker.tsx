"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/lib/analytics";

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) trackVisit(pathname);
  }, [pathname]);

  return null;
}
