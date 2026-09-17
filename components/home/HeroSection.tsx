"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

// --- KOMPONEN COUNTER ---
function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const runAnimation = useCallback(() => {
    let start = 0;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <motion.span onViewportEnter={runAnimation} onViewportLeave={() => setCount(0)}>
      {count.toLocaleString()}
    </motion.span>
  );
}

interface StatData {
  title: string;
  stats: string;
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsData, setStatsData] = useState<StatData[]>([]);

  const slides = [
    {
      image: "/image/hero-1.jpg",
      title: "SELAMAT DATANG",
      desc: "Selamat Datang di Situs Web Pondok Pesantren Ardaniah. Kami persembahkan kepada Anda segenap informasi tentang kurikulum, kegiatan, dan lingkungan belajar kami yang islami serta berwawasan luas. Kami berkomitmen mencetak generasi unggul.",
    },
    {
      image: "/image/hero-2.jpg",
      title: "Pesantren Prospektif",
      desc: "Mencetak santri berakhlaq mulia, berbadan sehat, kreatif, berpengetahuan luas dan berfikiran terbuka, berjiwa ikhlas, kebersahajaan, berukhuwah Islamiyah and berdikari untuk masa depan gemilang.",
    },
    {
      image: "/image/Masjid3.jpg",
      title: "Lingkungan Islami & Modern",
      desc: "Fasilitas lengkap untuk mendukung perkembangan spiritual dan intelektual santri di era modern dengan tetap menjaga nilai-nilai luhur kepesantrenan.",
    },
  ];

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from("homeStats")
        .select("title, stats")
        .eq("Home_Id", 1)
        .order("id", { ascending: true });

      if (error) throw error;
      setStatsData(data || []);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

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
    <section className="relative min-h-screen w-full overflow-hidden font-sans bg-primary flex items-center justify-center">
      {/* SLIDE BACKGROUND */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-linear"
            style={{
              backgroundImage: `url('${slide.image}')`,
              transform: currentSlide === index ? "scale(1.1)" : "scale(1)",
            }}
          />
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px]" />
        </div>
      ))}

      {/* CONTENT LAYER */}
      <div className="relative z-20 w-full pt-24 pb-16 px-6 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          {/* TEXT CONTENT */}
          <motion.div
            key={`text-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-milk mb-6 uppercase"
              style={{ textShadow: "2px 4px 12px rgba(0,0,0,0.5)" }}
            >
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl text-bone max-w-3xl mx-auto mb-8 leading-relaxed">
              {slides[currentSlide].desc}
            </p>
            <button className="px-10 py-4 bg-secondary text-milk font-bold rounded-full hover:bg-secondary/90 transition-all shadow-lg uppercase tracking-widest text-sm active:scale-95">
              Pendaftaran
            </button>
          </motion.div>

          {/* STATS SECTION */}
          <div className="mt-5 w-full max-w-5xl">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {statsData.map((stat, i) => {
                const numericValue = parseInt(stat.stats.replace(/[^0-9]/g, ""));
                const isPureNumeric = !isNaN(numericValue) && /^\d+$/.test(stat.stats);

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-milk/15 backdrop-blur-md border border-milk/20 p-4 md:p-6 rounded-2xl text-center text-milk min-w-[140px] md:min-w-[200px] flex-1 max-w-[240px]"
                  >
                    <p className="text-2xl md:text-4xl font-bold font-heading">
                      {isPureNumeric ? (
                        <Counter end={numericValue} />
                      ) : (
                        stat.stats
                      )}
                    </p>
                    <p className="text-[10px] md:text-xs font-medium text-bone uppercase tracking-widest mt-1">
                      {stat.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* NAVIGATION BUTTONS */}
      <button 
        onClick={prevSlide} 
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 bg-milk/10 hover:bg-secondary text-milk p-2 md:p-3 rounded-full transition-all border border-milk/10 active:scale-90"
      >
        <ChevronLeft size={20} className="md:w-7 md:h-7" />
      </button>

      <button 
        onClick={nextSlide} 
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 bg-milk/10 hover:bg-secondary text-milk p-2 md:p-3 rounded-full transition-all border border-milk/10 active:scale-90"
      >
        <ChevronRight size={20} className="md:w-7 md:h-7" />
      </button>

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 rounded-full h-1.5 ${
              currentSlide === index ? "w-10 bg-secondary" : "w-3 bg-milk/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}