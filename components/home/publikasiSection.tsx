"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";

const NEWS_DATA = [
  {
    category: "BERITA",
    title: "Keberkahan Ramadan: Syeikh Dr. Umar Muhammed Rajab Dieb Kunjungi Pondok Pesantren MTA Karanganyar",
    author: "Afrizal Febriansyah",
    date: "2026-02-22",
    image: "/image/berita1.jpg",
  },
  {
    category: "BERITA",
    title: "MTA Karanganyar Jadi Tuan Rumah Seminar Nasional FKPM dan Munas FPAG, Dibuka Langsung oleh Wakil Menteri Agama",
    author: "Afrizal Febriansyah",
    date: "2026-01-24",
    image: "/image/berita2.jpg",
  },
  {
    category: "PENGUMUMAN",
    title: "Panduan Lengkap Pendaftaran Akun Calon Santri Baru Pondok Pesantren Darul Amanah",
    author: "Afrizal Febriansyah",
    date: "2025-12-02",
    image: "/image/pengumuman.jpg",
  },
];

export default function PublikasiSection() {
  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-2">
          <h2 className="text-xl md:text-3xl font-black text-primary tracking-tight font-heading uppercase">
            PUBLIKASI TERBARU
          </h2>
          <div className="h-1.5 w-32 bg-secondary rounded-full" />
        </div>
      </div>

      {/* GRID LAYOUT 
          Menggunakan 2 kolom dari ukuran 'sm' ke atas untuk mengakomodasi 4 kartu (3 berita + 1 tombol)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {/* BERITA ITEMS (Maksimal 3) */}
        {NEWS_DATA.slice(0, 3).map((news, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-xl shadow-sm border border-bone/50 overflow-hidden flex flex-col w-full"
          >
            <div className="relative h-52 overflow-hidden bg-gray-100">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-[10px] font-black tracking-widest text-secondary uppercase mb-2">
                {news.category}
              </span>
              <h3 className="text-base font-bold text-primary leading-snug mb-4 line-clamp-2">
                {news.title}
              </h3>
              <div className="mt-auto pt-4 border-t border-bone/30 space-y-1">
                <div className="flex items-center gap-2 text-primary/70 text-xs font-semibold">
                  <User size={12} className="text-secondary" />
                  {news.author}
                </div>
                <div className="flex items-center gap-2 text-primary/40 text-[10px]">
                  <Calendar size={12} />
                  {news.date}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* CARD NAVIGASI (Kartu ke-4) */}
        <Link href="/informasi/publikasi" className="block h-full min-h-[250px]">
          <motion.div
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="relative h-full w-full flex flex-col items-center justify-center bg-primary rounded-xl overflow-hidden shadow-lg p-8 text-center"
          >
            {/* Lingkaran Background Animasi */}
            <motion.div
              variants={{
                initial: { scale: 1, opacity: 0.2 },
                hover: { scale: 12, opacity: 0.1, transition: { duration: 0.6 } },
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-secondary rounded-full z-0"
            />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                variants={{
                  hover: { y: -5 }
                }}
                className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-5 shadow-xl"
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={28} className="text-milk" />
                </motion.div>
              </motion.div>

              <h3 className="text-xl md:text-2xl font-bold text-milk mb-2 font-heading">
                Lihat Selengkapnya
              </h3>
              
              <p className="text-bone text-xs md:text-sm opacity-80 max-w-[200px]">
                Jelajahi seluruh arsip berita dan informasi pesantren
              </p>
            </div>

            {/* Feedback Tap Mobile */}
            <div className="absolute inset-0 bg-white opacity-0 active:opacity-10 transition-opacity md:hidden" />
          </motion.div>
        </Link>
      </div>
    </div>
  );
}