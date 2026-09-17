"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
Save, Plus, Loader2, Trash2, ListChecks, Type, PlusCircle, X 
} from "lucide-react";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface TahassusPoint {
id?: number;
point: string;
}

interface TahassusData {
Tahassus_Id?: number;
title: string;
points: TahassusPoint[];
}

const AdminTahassus = () => {
const [items, setItems] = useState<TahassusData[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isEditing, setIsEditing] = useState(false);

const fetchTahassusData = async () => {
    try {
    // Fetch Tahassus beserta point-pointnya
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
        .order('Tahassus_Id', { ascending: true });

    if (error) throw error;

    const formattedData = (data || []).map((item: any) => ({
        Tahassus_Id: item.Tahassus_Id,
        title: item.title || "",
        points: item.tahassusPoint || []
    }));

    setItems(formattedData);
    } catch (err) {
    console.error("Fetch Error:", err);
    Swal.fire({ icon: 'error', title: 'Gagal memuat data' });
    }
};

useEffect(() => {
    fetchTahassusData();
}, []);

const handleSave = async () => {
    const validItems = items.filter(item => item.title.trim() !== "");
    setIsLoading(true);
    Swal.fire({ title: 'Menyimpan...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
    // Sesuai logika overwrite sebelumnya:
    // 1. Hapus data utama (Cascade delete akan menghapus tahassusPoint secara otomatis)
    await supabase.from("tahassus").delete().neq("Tahassus_Id", 0);

    // 2. Insert ulang data
    for (const item of validItems) {
        const { data: newTahassus, error: tError } = await supabase
        .from("tahassus")
        .insert({ title: item.title })
        .select()
        .single();

        if (tError) throw tError;

        const validPoints = item.points.filter(p => p.point.trim() !== "");
        if (validPoints.length > 0) {
        const pointsPayload = validPoints.map(p => ({
            point: p.point,
            Tahassus_Id: newTahassus.Tahassus_Id
        }));
        const { error: pError } = await supabase.from("tahassusPoint").insert(pointsPayload);
        if (pError) throw pError;
        }
    }

    Swal.fire({ title: 'Berhasil!', text: 'Data Tahassus telah diperbarui.', icon: 'success' });
    setIsEditing(false);
    fetchTahassusData();
    } catch (err: any) {
    console.error(err);
    Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: err.message });
    } finally {
    setIsLoading(false);
    }
};

// Helper Functions
const addCard = () => setItems([...items, { title: "", points: [{ point: "" }] }]);

const removeCard = (idx: number) => setItems(items.filter((_, i) => i !== idx));

const addPoint = (cardIdx: number) => {
    const newItems = [...items];
    newItems[cardIdx].points.push({ point: "" });
    setItems(newItems);
};

const removePoint = (cardIdx: number, pointIdx: number) => {
    const newItems = [...items];
    newItems[cardIdx].points = newItems[cardIdx].points.filter((_, i) => i !== pointIdx);
    setItems(newItems);
};

const updateTitle = (idx: number, val: string) => {
    const newItems = [...items];
    newItems[idx].title = val;
    setItems(newItems);
};

const updatePoint = (cardIdx: number, pointIdx: number, val: string) => {
    const newItems = [...items];
    newItems[cardIdx].points[pointIdx].point = val;
    setItems(newItems);
};

return (
    <div className="w-full space-y-6 relative font-sans pb-24">
    {/* HEADER SECTION */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <Link href="/admin/pendidikan" className="hover:text-[#628B35]">Pendidikan Section</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Program Tahassus</span>
        </div>
        <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Tahassus</h1>
        </div>

        {!isEditing && (
        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-3 bg-[#628B35] text-white rounded-2xl font-bold text-xs hover:bg-[#103713] transition-all shadow-md">
            <Plus size={16} /> EDIT PROGRAM
        </button>
        )}
    </div>

    {/* MAIN CONTENT AREA */}
    <div className={`grid grid-cols-1 ${isEditing ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
        {items.map((item, idx) => (
        <div key={idx} className={`bg-white rounded-[2rem] border transition-all ${isEditing ? 'p-8 border-emerald-100 shadow-sm' : 'p-6 border-gray-100 shadow-sm hover:shadow-md'}`}>
            {isEditing ? (
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 flex-1">
                    <Type size={16} className="text-emerald-600" />
                    <input 
                    className="w-full text-lg font-black text-[#103713] outline-none border-b-2 border-transparent focus:border-emerald-500 py-1 uppercase"
                    value={item.title}
                    placeholder="NAMA PROGRAM (MISAL: BAHASA)"
                    onChange={(e) => updateTitle(idx, e.target.value)}
                    />
                </div>
                <button onClick={() => removeCard(idx)} className="ml-4 text-red-400 hover:text-red-600"><Trash2 size={20}/></button>
                </div>

                <div className="space-y-3 pt-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daftar Poin / Sub-Program</span>
                {item.points.map((p, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <input 
                        className="flex-1 text-sm font-medium text-gray-600 bg-gray-50 px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-emerald-300"
                        value={p.point}
                        placeholder="Contoh: Inggris"
                        onChange={(e) => updatePoint(idx, pIdx, e.target.value)}
                    />
                    <button onClick={() => removePoint(idx, pIdx)} className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all"><X size={14}/></button>
                    </div>
                ))}
                <button onClick={() => addPoint(idx)} className="flex items-center gap-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-2">
                    <PlusCircle size={14}/> TAMBAH POIN
                </button>
                </div>
            </div>
            ) : (
            <div className="h-full">
                <div className="flex items-center gap-3 mb-6">
                {/* Icon statis menyesuaikan gambar, bisa diubah dinamis jika mau */}
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold">
                    {item.title.charAt(0)}
                </div>
                <h3 className="text-xl font-black text-[#103713] leading-tight">{item.title}</h3>
                </div>
                <ul className="space-y-3">
                {item.points.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-emerald-200"></div>
                    {p.point}
                    </li>
                ))}
                </ul>
            </div>
            )}
        </div>
        ))}

        {isEditing && (
        <button onClick={addCard} className="border-2 border-dashed border-emerald-100 rounded-[2rem] p-8 flex flex-col items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-all min-h-[200px]">
            <Plus size={32} className="mb-2" />
            <span className="font-bold text-sm uppercase tracking-widest">Tambah Kartu Baru</span>
        </button>
        )}
    </div>

    {/* FLOATING ACTION BAR */}
    {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="bg-[#103713] p-2 rounded-full shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md">
            <button onClick={() => { setIsEditing(false); fetchTahassusData(); }} className="px-8 py-3 text-white/50 text-xs font-black hover:text-white transition-all">BATAL</button>
            <button disabled={isLoading} onClick={handleSave} className="flex items-center gap-3 px-10 py-3.5 bg-[#628B35] text-white rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all">
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18}/>}
            {isLoading ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
            </button>
        </div>
        </div>
    )}
    </div>
);
};

export default AdminTahassus;