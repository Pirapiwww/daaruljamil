"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ChevronUp, 
  ChevronDown, 
  Home, 
  User, 
  ChevronRight,
  Calendar,
  Newspaper,
  BookOpen,
  Image as ImageIcon,
  HeartHandshake,
  FileSpreadsheet,
  PhoneCall,
  MessageSquare,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // State Accordion Mobile terpusat (hanya 1 yang bisa terbuka)
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

  const toggleMobileMenu = (menuName: string) => {
    setOpenMobileMenu((prev) => (prev === menuName ? null : menuName));
  };

  const closeSidebar = () => {
    setOpen(false);
    setOpenMobileMenu(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Mencegah scroll pada body saat hamburger menu terbuka
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup saat komponen unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-milk/95 backdrop-blur-md shadow-md border-b border-gold/20 py-1" 
            : "bg-gradient-to-b from-dark/80 via-dark/30 to-transparent py-2"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between transition-colors duration-300 ${
            scrolled ? "text-dark" : "text-milk"
          }`}
        >
          {/* LEFT: LOGO & HEADING */}
          <Link 
            href="/" 
            className="flex items-center gap-3.5 group py-2"
          >
            <div className="relative overflow-hidden rounded-xl bg-milk/10 p-1 border border-gold/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/logo_masjid.png"
                alt="Logo Masjid Daarul Jamil"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-heading text-sm font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                Masjid Daarul Jamil
              </p>
              <p className={`text-xs ${scrolled ? "text-wood" : "text-bone"}`}>
                Pondok Indah Serang
              </p>
            </div>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-6">
            {/* DESKTOP MENU */}
            <nav className="hidden min-[1285px]:flex items-center gap-1 text-xs font-semibold tracking-wide">
              {/* BERANDA */}
              <Link
                href="/"
                className={`px-3 py-2 rounded-full transition-all duration-200 ${
                  scrolled 
                    ? "hover:bg-bone hover:text-secondary" 
                    : "hover:bg-milk/15 text-milk"
                }`}
              >
                BERANDA
              </Link>

              {/* DROPDOWN PROFIL */}
              <div className="relative group py-4">
                <button 
                  className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 ${
                    scrolled 
                      ? "hover:bg-bone hover:text-secondary" 
                      : "hover:bg-milk/15 text-milk"
                  }`}
                >
                  <span>PROFIL</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-all duration-300 ease-out group-hover:rotate-180 ${
                      scrolled ? "text-dark" : "text-milk"
                    }`} 
                  />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="w-64 p-2 bg-milk rounded-2xl shadow-xl shadow-dark/10 border border-gold/20 backdrop-blur-xl flex flex-col gap-1">
                    <Link href="/profil/masjid" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Profil Masjid</p>
                        <p className="text-[11px] text-wood/70 font-normal">Informasi & gambaran umum</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/profil/sejarah" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Sejarah</p>
                        <p className="text-[11px] text-wood/70 font-normal">Riwayat berdirinya masjid</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/profil/pengurus" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Pengurus</p>
                        <p className="text-[11px] text-wood/70 font-normal">Struktur takmir & DKM</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* DROPDOWN PROGRAM */}
              <div className="relative group py-4">
                <button 
                  className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 ${
                    scrolled 
                      ? "hover:bg-bone hover:text-secondary" 
                      : "hover:bg-milk/15 text-milk"
                  }`}
                >
                  <span>PROGRAM</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-all duration-300 ease-out group-hover:rotate-180 ${
                      scrolled ? "text-dark" : "text-milk"
                    }`} 
                  />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="w-72 p-2 bg-milk rounded-2xl shadow-xl shadow-dark/10 border border-gold/20 backdrop-blur-xl flex flex-col gap-1">
                    <Link href="/program/jadwal" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Jadwal</p>
                        <p className="text-[11px] text-wood/70 font-normal">Jadwal kajian & kegiatan</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/program/peribadatan" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Peribadatan</p>
                        <p className="text-[11px] text-wood/70 font-normal">Program kerja bidang peribadatan</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/program/kematian" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Layanan Kematian</p>
                        <p className="text-[11px] text-wood/70 font-normal">Program kerja terkait kematian</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/program/lainnya" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Program Kerja Lainnya</p>
                        <p className="text-[11px] text-wood/70 font-normal">Kegiatan sosial & kemasyarakatan</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/program/saran-usulan" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Saran dan Usulan</p>
                        <p className="text-[11px] text-wood/70 font-normal">Usulan program dari jamaah</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* DROPDOWN PUBLIKASI (BERITA & ARTIKEL) */}
              <div className="relative group py-4">
                <button 
                  className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 ${
                    scrolled 
                      ? "hover:bg-bone hover:text-secondary" 
                      : "hover:bg-milk/15 text-milk"
                  }`}
                >
                  <span>PUBLIKASI</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-all duration-300 ease-out group-hover:rotate-180 ${
                      scrolled ? "text-dark" : "text-milk"
                    }`} 
                  />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="w-60 p-2 bg-milk rounded-2xl shadow-xl shadow-dark/10 border border-gold/20 backdrop-blur-xl flex flex-col gap-1">
                    <Link href="/berita" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Berita</p>
                        <p className="text-[11px] text-wood/70 font-normal">Kabar & informasi terbaru</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/artikel" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Artikel</p>
                        <p className="text-[11px] text-wood/70 font-normal">Opini, wawasan & keislaman</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* DROPDOWN GALERI */}
              <div className="relative group py-4">
                <button 
                  className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 ${
                    scrolled 
                      ? "hover:bg-bone hover:text-secondary" 
                      : "hover:bg-milk/15 text-milk"
                  }`}
                >
                  <span>GALERI</span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-all duration-300 ease-out group-hover:rotate-180 ${
                      scrolled ? "text-dark" : "text-milk"
                    }`} 
                  />
                </button>
                <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                  <div className="w-56 p-2 bg-milk rounded-2xl shadow-xl shadow-dark/10 border border-gold/20 backdrop-blur-xl flex flex-col gap-1">
                    <Link href="/galeri/foto" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Foto</p>
                        <p className="text-[11px] text-wood/70 font-normal">Dokumentasi kegiatan</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>

                    <Link href="/galeri/video" className="group/item flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-bone transition-all duration-200">
                      <div>
                        <p className="text-xs font-bold text-dark group-hover/item:text-secondary transition-colors">Video</p>
                        <p className="text-[11px] text-wood/70 font-normal">Rekaman kajian & acara</p>
                      </div>
                      <ChevronRight size={14} className="text-gold group-hover/item:translate-x-1 group-hover/item:text-secondary transition-all" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* DONASI */}
              <Link
                href="/donasi"
                className={`px-3 py-2 rounded-full transition-all duration-200 ${
                  scrolled 
                    ? "hover:bg-bone hover:text-secondary" 
                    : "hover:bg-milk/15 text-milk"
                }`}
              >
                DONASI
              </Link>

              {/* LAPORAN */}
              <Link
                href="/laporan"
                className={`px-3 py-2 rounded-full transition-all duration-200 ${
                  scrolled 
                    ? "hover:bg-bone hover:text-secondary" 
                    : "hover:bg-milk/15 text-milk"
                }`}
              >
                LAPORAN
              </Link>

              {/* KONTAK */}
              <Link
                href="/kontak"
                className={`px-3 py-2 rounded-full transition-all duration-200 ${
                  scrolled 
                    ? "hover:bg-bone hover:text-secondary" 
                    : "hover:bg-milk/15 text-milk"
                }`}
              >
                KONTAK
              </Link>

              {/* SARAN & KRITIK */}
              <Link
                href="/saran-kritik"
                className={`px-3 py-2 rounded-full transition-all duration-200 ${
                  scrolled 
                    ? "hover:bg-bone hover:text-secondary" 
                    : "hover:bg-milk/15 text-milk"
                }`}
              >
                SARAN & KRITIK
              </Link>

              {/* GALERI USTADZ */}
              <Link
                href="/galeri-ustadz"
                className={`px-3 py-2 rounded-full transition-all duration-200 ${
                  scrolled 
                    ? "hover:bg-bone hover:text-secondary" 
                    : "hover:bg-milk/15 text-milk"
                }`}
              >
                GALERI USTADZ
              </Link>
            </nav>

            {/* MOBILE TOGGLE BUTTON */}
            <div className="flex items-center min-[1285px]:hidden">
              <button
                onClick={() => setOpen(true)}
                className={`p-2.5 rounded-2xl backdrop-blur-md transition-all duration-200 active:scale-95 ${
                  scrolled 
                    ? "bg-bone text-dark hover:bg-lightGray" 
                    : "bg-milk/20 text-milk hover:bg-milk/30"
                }`}
                aria-label="Open Menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* BACKDROP MOBILE */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[60] min-[1285px]:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR MOBILE */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-milk shadow-2xl z-[70] flex flex-col transform transition-transform duration-300 ease-in-out min-[1285px]:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Sidebar */}
        <div className="bg-primary text-milk p-5 flex items-center justify-between shadow-md border-b border-gold/30">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-[10px] font-bold tracking-wider uppercase opacity-80 text-gold">
                Menu Navigasi
              </p>
              <p className="font-heading text-sm font-bold leading-tight">
                Masjid Daarul Jamil
              </p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="p-1.5 rounded-lg bg-milk/10 text-milk hover:bg-milk/20 transition-colors"
            aria-label="Close Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigasi Mobile */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {/* BERANDA */}
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone active:bg-bone/80 transition-all text-sm group"
          >
            <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
              <Home size={18} />
            </div>
            <span>BERANDA</span>
          </Link>

          {/* ACCORDION PROFIL */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleMobileMenu("profil")}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
                  <User size={18} />
                </div>
                <span>PROFIL</span>
              </div>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${openMobileMenu === "profil" ? "rotate-180 text-secondary" : "text-gold"}`} 
              />
            </button>
            <AnimatePresence>
              {openMobileMenu === "profil" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 pr-2 space-y-1 mt-1 border-l-2 border-gold/40 ml-6"
                >
                  <Link href="/profil/masjid" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Profil Masjid</span>
                  </Link>
                  <Link href="/profil/sejarah" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Sejarah</span>
                  </Link>
                  <Link href="/profil/pengurus" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Pengurus</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACCORDION PROGRAM */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleMobileMenu("program")}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
                  <Calendar size={18} />
                </div>
                <span>PROGRAM</span>
              </div>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${openMobileMenu === "program" ? "rotate-180 text-secondary" : "text-gold"}`} 
              />
            </button>
            <AnimatePresence>
              {openMobileMenu === "program" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 pr-2 space-y-1 mt-1 border-l-2 border-gold/40 ml-6"
                >
                  <Link href="/program/jadwal" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Jadwal</span>
                  </Link>
                  <Link href="/program/peribadatan" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Program Kerja Bidang Peribadatan</span>
                  </Link>
                  <Link href="/program/kematian" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Program Kerja Terkait Kematian</span>
                  </Link>
                  <Link href="/program/lainnya" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Program Kerja Lainnya</span>
                  </Link>
                  <Link href="/program/saran-usulan" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Saran dan Usulan</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACCORDION PUBLIKASI (BERITA & ARTIKEL) */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleMobileMenu("publikasi")}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
                  <Newspaper size={18} />
                </div>
                <span>PUBLIKASI</span>
              </div>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${openMobileMenu === "publikasi" ? "rotate-180 text-secondary" : "text-gold"}`} 
              />
            </button>
            <AnimatePresence>
              {openMobileMenu === "publikasi" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 pr-2 space-y-1 mt-1 border-l-2 border-gold/40 ml-6"
                >
                  <Link href="/berita" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Berita</span>
                  </Link>
                  <Link href="/artikel" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Artikel</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACCORDION GALERI */}
          <div className="flex flex-col">
            <button
              onClick={() => toggleMobileMenu("galeri")}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
                  <ImageIcon size={18} />
                </div>
                <span>GALERI</span>
              </div>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${openMobileMenu === "galeri" ? "rotate-180 text-secondary" : "text-gold"}`} 
              />
            </button>
            <AnimatePresence>
              {openMobileMenu === "galeri" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-3 pr-2 space-y-1 mt-1 border-l-2 border-gold/40 ml-6"
                >
                  <Link href="/galeri/foto" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Foto</span>
                  </Link>
                  <Link href="/galeri/video" onClick={closeSidebar} className="flex items-center gap-3 p-2.5 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone transition-all text-xs group">
                    <span>Video</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* DONASI */}
          <Link
            href="/donasi"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone active:bg-bone/80 transition-all text-sm group"
          >
            <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
              <HeartHandshake size={18} />
            </div>
            <span>DONASI</span>
          </Link>

          {/* LAPORAN */}
          <Link
            href="/laporan"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone active:bg-bone/80 transition-all text-sm group"
          >
            <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
              <FileSpreadsheet size={18} />
            </div>
            <span>LAPORAN</span>
          </Link>

          {/* KONTAK */}
          <Link
            href="/kontak"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone active:bg-bone/80 transition-all text-sm group"
          >
            <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
              <PhoneCall size={18} />
            </div>
            <span>KONTAK</span>
          </Link>

          {/* SARAN & KRITIK */}
          <Link
            href="/saran-kritik"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone active:bg-bone/80 transition-all text-sm group"
          >
            <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
              <MessageSquare size={18} />
            </div>
            <span>SARAN & KRITIK</span>
          </Link>

          {/* GALERI USTADZ */}
          <Link
            href="/galeri-ustadz"
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-dark hover:text-secondary hover:bg-bone active:bg-bone/80 transition-all text-sm group"
          >
            <div className="p-2 rounded-lg bg-lightGray text-wood group-hover:bg-secondary group-hover:text-milk transition-colors">
              <GraduationCap size={18} />
            </div>
            <span>GALERI USTADZ</span>
          </Link>
        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-gold/20 text-center bg-lightGray/50">
          <p className="text-xs text-wood/80 font-medium" suppressHydrationWarning>
            © {new Date().getFullYear()} Masjid Daarul Jamil
          </p>
        </div>
      </div>

      {/* TOMBOL SCROLL TO TOP */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 p-3.5 bg-secondary text-milk border border-gold/50 rounded-full shadow-lg shadow-dark/20 hover:bg-secondary/90 transition-colors duration-300 group"
          >
            <ChevronUp 
              size={22} 
              className="group-hover:-translate-y-0.5 transition-transform duration-300 text-gold" 
            />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}