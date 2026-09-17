"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { Menu } from "lucide-react";
import Cookies from "js-cookie";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // --- FUNGSI LOGOUT SENTRAL ---
  const handleForceLogout = useCallback((title: string, text: string, redirectUrl = "/admin") => {
    // Bersihkan semua kredensial
    Cookies.remove("admin_token");
    Cookies.remove("session_id");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("login_attempts");

    Swal.fire({
      icon: "warning",
      title: title,
      text: text,
      confirmButtonColor: "#103713",
      allowOutsideClick: false,
    }).then(() => {
      if (redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl;
      } else {
        router.replace(redirectUrl);
      }
    });
  }, [router]);

  useEffect(() => {
    if (pathname === "/admin") return;

    const mySessionToken = Cookies.get("session_id");
    const currentAdmin = localStorage.getItem("admin_user");

    if (!mySessionToken || !currentAdmin) {
      router.replace("/admin");
      return;
    }

    // --- 1. LOGIKA ANTAR TAB (BROADCAST CHANNEL) ---
    // Mencegah user membuka lebih dari 1 tab di browser yang sama
    const bc = new BroadcastChannel("admin_single_tab_check");
    
    // Kirim sinyal "Saya baru buka tab"
    bc.postMessage({ type: "NEW_TAB_OPENED", user: currentAdmin });

    bc.onmessage = (event) => {
      if (event.data.type === "NEW_TAB_OPENED" && event.data.user === currentAdmin) {
        // Jika ada tab baru dibuka dengan user yang sama, tab LAMA ini harus mengalah
        handleForceLogout(
          "Tab Duplikat",
          "Anda hanya diperbolehkan membuka satu tab admin. Gunakan tab yang terbaru.",
          "https://google.com" // Atau redirect ke manapun agar tab lama tidak bisa akses data
        );
      }
    };

    // --- 2. LOGIKA ANTAR PERANGKAT (SUPABASE REALTIME) ---
    const channel = supabase
      .channel(`active_session_${currentAdmin}`)
      .on(
        "postgres_changes",
        { 
          event: "UPDATE", 
          schema: "public", 
          table: "admin_sessions",
          filter: `admin_username=eq.${currentAdmin}` 
        },
        (payload) => {
          if (payload.new.session_token !== mySessionToken) {
            handleForceLogout(
              "Sesi Berakhir", 
              "Akun Anda baru saja login di perangkat atau browser lain."
            );
          }
        }
      )
      .subscribe();

    // --- 3. LOGIKA IDLE TIMEOUT (1 JAM) ---
    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleForceLogout(
          "Sesi Habis", 
          "Anda sudah tidak aktif selama 1 jam. Silakan login kembali demi keamanan."
        );
      }, 3600000);
    };

    const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    resetTimer();

    return () => {
      bc.close(); // Tutup koneksi antar tab saat unmount
      supabase.removeChannel(channel); 
      if (timeout) clearTimeout(timeout);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [pathname, router, handleForceLogout]);

  const isLoginPage = pathname === "/admin";
  if (isLoginPage) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f8f9fa] relative">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[40] lg:hidden transition-opacity backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed inset-y-0 left-0 z-[50] transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 lg:px-8 justify-between sticky top-0 z-10 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 lg:hidden text-[#103713] hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}