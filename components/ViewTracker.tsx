"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Import ini
import { triggerViewCount } from "@/utils/viewStats";

export default function ViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // LOGIKA PENTING: Jika URL dimulai dengan /admin, jangan kirim data ke DB
    if (pathname.startsWith("/admin")) return;

    const recordVisit = async () => {
      const hasVisited = sessionStorage.getItem("has_visited_today");
      
      if (!hasVisited) {
        await triggerViewCount();
        sessionStorage.setItem("has_visited_today", "true");
      }
    };

    recordVisit();
  }, [pathname]); // Masukkan pathname di dependency array

  return null;
}