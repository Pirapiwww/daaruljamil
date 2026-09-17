"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/admin/Navbar"; 

export default function NavbarWrapperAdmin() {
  const pathname = usePathname();

  // 1. Jika path tepat "/admin" (Halaman Login), jangan tampilkan apa-apa
  if (pathname === "/admin") {
    return null;
  }

  // 2. Jika path dimulai dengan "/admin/" (Halaman Dashboard, Fasilitas, dll)
  // Tampilkan Navbar Admin
  if (pathname.startsWith("/admin/")) {
    return <Navbar />;
  }

  // 3. Untuk halaman publik (bukan admin), sembunyikan Navbar Admin ini
  return null;
}