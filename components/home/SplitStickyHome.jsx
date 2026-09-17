"use client";

import SplitStickySection from "@/components/SplitStickySection";
import PublikasiSection from "./publikasiSection";
import SidebarContent from "./SideBarContent";

export default function SplitStickyHome() {
  return (
    <SplitStickySection
      left={
        <PublikasiSection />
      }
      right={
        <SidebarContent />
      }
    />
  );
}