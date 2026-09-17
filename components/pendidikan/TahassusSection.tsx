"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface TahassusWithPoints {
  Tahassus_Id: number;
  title: string;
  tahassusPoint: {
    id: number;
    point: string;
  }[];
}

export default function TahassusSection() {
  const [dataTahassus, setDataTahassus] = useState<TahassusWithPoints[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("tahassus")
          .select(`
            Tahassus_Id,
            title,
            tahassusPoint (
              id,
              point
            )
          `)
          .order("Tahassus_Id", { ascending: true });

        if (error) throw error;
        setDataTahassus(data || []);
      } catch (error) {
        console.error("Error fetching tahassus:", error);
      }
    };
    fetchData();
  }, []);

  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("bahasa")) return "🌐";
    if (t.includes("science") || t.includes("umum")) return "🧪";
    if (t.includes("seni") || t.includes("budaya")) return "🎨";
    return "✨";
  };

  return (
    <section className="py-24 bg-gray-50 font-sans overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-row items-center justify-between gap-4 mb-5 md:mb-20 border-b border-gray-100 pb-10">
          <div className="flex-1 max-w-[65%]">
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <div className="w-8 md:w-12 h-[2px] bg-[#628B35]"></div>
              <span className="text-[#628B35] font-black text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em]">
                Program Khusus
              </span>
            </div>
            <h2 className="text-xl md:text-5xl font-black text-[#103713] leading-tight uppercase tracking-tighter">
              Tahassus <span className="text-[#628B35]">(Private)</span>
            </h2>
          </div>
          
          <div className="flex-1 max-w-[35%] md:max-w-[350px] border-l-2 border-[#628B35]/20 pl-4 md:pl-6">
            <p className="text-[#103713]/60 text-[9px] md:text-base font-bold leading-tight md:leading-relaxed italic">
              Meningkatkan kemampuan santri sesuai jurusan yang dipilih.
            </p>
          </div>
        </div>

        {/* GRID KATEGORI TAHASSUS */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {dataTahassus.map((item) => (
            <div 
              key={item.Tahassus_Id} 
              className="group p-5 md:p-8 rounded-2xl md:rounded-3xl bg-gray-50 border border-[#E2DBD0] hover:border-[#628B35] transition-all duration-500 hover:shadow-xl hover:shadow-[#628B35]/5"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="text-2xl md:text-3xl opacity-40 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  {getIcon(item.title)}
                </div>
                <h3 className="text-sm md:text-lg font-black text-[#103713] group-hover:text-[#628B35] transition-colors leading-tight">
                  {item.title}
                </h3>
              </div>

              <ul className="space-y-2 md:space-y-3">
                {item.tahassusPoint?.map((pointItem) => (
                  <li key={pointItem.id} className="flex items-start gap-2 md:gap-3">
                    <span className="mt-1.5 w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#628B35] flex-shrink-0 opacity-30 group-hover:opacity-100 transition-opacity"></span>
                    <span className="text-[#103713]/70 font-bold text-[10px] md:text-sm leading-tight group-hover:text-[#103713] transition-colors">
                      {pointItem.point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FOOTER NOTE - Dibuat lebih ramping dan minimalis */}
        <div className="mt-12 md:mt-16 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl bg-[#103713] text-white relative overflow-hidden flex justify-center shadow-lg shadow-[#103713]/10">
        {/* Aksen Dekoratif Halus - Ukuran dikecilkan */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#628B35]/10 rounded-full -ml-16 -mb-16 blur-2xl"></div>
        
        <div className="max-w-2xl text-center relative z-10 px-4">
            {/* Ukuran font diturunkan agar lebih "sleek" */}
            <p className="font-bold text-xs sm:text-base md:text-xl italic leading-relaxed opacity-90">
            "Para santri diwajibkan mengikuti Tahassus sesuai jurusan yang dipilih untuk meningkatkan kemampuan diri secara intensif."
            </p>
            
            {/* Dekorasi pemisah dibuat lebih rapat */}
            <div className="mt-3 md:mt-5 flex justify-center items-center gap-2">
            <div className="h-[1px] w-4 md:w-8 bg-[#628B35] opacity-40"></div>
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#628B35]"></div>
            <div className="h-[1px] w-4 md:w-8 bg-[#628B35] opacity-40"></div>
            </div>
        </div>
        </div>

      </div>
    </section>
  );
}