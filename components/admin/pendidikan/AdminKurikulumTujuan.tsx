"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
Save, Plus, Loader2, Trash2, BookOpen, Target, Type, AlignLeft, Info
} from "lucide-react";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface KurikulumItem {
id?: number;
title: string;
desc: string;
}

interface TujuanItem {
id?: number;
bentukTujuan: string;
}

const AdminKurikulumTujuan = () => {
const [kurikulumItems, setKurikulumItems] = useState<KurikulumItem[]>([]);
const [tujuanItems, setTujuanItems] = useState<TujuanItem[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isEditing, setIsEditing] = useState(false);

const fetchData = async () => {
    try {
    const { data: kurikulumData } = await supabase.from("kurikulum").select("*").order("id", { ascending: true });
    const { data: tujuanData } = await supabase.from("bentukTujuan").select("*").order("id", { ascending: true });

    setKurikulumItems(kurikulumData || []);
    setTujuanItems(tujuanData || []);
    } catch (err) {
    console.error("Fetch Error:", err);
    Swal.fire({ icon: 'error', title: 'Gagal memuat data' });
    }
};

useEffect(() => {
    fetchData();
}, []);

const handleSave = async () => {
    setIsLoading(true);
    Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
    // Save Kurikulum
    await supabase.from("kurikulum").delete().neq("id", 0);
    const validKurikulum = kurikulumItems.filter(i => i.title.trim() !== "").map(i => ({ title: i.title, desc: i.desc }));
    if (validKurikulum.length > 0) await supabase.from("kurikulum").insert(validKurikulum);

    // Save Tujuan
    await supabase.from("bentukTujuan").delete().neq("id", 0);
    const validTujuan = tujuanItems.filter(i => i.bentukTujuan.trim() !== "").map(i => ({ bentukTujuan: i.bentukTujuan }));
    if (validTujuan.length > 0) await supabase.from("bentukTujuan").insert(validTujuan);

    Swal.fire({ title: 'Berhasil!', text: 'Kurikulum dan Tujuan telah diperbarui.', icon: 'success' });
    setIsEditing(false);
    fetchData();
    } catch (err: any) {
    Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: err.message });
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="w-full space-y-12 relative font-sans pb-32">
    {/* HEADER */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <Link href="/admin/pendidikan" className="hover:text-[#628B35]">Pendidikan Section</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Kurikulum & Tujuan</span>
        </div>
        <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Kurikulum & Tujuan</h1>
        </div>

        {!isEditing && (
        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-3 bg-[#628B35] text-white rounded-2xl font-bold text-xs hover:bg-[#103713] transition-all shadow-md">
            <Plus size={16} /> EDIT KONTEN
        </button>
        )}
    </div>

    {/* SECTION 1: KURIKULUM (TIMELINE STYLE) */}
    <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><BookOpen size={20}/></div>
        <h2 className="text-xl font-black text-[#103713] uppercase">Struktur Kurikulum</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
        {kurikulumItems.map((item, idx) => (
            <div key={idx} className="flex gap-6 group">
            {/* Timeline Indicator */}
            <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
                <div className="w-0.5 h-full bg-emerald-50 group-last:bg-transparent"></div>
            </div>

            <div className={`flex-1 bg-white p-6 rounded-[1.5rem] border ${isEditing ? 'border-emerald-200 shadow-sm' : 'border-gray-100 shadow-sm'}`}>
                {isEditing ? (
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <input 
                        className="w-full text-lg font-black text-[#103713] outline-none border-b border-gray-100 focus:border-emerald-500 pb-1"
                        value={item.title}
                        placeholder="Judul Kurikulum (Misal: 01. Kurikulum Pesantren)"
                        onChange={(e) => {
                            const n = [...kurikulumItems]; n[idx].title = e.target.value; setKurikulumItems(n);
                        }}
                        />
                        <button onClick={() => setKurikulumItems(kurikulumItems.filter((_, i) => i !== idx))} className="text-red-400 p-2"><Trash2 size={18}/></button>
                    </div>
                    <textarea 
                        className="w-full text-sm text-gray-500 bg-gray-50 p-3 rounded-xl outline-none min-h-[80px]"
                        value={item.desc}
                        placeholder="Deskripsi kurikulum..."
                        onChange={(e) => {
                        const n = [...kurikulumItems]; n[idx].desc = e.target.value; setKurikulumItems(n);
                        }}
                    />
                </div>
                ) : (
                <div>
                    <h3 className="text-lg font-black text-[#103713] mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
                )}
            </div>
            </div>
        ))}
        {isEditing && (
            <button onClick={() => setKurikulumItems([...kurikulumItems, {title: "", desc: ""}])} className="ml-10 py-4 border-2 border-dashed border-gray-100 rounded-2xl text-emerald-600 font-bold text-xs uppercase hover:bg-emerald-50 transition-all">
                + Tambah Kurikulum
            </button>
        )}
        </div>
    </section>

    <hr className="border-gray-100" />

    {/* SECTION 2: TUJUAN (BOX GRID STYLE) */}
    <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Target size={20}/></div>
        <h2 className="text-xl font-black text-[#103713] uppercase">Tujuan & Sistem Pendidikan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tujuanItems.map((item, idx) => (
            <div key={idx} className={`relative flex gap-4 p-6 bg-white rounded-2xl border transition-all ${isEditing ? 'border-emerald-200' : 'border-gray-50 shadow-sm'}`}>
                <div className="flex-shrink-0 w-8 h-8 bg-[#103713] text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-md">
                    {idx + 1}
                </div>
                
                <div className="flex-1">
                    {isEditing ? (
                        <div className="space-y-2">
                            <textarea 
                                className="w-full text-sm font-semibold text-gray-700 bg-gray-50 p-2 rounded-lg outline-none focus:ring-1 focus:ring-emerald-300"
                                value={item.bentukTujuan}
                                rows={3}
                                onChange={(e) => {
                                    const n = [...tujuanItems]; n[idx].bentukTujuan = e.target.value; setTujuanItems(n);
                                }}
                            />
                            <button onClick={() => setTujuanItems(tujuanItems.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-widest">Hapus Poin</button>
                        </div>
                    ) : (
                        <p className="text-sm font-bold text-[#103713] leading-relaxed">{item.bentukTujuan}</p>
                    )}
                </div>
            </div>
        ))}
        {isEditing && (
            <button onClick={() => setTujuanItems([...tujuanItems, {bentukTujuan: ""}])} className="border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center p-6 text-emerald-600 hover:bg-emerald-50 transition-all">
                <Plus size={24} />
                <span className="text-[10px] font-bold uppercase mt-2">Tambah Tujuan</span>
            </button>
        )}
        </div>
    </section>

    {/* FLOATING ACTION BAR */}
    {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="bg-[#103713] p-2 rounded-full shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md">
            <button onClick={() => { setIsEditing(false); fetchData(); }} className="px-8 py-3 text-white/50 text-xs font-black hover:text-white transition-all">BATAL</button>
            <button disabled={isLoading} onClick={handleSave} className="flex items-center gap-3 px-10 py-3.5 bg-[#628B35] text-white rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-lg">
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18}/>}
            {isLoading ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
            </button>
        </div>
        </div>
    )}
    </div>
);
};

export default AdminKurikulumTujuan;