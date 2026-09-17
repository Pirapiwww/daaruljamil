"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Home, User, GraduationCap, 
  UserPlus, Building2, Info, PhoneCall, LogOut, X 
} from "lucide-react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase untuk keperluan logout (hapus session di DB)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const MENU_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Home Section", icon: Home, path: "/admin/home" },
  { name: "Profil Section", icon: User, path: "/admin/profil" },
  { name: "Pendidikan Section", icon: GraduationCap, path: "/admin/pendidikan" },
  { name: "Pendaftaran Section", icon: UserPlus, path: "/admin/pendaftaran" },
  { name: "Fasilitas Section", icon: Building2, path: "/admin/fasilitas" },
  { name: "Informasi Section", icon: Info, path: "/admin/informasi" },
  { name: "Kontak Section", icon: PhoneCall, path: "/admin/kontak" },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  // FUNGSI LOGOUT (Disempurnakan untuk Single Session)
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Keluar Sistem?",
      text: "Anda harus login kembali untuk mengakses panel admin.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#103713",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
      background: "#fff",
      color: "#103713"
    });

    if (result.isConfirmed) {
      try {
        const currentAdmin = localStorage.getItem("admin_user");

        // 1. Opsional: Hapus session_token di DB agar baris tersebut "kosong"
        if (currentAdmin) {
          await supabase
            .from("admin_sessions")
            .update({ session_token: null })
            .eq("admin_username", currentAdmin);
        }

        // 2. Hapus semua kredensial di Browser
        Cookies.remove("admin_token");
        Cookies.remove("session_id");
        localStorage.removeItem("admin_user");
        localStorage.removeItem("login_attempts");

        // 3. Notifikasi sukses singkat
        await Swal.fire({
          title: "Logged Out",
          text: "Sesi Anda telah aman dibersihkan.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });

        // 4. Redirect ke login
        router.replace("/admin");
      } catch (error) {
        console.error("Logout error:", error);
        // Tetap redirect walaupun update DB gagal
        router.replace("/admin");
      }
    }
  };

  return (
    <aside className="w-64 bg-lightGray border-r border-bone flex flex-col h-full font-sans relative z-30 shadow-[10px_0_30px_-5px_rgba(0,0,0,0.07)] lg:shadow-none">
      
      {/* Tombol Close - Mobile Only */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute right-4 top-6 p-2 text-primary/50 hover:text-red-600 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Logo Area */}
      <div className="p-6 flex flex-col items-start gap-4 border-b border-bone/50">
        <div className="flex items-center gap-3 py-3">
          <Image
            src="/logo/logo1.png"
            alt="Logo"
            width={55}
            height={55}
            className="object-contain"
          />
          <div className="select-none">
            <p className="text-[11px] font-bold text-primary/70 leading-none uppercase tracking-tight">
              Pondok Pesantren
            </p>
            <p className="text-lg font-black text-primary font-heading leading-tight uppercase tracking-tighter">
              Ardaniah
            </p>
            <p className="text-[10px] font-bold text-secondary tracking-[0.15em] uppercase mt-1">
              Pusat - Banten
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive 
                  ? "bg-primary text-milk shadow-lg shadow-primary/20 translate-x-1" 
                  : "text-primary/60 hover:bg-secondary/10 hover:text-secondary"
              }`}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              <span className={isActive ? "tracking-wide" : ""}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-bone bg-lightGray/50 space-y-1">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors group"
        >
          <LogOut size={18} className="group-hover:rotate-12 transition-transform" /> 
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}