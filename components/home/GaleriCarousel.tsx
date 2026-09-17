"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Trophy, Users, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type GaleriItem = {
  GaleriId: number;
  image_link: string;
  title: string;
  type: string;
  date: string;
};

export default function GaleriCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState<"prestasi" | "kegiatan">("prestasi");
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const fetchGaleri = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .eq("type", category)
        .order("date", { ascending: false })
        .limit(5);

      if (error) throw error;
      setItems(data || []);
      setActiveIndex(0); 
    } catch (err) {
      console.error("Error fetching galeri:", err);
    }
  }, [category]);

  useEffect(() => {
    fetchGaleri();
  }, [fetchGaleri]);

  // AutoPlay logic
  useEffect(() => {
    if (!isAutoPlay || items.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, items.length]);

  const next = () => {
    if (items.length === 0) return;
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    if (items.length === 0) return;
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const buttonLink = category === "prestasi" ? "/prestasi" : "/kegiatan";
  const centerItem = items[activeIndex];

  return (
    <section className="pt-10 pb-20 font-sans overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-center">
            <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extrabold text-primary font-heading tracking-tight"
            >
                GALERI
            </motion.h2>
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                className="h-1.5 bg-secondary mx-auto mt-2 rounded-full"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-2">
          <div className="inline-flex p-1.5 bg-bone/30 backdrop-blur-md rounded-2xl border border-bone scale-90 md:scale-100">
            <button
              onClick={() => setCategory("prestasi")}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                category === "prestasi"
                  ? "bg-primary text-milk shadow-lg shadow-primary/20"
                  : "text-primary/50 hover:text-primary"
              }`}
            >
              <Trophy size={14} /> Prestasi
            </button>
            <button
              onClick={() => setCategory("kegiatan")}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                category === "kegiatan"
                  ? "bg-primary text-milk shadow-lg shadow-primary/20"
                  : "text-primary/50 hover:text-primary"
              }`}
            >
              <Users size={14} /> Kegiatan
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-6xl mx-auto h-[440px] flex items-center justify-center">
          
          <div className="absolute w-full flex justify-between px-4 md:px-0 z-[60]">
            <button onClick={prev} className="group p-3 md:p-4 bg-milk/80 backdrop-blur-xl text-primary rounded-full shadow-2xl border border-bone hover:bg-primary hover:text-milk transition-all duration-500 transform hover:-translate-x-1">
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
            <button onClick={next} className="group p-3 md:p-4 bg-milk/80 backdrop-blur-xl text-primary rounded-full shadow-2xl border border-bone hover:bg-primary hover:text-milk transition-all duration-500 transform hover:translate-x-1">
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>

          <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
            {items.length > 0 ? (
              items.map((item, index) => {
                let diff = index - activeIndex;
                const half = Math.floor(items.length / 2);
                if (diff > half) diff -= items.length;
                if (diff < -half) diff += items.length;

                const isActive = diff === 0;

                let transform = "translateX(0) scale(0) rotateY(0)";
                let zIndex = 0;
                let opacity = "opacity-0";
                let filter = "blur(8px)";

                if (isActive) {
                  transform = "translateX(0) scale(1) rotateY(0)";
                  zIndex = 50;
                  opacity = "opacity-100";
                  filter = "blur(0)";
                } else if (Math.abs(diff) === 1) {
                  transform = `translateX(${diff * 200}px) scale(0.8) rotateY(${diff * -15}deg)`;
                  zIndex = 30;
                  opacity = "opacity-60";
                  filter = "blur(2px) grayscale(40%)";
                } else if (Math.abs(diff) === 2) {
                  transform = `translateX(${diff * 175}px) scale(0.6) rotateY(${diff * -30}deg)`;
                  zIndex = 10;
                  opacity = "opacity-20";
                }

                return (
                  <div
                    key={item.GaleriId}
                    className={`absolute transition-all duration-[800ms] cubic-bezier(0.4, 0, 0.2, 1) w-[280px] h-[380px] md:w-[320px] md:h-[420px] rounded-[2.5rem] overflow-hidden border-4 ${
                      isActive ? "border-milk shadow-[0_40px_80px_-15px_rgba(16,55,19,0.4)]" : "border-bone/50 shadow-xl"
                    } ${opacity}`}
                    style={{ transform, zIndex, filter }}
                  >
                    {item.image_link ? (
                        <img
                            src={item.image_link}
                            alt={item.title}
                            className={`w-full h-full object-cover transition-transform duration-[2000ms] ${isActive ? "scale-105" : "scale-125"}`}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-bone/20 gap-2">
                             <ImageIcon size={40} className="text-primary/20" />
                             <span className="text-[10px] font-bold text-primary/20 tracking-widest">NO IMAGE</span>
                        </div>
                    )}

                    <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "bg-gradient-to-t from-primary/80 via-transparent to-transparent" : "bg-primary/40"}`} />
                    
                    {isActive && (
                      <div className="absolute top-6 right-6 bg-secondary/90 backdrop-blur-md text-milk px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {category}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-primary/40 font-bold">Belum ada galeri {category}</p>
            )}
          </div>
        </div>

        {/* Info & CTA */}
        {items.length > 0 && (
          <div className="text-center mt-2 max-w-3xl mx-auto px-4">
            <h2 className="mt-10 mb-10 text-2xl md:text-3xl font-black text-primary font-heading leading-tight tracking-tight">
              {centerItem?.title}
            </h2>

            <Link
              href={buttonLink}
              className="group relative inline-flex items-center gap-3 px-8 py-3 bg-primary text-milk text-xs font-black rounded-2xl transition-all duration-500 hover:bg-secondary shadow-[0_20px_40px_-10px_rgba(16,55,19,0.3)] hover:shadow-secondary/30 uppercase tracking-[0.2em] active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Lihat Semua {category}</span>
              <div className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 group-hover:w-full" />
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Indicator Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlay(false); setActiveIndex(i); }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? "w-8 bg-secondary" : "w-2 bg-bone hover:bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}