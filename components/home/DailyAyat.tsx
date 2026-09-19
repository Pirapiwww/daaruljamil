"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";

interface DailyAyahData {
  topic: string;
  surahName: string;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translationText: string;
}

export default function DailyAyahSection() {
  const [data, setData] = useState<DailyAyahData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDailyAyah() {
      const today = new Date().toISOString().split("T")[0];
      
      const cacheKeyData = "daily_ayah_data_v2";
      const cacheKeyDate = "daily_ayah_date_v2";

      localStorage.removeItem("daily_ayah_data");
      localStorage.removeItem("daily_ayah_date");

      const cachedData = localStorage.getItem(cacheKeyData);
      const cachedDate = localStorage.getItem(cacheKeyDate);

      if (cachedData && cachedDate === today) {
        try {
          const parsed: DailyAyahData = JSON.parse(cachedData);
          if (
            parsed.translationText &&
            parsed.translationText.split(" ").length >= 5
          ) {
            setData(parsed);
            setLoading(false);
            return;
          }
        } catch {
          localStorage.removeItem(cacheKeyData);
          localStorage.removeItem(cacheKeyDate);
        }
      }

      try {
        const res = await fetch("/api/ayat-hari-ini");
        const result = await res.json();

        if (res.ok && result.translationText) {
          setData(result);
          localStorage.setItem(cacheKeyData, JSON.stringify(result));
          localStorage.setItem(cacheKeyDate, today);
        }
      } catch (err) {
        console.error("Gagal mengambil data ayat:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDailyAyah();
  }, []);

  // Variasi animasi untuk re-trigger saat di-scroll
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-milk overflow-hidden font-sans relative">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl text-center">
          <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-emerald-900/10 rounded-full mx-auto" />
            <div className="h-8 w-64 bg-emerald-900/10 rounded-lg mx-auto" />
            <div className="h-16 w-3/4 bg-emerald-900/10 rounded-lg mx-auto my-6" />
            <div className="h-4 w-1/2 bg-emerald-900/10 rounded-lg mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
      className="py-12 sm:py-16 md:py-10 bg-milk overflow-hidden font-sans relative"
    >
      {/* ========================================================= */}
      {/* ORNAMEN PATTERN & GEOMETRI ISLAMI BERGERAK */}
      {/* ========================================================= */}

      {/* 1. GRID PATTERN ISLAMI (SAMAR) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-primary, #0f4c3a) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* 2. ORNAMEN ORBIT LINGKARAN KONSENTRIS - KANAN ATAS */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -right-12 sm:-top-16 sm:-right-16 w-56 sm:w-80 h-56 sm:h-80 rounded-full border-[1.5px] border-amber-600/20 pointer-events-none flex items-center justify-center"
      >
        <div className="w-40 sm:w-56 h-40 sm:h-56 rounded-full border border-emerald-900/15 border-dashed" />
        <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full border border-amber-600/25" />
      </motion.div>

      {/* 3. ORNAMEN BINTANG ISLAMI 8 SEGI - KIRI TENGAH */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-6 sm:-left-4 w-16 sm:w-20 h-16 sm:h-20 border-[1.5px] border-emerald-900/20 rounded-lg pointer-events-none hidden sm:flex items-center justify-center"
      >
        <div className="w-16 sm:w-20 h-16 sm:h-20 border-[1.5px] border-amber-600/30 rounded-lg rotate-45" />
      </motion.div>

      {/* 4. ORNAMEN BINTANG ISLAMI BERPUTAR - KANAN BAWAH */}
      <motion.div 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 w-60 sm:w-80 h-60 sm:h-80 rounded-full border border-emerald-900/15 pointer-events-none hidden sm:flex items-center justify-center"
      >
        <div className="w-44 sm:w-60 h-44 sm:h-60 rounded-full border border-amber-600/20 border-dashed" />
      </motion.div>

      {/* GLOW AMBIENT SOFT */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-[500px] h-48 sm:h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-emerald-900/5 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================= */}
      {/* KONTEN UTAMA SECTION */}
      {/* ========================================================= */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Badge Atas */}
          <motion.div 
            variants={fadeInUp} 
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-emerald-900/5 border border-emerald-900/15 text-emerald-800 text-[11px] sm:text-xs font-semibold tracking-widest uppercase shadow-sm"
          >
            <Sparkles size={13} className="text-amber-600 shrink-0" />
            <span>Surat Hari Ini</span>
          </motion.div>

          {/* Topik Pembahasan */}
          <motion.div variants={fadeInUp}>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-emerald-950 tracking-tight leading-snug px-2">
              "{data.topic}"
            </h2>
            <div className="w-10 sm:w-12 h-0.5 bg-amber-600/30 mx-auto mt-3 sm:mt-4 rounded-full" />
          </motion.div>

          {/* Teks Arab (Responsive Layout & Mobile Line-Height) */}
          <motion.div 
            variants={fadeInUp} 
            className="py-1 sm:py-2 px-2"
          >
            <p className="text-2xl sm:text-4xl md:text-5xl font-serif leading-[2] sm:leading-[2.2] md:leading-[2.4] text-emerald-950 dir-rtl tracking-wide font-medium">
              {data.arabicText}
            </p>
          </motion.div>

          {/* Terjemahan & Referensi Ayat */}
          <motion.div 
            variants={fadeInUp} 
            className="max-w-2xl mx-auto space-y-3 sm:space-y-4 px-2"
          >
            <div className="relative">
              <Quote size={20} className="absolute -top-2 -left-2 text-emerald-900/15 rotate-180 hidden sm:block" />
              <p className="text-xs sm:text-base md:text-lg text-stone-700 font-normal leading-relaxed italic px-2">
                "{data.translationText}"
              </p>
              <Quote size={20} className="absolute -bottom-2 -right-2 text-emerald-900/15 hidden sm:block" />
            </div>

            <p className="text-[11px] sm:text-xs md:text-sm text-amber-700 font-bold tracking-wider pt-1">
              — QS. {data.surahName} [{data.surahNumber}]: {data.ayahNumber}
            </p>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}