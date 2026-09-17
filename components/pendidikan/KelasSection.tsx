"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type KelasItem = {
  id: number;
  title: string;
  desc: string; 
  tag: string;
};

export default function KelasSection() {
  const [dataKelas, setDataKelas] = useState<KelasItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("kelas")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        setDataKelas(data || []);
      } catch (error) {
        console.error("Error fetching kelas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 bg-gray-50 font-sans overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* HEADER SECTION: Desktop & Mobile tetap Horizontal & Center secara Vertikal */}
        <div className="flex flex-row items-center mb-5 justify-between gap-6 border-b border-gray-100 pb-10">
          
          {/* SISI KIRI: JUDUL */}
          <div className="flex-1 max-w-[65%]">
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <div className="w-8 md:w-12 h-[2px] bg-[#628B35]"></div>
              <span className="text-[#628B35] font-black text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em]">
                Program Kelas
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-[#103713] leading-[1.1] uppercase tracking-tighter">
              Program Kelas <br />
              <span className="text-[#628B35]">Pilihan Santri</span>
            </h2>
          </div>
          
          {/* SISI KANAN: DESKRIPSI (Tengah secara vertikal terhadap judul) */}
          <div className="flex-1 max-w-[35%] md:max-w-[300px] border-l-2 border-[#628B35]/20 pl-4 md:pl-6">
            <p className="text-[#103713]/60 text-[10px] md:text-base font-bold leading-tight md:leading-relaxed italic">
              Program kelas terpadu sesuai minat dan potensi setiap santri.
            </p>
          </div>
        </div>

        {/* GRID KELAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataKelas.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative bg-white p-10 rounded-3xl border border-[#E2DBD0] hover:border-[#628B35] transition-all duration-500 hover:shadow-xl hover:shadow-[#628B35]/5 flex flex-col justify-between cursor-default"
            >
              {/* NOMOR & TAG */}
              <div className="flex justify-between items-start mb-8">
                <span className="text-5xl font-black text-[#E2DBD0] group-hover:text-[#628B35]/20 transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="px-4 py-1 rounded-full bg-[#103713]/5 text-[#103713] text-[10px] font-black tracking-widest uppercase group-hover:bg-[#628B35] group-hover:text-white transition-all duration-500">
                  {item.tag || "NASIONAL"}
                </span>
              </div>

              {/* KONTEN */}
              <div className="mb-4">
                <h3 className="text-2xl font-black text-[#103713] mb-4 group-hover:text-[#628B35] transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="text-[#103713]/70 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>

              {/* AKSEN DEKORATIF */}
              <div className="w-8 h-[2px] bg-[#E2DBD0] group-hover:w-full group-hover:bg-[#628B35] transition-all duration-700 mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}