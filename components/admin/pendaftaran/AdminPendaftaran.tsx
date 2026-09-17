"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
  Save, Plus, Loader2, Trash2, Calendar, MessageCircleQuestion, 
  Send, ExternalLink, Clock
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

// --- INTERFACES UNTUK TYPING ---
interface PendaftaranDasar {
  id?: number;
  tahun_ajaran: string;
  gelombang: string;
  link_pendaftaran: string;
}

interface AlurItem {
  id?: number;
  title: string;
  tanggal: string;
  desc: string;
  _start?: string; // Helper state sementara
  _end?: string;   // Helper state sementara
}

interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

const AdminPendaftaranSistem = () => {
  const [pendaftaran, setPendaftaran] = useState<PendaftaranDasar>({ 
    tahun_ajaran: "", 
    gelombang: "", 
    link_pendaftaran: "" 
  });
  const [alur, setAlur] = useState<AlurItem[]>([]);
  const [faq, setFaq] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Helper untuk format tanggal ke teks Indonesia
  const formatTanggalRange = (start?: string, end?: string): string => {
    if (!start) return "";
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const date1 = new Date(start).toLocaleDateString('id-ID', options);
    
    if (!end || start === end) return date1;
    
    const date2 = new Date(end).toLocaleDateString('id-ID', options);
    return `${date1} - ${date2}`;
  };

  const fetchData = async () => {
    try {
      const { data: pData } = await supabase.from("Pendaftaran").select("*").maybeSingle();
      const { data: aData } = await supabase.from("PendaftaranAlur").select("*").order("id", { ascending: true });
      const { data: fData } = await supabase.from("PendaftaranFAQ").select("*").order("id", { ascending: true });

      if (pData) setPendaftaran(pData);
      setAlur(aData || []);
      setFaq(fData || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    Swal.fire({ 
      title: 'Menyimpan...', 
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading() 
    });

    try {
      // 1. Save Pendaftaran Dasar
      const { error: pErr } = await supabase.from("Pendaftaran").upsert({ 
        id: pendaftaran.id || undefined,
        tahun_ajaran: pendaftaran.tahun_ajaran,
        gelombang: pendaftaran.gelombang,
        link_pendaftaran: pendaftaran.link_pendaftaran
      });
      if (pErr) throw pErr;

      // 2. Save Alur (Hapus lama, Insert baru untuk menjaga urutan)
      await supabase.from("PendaftaranAlur").delete().neq("id", 0);
      if (alur.length > 0) {
        const cleanAlur = alur.map(({ title, tanggal, desc }) => ({ title, tanggal, desc }));
        const { error: aErr } = await supabase.from("PendaftaranAlur").insert(cleanAlur);
        if (aErr) throw aErr;
      }

      // 3. Save FAQ
      await supabase.from("PendaftaranFAQ").delete().neq("id", 0);
      if (faq.length > 0) {
        const cleanFaq = faq.map(({ question, answer }) => ({ question, answer }));
        const { error: fErr } = await supabase.from("PendaftaranFAQ").insert(cleanFaq);
        if (fErr) throw fErr;
      }

      Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Data pendaftaran telah diperbarui.' });
      setIsEditing(false);
      fetchData();
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: err.message });
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
            <Link href="/admin/dashboard" className="hover:text-[#628B35]">Dashboard</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Informasi Pendaftaran</span>
          </div>
          <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Alur & FAQ</h1>
        </div>

        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center gap-2 px-6 py-3 bg-[#628B35] text-white rounded-2xl font-bold text-xs hover:bg-[#103713] transition-all shadow-md"
          >
            <Plus size={16} /> EDIT INFORMASI
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* SISI KIRI: ALUR TAHAPAN & FAQ */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* BAGIAN ALUR */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#103713] flex items-center gap-2 uppercase tracking-tighter">
              <Clock className="text-[#628B35]" size={24} /> Prosedur & Alur
            </h2>
            
            <div className="space-y-6">
              {alur.map((item, idx) => (
                <div key={idx} className="relative bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm group">
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-[#628B35] text-white text-[10px] font-black rounded-full shadow-lg">
                    TAHAPAN {idx + 1}
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-between gap-4">
                        <input 
                          className="flex-1 text-xl font-black text-[#103713] border-b border-gray-100 outline-none focus:border-[#628B35] uppercase" 
                          placeholder="Judul Tahapan (Misal: Tes Wawancara)"
                          value={item.title}
                          onChange={(e) => {
                            const newAlur = [...alur];
                            newAlur[idx].title = e.target.value;
                            setAlur(newAlur);
                          }}
                        />
                        <button onClick={() => setAlur(alur.filter((_, i) => i !== idx))} className="text-red-400 hover:bg-red-50 p-2 rounded-full transition-colors">
                          <Trash2 size={18}/>
                        </button>
                      </div>
                      
                      {/* DATE PICKER LOGIC */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl border border-dashed border-gray-200">
                        <div>
                          <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase">Mulai / Tanggal Tunggal</label>
                          <input 
                            type="date" 
                            className="w-full text-xs font-bold p-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#628B35]/20"
                            onChange={(e) => {
                                const val = e.target.value;
                                const newAlur = [...alur];
                                newAlur[idx]._start = val;
                                newAlur[idx].tanggal = formatTanggalRange(val, newAlur[idx]._end);
                                setAlur(newAlur);
                            }}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-gray-400 block mb-1 uppercase">Selesai (Kosongkan jika 1 hari)</label>
                          <input 
                            type="date" 
                            className="w-full text-xs font-bold p-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#628B35]/20"
                            onChange={(e) => {
                                const val = e.target.value;
                                const newAlur = [...alur];
                                newAlur[idx]._end = val;
                                newAlur[idx].tanggal = formatTanggalRange(newAlur[idx]._start, val);
                                setAlur(newAlur);
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-black text-[#628B35] bg-emerald-50 w-fit px-3 py-1 rounded-lg">
                         <Calendar size={14}/> TERFORMAT: {item.tanggal || "Belum ditentukan"}
                      </div>

                      <textarea 
                        className="w-full text-sm font-medium p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#628B35]/20" 
                        placeholder="Tulis deskripsi detail tahapan di sini..."
                        rows={3}
                        value={item.desc}
                        onChange={(e) => {
                          const newAlur = [...alur];
                          newAlur[idx].desc = e.target.value;
                          setAlur(newAlur);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-2xl font-black text-[#103713] uppercase italic tracking-tight">{item.title}</h3>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-[#103713]/5 rounded-xl border border-[#103713]/10 text-[#103713]">
                          <Calendar size={14} className="text-[#628B35]" />
                          <span className="text-xs font-bold">{item.tanggal}</span>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-500 leading-relaxed text-justify">{item.desc}</p>
                    </div>
                  )}
                </div>
              ))}

              {isEditing && (
                <button 
                  onClick={() => setAlur([...alur, { title: "", tanggal: "", desc: "" }])} 
                  className="w-full py-6 border-4 border-dashed border-gray-100 rounded-[2.5rem] text-[#628B35] font-black text-xs uppercase hover:bg-emerald-50 hover:border-emerald-100 transition-all"
                >
                  + Tambah Tahapan Baru
                </button>
              )}
            </div>
          </div>

          {/* BAGIAN FAQ */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-[#103713] flex items-center gap-2 uppercase tracking-tighter">
              <MessageCircleQuestion className="text-[#628B35]" size={24} /> FAQ Pendaftaran
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faq.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-3">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black text-[#628B35] uppercase tracking-widest">Pertanyaan</span>
                         <button onClick={() => setFaq(faq.filter((_, i) => i !== idx))} className="text-red-400 p-1 hover:bg-red-50 rounded-full">
                           <Trash2 size={14}/>
                         </button>
                      </div>
                      <input 
                        className="w-full text-sm font-bold p-2.5 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-100" 
                        value={item.question}
                        onChange={(e) => {
                          const newFaq = [...faq];
                          newFaq[idx].question = e.target.value;
                          setFaq(newFaq);
                        }}
                      />
                      <span className="text-[10px] font-black text-[#628B35] uppercase tracking-widest block">Jawaban</span>
                      <textarea 
                        className="w-full text-xs font-medium p-2.5 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-100" 
                        value={item.answer}
                        rows={2}
                        onChange={(e) => {
                          const newFaq = [...faq];
                          newFaq[idx].answer = e.target.value;
                          setFaq(newFaq);
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <h4 className="text-sm font-black text-[#103713]/80 italic leading-snug">{item.question}</h4>
                      <p className="text-xs font-medium text-gray-500 leading-relaxed">{item.answer}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <button 
                  onClick={() => setFaq([...faq, { question: "", answer: "" }])} 
                  className="p-8 border-4 border-dashed border-gray-100 rounded-[2rem] text-[#628B35] font-black text-[10px] uppercase hover:bg-emerald-50 transition-all"
                >
                  + Tambah FAQ
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SISI KANAN: STATUS KARTU (Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
          <div className="bg-[#103713] p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Send size={28} className="text-[#628B35]" />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl font-black uppercase leading-none tracking-tighter">Status<br/>Penerimaan</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-white/40 block mb-1 uppercase tracking-widest">Tahun Ajaran</label>
                    {isEditing ? (
                      <input 
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm font-bold outline-none focus:border-[#628B35] focus:bg-white/10"
                        value={pendaftaran.tahun_ajaran}
                        placeholder="Contoh: 2026/2027"
                        onChange={(e) => setPendaftaran({...pendaftaran, tahun_ajaran: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm font-black tracking-tight">{pendaftaran.tahun_ajaran || "Belum diatur"}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="text-[10px] font-black text-white/40 block mb-1 uppercase tracking-widest">Gelombang Aktif</label>
                    {isEditing ? (
                      <input 
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm font-bold outline-none focus:border-[#628B35] focus:bg-white/10"
                        value={pendaftaran.gelombang}
                        placeholder="Contoh: Gelombang 2"
                        onChange={(e) => setPendaftaran({...pendaftaran, gelombang: e.target.value})}
                      />
                    ) : (
                      <div className="inline-block px-4 py-1.5 bg-[#628B35] rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {pendaftaran.gelombang || "N/A"}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-white/40 block mb-1 uppercase tracking-widest">Link Google Form</label>
                    {isEditing ? (
                      <input 
                        className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-sm font-bold outline-none focus:border-[#628B35] focus:bg-white/10"
                        value={pendaftaran.link_pendaftaran}
                        placeholder="https://docs.google.com/forms/..."
                        onChange={(e) => setPendaftaran({...pendaftaran, link_pendaftaran: e.target.value})}
                      />
                    ) : (
                      <Link 
                        href={pendaftaran.link_pendaftaran || "#"} 
                        target="_blank" 
                        className="text-xs text-[#628B35] font-black flex items-center gap-1 hover:brightness-125 transition-all truncate"
                      >
                        {pendaftaran.link_pendaftaran ? "Lihat Formulir Aktif" : "Belum Ada Link"} <ExternalLink size={14}/>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {!isEditing && (
                <div className="pt-6 border-t border-white/10">
                   <p className="text-[10px] text-white/30 font-bold italic leading-relaxed">
                    * Perubahan pada kolom ini akan langsung merubah tampilan kartu "Daftar Sekarang" di halaman publik.
                  </p>
                </div>
              )}
            </div>
            {/* Aksen visual */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#628B35]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-900/40 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* FLOATING ACTION BAR */}
      {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#103713] p-2.5 rounded-full shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-lg">
            <button 
              onClick={() => { setIsEditing(false); fetchData(); }} 
              className="px-8 py-3 text-white/50 text-xs font-black hover:text-white transition-all tracking-widest"
            >
              BATAL
            </button>
            <button 
              disabled={isLoading} 
              onClick={handleSave} 
              className="flex items-center gap-3 px-10 py-4 bg-[#628B35] text-white rounded-full font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_-10px_#628B35] disabled:opacity-50"
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

export default AdminPendaftaranSistem;