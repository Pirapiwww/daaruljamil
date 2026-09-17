"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Edit3, Image as ImageIcon, Loader2 } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function SidebarContent() {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const { data, error } = await supabase
          .from("home")
          .select("poster_link")
          .single();

        if (!error && data?.poster_link) {
          setPosterUrl(data.poster_link);
        }
      } catch (err) {
        console.error("Error fetching poster:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoster();
  }, []);

  return (
    /* Ubah: 'max-w-sm' menjadi 'max-w-full md:max-w-sm'
       Tambah: 'px-4 md:px-0' agar di mobile ada jarak ke pinggir layar supaya rounded-nya kelihatan
    */
    <div className="w-full max-w-full md:max-w-sm mx-auto space-y-6 px-4 md:px-0">
      
      {/* Poster Section */}
      {/* mt-6 untuk mobile agar tidak terlalu mepet ke atas */}
      <div className="mt-6 md:mt-10 relative group w-full aspect-[3/4] bg-bone rounded-3xl shadow-xl overflow-hidden border border-bone/50 flex items-center justify-center transition-all duration-500 hover:shadow-2xl">
        
        {isLoading ? (
          <Loader2 className="animate-spin text-primary/20" size={32} />
        ) : posterUrl ? (
          <>
            <img 
              src={posterUrl} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              alt="Poster Pendaftaran" 
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <div className="flex flex-col items-center gap-3 z-20">
              <div className="p-4 bg-milk/50 rounded-full backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-500">
                <ImageIcon className="text-primary/40" size={40} />
              </div>
              <span className="text-primary/40 font-bold tracking-widest uppercase text-[10px] lg:text-xs font-sans text-center px-4">
                Poster Pendaftaran
              </span>
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 rounded-2xl pointer-events-none z-20" />
      </div>

      {/* Pendaftaran Section */}
      <div className="relative bg-primary p-6 lg:p-8 rounded-3xl shadow-2xl shadow-primary/30 text-milk overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/40 transition-colors" />
        
        <div className="relative z-10">
          <h3 className="text-lg lg:text-xl font-heading font-bold border-b border-milk/10 pb-4 mb-4 uppercase tracking-[0.12em]">
            Pendaftaran
          </h3>
          
          <p className="text-xs lg:text-sm text-bone/90 leading-relaxed mb-6 font-sans">
            Bergabunglah bersama kami. Pendaftaran Santri Baru 
            <span className="text-milk font-bold"> Pondok Pesantren Ardaniah </span> 
          </p>
          
          <Link 
            href="/pendaftaran/informasi" 
            className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-milk px-4 py-4 rounded-2xl transition-all font-bold shadow-xl shadow-black/10 active:scale-95 group/btn2"
          >
            <Edit3 size={18} className="group-hover/btn2:rotate-12 transition-transform" />
            <span className="font-sans uppercase text-xs lg:text-sm tracking-widest">
              Daftar Sekarang
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}