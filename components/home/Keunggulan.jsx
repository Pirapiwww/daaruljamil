"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Mengapa Baitul Qurro",
    desc: "Sekolah Baitul Qurro adalah satu satunya sekolah di Tangerang Selatan yang membina dan mencetak kader-kader MTQ.",
  },
  {
    title: "Pesantren Modern",
    desc: "Pondok Pesantren Baitul Qurro Berbasis Al-Quran dan Sains.",
  },
  {
    title: "Ekstrakulikuler",
    desc: "Terdapat Lebih dari 10 Ekstrakulikuler yang banyak diminati.",
  },
  {
    title: "Hafalan Al-Quran",
    desc: "Terdapat target hafalan Al-Quran yang harus diselesaikan disetiap kelasnya.",
  },
  {
    title: "Testimoni Alumni",
    desc: "Banyak diterima di PTN ternama di Indonesia dan Luar Negri.",
  },
  {
    title: "Fasilitas Pembelajaran",
    desc: "Fasilitas pembelajaran yang memadai untuk kegiatan pembelajaran maupun ekstrakulikuler.",
  },
  {
    title: "Prestasi",
    desc: "Telah banyak menjuarai perlombaan tingkat Nasional dan Internasional.",
  },
  {
    title: "Lulusan",
    desc: "Banyak lulusan yang telah melanjutkan studi ke berbagai SMA dan perguruan tinggi.",
  },
  {
    title: "Bidang Pendidikan",
    desc: "Bidang pendidikan yang terdiri dari TK IT, SMP IT, SMA IT.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 20 }, // Slide dari kanan di mobile lebih natural
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function KeunggulanSection() {
  return (
    <section className="pt-10 pb-20 bg-gray-50 overflow-hidden font-sans">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-primary font-heading tracking-tight"
          >
            KEUNGGULAN
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            className="h-1.5 bg-secondary mx-auto mt-4 rounded-full"
          />
        </div>

        {/* MENGUBAH GRID:
            - Mobile: flex overflow-x-auto (Horizontal Scroll)
            - Desktop: grid grid-cols-3
        */}
        <motion.div 
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }} 
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group min-w-[85vw] md:min-w-0 p-8 md:p-10 rounded-3xl border border-bone bg-white shadow-sm 
                        transition-all duration-500 ease-in-out snap-center
                        hover:bg-primary hover:shadow-2xl md:hover:-translate-y-2 cursor-default"
            >
              <div className="w-10 h-1 bg-secondary mb-6 group-hover:w-16 transition-all duration-500" />
              
              <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-milk font-heading transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-gray-600 group-hover:text-bone transition-colors duration-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Indikator geser (Hanya muncul di mobile) */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
            <span className="text-xs text-gray-400 animate-pulse">Geser untuk lihat lainnya →</span>
        </div>
      </div>

      {/* CSS internal untuk menyembunyikan scrollbar tapi tetap bisa di-scroll */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}