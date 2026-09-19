"use client";

import { useEffect, useState } from "react";
import { MapPin, Clock3, CalendarDays, Sunrise, Zap, Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface JadwalDetail {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

interface APIResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    kabko: string;
    prov: string;
    jadwal: Record<string, JadwalDetail>;
  };
}

export default function PrayerScheduleBarRevised() {
  const [locationName, setLocationName] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [scheduleData, setScheduleData] = useState<
    { name: string; time: string; icon: typeof Sunrise }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper untuk format tanggal teks (contoh: "Jumat, 18 September 2026")
  const formatTanggalTeks = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    async function fetchJadwal() {
      try {
        const res = await fetch(
          "https://api.myquran.com/v3/sholat/jadwal/b73ce398c39f506af761d2277d853a92/today?tz=Asia%2FJakarta",
          {
            method: "GET",
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) throw new Error("Gagal mengambil data");

        const result: APIResponse = await res.json();

        if (result.status && result.data) {
          setLocationName(result.data.kabko);

          const jadwalKeys = Object.keys(result.data.jadwal);
          const detailJadwal = result.data.jadwal[jadwalKeys[0]];

          if (detailJadwal) {
            setDateStr(formatTanggalTeks(new Date()));
            
            setScheduleData([
              { name: "Imsak", time: detailJadwal.imsak, icon: Clock3 },
              { name: "Subuh", time: detailJadwal.subuh, icon: Sunrise },
              { name: "Dzuhur", time: detailJadwal.dzuhur, icon: Clock3 },
              { name: "Ashar", time: detailJadwal.ashar, icon: Zap },
              { name: "Maghrib", time: detailJadwal.maghrib, icon: Clock3 },
              { name: "Isya", time: detailJadwal.isya, icon: Clock3 },
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching prayer schedule:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJadwal();
  }, []);

  // Variant Kontainer Utama dengan Tipe Explicit `Variants`
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1 
      },
    },
  };

  // Variant untuk Kartu dengan Tipe Explicit `Variants`
  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  return (
    <section className="bg-milk">
      <motion.section
      className="relative bg-milk max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 z-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Container Utama */}
      <div className="bg-dark/95 backdrop-blur-sm p-4 sm:p-7 rounded-[24px] sm:rounded-[35px] border border-milk/10 shadow-2xl flex flex-col lg:flex-row items-center gap-4 sm:gap-8 overflow-hidden min-h-[160px] relative justify-center">
        
        {loading ? (
          /* TAMPILAN LOADING BERPUTAR + SKELETON */
          <div className="w-full flex flex-col items-center justify-center py-6 sm:py-8 gap-3 text-milk/80">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-secondary" />
            <p className="text-xs sm:text-sm font-medium tracking-wider uppercase text-bone/70 animate-pulse">
              Memuat Jadwal Shalat...
            </p>
          </div>
        ) : (
          /* TAMPILAN KONTEN UTAMA */
          <>
            {/* AREA LOKASI */}
            <motion.div 
              className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full lg:w-1/3 shrink-0"
              variants={cardVariants}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <CalendarDays size={14} className="text-secondary shrink-0" />
                <p className="text-[10px] sm:text-xs text-bone/70 font-light tracking-wider uppercase">
                  Jadwal Shalat Nasional
                </p>
              </div>

              <motion.div 
                className="flex items-center gap-2 mb-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin size={20} className="text-secondary shrink-0 drop-shadow" />
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-heading font-extrabold text-milk uppercase leading-tight tracking-wide drop-shadow-md">
                  <span className="font-normal text-bone/80 text-base sm:text-xl">Di </span>
                  {locationName}
                </h2>
              </motion.div>
              
              <p className="text-xs sm:text-sm text-bone/90 font-medium tracking-tight capitalize">
                {dateStr}
              </p>
              
              <div className="w-16 sm:w-20 h-0.5 bg-linear-to-r from-secondary via-lightGray to-secondary rounded-full mt-2.5 sm:mt-3.5"/>
            </motion.div>

            {/* AREA JADWAL */}
            <div className="w-full z-10 flex-grow">
              <div className="grid grid-cols-3 sm:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3.5 w-full">
                {scheduleData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className={`relative p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-between gap-1 sm:gap-2 text-center transition-all duration-300 shadow-xl border border-milk/5 hover:border-secondary/40 hover:shadow-secondary/20
                      ${index % 2 === 0 ? 'bg-primary' : 'bg-dark'}`}
                    variants={cardVariants}
                    whileHover={{ y: -6, scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {/* Overlay Gradient Halus */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-b from-milk/5 to-transparent pointer-events-none"/>

                    <div className="flex flex-col items-center gap-1">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary drop-shadow" />
                      <p className="text-[9px] sm:text-xs text-bone font-semibold tracking-wider uppercase drop-shadow">
                        {item.name}
                      </p>
                    </div>

                    <p className="text-xl sm:text-3xl lg:text-[40px] font-mono font-black text-milk tracking-tighter leading-none my-0.5 drop-shadow-lg">
                      {item.time}
                    </p>
                    
                    <div className="text-[8px] sm:text-[9px] text-bone/60 tracking-widest uppercase font-light">
                      WIB
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </motion.section>
    </section>
  );
}