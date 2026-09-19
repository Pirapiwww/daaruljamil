"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Compass, HeartHandshake, BookOpen } from "lucide-react";

// =========================================================
// DATA KONTEN (TEKS & GAMBAR)
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
  pillars: [
    {
      icon: BookOpen,
      title: "Kajian & Pendidikan",
      desc: "TPA, Tahsin, & Kajian Rutin",
    },
    {
      icon: HeartHandshake,
      title: "Sosial & Ziswaf",
      desc: "Santunan & Ambulans Umat",
    },
  ],
  buttonText: "Lihat Profil Masjid",
  buttonLink: "/profil/masjid",
};

export default function AboutSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section 
      className="py-20 md:py-28 bg-milk overflow-hidden font-sans relative"
    >
      {/* ========================================================= */}
      {/* ORNAMEN PATTERN & GEOMETRI ISLAMI SAMAR */}
      {/* ========================================================= */}

      {/* 1. ISLAMIC STAR/GEO PATTERN (GRID) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-primary, #0f4c3a) 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* 2. ORNAMEN ORBIT LINGKARAN KONSENTRIS - KIRI ATAS */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full border-[1.5px] border-secondary/25 pointer-events-none flex items-center justify-center"
      >
        <div className="w-56 h-56 rounded-full border border-primary/20 border-dashed" />
        <div className="w-32 h-32 rounded-full border border-secondary/30" />
      </motion.div>

      {/* 3. ORNAMEN GEOMETRI BINTANG 8 (ISLAMIC STAR) - TENGAH ATAS */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 45, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-16 border-[1.5px] border-primary/20 rounded-lg pointer-events-none flex items-center justify-center"
      >
        <div className="w-16 h-16 border-[1.5px] border-secondary/30 rounded-lg rotate-45" />
      </motion.div>

      {/* 4. GEOMETRI SEGITIGA & GARIS - KANAN ATAS */}
      <div className="absolute top-12 right-10 w-32 h-32 opacity-15 pointer-events-none flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1 bg-secondary rounded-full w-full" />
        ))}
      </div>

      {/* 5. ORNAMEN LINGKARAN BESAR - KANAN BAWAH */}
      <motion.div 
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-primary/15 pointer-events-none flex items-center justify-center"
      >
        <div className="w-72 h-72 rounded-full border border-secondary/25 border-dashed" />
      </motion.div>

      {/* GLOW AMBIENT SOFT */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================= */}
      {/* KONTEN UTAMA SECTION */}
      {/* ========================================================= */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* KOLOM KIRI: GAMBAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center items-center py-6"
          >
            <div className="relative w-full max-w-md flex justify-center items-center">
              
              {/* ORNAMEN BINTANG SEGI 4 BERPUTAR DI BELAKANG GAMBAR */}
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-[40px] sm:rounded-[60px] bg-gradient-to-tr from-primary via-secondary to-primary opacity-25 blur-sm -z-10"
              />

              <motion.div 
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-[35px] sm:rounded-[50px] border-2 border-dashed border-secondary/50 -z-10 pointer-events-none hidden sm:block"
              />
              
              {/* Wrapper Gambar Berbentuk Arch / Kubah */}
              <div className="relative h-[420px] sm:h-[480px] w-full rounded-t-[140px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white group z-10">
                <Image
                  src={aboutData.image.src}
                  alt={aboutData.image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Card Tag di Atas Gambar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
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
            viewport={{ once: false, amount: 0.3 }}
            transition={{ staggerChildren: 0.15 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* SUBTITLE BAR */}
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <Compass className="w-3.5 h-3.5 text-secondary" />
              <span>{aboutData.sectionBadge}</span>
            </motion.div>

            {/* JUDUL UTAMA */}
            <motion.h2 
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary font-heading leading-tight mb-6"
            >
              {aboutData.title}
            </motion.h2>

            {/* DESKRIPSI PARAGRAF */}
            <motion.div 
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed mb-6"
            >
              {aboutData.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>


            {/* TOMBOL BACA SELENGKAPNYA */}
            <motion.div variants={fadeInUp} transition={{ duration: 0.5 }}>
              <motion.a
                href={aboutData.buttonLink} 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative inline-flex items-center gap-3 bg-primary text-milk font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
                <span className="relative z-10">{aboutData.buttonText}</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.a>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}