"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Filter, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const NEWS_DATA = [
{
    category: "BERITA",
    title: "Keberkahan Ramadan: Syeikh Dr. Umar Muhammed Rajab Dieb Kunjungi Pondok Pesantren MTA Karanganyar",
    image: "/image/berita1.jpg",
},
{
    category: "BERITA",
    title: "MTA Karanganyar Jadi Tuan Rumah Seminar Nasional FKPM dan Munas FPAG, Dibuka Langsung oleh Wakil Menteri Agama",
    image: "/image/berita2.jpg",
},
{
    category: "PENGUMUMAN",
    title: "Panduan Lengkap Pendaftaran Akun Calon Santri Baru Pondok Pesantren MTA",
    image: "/image/pengumuman.jpg",
},
{
    category: "KEGIATAN",
    title: "Latihan Dasar Kepemimpinan Santri (LDKS) Tahun Pelajaran 2025/2026",
    image: "/image/kegiatan1.jpg",
},
{
    category: "BERITA",
    title: "Kunjungan Studi Banding Kurikulum Tahfidz dari Pesantren Sahabat",
    image: "/image/berita3.jpg",
},
{
    category: "ARTIKEL",
    title: "Pentingnya Adab Sebelum Ilmu dalam Pendidikan Pesantren Modern",
    image: "/image/artikel1.jpg",
},
];

const CATEGORIES = ["SEMUA", "BERITA", "PENGUMUMAN", "KEGIATAN", "ARTIKEL"];

export default function PublikasiSection() {
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] = useState("SEMUA");
const [currentPage, setCurrentPage] = useState(1);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const filteredNews = NEWS_DATA.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "SEMUA" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
});

return (
    <div className="container mx-auto py-16 px-6 lg:px-12">
    {/* HEADER: TETAP/TIDAK BERUBAH DI MOBILE */}
    <div className="flex flex-row items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-2">
        <h2 className="text-3xl md:text-5xl font-black text-[#103713] tracking-tighter uppercase leading-none">
            PUBLIKASI
        </h2>
        <div className="h-2 w-20 bg-[#628B35]" />
        </div>
        <p className="text-gray-500 text-[10px] md:text-sm max-w-[150px] md:max-w-xs text-right font-medium italic leading-tight">
        Informasi terkini dan arsip berita resmi Pondok Pesantren MTA.
        </p>
    </div>

    {/* flex-col-reverse memindahkan sidebar ke atas pada mobile */}
    <div className="flex flex-col-reverse lg:flex-row gap-10">
        {/* KOLOM KIRI: GRID (75%) */}
        <div className="lg:w-3/4 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {filteredNews.map((news, index) => (
            <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
                <div className="relative h-56 overflow-hidden">
                <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#103713] text-[#FFFDF5] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest shadow-lg">
                    {news.category}
                    </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white text-xs font-bold flex items-center gap-2">
                    Baca Selengkapnya <ArrowRight size={14} />
                    </span>
                </div>
                </div>

                <div className="p-6">
                <h3 className="text-lg font-bold text-[#103713] leading-tight group-hover:text-[#628B35] transition-colors line-clamp-2">
                    {news.title}
                </h3>
                </div>
            </div>
            ))}
        </div>

        {/* PAGINATION */}
        {filteredNews.length > 0 && (
            <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:border-[#628B35] hover:text-[#628B35] transition-all group">
                <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
                {[1, 2, 3].map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    currentPage === page
                        ? "bg-[#628B35] text-white shadow-lg"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-[#628B35]"
                    }`}
                >
                    {page}
                </button>
                ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:border-[#628B35] hover:text-[#628B35] transition-all group">
                <span className="hidden sm:inline">Selanjutnya</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            </div>
        )}
        </div>

        {/* KOLOM KANAN: SIDEBAR (25%) */}
        <div className="lg:w-1/4 space-y-6 lg:space-y-8 mb-10 lg:mb-0">
        {/* SEARCH BOX */}
        <div className="relative">
            <input
            type="text"
            placeholder="Cari berita lainnya..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-sm text-[#103713] placeholder:text-gray-400 focus:outline-none focus:border-[#628B35] focus:ring-1 focus:ring-[#628B35] transition-all shadow-sm"
            />
            <Search className="absolute right-5 top-4 text-gray-300" size={18} />
        </div>

        {/* KATEGORI */}
        <div className="bg-white p-6 lg:p-8 rounded-3xl border border-gray-100 shadow-sm relative z-20">
            <h4 className="text-[#103713] font-black text-xs tracking-[0.2em] mb-4 lg:mb-6 uppercase border-b border-gray-100 pb-4 flex items-center justify-between">
            Kategori <Filter size={14} className="text-[#628B35]" />
            </h4>

            {/* DROPDOWN CUSTOM (MOBILE ONLY) */}
            <div className="relative lg:hidden">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-5 text-left flex items-center justify-between shadow-sm transition-all active:scale-[0.98]"
            >
                <span className="text-[11px] font-black tracking-widest text-[#103713] uppercase">
                {selectedCategory}
                </span>
                <ChevronDown 
                className={`text-[#628B35] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                size={18} 
                />
            </button>

            {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-30">
                {CATEGORIES.map((cat) => (
                    <button
                    key={cat}
                    onClick={() => {
                        setSelectedCategory(cat);
                        setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3.5 text-[10px] font-black tracking-widest uppercase transition-colors border-b border-gray-50 last:border-0 ${
                        selectedCategory === cat 
                        ? "bg-[#628B35] text-white" 
                        : "text-[#103713]/70 hover:bg-gray-50"
                    }`}
                    >
                    {cat}
                    </button>
                ))}
                </div>
            )}
            </div>

            {/* LIST KATEGORI (DESKTOP ONLY) */}
            <div className="hidden lg:flex flex-col gap-3">
            {CATEGORIES.map((cat) => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-black tracking-widest transition-all duration-300 shadow-sm border ${
                    selectedCategory === cat
                    ? "bg-[#628B35] text-white border-[#628B35] translate-x-2 shadow-[#628B35]/20"
                    : "bg-gray-50 text-[#103713]/60 border-gray-100 hover:bg-gray-100 hover:text-[#103713]"
                }`}
                >
                {cat}
                </button>
            ))}
            </div>
        </div>
        </div>
    </div>
    </div>
);
}