"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Check, Clock, LayoutGrid } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface FasilitasSectionProps {
  fasilitasId: number;
}

export default function FasilitasSection({ fasilitasId }: FasilitasSectionProps) {
  const [fasilitasUmum, setFasilitasUmum] = useState<string[]>([]);
  const [jadwalHarian, setJadwalHarian] = useState<{ time: string; desc: string }[]>([]);
  const [saranaData, setSaranaData] = useState<{ title: string; images: string[] }[]>([]);
  
  const [selectedSarana, setSelectedSarana] = useState<number | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: kemudahan } = await supabase
          .from('Fasilitas_Kemudahan')
          .select('kemudahan')
          .eq('Fasilitas_Id', fasilitasId);

        const { data: aktifitas } = await supabase
          .from('Fasilitas_Aktifitas')
          .select('jam_Aktifitas, keterangan')
          .eq('Fasilitas_Id', fasilitasId)
          .order('id', { ascending: true });

        const { data: sarana } = await supabase
          .from('Fasilitas_Sarana_Title')
          .select(`
            title,
            Fasilitas_Sarana (image_link)
          `)
          .eq('Fasilitas_Id', fasilitasId);
        
        if (kemudahan) setFasilitasUmum(kemudahan.map(k => k.kemudahan || ""));
        if (aktifitas) setJadwalHarian(aktifitas.map(a => ({ 
          time: a.jam_Aktifitas || "00:00", 
          desc: a.keterangan || "" 
        })));
        if (sarana) {
          const formatted = sarana.map((s: any) => ({
            title: s.title || "Tanpa Judul",
            images: s.Fasilitas_Sarana?.map((img: any) => img.image_link).filter(Boolean) || []
          }));
          setSaranaData(formatted);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    if (fasilitasId) fetchData();
  }, [fasilitasId]);

  const totalPages = Math.ceil(saranaData.length / itemsPerPage) || 1;
  const currentItems = saranaData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  const openLightbox = (idx: number) => {
    setSelectedSarana(idx);
    setCurrentImgIdx(0);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedSarana(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-black text-[#103713] tracking-tighter uppercase leading-none">
              FASILITAS
            </h2>
            <div className="h-2 w-20 bg-[#628B35]" />
          </div>
          <p className="text-gray-500 text-sm max-w-xs md:text-right font-medium italic">
            Informasi fasilitas, sarana prasarana, dan agenda harian resmi Pondok Pesantren Ardaniah.
          </p>
        </div>

        {/* BAGIAN ATAS: GRID FASILITAS & SARANA */}
        <div className="flex flex-col lg:flex-row gap-16 items-start mb-20">
          {/* KOLOM KIRI: FASILITAS UMUM */}
          <div className="lg:w-7/12 space-y-10">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-[#103713] uppercase tracking-tight flex items-center gap-3">
                <Check className="text-[#628B35]" strokeWidth={4} /> Fasilitas & Kemudahan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fasilitasUmum.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-[2rem] border border-[#E8E4D9] shadow-sm hover:shadow-md transition-all">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[#628B35] shrink-0" />
                    <p className="text-sm font-bold text-[#103713]/80 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: GALERI SARANA PRASARANA */}
          <div className="lg:w-5/12 w-full lg:sticky lg:top-24 self-start space-y-8">
            <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-4">
              <h3 className="text-2xl font-black text-[#103713] uppercase tracking-tight flex items-center gap-3">
                <LayoutGrid className="text-[#628B35]" /> Sarana & Prasarana
              </h3>
              <div className="flex gap-2">
                <button onClick={prevPage} className="p-2.5 rounded-xl bg-white border border-[#E8E4D9] hover:bg-[#628B35] hover:text-white transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={nextPage} className="p-2.5 rounded-xl bg-white border border-[#E8E4D9] hover:bg-[#628B35] hover:text-white transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 min-h-[400px]">
              {currentItems.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => openLightbox(idx + (currentPage * itemsPerPage))}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-md border-2 border-white bg-[#F3F0E7] animate-in fade-in duration-500"
                >
                  {item.images[0] && (
                    <Image src={item.images[0]} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#103713] via-transparent opacity-70 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
                    <p className="text-white font-black text-[9px] uppercase italic leading-tight">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 w-full pt-2">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === currentPage ? "w-16 bg-[#628B35]" : "w-4 bg-[#E8E4D9]"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BAGIAN BAWAH: AKTIFITAS KESEHARIAN (Full Width & Vertikal Column Flow) */}
        <div className="w-full">
          <div className="bg-[#103713] p-8 md:p-12 rounded-[3rem] text-[#FCFBF8] shadow-2xl relative overflow-hidden border-4 border-[#628B35]/20">
            <div className="relative z-10 space-y-10">
              <div className="space-y-2 text-center md:text-left border-b border-white/10 pb-6">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter flex items-center justify-center md:justify-start gap-3">
                  <Clock className="text-[#628B35]" /> Aktifitas Keseharian
                </h3>
                <p className="text-[#628B35] font-bold text-[10px] tracking-[0.3em] uppercase italic">Pondok Pesantren Ardaniah</p>
              </div>
              
              {/* Aliran vertikal: Kiri (atas ke bawah), lalu Kanan (atas ke bawah) */}
              <div className="md:columns-2 md:gap-x-12 space-y-2">
                {jadwalHarian.map((item, i) => (
                  <div 
                    key={i} 
                    className="break-inside-avoid-column flex items-start gap-6 py-5 border-b border-white/5 group hover:bg-white/5 transition-colors px-4 rounded-xl"
                  >
                    <span className="text-[#628B35] font-black text-xs tabular-nums shrink-0 w-24 md:w-28 uppercase tracking-widest">
                      {item.time.replace('.', ':')}
                    </span>
                    <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedSarana !== null && saranaData[selectedSarana] && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={closeLightbox}>
          <button className="absolute top-8 right-8 text-white/70 hover:text-white p-2 bg-black/30 rounded-full">
            <X size={36} />
          </button>
          
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col items-center justify-center gap-6" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[60vh] flex items-center justify-center rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-black/20">
              {saranaData[selectedSarana].images[currentImgIdx] && (
                <Image 
                  src={saranaData[selectedSarana].images[currentImgIdx]} 
                  alt={saranaData[selectedSarana].title} 
                  fill 
                  className="object-contain" 
                />
              )}
              
              {saranaData[selectedSarana].images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImgIdx((prev) => (prev - 1 + saranaData[selectedSarana].images.length) % saranaData[selectedSarana].images.length)} 
                    className="absolute left-6 w-14 h-14 rounded-full bg-black/40 hover:bg-[#628B35] text-white flex items-center justify-center transition-all"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button 
                    onClick={() => setCurrentImgIdx((prev) => (prev + 1) % saranaData[selectedSarana].images.length)} 
                    className="absolute right-6 w-14 h-14 rounded-full bg-black/40 hover:bg-[#628B35] text-white flex items-center justify-center transition-all"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>
            <div className="text-center space-y-3 px-4 w-full">
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-2xl">{saranaData[selectedSarana].title}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}