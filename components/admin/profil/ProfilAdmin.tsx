"use client";
import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
Edit3, History as HistoryIcon, Target, BarChart3, 
Save, Plus, CheckCircle2, X, Loader2 
} from "lucide-react";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const ProfilAdmin = () => {
const [selectedCabang, setSelectedCabang] = useState<"serang" | "bogor">("serang");
const [isEditing, setIsEditing] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const [profilId, setProfilId] = useState<number | null>(null);
const [sejarah, setSejarah] = useState("");
const [visi, setVisi] = useState("");
const [misi, setMisi] = useState<{ id?: number; VisiMisi: string }[]>([]);
const [stats, setStats] = useState<{ id?: number; title: string; stats: string }[]>([]);

const fetchProfilData = async () => {
    try {
    const { data, error } = await supabase
        .from("profil")
        .select(`*, VisiMisiProfil(*), ProfilStats(*)`)
        .eq("cabang", selectedCabang)
        .maybeSingle();

    if (data) {
        setProfilId(data.Profil_Id);
        setSejarah(data.sejarah || "");
        setStats(data.ProfilStats || []);
        setVisi(data.VisiMisiProfil?.find((v: any) => v.type === "visi")?.VisiMisi || "");
        setMisi(data.VisiMisiProfil?.filter((v: any) => v.type === "misi") || []);
    } else {
        setProfilId(null);
        setSejarah("");
        setStats([]);
        setVisi("");
        setMisi([]);
    }
    } catch (err) {
    console.error("Fetch Error:", err);
    }
};

useEffect(() => {
    fetchProfilData();
    setIsEditing(false);
}, [selectedCabang]);

const handleSave = async () => {
    setIsLoading(true);
    
    Swal.fire({
    title: 'Menyimpan Perubahan...',
    html: 'Sedang sinkronisasi data ke database',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading(); }
    });

    try {
    let currentProfilId = profilId;

    if (!currentProfilId) {
        const { data: newProfil, error: createError } = await supabase
        .from("profil")
        .insert([{ sejarah, cabang: selectedCabang }])
        .select()
        .single();
        
        if (createError) throw createError;
        currentProfilId = newProfil.Profil_Id;
        setProfilId(currentProfilId);
    } else {
        await supabase.from("profil").update({ sejarah }).eq("Profil_Id", currentProfilId);
    }

    await supabase.from("ProfilStats").delete().eq("Profil_Id", currentProfilId);
    const statsPayload = stats
        .filter(s => s.title && s.stats)
        .map(s => ({ title: s.title, stats: s.stats, Profil_Id: currentProfilId }));
    if (statsPayload.length > 0) await supabase.from("ProfilStats").insert(statsPayload);

    await supabase.from("VisiMisiProfil").delete().eq("Profil_Id", currentProfilId);
    const visiMisiPayload = [
        { VisiMisi: visi, type: "visi", Profil_Id: currentProfilId },
        ...misi.filter(m => m.VisiMisi).map(m => ({ VisiMisi: m.VisiMisi, type: "misi", Profil_Id: currentProfilId }))
    ];
    await supabase.from("VisiMisiProfil").insert(visiMisiPayload);

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
    fetchProfilData();
    } catch (err) {
    console.error(err);
    Swal.fire({
        icon: 'error',
        title: 'Gagal Menyimpan',
        text: 'Terjadi kesalahan sistem.',
        confirmButtonColor: '#103713'
    });
    } finally {
    setIsLoading(false);
    }
};

return (
    <div className="w-full space-y-6 ">
    {/* HEADER SECTION */}
    <div className="flex flex-col md:flex-row justify-between items-start">
        <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
                <span className="text-[#628B35] font-bold">Profil Section</span>
            </div>
            <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">
                {selectedCabang === "serang" 
                    ? "Pondok Pesantren Ardaniah - Serang" 
                    : "Rumah Tahfidz Pondok Pesantren Ardaniah - Bogor"}
            </h1>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
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
                <Edit3 size={16} /> EDIT PROFIL
                </button>
            )}
        </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><HistoryIcon size={24}/></div>
            <h2 className="text-xl font-black text-[#103713] uppercase tracking-tight">Sejarah</h2>
            </div>
            {isEditing ? (
            <textarea 
                className="w-full p-6 bg-gray-50 rounded-[2rem] border-none focus:ring-2 focus:ring-[#628B35] text-gray-600 leading-relaxed min-h-[300px] outline-none"
                value={sejarah}
                onChange={(e) => setSejarah(e.target.value)}
                placeholder="Contoh: Pondok Pesantren Ardaniah didirikan pada tahun... dengan tujuan untuk mencetak generasi Qur'ani yang berwawasan luas. Berawal dari sebuah bangunan kecil, kini telah berkembang menjadi..."
            />
            ) : (
            <p className={`leading-relaxed whitespace-pre-wrap ${!sejarah ? 'text-gray-300 italic' : 'text-gray-600'}`}>
                {sejarah || "Belum ada data sejarah. Ceritakan latar belakang berdirinya pondok di sini melalui tombol Edit."}
            </p>
            )}
        </div>

        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><BarChart3 size={24}/></div>
                <h2 className="text-xl font-black text-[#103713] uppercase tracking-tight">Statistik Profil</h2>
            </div>
            {isEditing && (
                <button onClick={() => setStats([...stats, { title: "", stats: "" }])} className="p-2 bg-gray-50 text-[#628B35] rounded-xl hover:bg-[#628B35] hover:text-white transition-all">
                <Plus size={24}/>
                </button>
            )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.length === 0 && !isEditing ? (
                <p className="text-gray-300 italic col-span-3 text-center py-4">Belum ada statistik (Contoh: Jumlah Santri, Pengajar, Gedung)</p>
            ) : (
                stats.map((s, idx) => (
                <div key={idx} className="p-6 rounded-[2rem] bg-[#F8FAFC] border border-gray-100 relative group">
                    {isEditing ? (
                    <div className="space-y-3">
                        <input className="w-full bg-white p-2 rounded-lg text-xs border border-gray-100 focus:outline-[#628B35]" value={s.title} onChange={(e) => { const n = [...stats]; n[idx].title = e.target.value; setStats(n); }} placeholder="Contoh: Total Santri" />
                        <input className="w-full bg-white p-2 rounded-lg text-lg font-bold border border-gray-100 focus:outline-[#628B35]" value={s.stats} onChange={(e) => { const n = [...stats]; n[idx].stats = e.target.value; setStats(n); }} placeholder="Contoh: 500+" />
                        <button onClick={() => setStats(stats.filter((_, i) => i !== idx))} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"><X size={12}/></button>
                    </div>
                    ) : (
                    <>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.title || "STATISTIK"}</p>
                        <p className="text-2xl font-black text-[#103713]">{s.stats || "0"}</p>
                    </>
                    )}
                </div>
                ))
            )}
            </div>
        </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-4 space-y-8">
        <div className="bg-[#103713] p-10 rounded-[3rem] shadow-2xl text-white">
            <div className="space-y-10">
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#628B35] uppercase font-black text-[10px]"><Target size={20} /> Visi</div>
                {isEditing ? (
                <textarea 
                    className="w-full bg-white/10 p-4 rounded-xl text-sm italic outline-none border border-white/20 focus:border-[#628B35]" 
                    value={visi} 
                    onChange={(e) => setVisi(e.target.value)} 
                    placeholder="Contoh: Menjadi pusat pendidikan Islam unggulan yang melahirkan ulama amilin dan teknokrat muttaqin." 
                />
                ) : (
                <p className="italic text-lg">{visi || "Visi lembaga belum diisi."}</p>
                )}
            </div>
            <div className="h-[1px] bg-white/10" />
            <div className="space-y-6">
                <div className="flex justify-between items-center uppercase font-black text-[10px] text-[#628B35]">
                <div className="flex items-center gap-2"><CheckCircle2 size={20} /> Misi</div>
                {isEditing && <button onClick={() => setMisi([...misi, { VisiMisi: "" }])} className="hover:text-white transition-colors"><Plus size={20}/></button>}
                </div>
                {misi.length === 0 && !isEditing ? (
                <p className="text-white/40 text-xs italic">Misi belum ditambahkan.</p>
                ) : (
                misi.map((m, idx) => (
                    <div key={idx} className="flex gap-2">
                    <span className="text-[#628B35] font-bold">0{idx+1}</span>
                    {isEditing ? (
                        <div className="flex-1 flex gap-2">
                        <input className="flex-1 bg-white/10 p-2 rounded-lg text-xs outline-none border border-white/5 focus:border-[#628B35]" value={m.VisiMisi} onChange={(e) => { const n = [...misi]; n[idx].VisiMisi = e.target.value; setMisi(n); }} placeholder="Contoh: Menyelenggarakan pendidikan formal berbasis pesantren." />
                        <button onClick={() => setMisi(misi.filter((_, i) => i !== idx))} className="hover:text-red-400 transition-colors"><X size={14}/></button>
                        </div>
                    ) : (
                        <p className="text-sm opacity-80">{m.VisiMisi}</p>
                    )}
                    </div>
                ))
                )}
            </div>
            </div>
        </div>
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
                fetchProfilData();
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

export default ProfilAdmin; 