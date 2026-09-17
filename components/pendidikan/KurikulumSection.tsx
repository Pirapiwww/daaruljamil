"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

type KurikulumItem = {
id: number;
title: string;
desc: string;
};

type BentukTujuanItem = {
id: number;
bentukTujuan: string;
};

export default function KurikulumSection() {
const [dataKurikulum, setDataKurikulum] = useState<KurikulumItem[]>([]);
const [dataTujuan, setDataTujuan] = useState<BentukTujuanItem[]>([]);

useEffect(() => {
    const fetchData = async () => {
    try {
        // Fetch data dari tabel kurikulum
        const { data: kurikulum, error: errK } = await supabase
        .from("kurikulum")
        .select("*")
        .order("id", { ascending: true });

        // Fetch data dari tabel bentukTujuan
        const { data: tujuan, error: errT } = await supabase
        .from("bentukTujuan")
        .select("*")
        .order("id", { ascending: true });

        if (errK) throw errK;
        if (errT) throw errT;

        setDataKurikulum(kurikulum || []);
        setDataTujuan(tujuan || []);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    };

    fetchData();
}, []);

return (
    <section className="py-20 bg-gray-50 font-sans">
    <div className="container mx-auto px-6 lg:px-12">
        {/* BARIS ATAS: GAMBAR & KURIKULUM */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        
        {/* KOLOM KIRI: AREA GAMBAR */}
        <div className="w-full lg:w-5/12">
            <div className="relative aspect-video lg:aspect-[4/5] w-full rounded-3xl bg-[#E2DBD0] flex items-center justify-center border-2 border-[#103713]/5 overflow-hidden shadow-sm">
            <div className="text-[#103713]/20 flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center">
                <span className="text-xl">+</span>
                </div>
                <span className="text-xs font-bold tracking-widest uppercase">Pratinjau Gambar</span>
            </div>
            </div>
        </div>

        {/* KOLOM KANAN: KONTEN KURIKULUM */}
        <div className="w-full lg:w-7/12">
            <div className="max-w-2xl">
            {/* JUDUL UTAMA */}
            <div className="mb-14">
                <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[#628B35]"></div>
                <h3 className="text-[#628B35] font-black text-sm uppercase tracking-[0.3em]">
                    Sistem Kurikulum
                </h3>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#103713] leading-[1.1]">
                Kurikulum <br />
                <span className="text-[#628B35]">Pendidikan Terpadu</span>
                </h2>
            </div>

            <div className="space-y-12">
                {dataKurikulum.map((item, index) => (
                <div key={item.id} className="group relative pl-8 border-l-2 border-[#E2DBD0] hover:border-[#628B35] transition-colors duration-300">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#E2DBD0] group-hover:bg-[#628B35] transition-colors duration-300" />
                    
                    <h3 className="text-2xl font-black text-[#103713] mb-4">
                    <span className="text-[#628B35] mr-2">{String(index + 1).padStart(2, '0')}.</span>
                    {item.title}
                    </h3>
                    <p className="text-[#103713]/70 leading-relaxed text-lg font-medium">
                    {item.desc}
                    </p>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>

        {/* BARIS BAWAH: BENTUK DAN TUJUAN */}
        <div className="mt-24 pt-16 border-t-2 border-[#E2DBD0]/50">
        <div className="flex flex-col md:flex-row gap-8 md:items-end mb-12">
            <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-[#628B35]"></div>
                <h3 className="text-[#628B35] font-black text-sm uppercase tracking-[0.3em]">
                Sistem Kurikulum
                </h3>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#103713] leading-[1.1]">
                Bentuk & <span className="text-[#628B35]">Tujuan</span>
            </h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {dataTujuan.map((item, index) => (
            <div key={item.id} className="flex gap-5 group">
                <div className="flex-none w-10 h-10 rounded-xl bg-[#103713] text-[#FFFDF5] flex items-center justify-center font-black text-sm shadow-lg shadow-[#103713]/10">
                {index + 1}
                </div>
                <p className="text-[#103713]/80 font-bold leading-relaxed pt-1">
                {item.bentukTujuan}
                </p>
            </div>
            ))}
        </div>
        </div>
    </div>
    </section>
);
}