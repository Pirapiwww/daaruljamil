"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  FileText, 
  CheckCircle2, 
  Award,
  ArrowRight
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface SyaratItem {
  id: number;
  syarat: string;
}

interface SyaratCategory {
  SyaratId: number;
  title: string;
  desc: string;
  note: string;
  items: SyaratItem[];
}

export default function SyaratSection() {
  const [categories, setCategories] = useState<SyaratCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: syaratData, error: err1 } = await supabase
          .from("Syarat")
          .select("*")
          .order("SyaratId", { ascending: true });

        const { data: itemsData, error: err2 } = await supabase
          .from("SyaratPendaftaran")
          .select("*")
          .order("id", { ascending: true });

        if (err1 || err2) throw err1 || err2;

        const formattedData = (syaratData || []).map((cat) => ({
          ...cat,
          items: (itemsData || []).filter((item) => item.SyaratId === cat.SyaratId),
        }));

        setCategories(formattedData);
      } catch (error) {
        console.error("Error fetching pendaftaran data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 bg-gray-50 font-sans">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* HEADER SECTION - Mobile digedein, Web tetap proporsional */}
        <div className="flex flex-row items-center justify-between gap-4 mb-5 border-b border-gray-200 pb-12">
          <div className="flex-1 max-w-[60%] md:max-w-[70%]">
            <div>
              <h4 className="text-[#628B35] font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-2 md:mb-3">
                Persyaratan
              </h4>
              
              {/* Ukuran font ditingkatkan khusus mobile (text-3xl), desktop tetap (text-5xl) */}
              <h2 className="text-3xl md:text-5xl font-black text-[#103713] uppercase tracking-tighter leading-[1] md:leading-tight">
                Syarat <br className="md:hidden" /> Pendaftaran
              </h2>
              
              <div className="w-16 md:w-20 h-1.5 bg-[#628B35] rounded-full mt-4"></div>
            </div>
          </div>
          
          {/* Deskripsi disesuaikan sedikit agar pas dengan judul mobile yang besar */}
          <div className="flex-1 max-w-[40%] md:max-w-[350px] border-l-2 border-[#628B35]/20 pl-4 md:pl-8">
            <p className="text-[#103713]/60 text-[11px] md:text-base font-bold leading-tight md:leading-relaxed italic">
              Dokumen dan kriteria yang wajib dipenuhi oleh calon santri baru.
            </p>
          </div>
        </div>

        {/* GRID PERSYARATAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {categories.map((cat, idx) => {
            const isEven = idx % 2 === 0;
            
            return (
              <div 
                key={cat.SyaratId}
                className={`group relative bg-white p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border border-[#E2DBD0] transition-all duration-500 shadow-sm hover:shadow-2xl ${
                  isEven ? 'hover:border-[#103713] hover:shadow-[#103713]/5' : 'hover:border-[#628B35] hover:shadow-[#628B35]/5'
                }`}
              >
                <div className="flex items-center gap-6 mb-12">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:rotate-0 ${
                    isEven ? 'bg-[#103713] rotate-3' : 'bg-[#628B35] -rotate-3'
                  }`}>
                    {isEven ? <FileText size={28} /> : <Award size={28} />}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-[#103713] uppercase tracking-tighter leading-none">
                      {cat.title}
                    </h3>
                    <p className="text-[#628B35] text-[10px] md:text-xs font-black tracking-widest mt-2 uppercase">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <ul className="space-y-5 md:space-y-6">
                  {cat.items.map((item) => (
                    <li key={item.id} className="flex gap-4 items-start group/item">
                      <div className="mt-1 flex-shrink-0">
                        {isEven ? (
                          <CheckCircle2 size={18} className="text-[#103713] opacity-40 group-hover/item:opacity-100 transition-opacity" />
                        ) : (
                          <ArrowRight size={18} className="text-[#628B35] opacity-40 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                        )}
                      </div>
                      <p className="text-[#103713]/70 text-sm md:text-base font-bold leading-relaxed group-hover/item:text-[#103713] transition-colors">
                        {item.syarat}
                      </p>
                    </li>
                  ))}
                </ul>

                {cat.note && (
                  <div className={`mt-12 p-6 md:p-8 rounded-2xl border border-dashed text-xs md:text-sm font-bold leading-relaxed italic ${
                    isEven ? 'bg-[#103713]/5 border-[#103713]/20 text-[#103713]' : 'bg-[#628B35]/5 border-[#628B35]/20 text-[#628B35]'
                  }`}>
                    * {cat.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}