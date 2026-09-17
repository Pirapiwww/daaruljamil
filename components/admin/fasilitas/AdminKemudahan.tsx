"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
Save, Plus, X, Loader2, CheckCircle2, ChevronRight, LayoutGrid
} from "lucide-react";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const AdminFasilitasKemudahan = () => {
const [selectedCabang, setSelectedCabang] = useState<"serang" | "bogor">("serang");
const [isLoading, setIsLoading] = useState(false);
const [isEditing, setIsEditing] = useState(false);

// Mapping ID: Serang = 1, Bogor = 2 sesuai instruksi
const currentFasilitasId = selectedCabang === "serang" ? 1 : 2;

const [items, setItems] = useState<{ id?: number; kemudahan: string }[]>([]);

// 1. Fetch Data berdasarkan Fasilitas_Id
const fetchFasilitasData = async () => {
    try {
    const { data, error } = await supabase
        .from("Fasilitas_Kemudahan")
        .select("*")
        .eq("Fasilitas_Id", currentFasilitasId)
        .order('id', { ascending: true });

    if (error) throw error;
    setItems(data || []);
    } catch (err) {
    console.error("Fetch Error:", err);
    }
};

useEffect(() => {
    fetchFasilitasData();
    setIsEditing(false);
}, [selectedCabang]);

// 2. Simpan Perubahan (Delete & Re-insert untuk menjaga sinkronisasi daftar)
const handleSave = async () => {
    setIsLoading(true);
    
    Swal.fire({
    title: 'Menyimpan...',
    html: 'Memperbarui daftar fasilitas & kemudahan',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); }
    });

    try {
    // Hapus data lama untuk cabang aktif
    const { error: deleteError } = await supabase
        .from("Fasilitas_Kemudahan")
        .delete()
        .eq("Fasilitas_Id", currentFasilitasId);

    if (deleteError) throw deleteError;

    // Filter inputan kosong
    const payload = items
        .filter(item => item.kemudahan.trim() !== "")
        .map(item => ({
        kemudahan: item.kemudahan,
        Fasilitas_Id: currentFasilitasId
        }));

    if (payload.length > 0) {
        const { error: insertError } = await supabase
        .from("Fasilitas_Kemudahan")
        .insert(payload);
        
        if (insertError) throw insertError;
    }

    Swal.fire({
        icon: 'success',
        title: 'Berhasil Disimpan',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    setIsEditing(false);
    fetchFasilitasData();
    } catch (err) {
    console.error(err);
    Swal.fire({ 
        icon: 'error', 
        title: 'Gagal Menyimpan',
        text: 'Pastikan ID Fasilitas 1 & 2 sudah ada di tabel induk.'
    });
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="w-full space-y-6 relative">
    {/* HEADER SECTION DENGAN BREADCRUMB */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <Link href="/admin/fasilitas" className="hover:text-[#628B35]">Fasilitas Section</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Fasilitas & Kemudahan</span>
        </div>
        
            <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Fasilitas & Kemudahan</h1>

        </div>

        <div className="flex flex-col items-end gap-3">
        {/* Cabang Switcher */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
            {(["serang", "bogor"] as const).map((c) => (
            <button
                key={c}
                disabled={isEditing}
                onClick={() => setSelectedCabang(c)}
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase transition-all duration-300 ${
                selectedCabang === c 
                    ? "bg-[#103713] text-white shadow-lg" 
                    : "text-gray-400 hover:text-[#103713] disabled:opacity-30"
                }`}
            >
                {c}
            </button>
            ))}
        </div>
        {!isEditing && (
            <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#628B35] text-white rounded-2xl font-bold text-xs hover:bg-[#103713] transition-all shadow-md active:scale-95"
            >
            <Plus size={16} /> EDIT DATA
            </button>
        )}
        </div>
    </div>

    {/* MAIN CONTENT AREA */}
    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <LayoutGrid size={24}/>
            </div>
            <div>
            <h2 className="text-xl font-black text-[#103713] uppercase tracking-tight">
                {selectedCabang === "serang" ? "Pondok Pesantren Ardaniah - Serang" : "Rumah Tahfidz Pondok Pesantren Ardaniah - Bogor"}
            </h2>
            </div>
        </div>
        
        {isEditing && (
            <button 
            onClick={() => setItems([...items, { kemudahan: "" }])}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-[#628B35] rounded-xl font-bold text-xs hover:bg-[#628B35] hover:text-white transition-all shadow-sm"
            >
            <Plus size={16} /> TAMBAH POIN
            </button>
        )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 && !isEditing ? (
            <div className="col-span-2 py-16 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="text-gray-300" />
            </div>
            <p className="text-gray-400 italic font-medium">Belum ada data fasilitas untuk cabang ini.</p>
            <p className="text-[10px] text-gray-300 uppercase mt-1">Klik tombol Edit Data untuk menambahkan</p>
            </div>
        ) : (
            items.map((item, idx) => (
            <div 
                key={idx} 
                className={`group flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                isEditing 
                    ? "bg-gray-50 border-gray-200 shadow-inner" 
                    : "bg-white border-transparent hover:border-emerald-100 hover:shadow-lg hover:shadow-emerald-900/5"
                }`}
            >
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-[#628B35] rounded-full flex items-center justify-center font-black text-xs">
                {idx + 1}
                </div>
                
                {isEditing ? (
                <div className="flex-1 flex items-center gap-2">
                    <input
                    type="text"
                    className="flex-1 bg-white p-2.5 rounded-xl text-sm border-none focus:ring-2 focus:ring-[#628B35] outline-none shadow-sm"
                    value={item.kemudahan}
                    onChange={(e) => {
                        const newItems = [...items];
                        newItems[idx].kemudahan = e.target.value;
                        setItems(newItems);
                    }}
                    placeholder="Contoh: Makan disediakan 3x sehari..."
                    />
                    <button 
                    onClick={() => setItems(items.filter((_, i) => i !== idx))}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    >
                    <X size={18} />
                    </button>
                </div>
                ) : (
                <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500 opacity-40" />
                    <p className="text-gray-700 font-semibold text-sm leading-snug">{item.kemudahan}</p>
                </div>
                )}
            </div>
            ))
        )}
        </div>
    </div>

    {/* FLOATING ACTION BAR */}
    {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4">
        <div className="bg-[#103713] p-2 rounded-full shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md">
            <button 
            disabled={isLoading}
            onClick={() => {
                setIsEditing(false);
                fetchFasilitasData();
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

export default AdminFasilitasKemudahan;