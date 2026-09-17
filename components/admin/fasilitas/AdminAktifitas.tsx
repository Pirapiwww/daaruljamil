"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
Save, Plus, X, Loader2, Clock, ChevronRight, CalendarDays, Trash2
} from "lucide-react";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const AdminAktivitasKeseharian = () => {
const [selectedCabang, setSelectedCabang] = useState<"banten" | "bogor">("banten");
const [isLoading, setIsLoading] = useState(false);
const [isEditing, setIsEditing] = useState(false);

const currentFasilitasId = selectedCabang === "banten" ? 1 : 2;

const [items, setItems] = useState<{ 
    id?: number; 
    jam_Mulai: string; 
    jam_Selesai: string; 
    keterangan: string 
}[]>([]);

const fetchAktivitasData = async () => {
    try {
    const { data, error } = await supabase
        .from("Fasilitas_Aktifitas")
        .select("*")
        .eq("Fasilitas_Id", currentFasilitasId)
        .order('id', { ascending: true });

    if (error) throw error;

    const formattedData = (data || []).map(item => {
        const jamSplit = item.jam_Aktifitas ? item.jam_Aktifitas.split(" - ") : ["00:00", "00:00"];
        return {
        id: item.id,
        jam_Mulai: jamSplit[0] || "00:00",
        jam_Selesai: jamSplit[1] || "00:00",
        keterangan: item.keterangan || ""
        };
    });

    setItems(formattedData);
    } catch (err) {
    console.error("Fetch Error:", err);
    }
};

useEffect(() => {
    fetchAktivitasData();
    setIsEditing(false);
}, [selectedCabang]);

const handleSave = async () => {
    const validItems = items.filter(item => item.keterangan.trim() !== "");
    
    setIsLoading(true);
    Swal.fire({
        title: 'Menyimpan...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
    });

    try {
    await supabase
        .from("Fasilitas_Aktifitas")
        .delete()
        .eq("Fasilitas_Id", currentFasilitasId);

    const payload = validItems.map(item => ({
        jam_Aktifitas: `${item.jam_Mulai} - ${item.jam_Selesai}`,
        keterangan: item.keterangan.trim(),
        Fasilitas_Id: currentFasilitasId
    }));

    if (payload.length > 0) {
        const { error } = await supabase.from("Fasilitas_Aktifitas").insert(payload);
        if (error) throw error;
    }

    Swal.fire({
        title: 'Berhasil!',
        text: 'Jadwal aktivitas telah diperbarui.',
        icon: 'success',
        confirmButtonColor: '#7c3aed', 
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'px-10 py-2.5 rounded-xl font-bold'
        }
    });

    setIsEditing(false);
    fetchAktivitasData();
    } catch (err) {
    console.error(err);
    Swal.fire({ icon: 'error', title: 'Gagal Menyimpan' });
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="w-full space-y-6 relative font-sans">
    {/* HEADER SECTION */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <Link href="/admin/fasilitas" className="hover:text-[#628B35]">Fasilitas Section</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Aktivitas Keseharian</span>
        </div>
        <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Aktivitas Keseharian</h1>
        </div>

        <div className="flex flex-col items-end gap-3">
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
            {(["banten", "bogor"] as const).map((c) => (
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
            <Plus size={16} /> EDIT JADWAL
            </button>
        )}
        </div>
    </div>

    {/* MAIN CARD */}
    <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock size={24}/>
            </div>
            <h2 className="text-xl font-black text-[#103713] uppercase tracking-tight">
            {selectedCabang === "banten" ? "Pondok Pesantren Ardaniah Pusat - Banten" : "Rumah Tahfidz Pondok Pesantren Ardaniah - Bogor"}
            </h2>
        </div>
        
        {isEditing && (
            <button 
            onClick={() => setItems([...items, { jam_Mulai: "00:00", jam_Selesai: "00:00", keterangan: "" }])}
            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-[#628B35] rounded-xl font-bold text-xs hover:bg-gray-100"
            >
            <Plus size={16} /> TAMBAH BARIS
            </button>
        )}
        </div>

        <div className="flex flex-col">
        {items.length === 0 && !isEditing ? (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
            <CalendarDays className="text-gray-200 mx-auto mb-4" size={48} />
            <p className="text-gray-400 italic">Jadwal harian belum diatur.</p>
            </div>
        ) : (
            items.map((item, idx) => (
            <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-start md:items-center py-6 transition-all ${
                isEditing 
                    ? "bg-gray-50/50 mb-2 rounded-2xl px-6 border-b-0" 
                    : "bg-white border-b border-gray-100 last:border-0 hover:bg-emerald-50/20"
                }`}
            >
                {/* LOGIKA EDIT TANPA AM/PM */}
                <div className="w-full md:w-[220px] flex-shrink-0 mb-2 md:mb-0">
                {isEditing ? (
                    <div className="flex items-center gap-1 bg-white p-2 rounded-xl border border-gray-200 shadow-sm w-fit">
                    <input 
                        type="time" 
                        value={item.jam_Mulai}
                        step="60" // Memaksa format 24 jam di banyak browser
                        onChange={(e) => {
                        const newItems = [...items];
                        newItems[idx].jam_Mulai = e.target.value;
                        setItems(newItems);
                        }}
                        className="bg-transparent text-sm font-bold text-[#628B35] outline-none [appearance:textfield] [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                    <span className="text-gray-300">-</span>
                    <input 
                        type="time" 
                        value={item.jam_Selesai}
                        step="60"
                        onChange={(e) => {
                        const newItems = [...items];
                        newItems[idx].jam_Selesai = e.target.value;
                        setItems(newItems);
                        }}
                        className="bg-transparent text-sm font-bold text-[#628B35] outline-none [appearance:textfield] [&::-webkit-calendar-picker-indicator]:hidden"
                    />
                    </div>
                ) : (
                    <span className="text-[#628B35] font-black text-xl tracking-tighter">
                    {item.jam_Mulai} - {item.jam_Selesai}
                    </span>
                )}
                </div>

                <div className="flex-1 w-full flex items-center gap-4">
                {isEditing ? (
                    <>
                    <input
                        type="text"
                        className="w-full bg-white p-3 rounded-xl text-sm border border-gray-200 focus:ring-2 focus:ring-[#628B35] outline-none shadow-sm font-medium"
                        value={item.keterangan}
                        onChange={(e) => {
                        const newItems = [...items];
                        newItems[idx].keterangan = e.target.value;
                        setItems(newItems);
                        }}
                        placeholder="Deskripsi kegiatan..."
                    />
                    <button 
                        onClick={() => setItems(items.filter((_, i) => i !== idx))}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                        <Trash2 size={18} />
                    </button>
                    </>
                ) : (
                    <p className="text-[#103713] font-semibold text-[16px] leading-relaxed tracking-wide px-2">
                    {item.keterangan}
                    </p>
                )}
                </div>
            </div>
            ))
        )}
        </div>
    </div>

    {/* FLOATING ACTION BAR */}
    {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4 animate-in fade-in slide-in-from-bottom-5">
        <div className="bg-[#103713] p-2 rounded-full shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-md">
            <button 
            disabled={isLoading}
            onClick={() => {
                setIsEditing(false);
                fetchAktivitasData();
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

export default AdminAktivitasKeseharian;