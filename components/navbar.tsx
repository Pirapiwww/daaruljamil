"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Youtube,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<
    "profil" | "pendidikan" | "fasilitas" | "informasi" | "kontak" | "pendaftaran" | null
  >(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<"galeri" | null>(null);

  // Fungsi untuk menutup sidebar saat link diklik
  const closeSidebar = () => {
    setOpen(false);
    setActiveMenu(null); // Reset dropdown agar rapi saat dibuka lagi
    setActiveSubMenu(null);
  };

  const toggleMenu = (
    menu: "profil" | "pendidikan" | "fasilitas" | "informasi" | "kontak" | "pendaftaran"
  ) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const toggleSubMenu = (menu: "galeri") => {
    setActiveSubMenu(activeSubMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <header
        className={`w-full fixed top-0 left-0 z-50 
        transition-[background,box-shadow] duration-300 ${
          scrolled ? "bg-lightGray shadow-md" : "bg-transparent shadow-none"
        }`}
      >
        <div
          className={`w-full flex items-center px-6 lg:px-10 transition-colors duration-300 ${
            scrolled ? "text-black" : "text-white"
          }`}
        >
          {/* LEFT */}
          <div className="flex items-center gap-3 py-3">
            <Image
              src="/logo/logo1.png"
              alt="Logo"
              width={55}
              height={55}
            />
            <div>
              <p className="text-sm font-semibold">Pondok Pesantren Ardaniah</p>
              <p className="text-xs">Pusat - Banten</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 ml-auto">
            {/* DESKTOP MENU */}
            <nav className="hidden min-[1285px]:flex items-center text-sm font-medium">
              <Link
                href="/"
                className={`px-5 py-6 hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}
              >
                HOME
              </Link>

              <Link
                href="/profil"
                className={`px-5 py-6 hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}
              >
                PROFIL
              </Link>

              {/* Dropdown Pendidikan */}
              <div className="relative group">
                <button className={`flex items-center gap-2 px-5 py-6 transition-all duration-200 hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}>
                  PENDIDIKAN
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-lightGray text-black shadow-md min-w-[200px]">
                  <Link href="/pendidikan/kurikulum" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Kurikulum dan Tujuan</Link>
                  <Link href="/pendidikan/kelas" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Kelas</Link>
                  <Link href="/pendidikan/tahassus" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Tahassus</Link>
                </div>
              </div>

              {/* Dropdown Pendaftaran */}
              <div className="relative group">
                <button className={`flex items-center gap-2 px-5 py-6 transition-all duration-200 hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}>
                  PENDAFTARAN
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-lightGray text-black shadow-md min-w-[200px]">
                  <Link href="/pendaftaran/syarat" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Syarat Pendaftaran</Link>
                  <Link href="/pendaftaran/informasi" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Informasi Pendaftaran</Link>
                </div>
              </div>

              {/* Dropdown Fasilitas */}
              <div className="relative group">
                <button className={`flex items-center gap-2 px-5 py-6 transition-all duration-200 hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}>
                  FASILITAS
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-lightGray text-black shadow-md min-w-[200px]">
                  <Link href="/fasilitas/serang" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Pusat - Banten</Link>
                  <Link href="/fasilitas/bogor" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Cabang - Bogor</Link>
                </div>
              </div>

              {/* Dropdown Informasi */}
              <div className="relative group">
                <button className={`flex items-center gap-2 px-5 py-6 transition-all duration-200 hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}>
                  INFORMASI
                  <ChevronDown size={16} />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block bg-lightGray text-black shadow-md min-w-[200px]">
                  <Link href="/informasi/publikasi" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Publikasi</Link>
                  <Link href="/informasi/video" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Video</Link>
                  <div className="relative group/galeri">
                    <div className="flex items-center justify-between px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200 cursor-pointer">
                      <span>Galeri</span>
                      <ChevronRight size={14} />
                    </div>
                    <div className="absolute left-full top-0 hidden group-hover/galeri:block bg-lightGray shadow-md min-w-[180px]">
                      <Link href="/informasi/galeri/prestasi" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Prestasi</Link>
                      <Link href="/informasi/galeri/kegiatan" className="block px-5 py-3 hover:text-secondary hover:bg-black/5 transition-all duration-200">Kegiatan</Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/kontak"
                className={`px-5 py-6 hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}
              >
                KONTAK
              </Link>
            </nav>

            {/* DESKTOP SOCIAL */}
            <div className="hidden min-[1285px]:flex items-center gap-4 border-l pl-6">
              <a href="https://www.instagram.com/ponpes_ardaniah" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-md hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}>
                <Instagram size={22} />
              </a>
              <a href="https://www.youtube.com/@ardaniahbanten" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-md hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}>
                <Youtube size={22} />
              </a>
              <a href="https://web.facebook.com/ardaniahpusatbanten" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-md hover:bg-white/20 ${scrolled ? "hover:text-secondary" : ""}`}>
                <Facebook size={22} />
              </a>
            </div>

            {/* MOBILE TOGGLE */}
            <div className="flex items-center min-[1285px]:hidden">
              <button onClick={() => setOpen(true)} className="p-2 rounded-md transition-all duration-200 hover:bg-white/20">
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1.5px] z-[60] min-[1285px]:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-lightGray shadow-xl z-[70] flex flex-col transform transition-transform duration-300 min-[1285px]:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Tombol Close & Teks MENU sejajar */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <span className="font-bold text-black text-xl tracking-wider">MENU</span>
          <button onClick={closeSidebar} className="p-2 rounded-md text-black transition-all duration-200 hover:bg-white/50">
            <X size={32} />
          </button>
        </div>

        {/* NAV: Center Atas-Bawah (justify-center) */}
        <nav className="flex-grow flex flex-col justify-center overflow-y-auto font-medium text-black">
          <Link href="/" onClick={closeSidebar} className="p-4 border-b border-gray-300 hover:text-secondary hover:bg-white/50 transition-all">HOME</Link>
          <Link href="/profil" onClick={closeSidebar} className="p-4 border-b border-gray-300 hover:text-secondary hover:bg-white/50 transition-all">PROFIL</Link>

          {/* PENDIDIKAN MOBILE */}
          <div className="flex flex-col border-b border-gray-300">
            <button onClick={() => toggleMenu("pendidikan")} className="w-full flex items-center justify-between p-4 hover:text-secondary">
              <span>PENDIDIKAN</span>
              {activeMenu === "pendidikan" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {activeMenu === "pendidikan" && (
              <div className="flex flex-col bg-gray-50/50">
                <Link href="/pendidikan/kurikulum" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200 hover:text-secondary">Kurikulum dan Tujuan</Link>
                <Link href="/pendidikan/kelas" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200 hover:text-secondary">Kelas</Link>
                <Link href="/pendidikan/tahassus" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200 hover:text-secondary">Tahassus</Link>
              </div>
            )}
          </div>

          {/* PENDAFTARAN MOBILE */}
          <div className="flex flex-col border-b border-gray-300">
            <button onClick={() => toggleMenu("pendaftaran")} className="w-full flex items-center justify-between p-4 hover:text-secondary">
              <span>PENDAFTARAN</span>
              {activeMenu === "pendaftaran" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {activeMenu === "pendaftaran" && (
              <div className="flex flex-col bg-gray-50/50">
                <Link href="/pendaftaran/syarat" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200 hover:text-secondary">Syarat Pendaftaran</Link>
                <Link href="/pendaftaran/informasi" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200 hover:text-secondary">Informasi Pendaftaran</Link>
              </div>
            )}
          </div>

          {/* FASILITAS MOBILE */}
          <div className="flex flex-col border-b border-gray-300">
            <button onClick={() => toggleMenu("fasilitas")} className="w-full flex items-center justify-between p-4 hover:text-secondary">
              <span>FASILITAS</span>
              {activeMenu === "fasilitas" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {activeMenu === "fasilitas" && (
              <div className="flex flex-col bg-gray-50/50">
                <Link href="/fasilitas/serang" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200 hover:text-secondary">Pusat - Banten</Link>
                <Link href="/fasilitas/bogor" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200 hover:text-secondary">Cabang - Bogor</Link>
              </div>
            )}
          </div>

          {/* INFORMASI MOBILE */}
          <div className="flex flex-col border-b border-gray-300">
            <button onClick={() => toggleMenu("informasi")} className="w-full flex items-center justify-between p-4 hover:text-secondary">
              <span>INFORMASI</span>
              {activeMenu === "informasi" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {activeMenu === "informasi" && (
              <div className="flex flex-col bg-gray-50/50">
                <Link href="/informasi/publikasi" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200">Publikasi</Link>
                <Link href="/informasi/video" onClick={closeSidebar} className="pl-8 pr-4 py-3 border-t border-gray-200">Video</Link>
                <button onClick={() => toggleSubMenu("galeri")} className="w-full flex items-center justify-between pl-8 pr-4 py-3 border-t border-gray-200">
                  <span>Galeri</span>
                  {activeSubMenu === "galeri" ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {activeSubMenu === "galeri" && (
                  <div className="flex flex-col bg-gray-100/50">
                    <Link href="/informasi/galeri/prestasi" onClick={closeSidebar} className="pl-12 pr-4 py-3 border-t border-gray-200">Prestasi</Link>
                    <Link href="/informasi/galeri/kegiatan" onClick={closeSidebar} className="pl-12 pr-4 py-3 border-t border-gray-200">Kegiatan</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <Link href="/kontak" onClick={closeSidebar} className="p-4 border-b border-gray-300 hover:text-secondary transition-all">KONTAK</Link>
        </nav>

        {/* 3 ICON DI PALING BAWAH */}
        <div className="p-10 border-t border-gray-200 flex justify-center items-center gap-8 text-black">
          <a href="https://www.instagram.com/ponpes_ardaniah" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-transform hover:scale-110">
            <Instagram size={28} />
          </a>
          <a href="https://www.youtube.com/@ardaniahbanten" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-transform hover:scale-110">
            <Youtube size={28} />
          </a>
          <a href="https://web.facebook.com/ardaniahpusatbanten" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-transform hover:scale-110">
            <Facebook size={28} />
          </a>
        </div>
      </div>
    </>
  );
}