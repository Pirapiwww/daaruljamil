"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
Save, Plus, Loader2, Trash2, LayoutGrid, Type, Quote, Hash, AlertCircle 
} from "lucide-react";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface KelasItem {
id?: number;
title: string;
desc: string;
tag: string;
}

const AdminKelas = () => {
const [items, setItems] = useState<KelasItem[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [isEditing, setIsEditing] = useState(false);

// Fetch Data dari Tabel Kelas
const fetchKelasData = async () => {
    try {
    const { data, error } = await supabase
        .from("kelas")
        .select("*")
        .order('id', { ascending: true });

    if (error) throw error;
    setItems(data || []);
    } catch (err) {
    console.error("Fetch Error:", err);
    Swal.fire({ icon: 'error', title: 'Gagal memuat data' });
    }
};

useEffect(() => {
    fetchKelasData();
}, []);

// Handle Save (Sync ke Supabase)
const handleSave = async () => {
    const validItems = items.filter(item => item.title.trim() !== "");
    
    setIsLoading(true);
    Swal.fire({
    title: 'Menyimpan...',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); }
    });

    try {
    // 1. Hapus semua data lama untuk overwrite (Sesuai logika kode sebelumnya)
    // Catatan: Jika ingin update per-ID, logikanya perlu diubah ke upsert.
    const { error: deleteError } = await supabase.from("kelas").delete().neq("id", 0);
    if (deleteError) throw deleteError;

    // 2. Insert data baru
    const payload = validItems.map(({ title, desc, tag }) => ({
        title: title.trim(),
        desc: desc.trim(),
        tag: tag.trim() || "UMUM"
    }));

    if (payload.length > 0) {
        const { error: insertError } = await supabase.from("kelas").insert(payload);
        if (insertError) throw insertError;
    }

    Swal.fire({
        title: 'Berhasil!',
        text: 'Data kelas telah diperbarui.',
        icon: 'success',
        confirmButtonColor: '#628B35', 
    });

    setIsEditing(false);
    fetchKelasData();
    } catch (err: any) {
    console.error(err);
    Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: err.message });
    } finally {
    setIsLoading(false);
    }
};

const addItem = () => {
    setItems([...items, { title: "", desc: "", tag: "" }]);
};

const updateItem = (index: number, field: keyof KelasItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
};

const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
};

return (
    <div className="w-full space-y-6 relative font-sans pb-24">
    {/* HEADER SECTION */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <Link href="/admin/pendidikan" className="hover:text-[#628B35]">Pendidikan Section</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Kelas Pilihan</span>
        </div>
        <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Kelas Pilihan</h1>
        </div>

        {!isEditing && (
        <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#628B35] text-white rounded-2xl font-bold text-xs hover:bg-[#103713] transition-all shadow-md active:scale-95"
        >
            <Plus size={16} /> EDIT DATA KELAS
        </button>
        )}
    </div>

    {/* MAIN CONTENT AREA */}
    <div className="grid grid-cols-1 gap-6">
        {items.length === 0 && !isEditing ? (
        <div className="bg-white py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
            <LayoutGrid className="text-gray-200 mx-auto mb-4" size={48} />
            <p className="text-gray-400 italic">Belum ada data kelas yang ditambahkan.</p>
        </div>
        ) : (
        <div className={`grid grid-cols-1 ${isEditing ? 'gap-4' : 'md:grid-cols-2 lg:grid-cols-3 gap-6'}`}>
            {items.map((item, idx) => (
            <div 
                key={idx}
                className={`transition-all duration-300 ${
                isEditing 
                ? "bg-white p-6 rounded-3xl border-2 border-emerald-100 shadow-sm" 
                : "bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative group hover:shadow-xl hover:-translate-y-1"
                }`}
            >
                {isEditing ? (
                /* MODE EDIT FORM */
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Item #{idx + 1}</span>
                    <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                    </button>
                    </div>
                    
                    <div className="space-y-3">
                    <div className="relative">
                        <Hash className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                        type="text"
                        placeholder="Tag (Contoh: NASIONAL, AKADEMIK)"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#628B35] outline-none"
                        value={item.tag}
                        onChange={(e) => updateItem(idx, 'tag', e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Type className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input
                        type="text"
                        placeholder="Judul Kelas"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black focus:ring-2 focus:ring-[#628B35] outline-none"
                        value={item.title}
                        onChange={(e) => updateItem(idx, 'title', e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Quote className="absolute left-3 top-3 text-gray-400" size={16} />
                        <textarea
                        placeholder="Deskripsi program kelas..."
                        rows={3}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#628B35] outline-none"
                        value={item.desc}
                        onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                        />
                    </div>
                    </div>
                </div>
                ) : (
                /* MODE PREVIEW (Mirip Gambar) */
                <div className="h-full flex flex-col justify-between min-h-[200px]">
                    <div>
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-4xl font-black text-gray-100 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-md tracking-widest uppercase">
                        {item.tag || "UMUM"}
                        </span>
                    </div>
                    <h3 className="text-xl font-black text-[#103713] mb-3 leading-tight uppercase tracking-tight">
                        {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
                        {item.desc}
                    </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-50">
                    <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
                )}
            </div>
            ))}
            
            {isEditing && (
            <button 
                onClick={addItem}
                className="border-2 border-dashed border-emerald-200 rounded-3xl p-8 flex flex-col items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-all group"
            >
                <Plus size={32} className="group-hover:scale-125 transition-transform mb-2" />
                <span className="font-bold text-sm uppercase tracking-widest">Tambah Kelas Baru</span>
            </button>
            )}
        </div>
        )}
    </div>

    {/* FLOATING ACTION BAR */}
    {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4 animate-in fade-in slide-in-from-bottom-5">
        <div className="bg-[#103713] p-2 rounded-full shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md">
            <button 
            disabled={isLoading}
            onClick={() => {
                setIsEditing(false);
                fetchKelasData();
            }} 
            className="px-8 py-3 text-white/50 text-xs font-black hover:text-white transition-all disabled:opacity-50"
            >
            BATAL
            </button>
            <button 
            disabled={isLoading}
            onClick={handleSave} 
            className="flex items-center gap-3 px-10 py-3.5 bg-[#628B35] text-white rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18}/>}
            {isLoading ? "MENYIMPAN..." : "SIMPAN PERUBAHAN"}
            </button>
        </div>
        </div>
    )}
    </div>
);
};

export default AdminKelas;