"use client";

import { useState } from "react";
import { Search, Clock, Calendar, User, Tag, ArrowRight } from "lucide-react";

const LATEST_NEWS_SIDEBAR = [
  {
    category: "BERITA",
    title: "MTA Karanganyar Jadi Tuan Rumah Seminar Nasional FKPM dan Munas FPAG",
    date: "17 Apr 2026",
    image: "https://images.unsplash.com/photo-1523240715632-d3493a388b39?q=80&w=2070",
  },
  {
    category: "PENGUMUMAN",
    title: "Panduan Lengkap Pendaftaran Akun Calon Santri Baru Pondok Pesantren",
    date: "16 Apr 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070",
  },
  {
    category: "KEGIATAN",
    title: "Latihan Dasar Kepemimpinan Santri (LDKS) Tahun Pelajaran 2025/2026",
    date: "15 Apr 2026",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2070",
  },
  {
    category: "ARTIKEL",
    title: "Pentingnya Adab Sebelum Ilmu dalam Pendidikan Pesantren Modern",
    date: "14 Apr 2026",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2070",
  },
  {
    category: "BERITA",
    title: "Kunjungan Studi Banding Kurikulum Tahfidz dari Pesantren Sahabat",
    date: "13 Apr 2026",
    image: "https://images.unsplash.com/photo-1524178232363-1fb28f74b573?q=80&w=2070",
  },
];

export default function PublikasiSection2() {
  return (
    <section className="py-24 bg-white font-sans antialiased text-[#333]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* KOLOM KIRI: KONTEN BERITA UTAMA */}
          <div className="lg:w-[70%]">
            <article>
              {/* JUDUL BERITA (UKURAN DIKECILKAN) */}
              <h1 className="text-[28px] md:text-[38px] leading-[1.2] font-black text-[#103713] mb-6 tracking-tighter uppercase">
                Kondisi Kali Depan Plaza Indonesia Usai Dibersihkan dari Ikan Sapu-sapu
              </h1>

              {/* METADATA */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[#E8E4D9]">
                <div className="flex items-center gap-2 text-[14px] font-bold text-[#103713]">
                  <User size={16} className="text-[#628B35]" />
                  <span>Rumondang Naibaho</span>
                </div>
                <span className="text-gray-300 hidden md:block">|</span>
                <div className="flex items-center gap-2 text-[12px] font-black text-[#628B35] tracking-widest uppercase">
                  <Tag size={14} />
                  <span>#ARDANIAHNEWS</span>
                </div>
                <div className="text-[13px] text-gray-400 font-medium italic ml-auto flex items-center gap-1">
                  <Calendar size={14} /> Sabtu, 18 Apr 2026 11:15 WIB
                </div>
              </div>

              {/* MEDIA UTAMA */}
              <figure className="mb-10">
                <div className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-gray-50">
                  <img 
                    src="https://images.unsplash.com/photo-1590218101119-9407336ed03b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Berita Utama"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-[11px] text-gray-400 text-center font-bold uppercase tracking-[0.2em] italic">
                  Foto: Kondisi terkini kali depan Plaza Indonesia (Rumondang/detikcom)
                </figcaption>
              </figure>

              {/* ISI BERITA */}
              <div className="space-y-8 text-[17px] md:text-[19px] leading-[1.8] text-[#103713]/90 text-justify">
                <p>
                  <span className="font-black text-[#103713] uppercase tracking-widest text-[15px] mr-2">Jakarta</span> 
                  – Pemerintah Provinsi DKI Jakarta tengah gencar melakukan upaya pengendalian 
                  <span className="text-[#628B35] font-bold italic underline decoration-[#628B35]/30 underline-offset-8"> ikan sapu-sapu</span> 
                  di sejumlah kali di wilayah Jakarta.
                </p>
                <p>
                  Upaya pembersihan ini difokuskan pada titik-titik vital pusat kota untuk memastikan ekosistem sungai tetap sehat dan pemandangan kota tetap terjaga. Warga diharapkan tidak membuang bibit ikan asing sembarangan ke aliran sungai.
                </p>
              </div>
            </article>
          </div>

          {/* KOLOM KANAN: SIDEBAR (STICKY) */}
          <aside className="lg:w-[30%] lg:sticky lg:top-10 space-y-12">
            
            {/* SEARCH BOX */}
            <div className="relative">
              <input
                type="text"
                placeholder="Cari berita lainnya..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-sm text-[#103713] placeholder:text-gray-400 focus:outline-none focus:border-[#628B35] focus:ring-1 focus:ring-[#628B35] transition-all shadow-sm"
              />
              <Search className="absolute right-5 top-4 text-gray-300" size={18} />
            </div>

            {/* LIST BERITA TERBARU */}
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b-2 border-[#628B35]/20 pb-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-[#628B35]" size={20} />
                  <h3 className="text-xl font-black text-[#103713] uppercase tracking-tighter">
                    Berita Terbaru
                  </h3>
                </div>
                <a href="#" className="flex items-center gap-1 text-[10px] font-black text-[#628B35] uppercase tracking-widest hover:text-[#103713] transition-colors group">
                  Selengkapnya <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="space-y-8">
                {LATEST_NEWS_SIDEBAR.map((news, i) => (
                  <div key={i} className="group flex gap-4 items-start cursor-pointer">
                    <div className="w-20 h-20 rounded-[1.25rem] overflow-hidden shrink-0 shadow-sm border border-gray-100 bg-gray-50">
                      <img 
                        src={news.image} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        alt="thumb" 
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-[#628B35] uppercase tracking-[0.2em]">
                        {news.category}
                      </span>
                      <h4 className="text-[14px] font-bold text-[#103713] leading-tight line-clamp-2 group-hover:text-[#628B35] transition-colors">
                        {news.title}
                      </h4>
                      <div className="text-[11px] text-gray-400 font-bold italic flex items-center gap-1 mt-1">
                        <Calendar size={10} /> {news.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </section>
  );
}