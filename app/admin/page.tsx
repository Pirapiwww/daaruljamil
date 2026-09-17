"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ChevronRight, Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { loginAction } from "@/app/actions/auth";

interface LoginResponse {
  success: boolean;
  sessionToken?: string;
  message?: string;
}

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  // --- 1. LOGIKA COOLDOWN (CEK STATUS TERKUNCI) ---
  useEffect(() => {
    const checkLock = () => {
      const lockUntil = localStorage.getItem("admin_lock_until");
      if (lockUntil) {
        const now = new Date().getTime();
        const remaining = Math.ceil((Number(lockUntil) - now) / 1000);

        if (remaining > 0) {
          setIsLocked(true);
          setCountdown(remaining);
        } else {
          setIsLocked(false);
          setCountdown(0);
          localStorage.removeItem("admin_lock_until");
          localStorage.removeItem("login_attempts");
        }
      }
    };

    const timer = setInterval(checkLock, 1000);
    checkLock();
    return () => clearInterval(timer);
  }, []);

  // --- 2. LOGIKA LOGIN HANDLER ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;

    setIsLoading(true);

    try {
      // Memanggil Server Action
      const result = await loginAction(username, password) as LoginResponse;

      if (result.success) {
        // A. Bersihkan status cooldown
        localStorage.removeItem("login_attempts");
        localStorage.removeItem("admin_lock_until");

        // B. Simpan Session Token (Untuk sinkronisasi Real-time di AdminLayout)
        if (result.sessionToken) {
          Cookies.set("session_id", result.sessionToken, { expires: 1 });
        }
        
        // C. Simpan status login utama
        Cookies.set("admin_token", "active", { expires: 1 });
        
        // D. SIMPAN USERNAME (Sangat Penting untuk filter Realtime di Layout)
        // Kita simpan username yang diinput agar AdminLayout tahu harus memantau baris mana
        localStorage.setItem("admin_user", username.toLowerCase().trim());

        Swal.fire({ 
          icon: "success", 
          title: "Login Berhasil", 
          text: "Mengalihkan ke Dashboard...",
          timer: 1500, 
          showConfirmButton: false,
          background: '#fff',
          color: '#103713'
        });
        
        router.push("/admin/dashboard");
      } else {
        // LOGIKA JIKA GAGAL
        const attempts = Number(localStorage.getItem("login_attempts") || 0) + 1;
        localStorage.setItem("login_attempts", attempts.toString());

        if (attempts >= 3) {
          const lockDuration = 60000; // 1 Menit
          const lockTime = new Date().getTime() + lockDuration;
          localStorage.setItem("admin_lock_until", lockTime.toString());
          setIsLocked(true);
          setCountdown(60);
          
          Swal.fire({ 
            icon: "error", 
            title: "Akses Terkunci", 
            text: "Terlalu banyak percobaan salah. Silakan tunggu 1 menit.",
            confirmButtonColor: '#103713'
          });
        } else {
          Swal.fire({ 
            icon: "error", 
            title: "Login Gagal", 
            text: result.message || `Username atau password salah. Sisa percobaan: ${3 - attempts}`,
            confirmButtonColor: '#103713'
          });
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        icon: "error",
        title: "Sistem Error",
        text: "Terjadi kesalahan koneksi ke server.",
        confirmButtonColor: '#103713'
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden font-sans">
      
      {/* SISI KIRI: BRANDING */}
      <div className="relative w-full md:w-1/2 h-72 md:h-auto bg-[#103713] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
          alt="Admin Background"
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="relative z-10 px-8 md:px-20 text-white text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">
            Portal Admin <br className="hidden md:block" /> Ponpes Ardaniah
          </h1>
          <div className="w-16 h-1 bg-[#d4af37] mb-6 mx-auto md:mx-0"></div>
          <p className="text-white/70 text-sm md:text-lg max-w-sm font-medium">
            Sistem manajemen terpadu untuk efisiensi pengelolaan data pondok pesantren.
          </p>
        </div>
      </div>

      {/* SISI KANAN: FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-white relative">
        <div className="w-full max-w-sm relative z-10">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-[#103713] mb-3 tracking-tight">
              Log In Admin
            </h2>
            <p className="text-gray-400 text-sm font-medium">
              Silakan masukkan kredensial administrator.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* INPUT USERNAME */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Username</label>
              <input
                type="text"
                required
                disabled={isLocked}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-5 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 transition-all font-semibold text-[#103713]"
                placeholder="Masukkan username"
              />
            </div>

            {/* INPUT PASSWORD */}
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isLocked}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-5 pr-14 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 transition-all font-semibold text-[#103713]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#d4af37] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || isLocked}
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] 
                           flex items-center justify-center gap-3 transition-all duration-300 shadow-xl
                           ${isLocked 
                             ? "bg-red-50 text-red-500 border border-red-100 cursor-not-allowed" 
                             : "bg-[#103713] text-white hover:bg-[#1a4a1d] active:scale-[0.97] hover:shadow-[#103713]/20"
                           }`}
              >
                {isLocked ? (
                  <>
                    <Lock size={16} />
                    Tunggu {countdown}s
                  </>
                ) : isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Autentikasi Sekarang
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <footer className="mt-12 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              © 2026 Ponpes Ardaniah • IT Division
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}