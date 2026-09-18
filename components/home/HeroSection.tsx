"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Info, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // DATA SLIDER MASJID DAARUL JAMIL
  const slides = [
    {
      image: "/image/masjid1.jpeg",
      title: "SELAMAT DATANG DI WEBSITE MASJID DAARUL JAMIL",
      desc: "Pengunjung web dapat memperoleh informasi tentang Program Kerja DKM, Jadwal Sholat dan Laporan Keuangan juga akan ditampilkan, serta Informasi seputar prasarana Masjid bagi jamaah juga akan tersedia.",
    },
    {
      image: "/image/alquran.jpg",
      title: "PROGRAM & KEGIATAN ISLAMI",
      desc: "Menyediakan program kerja peribadatan rutin, pelayanan sosial kematian, serta berbagai kajian ilmiah bersama para ustadz.",
    },
    {
      image: "/image/donasi.jpg",
      title: "TRANSPARANSI & AKUNTABILITAS",
      desc: "Salurkan donasi terbaik Anda. Kami berkomitmen menyajikan laporan keuangan dan kegiatan yang transparan bagi seluruh jamaah.",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative w-full min-h-[100dvh] bg-primary text-milk pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden font-sans flex flex-col justify-between">
      {/* SVG CLIP PATH DEFINITION (BINGKAI ISLAMI 4 SISI) */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <clipPath id="islamicFrame" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0 C 0.65 0.08, 0.72 0.15, 0.78 0.22 C 0.85 0.28, 0.92 0.35, 1 0.5 C 0.92 0.65, 0.85 0.72, 0.78 0.78 C 0.72 0.85, 0.65 0.92, 0.5 1 C 0.35 0.92, 0.28 0.85, 0.22 0.78 C 0.15 0.72, 0.08 0.65, 0 0.5 C 0.08 0.35, 0.15 0.28, 0.22 0.22 C 0.28 0.15, 0.35 0.08, 0.5 0" />
          </clipPath>
        </defs>
      </svg>

      {/* GIF BACKGROUND HIASAN LATAR */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/image/bg.gif" // Pastikan nama file gif Anda sesuai
          alt="Masjid Animated Background"
          fill
          priority
          unoptimized // Diperlukan agar animasi GIF tidak terhenti oleh proses optimasi Next.js
          className="object-cover object-center opacity-30 filter blur-[1px]"
        />
        {/* OVERLAY GRADIENT DENGAN BACKDROP BLUR HALUS */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/95 backdrop-blur-[1px]" />
      </div>

      {/* DEKORASI PATTERN LATAR */}
      <div 
        className="absolute inset-0 opacity-10 bg-center bg-repeat pointer-events-none z-0"
        style={{ backgroundImage: "url('/image/mosque-pattern.svg')" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full my-auto">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* BINGKAI GAMBAR (PALING ATAS SAAT MOBILE - ORDER 1) */}
          <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px] flex items-center justify-center">
              
              {/* OUTLINE EMAS BINGKAI LUAR */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gold via-[#FDF0A6] to-gold p-2 sm:p-2.5 shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{ clipPath: "url(#islamicFrame)" }}
              >
                {/* BINGKAI DALAM */}
                <div 
                  className="w-full h-full bg-secondary p-1 sm:p-1.5"
                  style={{ clipPath: "url(#islamicFrame)" }}
                >
                  {/* CONTAINER SLIDER GAMBAR */}
                  <div 
                    className="relative w-full h-full bg-dark overflow-hidden"
                    style={{ clipPath: "url(#islamicFrame)" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`img-${currentSlide}`}
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={slides[currentSlide].image}
                          alt={slides[currentSlide].title}
                          fill
                          priority
                          className="object-cover object-center"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* TEKS & TOMBOL ACTION */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="w-full flex flex-col items-center lg:items-start"
              >
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-heading font-extrabold text-milk leading-[1.2] mb-4 sm:mb-6 tracking-wide uppercase drop-shadow-md">
                  {slides[currentSlide].title}
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg text-bone/90 max-w-xl mb-6 sm:mb-8 leading-relaxed font-light drop-shadow">
                  {slides[currentSlide].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full">
              <Link 
                href="/profil/profil-masjid"
                className="flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-secondary text-milk rounded-full hover:bg-secondary/90 transition-all duration-300 shadow-md group border border-gold/40 text-xs sm:text-sm font-semibold tracking-wider uppercase"
              >
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-milk text-secondary flex items-center justify-center transition-transform group-hover:scale-110">
                  <Info size={15} />
                </span>
                <span>Profil Masjid</span>
              </Link>

              <Link 
                href="/saran-kritik"
                className="flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-gold/20 text-milk rounded-full hover:bg-gold/30 transition-all duration-300 border border-gold/50 text-xs sm:text-sm font-semibold tracking-wider uppercase backdrop-blur-sm"
              >
                <MessageSquareText size={16} className="text-gold" />
                <span>Saran & Kritik</span>
              </Link>
            </div>
          </div>

        </div>

        {/* CONTROLS SLIDER */}
        <div className="flex items-center justify-between mt-10 sm:mt-12 lg:mt-16 w-full">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full h-2 ${
                  currentSlide === index ? "w-6 sm:w-8 bg-gold" : "w-2 bg-milk/30"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="p-2 sm:p-2.5 rounded-full bg-milk/10 hover:bg-secondary text-milk border border-gold/30 transition-all active:scale-90 backdrop-blur-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="p-2 sm:p-2.5 rounded-full bg-milk/10 hover:bg-secondary text-milk border border-gold/30 transition-all active:scale-90 backdrop-blur-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* ARCH CUTOUT BAWAH */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-10 sm:h-16 lg:h-20 bg-milk z-10"
        style={{
          clipPath: "ellipse(60% 100% at 50% 100%)"
        }}
      />
    </section>
  );
}