"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import { 
  Save, Plus, X, Loader2, CheckCircle2, LayoutGrid, 
  Image as ImageIcon, Upload, Trash2 
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const AdminHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const HOME_ID = 1;

  // State Data
  const [posterLink, setPosterLink] = useState("");
  const [statsData, setStatsData] = useState<{ id?: number; title: string; stats: string }[]>([]);
  const [keunggulanList, setKeunggulanList] = useState<{ id?: number; keunggulan: string }[]>([]);

  // 1. Fetch Semua Data
  const fetchData = async () => {
    try {
      // Fetch Poster dari table home
      const { data: hData } = await supabase.from("home").select("poster_link").eq("Home_Id", HOME_ID).single();
      if (hData) setPosterLink(hData.poster_link || "");

      // Fetch Stats
      const { data: sData } = await supabase.from("homeStats").select("*").eq("Home_Id", HOME_ID).order('id', { ascending: true }).limit(4);
      setStatsData(sData || []);

      // Fetch Keunggulan
      const { data: kData } = await supabase.from("homeKeunggulan").select("*").eq("Home_Id", HOME_ID).order('id', { ascending: true });
      setKeunggulanList(kData || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // 2. Handle Upload Poster ke Bucket "home"
  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Swal.fire({
      title: 'Memproses Gambar...',
      html: 'Mengompres dan mengunggah poster',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      const options = { maxSizeMB: 0.5, maxWidthOrHeight: 1280, useWebWorker: true };
      const compressedBlob = await imageCompression(file, options);
      const finalFile = new File([compressedBlob], file.name, { type: file.type });

      const fileName = `poster-${Date.now()}.${file.name.split('.').pop()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('home')
        .upload(`main/${fileName}`, finalFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from('home').getPublicUrl(uploadData.path);
      setPosterLink(publicUrl);

      Swal.fire({ icon: 'success', title: 'Poster siap disimpan', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
    } catch (error: any) {
      Swal.fire("Gagal Upload", error.message, "error");
    }
  };

  // 3. Simpan Semua Perubahan (Poster, Stats, Keunggulan)
  const handleSave = async () => {
    setIsLoading(true);
    Swal.fire({ title: 'Menyimpan Semua Data...', allowOutsideClick: false, didOpen: () => { Swal.showLoading(); } });

    try {
      // Update Table Home (Poster)
      await supabase.from("home").update({ poster_link: posterLink }).eq("Home_Id", HOME_ID);

      // Sync homeStats
      await supabase.from("homeStats").delete().eq("Home_Id", HOME_ID);
      const sPayload = statsData.filter(s => s.title.trim() !== "").map(s => ({ title: s.title, stats: s.stats, Home_Id: HOME_ID }));
      if (sPayload.length > 0) await supabase.from("homeStats").insert(sPayload);

      // Sync homeKeunggulan
      await supabase.from("homeKeunggulan").delete().eq("Home_Id", HOME_ID);
      const kPayload = keunggulanList.filter(k => k.keunggulan.trim() !== "").map(k => ({ keunggulan: k.keunggulan, Home_Id: HOME_ID }));
      if (kPayload.length > 0) await supabase.from("homeKeunggulan").insert(kPayload);

      Swal.fire({ icon: 'success', title: 'Data Berhasil Diperbarui', timer: 2000, showConfirmButton: false });
      setIsEditing(false);
      fetchData();
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-12 relative pb-32">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <span className="text-[#628B35] font-bold">Home Section</span>
          </div>
          <h1 className="mt-6 text-2xl font-black text-black uppercase tracking-tight">Manajemen Poster, Statistik, dan Keunggulan</h1>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="px-10 py-4 bg-[#628B35] text-white rounded-2xl font-black text-xs hover:bg-[#103713] transition-all shadow-xl active:scale-95"
          >
            EDIT CONTENT
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* KIRI: POSTER MANAGEMENT */}
        <div className="lg:col-span-4 space-y-6">
           <h2 className="font-black text-[#103713] text-sm uppercase flex items-center gap-2">
            <ImageIcon size={18} className="text-[#628B35]" /> Poster Utama (Portrait)
          </h2>
          <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden bg-gray-100 border-8 border-white shadow-2xl group">
            {posterLink ? (
              <img src={posterLink} alt="Poster" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-xs">Belum ada poster</div>
            )}
            
            {isEditing && (
              <div className="absolute inset-0 bg-[#103713]/40 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity opacity-100">
                <label className="w-full flex flex-col items-center justify-center gap-3 bg-white py-8 rounded-[2.5rem] cursor-pointer shadow-2xl hover:scale-105 transition-transform">
                  <div className="p-4 bg-[#628B35]/10 rounded-full text-[#628B35]">
                    <Upload size={28} />
                  </div>
                  <span className="text-[11px] font-black uppercase text-[#103713] tracking-wider">Ganti Poster</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePosterUpload} />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* KANAN: STATS & KEUNGGULAN */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* STATS AREA */}
          <div className="space-y-6">
            <h2 className="font-black text-[#103713] text-sm uppercase flex items-center gap-2">
              <LayoutGrid size={18} className="text-[#628B35]" /> Statistik Kilat (Max 4)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((s, idx) => (
                <div key={idx} className="bg-[#103713] p-8 rounded-[2.5rem] text-center text-white relative shadow-xl overflow-hidden group">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input 
                        placeholder="1.200"
                        className="w-full bg-white/10 border-none rounded-xl text-center font-black text-3xl focus:ring-2 focus:ring-[#628B35]"
                        value={s.stats}
                        onChange={(e) => {
                          const newArr = [...statsData];
                          newArr[idx].stats = e.target.value;
                          setStatsData(newArr);
                        }}
                      />
                      <input 
                        placeholder="LABEL"
                        className="w-full bg-transparent border-none text-center font-bold text-[10px] uppercase tracking-[0.2em]"
                        value={s.title}
                        onChange={(e) => {
                          const newArr = [...statsData];
                          newArr[idx].title = e.target.value;
                          setStatsData(newArr);
                        }}
                      />
                      <button onClick={() => setStatsData(statsData.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-white/30 hover:text-red-400"><Trash2 size={16}/></button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-4xl font-black">{s.stats}</h3>
                      <p className="text-[9px] font-bold opacity-40 tracking-[0.3em] mt-2 uppercase">{s.title}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && statsData.length < 4 && (
                <button onClick={() => setStatsData([...statsData, { title: "", stats: "" }])} className="border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-gray-300 hover:border-[#628B35] hover:text-[#628B35] transition-all">
                  <Plus size={24} />
                </button>
              )}
            </div>
          </div>

          {/* KEUNGGULAN AREA */}
          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-black text-[#103713] uppercase">Keunggulan Pondok pesantren ardaniah</h2>
              {isEditing && (
                <button onClick={() => setKeunggulanList([...keunggulanList, { keunggulan: "" }])} className="p-3 bg-emerald-50 text-[#628B35] rounded-xl hover:bg-[#628B35] hover:text-white transition-all">
                  <Plus size={20} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keunggulanList.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-4 rounded-3xl border transition-all ${isEditing ? "bg-gray-50 border-gray-200" : "bg-white border-transparent hover:shadow-md"}`}>
                   <div className="w-8 h-8 bg-[#103713] text-white rounded-xl flex items-center justify-center font-black text-[10px] shrink-0">{idx + 1}</div>
                   {isEditing ? (
                     <div className="flex-1 flex items-center gap-2">
                       <input 
                        className="flex-1 bg-white p-2 rounded-lg text-sm font-semibold outline-none"
                        value={item.keunggulan}
                        onChange={(e) => {
                          const newList = [...keunggulanList];
                          newList[idx].keunggulan = e.target.value;
                          setKeunggulanList(newList);
                        }}
                       />
                       <button onClick={() => setKeunggulanList(keunggulanList.filter((_, i) => i !== idx))} className="text-red-400"><X size={18}/></button>
                     </div>
                   ) : (
                     <p className="text-gray-700 font-bold text-sm flex items-center gap-3">
                       <CheckCircle2 size={16} className="text-[#628B35]" /> {item.keunggulan}
                     </p>
                   )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4">
          <div className="bg-[#103713]/95 p-2 rounded-full shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl">
            <button 
              disabled={isLoading} 
              onClick={() => { setIsEditing(false); fetchData(); }} 
              className="px-8 py-3 text-white/50 text-xs font-black hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button 
              disabled={isLoading} 
              onClick={handleSave} 
              className="flex items-center gap-3 px-12 py-4 bg-[#628B35] text-white rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18}/>}
              SAVE CHANGES
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHome;