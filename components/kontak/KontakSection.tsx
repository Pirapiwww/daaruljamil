"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Map, Loader2 } from "lucide-react";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export default function KontakSection() {
const [activeTab, setActiveTab] = useState<"Banten" | "Bogor">("Banten");
const [data, setData] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
    async function fetchKontak() {
    setLoading(true);
    try {
        // 1. Cari Cabang_Id berdasarkan nama (Banten/Bogor)
        const { data: cabang } = await supabase
        .from("kontakCabang")
        .select("Cabang_Id")
        .eq("cabang", activeTab)
        .single();

        if (cabang) {
        // 2. Ambil detail kontak berdasarkan Cabang_Id
        const { data: kontak } = await supabase
            .from("kontak")
            .select("*")
            .eq("Cabang_Id", cabang.Cabang_Id)
            .maybeSingle();
        
        setData(kontak);
        }
    } catch (error) {
        console.error("Error loading contact:", error);
    } finally {
        setLoading(false);
    }
    }

    fetchKontak();
}, [activeTab]);

return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 lg:px-6">
    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-2">
        <h2 className="text-3xl md:text-5xl font-black text-[#103713] tracking-tighter uppercase leading-none">
            HUBUNGI KAMI
        </h2>
        <div className="h-2 w-20 bg-[#628B35]" />
        </div>
        <p className="text-gray-500 text-sm max-w-xs md:text-right font-medium italic">
        Pilih lokasi kantor kami untuk mendapatkan informasi kontak lebih lanjut.
        </p>
    </div>

    {/* TAB SWITCHER */}
    <div className="flex justify-center mb-12">
        <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-xl flex gap-2">
        {(["Banten", "Bogor"] as const).map((tab) => (
            <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl text-xs font-black tracking-widest transition-all ${
                activeTab === tab
                ? "bg-[#103713] text-white shadow-lg"
                : "text-[#103713]/40 hover:bg-gray-50"
            }`}
            >
            {tab.toUpperCase()}
            </button>
        ))}
        </div>
    </div>

    {/* CONTENT AREA */}
    {loading ? (
        <div className="flex justify-center items-center h-64 text-[#628B35]">
        <Loader2 className="animate-spin" size={48} />
        </div>
    ) : data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Kolom Info Kontak */}
        <div className="space-y-6">
            <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#628B35]">
                <Map size={16} />
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">Lokasi {activeTab}</span>
            </div>
            <h3 className="text-3xl font-black text-[#103713] leading-tight uppercase tracking-tighter">
                {data.title || `Kantor ${activeTab}`}
            </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-[#628B35]/10 rounded-3xl col-span-1 md:col-span-2">
                <div className="flex gap-4">
                <MapPin className="text-[#628B35] shrink-0" size={24} />
                <div>
                    <p className="text-[10px] font-black text-[#103713]/30 uppercase tracking-[0.2em] mb-1">Alamat Lengkap</p>
                    <p className="text-sm font-bold text-[#103713] leading-relaxed">{data.alamat || "Alamat belum diatur"}</p>
                </div>
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <Phone className="text-[#628B35] mb-4" size={24} />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Telepon</p>
                <p className="text-sm font-bold text-[#103713]">{data.telepon || "-"}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <Mail className="text-[#628B35] mb-4" size={24} />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">E-mail</p>
                <p className="text-sm font-bold text-[#103713]">{data.email || "-"}</p>
            </div>

            <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm col-span-1 md:col-span-2 flex items-center justify-between">
                <div className="flex gap-4 items-center">
                <Clock className="text-[#628B35]" size={24} />
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Jam Operasional</p>
                    <p className="text-sm font-bold text-[#103713]">{data.operasional || "-"}</p>
                </div>
                </div>
            </div>
            </div>

            <a 
            href={data.link_wa ? `https://wa.me/${data.link_wa.replace(/\D/g, '')}` : "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 bg-[#103713] text-white rounded-3xl font-black text-xs tracking-[0.2em] hover:bg-[#628B35] transition-all shadow-2xl shadow-[#103713]/20 active:scale-95"
            >
            <MessageSquare size={18} />
            CHAT WHATSAPP SEKARANG
            <ExternalLink size={14} className="opacity-50" />
            </a>
        </div>

        {/* Kolom Maps */}
        <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-gray-50">
            {data.link_maps ? (
            <iframe
                src={data.link_maps} // URL embed yang valid
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Peta Lokasi ${activeTab}`}
            ></iframe>
            ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                <Map size={48} />
                <p className="font-bold text-xs uppercase tracking-widest">Peta belum diatur</p>
            </div>
            )}
        </div>
        </div>
    ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-300">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Data Kontak Belum Tersedia di Database</p>
        </div>
    )}
    </div>
);
}