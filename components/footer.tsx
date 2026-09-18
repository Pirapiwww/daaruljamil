"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MapPin, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const Footer = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((item) => item !== menuName)
        : [...prev, menuName]
    );
  };

  const isOpen = (menuName: string) => openMenus.includes(menuName);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer className="bg-primary text-milk pt-16 pb-8 font-sans relative overflow-hidden border-t-4 border-gold/40">
      {/* Background Decorative Shapes */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-gold/15 border-dashed pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full border border-gold/10 border-dashed pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Grid Container Utama */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 mb-12"
        >
          {/* Bagian 1: Logo & Profil Singkat Masjid */}
          <motion.div variants={itemVariants} className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative overflow-hidden rounded-xl bg-milk/10 p-1.5 border border-gold/40 backdrop-blur-sm shrink-0">
                <Image
                  src="/logo/logo_masjid.png"
                  alt="Logo Masjid Daarul Jamil"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-heading text-lg md:text-xl font-bold tracking-wide text-milk leading-tight">
                  Masjid Daarul Jamil
                </h2>
                <p className="font-sans text-xs text-gold font-semibold tracking-wider mt-0.5">
                  Pondok Indah Serang
                </p>
              </div>
            </div>

            <p className="text-sm text-bone/85 leading-relaxed pt-1">
              Pusat kegiatan keagamaan, peribadatan, dan pembinaan ummah yang berkomitmen untuk memakmurkan masjid serta memberikan pelayanan terbaik bagi jamaah di lingkungan Pondok Indah Serang.
            </p>

            {/* Kontak Ringkas */}
            <div className="pt-2 space-y-2 text-xs text-bone/90">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                <span>Komp. Pondok Indah Serang, Kota Serang, Banten</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-gold shrink-0" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold shrink-0" />
                <span>info@daaruljamil.or.id</span>
              </div>
            </div>
          </motion.div>

          {/* Bagian 2: Navigasi Menu 2 Kolom Seimbang */}
          <motion.div variants={itemVariants} className="md:col-span-7 space-y-6">
            <h3 className="font-heading text-xl font-bold text-milk inline-block border-b-2 border-gold pb-1 tracking-wide">
              Navigasi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-xs md:text-sm font-semibold tracking-wide uppercase items-start">
              
              {/* KOLOM KIRI NAVIGASI */}
              <div className="space-y-3">
                {/* BERANDA */}
                <div>
                  <Link href="/" className="hover:text-gold block transition-colors py-1">
                    BERANDA
                  </Link>
                </div>

                {/* PROFIL */}
                <div className="flex flex-col">
                  <div
                    className="flex items-center justify-between cursor-pointer hover:text-gold select-none transition-colors py-1"
                    onClick={() => toggleMenu("profil")}
                  >
                    <span>PROFIL</span>
                    <motion.div
                      animate={{ rotate: isOpen("profil") ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={15}
                        className={isOpen("profil") ? "text-gold" : "text-milk/70"}
                      />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen("profil") && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1.5 ml-2 pt-1 pb-2 text-xs normal-case text-bone/80 border-l border-gold/30 pl-3">
                          <li>
                            <Link href="/profil/masjid" className="hover:text-gold transition-colors block">
                              Profil Masjid
                            </Link>
                          </li>
                          <li>
                            <Link href="/profil/sejarah" className="hover:text-gold transition-colors block">
                              Sejarah
                            </Link>
                          </li>
                          <li>
                            <Link href="/profil/pengurus" className="hover:text-gold transition-colors block">
                              Pengurus
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* PROGRAM */}
                <div className="flex flex-col">
                  <div
                    className="flex items-center justify-between cursor-pointer hover:text-gold select-none transition-colors py-1"
                    onClick={() => toggleMenu("program")}
                  >
                    <span>PROGRAM</span>
                    <motion.div
                      animate={{ rotate: isOpen("program") ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={15}
                        className={isOpen("program") ? "text-gold" : "text-milk/70"}
                      />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen("program") && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1.5 ml-2 pt-1 pb-2 text-xs normal-case text-bone/80 border-l border-gold/30 pl-3">
                          <li>
                            <Link href="/program/jadwal" className="hover:text-gold transition-colors block">
                              Jadwal
                            </Link>
                          </li>
                          <li>
                            <Link href="/program/peribadatan" className="hover:text-gold transition-colors block">
                              Peribadatan
                            </Link>
                          </li>
                          <li>
                            <Link href="/program/kematian" className="hover:text-gold transition-colors block">
                              Layanan Kematian
                            </Link>
                          </li>
                          <li>
                            <Link href="/program/lainnya" className="hover:text-gold transition-colors block">
                              Program Kerja Lainnya
                            </Link>
                          </li>
                          <li>
                            <Link href="/program/saran-usulan" className="hover:text-gold transition-colors block">
                              Saran dan Usulan
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* PUBLIKASI */}
                <div className="flex flex-col">
                  <div
                    className="flex items-center justify-between cursor-pointer hover:text-gold select-none transition-colors py-1"
                    onClick={() => toggleMenu("publikasi")}
                  >
                    <span>PUBLIKASI</span>
                    <motion.div
                      animate={{ rotate: isOpen("publikasi") ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={15}
                        className={isOpen("publikasi") ? "text-gold" : "text-milk/70"}
                      />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen("publikasi") && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1.5 ml-2 pt-1 pb-2 text-xs normal-case text-bone/80 border-l border-gold/30 pl-3">
                          <li>
                            <Link href="/berita" className="hover:text-gold transition-colors block">
                              Berita
                            </Link>
                          </li>
                          <li>
                            <Link href="/artikel" className="hover:text-gold transition-colors block">
                              Artikel
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* GALERI */}
                <div className="flex flex-col">
                  <div
                    className="flex items-center justify-between cursor-pointer hover:text-gold select-none transition-colors py-1"
                    onClick={() => toggleMenu("galeri")}
                  >
                    <span>GALERI</span>
                    <motion.div
                      animate={{ rotate: isOpen("galeri") ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown
                        size={15}
                        className={isOpen("galeri") ? "text-gold" : "text-milk/70"}
                      />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen("galeri") && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-1.5 ml-2 pt-1 pb-2 text-xs normal-case text-bone/80 border-l border-gold/30 pl-3">
                          <li>
                            <Link href="/galeri/foto" className="hover:text-gold transition-colors block">
                              Foto
                            </Link>
                          </li>
                          <li>
                            <Link href="/galeri/video" className="hover:text-gold transition-colors block">
                              Video
                            </Link>
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* KOLOM KANAN NAVIGASI */}
              <div className="space-y-3">
                {/* DONASI */}
                <div>
                  <Link href="/donasi" className="hover:text-gold block transition-colors py-1">
                    DONASI
                  </Link>
                </div>

                {/* LAPORAN */}
                <div>
                  <Link href="/laporan" className="hover:text-gold block transition-colors py-1">
                    LAPORAN
                  </Link>
                </div>

                {/* KONTAK */}
                <div>
                  <Link href="/kontak" className="hover:text-gold block transition-colors py-1">
                    KONTAK
                  </Link>
                </div>

                {/* SARAN & KRITIK */}
                <div>
                  <Link href="/saran-kritik" className="hover:text-gold block transition-colors py-1">
                    SARAN & KRITIK
                  </Link>
                </div>

                {/* GALERI USTADZ */}
                <div>
                  <Link href="/galeri-ustadz" className="hover:text-gold block transition-colors py-1">
                    GALERI USTADZ
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-gold/20 pt-8 text-center text-xs tracking-wider uppercase text-bone/70 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} MASJID DAARUL JAMIL. ALL RIGHTS RESERVED.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;