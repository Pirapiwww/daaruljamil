"use client";

import { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Camera, Trophy, ImageIcon } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type GaleriItem = {
  GaleriId: number;
  title: string;
  image_link: string;
  date: string;
  type: string;
};

interface GaleriSectionProps {
  type: "kegiatan" | "prestasi";
}

export default function GaleriSection({ type }: GaleriSectionProps) {
  const [items, setItems] = useState<GaleriItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchGaleri = async () => {
      try {
        const { data, error } = await supabase
          .from("galeri")
          .select("*")
          .eq("type", type)
          .order("date", { ascending: false });

        if (error) throw error;
        setItems(data || []);
        setCurrentPage(1); // Reset ke halaman 1 jika type berubah
      } catch (err) {
        console.error("Error fetching galeri:", err);
      }
    };

    fetchGaleri();
  }, [type]);

  // Logika Pagination
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="w-full max-w-7xl mx-auto py-10 md:py-16 px-4 lg:px-6 font-sans">
      {/* HEADER */}
    <div className="flex flex-row items-center justify-between mb-8 md:mb-12 gap-4 border-b border-gray-100 pb-8">
    {/* SISI KIRI: JUDUL */}
    <div className="space-y-1 md:space-y-2">
        <div className="flex items-center gap-2 md:gap-3 text-[#628B35]">
        {type === "kegiatan" ? <Camera size={16} className="md:size-5" /> : <Trophy size={16} className="md:size-5" />}
        <span className="text-[9px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap">
            {type === "kegiatan" ? "Documentation" : "Achievement"}
        </span>
        </div>
        <h2 className="text-xl md:text-5xl font-black text-[#103713] tracking-tighter uppercase leading-none">
        GALERI {type}
        </h2>
        <div className="h-1 md:h-2 w-12 md:w-20 bg-[#628B35]" />
    </div>

    {/* SISI KANAN: DESKRIPSI (Tengah vertikal terhadap judul) */}
    <div className="flex items-center">
        <p className="text-gray-500 text-[9px] md:text-sm max-w-[120px] md:max-w-xs text-right font-medium italic leading-tight md:leading-relaxed border-l-2 border-gray-50 pl-3 md:border-l-0 md:pl-0">
        {type === "kegiatan" 
            ? "Kumpulan dokumentasi momen berharga santri."
            : "Daftar pencapaian santri dan lembaga."}
        </p>
    </div>
    </div>  
    
      {/* GRID GALERI - Menjadi 2 Kolom di Mobile */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              key={item.GaleriId}
              className="group bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {item.image_link ? (
                  <img
                    src={item.image_link}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                    <ImageIcon size={32} className="md:size-12" />
                    <span className="text-[8px] md:text-[10px] font-bold mt-2 uppercase tracking-tighter">NO IMAGE</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-[#103713]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-3 md:p-6 flex flex-col flex-grow">
                <h3 className="text-[11px] md:text-lg font-bold text-[#103713] leading-tight group-hover:text-[#628B35] transition-colors line-clamp-2 mb-2 md:mb-4">
                  {item.title}
                </h3>
                
                <div className="mt-auto pt-2 md:pt-4 border-t border-gray-50 flex items-center gap-1.5 md:gap-2 text-[#103713]/40">
                  <Calendar size={12} className="text-[#628B35] md:size-3.5" />
                  <span className="text-[9px] md:text-[11px] font-bold tracking-wider uppercase truncate">
                    {item.date ? new Date(item.date).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short', // 'short' agar hemat tempat di mobile (Jan, Feb, dst)
                      year: 'numeric'
                    }) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-300 font-bold uppercase tracking-widest text-[10px] md:text-sm">
            Belum ada data galeri {type}
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {items.length > itemsPerPage && (
        <div className="mt-12 md:mt-16 flex items-center justify-between border-t border-gray-100 pt-6 md:pt-8">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl border border-gray-200 text-gray-500 font-bold text-[10px] md:text-sm hover:border-[#628B35] hover:text-[#628B35] transition-all group disabled:opacity-20"
          >
            <ChevronLeft size={16} className="md:size-4.5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>
          
          <div className="flex items-center gap-1.5 md:gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm transition-all ${
                  currentPage === i + 1
                    ? "bg-[#628B35] text-white shadow-lg shadow-[#628B35]/30"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-[#628B35]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg md:rounded-xl border border-gray-200 text-gray-500 font-bold text-[10px] md:text-sm hover:border-[#628B35] hover:text-[#628B35] transition-all group disabled:opacity-20"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight size={16} className="md:size-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </section>
  );
}