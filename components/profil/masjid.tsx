"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, ChevronLeft, ChevronRight } from "lucide-react";

// =========================================================
// DATA KONTEN PROFIL UTAMA
// =========================================================
const aboutData = {
  image: {
    src: "/image/masjid1.jpeg",
    alt: "Masjid Daarul Jamil",
    badgeTitle: "Pusat Ibadah & Dakwah Kemasyarakatan",
    badgeSubtitle: '"Memakmurkan Masjid, Menyejukkan Umat"',
  },
  sectionBadge: "Profil Masjid Daarul Jamil",
  title: "RUMAH IBADAH & PUSAT PERADABAN UMAT",
  paragraphs: [
    "Masjid Daarul Jamil hadir bukan sekadar sebagai tempat menunaikan ibadah shalat, melainkan juga sebagai pusat kegiatan keislaman, pembinaan akhlak, serta pemberdayaan sosial masyarakat. Dikelilingi suasana yang teduh dan hangat, masjid ini menjadi benteng spiritualitas dan pemersatu umat.",
    "Berlandaskan semangat Ukhuwah Islamiyah, Masjid Daarul Jamil secara aktif menyelenggarakan pengajian rutin, pembelajaran Al-Qur'an (TPA/TPQ), kajian keilmuan, hingga aksi sosial kemanusiaan. Kami berkomitmen menciptakan lingkungan ibadah yang ramah, nyaman, dan inklusif bagi seluruh lapisan jamaah.",
  ],
};

// =========================================================
// DATA LIST PROGRAM & ARAH STRATEGIS (DENGAN TAB)
// =========================================================
const aboutItems = [
  {
    id: "visi",
    number: "01",
    title: "Visi Masjid",
    list: [
      "Menjadi pusat kegiatan keagamaan, sosial, dan pendidikan yang berkualitas dan berdampak positif bagi masyarakat.",
      "Membangun komunitas masjid yang kuat, harmonis, dan berkontribusi pada kemajuan masyarakat.",
      "Menjadi simbol kebanggaan dan kebersamaan umat Islam di wilayah tersebut.",
    ],
  },
  {
    id: "misi",
    number: "02",
    title: "Misi Masjid",
    list: [
      "Meningkatkan kualitas ibadah dan kegiatan keagamaan di masjid.",
      "Mengembangkan program-program sosial dan pendidikan yang berdampak positif bagi masyarakat.",
      "Membangun dan memelihara infrastruktur masjid yang memadai dan nyaman.",
      "Meningkatkan komunikasi dan kerjasama dengan masyarakat, pemerintah, dan organisasi lain.",
      "Mengembangkan sumber daya manusia yang berkualitas dan berdedikasi untuk mengelola masjid.",
    ],
  },
  {
    id: "tujuan",
    number: "03",
    title: "Tujuan Strategis",
    list: [
      "Meningkatkan jumlah jemaah sholat dan ta'lim dan kegiatan keagamaan di masjid.",
      "Mengembangkan program-program sosial dan pendidikan yang berdampak positif bagi masyarakat.",
      "Membangun dan memelihara infrastruktur masjid yang memadai dan nyaman.",
      "Meningkatkan komunikasi dan kerjasama dengan masyarakat, pemerintah, dan organisasi lain.",
    ],
  },
  {
    id: "sasaran",
    number: "04",
    title: "Sasaran Utama",
    list: [
      "Meningkatkan jumlah jemaah shalat berjamaah dalam 3 tahun.",
      "Mengembangkan program pendidikan Al-Quran dengan baca Quran setelah sholat Maghrib untuk anak usia dini, sekolah dasar serta sekolah lanjutan.",
      "Membangun dan memelihara infrastruktur masjid yang memadai dan nyaman dalam 3 tahun.",
      "Meningkatkan komunikasi dan kerjasama dengan masyarakat, pemerintah, dan organisasi lain dalam 3 tahun.",
    ],
  },
  {
    id: "indikator",
    number: "05",
    title: "Indikator Keberhasilan",
    list: [
      "Jumlah jemaah shalat 5 waktu meningkat.",
      "Jumlah peserta program pendidikan Al-Quran meningkat.",
      "Infrastruktur masjid yang memadai dan nyaman.",
      "Komunikasi dan kerjasama dengan masyarakat, pemerintah, dan organisasi lain meningkat.",
    ],
  },
  {
    id: "rencana-aksi",
    number: "06",
    title: "Rencana Aksi",
    list: [
      "Mengembangkan program-program keagamaan dan sosial.",
      "Membangun dan memelihara infrastruktur masjid.",
      "Meningkatkan komunikasi dan kerjasama dengan masyarakat, pemerintah, dan organisasi lain.",
      "Mengembangkan sumber daya manusia yang berkualitas dan berdedikasi untuk mengelola masjid.",
    ],
  },
];

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? aboutItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === aboutItems.length - 1 ? 0 : prev + 1));
  };

  const activeContent = aboutItems[activeIndex];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 md:py-24 bg-milk overflow-hidden font-sans relative z-0"
    >
      {/* ========================================================= */}
      {/* ORNAMEN GEOMETRI ISLAMI BERGERAK (TANPA titik-titik & GLOW TENGAH) */}
      {/* ========================================================= */}

      {/* 1. ORNAMEN BINTANG 8 ISLAMI BERPUTAR - KANAN ATAS */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 w-24 h-24 z-0 pointer-events-none opacity-40 hidden sm:flex items-center justify-center"
      >
        <div className="w-20 h-20 border-2 border-primary rounded-xl absolute" />
        <div className="w-20 h-20 border-2 border-secondary rounded-xl rotate-45 absolute" />
      </motion.div>

      {/* 2. ORNAMEN LINGKARAN KONSENTRIS BERPUTAR - KIRI ATAS */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-12 -left-12 w-64 h-64 rounded-full border-2 border-primary/20 pointer-events-none flex items-center justify-center z-0"
      >
        <div className="w-48 h-48 rounded-full border border-secondary/40 border-dashed" />
        <div className="w-32 h-32 rounded-full border border-primary/30" />
      </motion.div>

      {/* 3. ORNAMEN BINTANG 8 ISLAMI FLOATING - KIRI BAWAH */}
      <motion.div 
        animate={{ rotate: 360, y: [0, -15, 0] }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-16 left-6 w-16 h-16 z-0 pointer-events-none opacity-30 flex items-center justify-center"
      >
        <div className="w-12 h-12 border-2 border-secondary rounded-lg absolute" />
        <div className="w-12 h-12 border-2 border-primary rounded-lg rotate-45 absolute" />
      </motion.div>

      {/* 4. ORNAMEN ORBIT LINGKARAN BERPUTAR - KANAN BAWAH */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border-2 border-secondary/30 pointer-events-none flex items-center justify-center z-0"
      >
        <div className="w-60 h-60 rounded-full border border-primary/30 border-dashed" />
      </motion.div>

      {/* ========================================================= */}
      {/* KONTEN UTAMA SECTION */}
      {/* ========================================================= */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 space-y-12">
        
        {/* SEGMEN UTAMA (GAMBAR & TEKS AWAL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* KOLOM KIRI: GAMBAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center items-center py-4"
          >
            <div className="relative w-full max-w-md flex justify-center items-center">
              
              {/* ORNAMEN BINTANG SEGI 4 BERPUTAR DI BELAKANG GAMBAR */}
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-[40px] sm:rounded-[60px] bg-gradient-to-tr from-primary via-secondary to-primary opacity-25 blur-sm -z-10"
              />

              <motion.div 
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] rounded-[35px] sm:rounded-[50px] border-2 border-dashed border-secondary/50 -z-10 pointer-events-none hidden sm:block"
              />
              
              {/* Wrapper Gambar Berbentuk Arch / Kubah */}
              <div className="relative h-[380px] sm:h-[420px] w-full rounded-t-[140px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white group z-10">
                <Image
                  src={aboutData.image.src}
                  alt={aboutData.image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 text-center shadow-lg"
                >
                  <p className="text-xs font-bold text-primary tracking-wide uppercase">
                    {aboutData.image.badgeTitle}
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                    {aboutData.image.badgeSubtitle}
                  </p>
                </motion.div>
              </div>

            </div>
          </motion.div>

          {/* KOLOM KANAN: KONTEN TEKS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <Compass className="w-3.5 h-3.5 text-secondary" />
              <span>{aboutData.sectionBadge}</span>
            </motion.div>

            <motion.h2 
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-extrabold text-primary font-heading leading-tight mb-6"
            >
              {aboutData.title}
            </motion.h2>

            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed"
            >
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

          </motion.div>

        </div>

        {/* ========================================================= */}
        {/* SEGMEN TAB TANPA CARD (DESKTOP TAB & MOBILE NAVIGATOR) */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="pt-10 border-t border-primary/10 relative"
        >
          {/* NAVIGASI DESKTOP (TAB BUTTONS) */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {aboutItems.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-primary text-milk shadow-lg shadow-primary/20 scale-[1.02]"
                      : "bg-primary/5 text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md ${
                      isActive ? "bg-secondary text-primary" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.number}
                  </span>
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* NAVIGASI MOBILE (PANAH KIRI - PILIHAN - PANAH KANAN) */}
          <div className="flex md:hidden items-center justify-between bg-primary/5 border border-primary/10 p-2 rounded-2xl mb-6">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-white text-primary shadow-sm active:scale-95 transition-transform"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center px-2">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                {activeContent.number} / 0{aboutItems.length}
              </span>
              <span className="text-base font-bold text-primary font-heading">
                {activeContent.title}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-white text-primary shadow-sm active:scale-95 transition-transform"
              aria-label="Selanjutnya"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* KONTEN TAB TAMPILAN BERSIH TANPA CARD (SUPPORT SWIPE MOBILE) */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) {
                handleNext();
              } else if (info.offset.x > 50) {
                handlePrev();
              }
            }}
            className="touch-pan-y pt-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* HEADLINE TITLE (DESKTOP ONLY) */}
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-2xl font-extrabold text-secondary font-heading bg-primary/5 px-4 py-1.5 rounded-2xl border border-primary/10">
                    {activeContent.number}
                  </span>
                  <h3 className="text-2xl font-bold text-primary font-heading">
                    {activeContent.title}
                  </h3>
                </div>

                {/* LIST KONTEN POLOS TANPA CARD */}
                <ul className="space-y-4">
                  {activeContent.list.map((listItem, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 text-gray-700 text-sm sm:text-base leading-relaxed"
                    >
                      <span className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2.5" />
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}