"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  MapPin, Phone, Mail, Clock, Map, MessageCircle, 
  Save, Loader2, Edit3 as EditIcon, X as CloseIcon 
} from "lucide-react"; 
import Swal from "sweetalert2";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function AdminKontak() {
  // activeTab disesuaikan dengan isi kolom 'cabang' di tabel kontakCabang (case-sensitive)
  const [activeTab, setActiveTab] = useState<"Banten" | "Bogor">("Banten");
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    KontakId: null as number | null,
    Cabang_Id: null as number | null,
    title: "", 
    alamat: "", 
    telepon: "", 
    email: "",
    operasional: "", 
    link_maps: "", 
    link_wa: ""
  });

  const [opParts, setOpParts] = useState({
    startDay: "Senin", 
    endDay: "Jumat", 
    startTime: "08:00", 
    endTime: "16:00"
  });

  const fetchData = async (cabangName: string) => {
    setLoading(true);
    try {
      // 1. Ambil Cabang_Id dari tabel kontakCabang
      const { data: cabangData, error: cabangErr } = await supabase
        .from("kontakCabang")
        .select("Cabang_Id")
        .eq("cabang", cabangName)
        .single();

      if (cabangErr) throw cabangErr;

      // 2. Ambil data kontak berdasarkan Cabang_Id tersebut
      const { data: kontakData, error: kontakErr } = await supabase
        .from("kontak")
        .select("*")
        .eq("Cabang_Id", cabangData.Cabang_Id)
        .maybeSingle();

      if (kontakData) {
        setFormData(kontakData);
        // Jika ingin memecah string operasional ke input jam lagi, perlu logika parsing di sini
      } else {
        // Reset jika data belum ada di DB
        setFormData({
          KontakId: null,
          Cabang_Id: cabangData.Cabang_Id,
          title: `Pondok Pesantren Ardaniah - ${cabangName}`,
          alamat: "", telepon: "", email: "", operasional: "", 
          link_maps: "", link_wa: ""
        });
      }
    } catch (error: any) {
      console.error("Error fetching:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData(activeTab); 
    setIsFlipped(false); 
  }, [activeTab]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Gabungkan bagian operasional menjadi satu string
    const opString = `${opParts.startDay} - ${opParts.endDay} (${opParts.startTime} - ${opParts.endTime})`;

    const payload = { 
      ...formData, 
      operasional: opString 
    };

    // Hapus KontakId jika null agar tidak konflik dengan auto-increment DB
    if (payload.KontakId === null) {
      delete (payload as any).KontakId;
    }

    try {
      const { error } = await supabase
        .from("kontak")
        .upsert(payload, { onConflict: 'Cabang_Id' });
      
      if (error) throw error;

      // Sukses: Tutup form dulu baru tampilkan notifikasi
      setIsFlipped(false); 
      
      await Swal.fire({ 
        icon: 'success', 
        title: 'Berhasil Disimpan!', 
        text: `Informasi kontak ${activeTab} telah diperbarui.`,
        confirmButtonColor: '#103713' 
      });

      fetchData(activeTab);
    } catch (error: any) {
      Swal.fire({ 
        icon: 'error', 
        title: 'Gagal Menyimpan!', 
        text: error.message,
        confirmButtonColor: '#d33' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 relative"> 
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 ">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <span className="text-[#628B35] font-bold">Kontak Section</span>
          </div>
          <h1 className="mt-6 text-2xl font-black text-black uppercase tracking-tight">Manajemen Kontak</h1>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm w-fit">
          {(["Banten", "Bogor"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-8 py-2 rounded-xl font-bold text-xs uppercase transition-all duration-300 ${
                activeTab === t 
                ? "bg-[#103713] text-white shadow-md" 
                : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full [perspective:2000px]">
        <div className={`relative w-full transition-all duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>
          
          {/* FORM EDIT (BELAKANG) */}
          <div className={`relative [backface-visibility:hidden] [transform:rotateY(180deg)] w-full ${!isFlipped ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <div className="bg-gray-50 rounded-[2rem] border-2 border-[#628B35] shadow-2xl overflow-hidden flex flex-col">
              <div className="p-4 bg-white border-b flex justify-between items-center">
                <h3 className="font-black text-[#103713] uppercase flex items-center gap-2">
                  <EditIcon size={18} className="text-[#628B35]"/> Edit Cabang {activeTab}
                </h3>
                <button type="button" onClick={() => setIsFlipped(false)} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors">
                  <CloseIcon size={24} />
                </button>
              </div>
              <form onSubmit={handleUpdate} className="p-6 space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput label="Nama Lokasi / Title" value={formData.title} onChange={(v: string) => setFormData({...formData, title: v})} />
                  <FormInput label="Email Resmi" value={formData.email} onChange={(v: string) => setFormData({...formData, email: v})} />
                  <div className="md:col-span-2">
                    <FormInput label="Alamat Lengkap" value={formData.alamat} onChange={(v: string) => setFormData({...formData, alamat: v})} isTextArea />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4 shadow-sm">
                    <FormSelect label="Dari Hari" options={DAYS} value={opParts.startDay} onChange={(v: string) => setOpParts({...opParts, startDay: v})} />
                    <FormSelect label="Sampai Hari" options={DAYS} value={opParts.endDay} onChange={(v: string) => setOpParts({...opParts, endDay: v})} />
                    <FormTime label="Jam Buka" value={opParts.startTime} onChange={(v: string) => setOpParts({...opParts, startTime: v})} />
                    <FormTime label="Jam Tutup" value={opParts.endTime} onChange={(v: string) => setOpParts({...opParts, endTime: v})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput label="No. Telepon / HP" value={formData.telepon} onChange={(v: string) => setFormData({...formData, telepon: v})} />
                  <FormInput label="Link WhatsApp (Full URL)" value={formData.link_wa} onChange={(v: string) => setFormData({...formData, link_wa: v})} />
                  <div className="md:col-span-2">
                    <FormInput label="Link Google Maps (Iframe/URL)" value={formData.link_maps} onChange={(v: string) => setFormData({...formData, link_maps: v})} />
                  </div>
                </div>

                <button disabled={loading} type="submit" className="w-full py-4 bg-[#103713] text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all active:scale-[0.98] uppercase">
                  {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>

          {/* PREVIEW (DEPAN) */}
          <div className={`absolute inset-0 [backface-visibility:hidden] w-full h-full ${isFlipped ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            <div className="bg-white rounded-[2rem] border border-gray-200 shadow-xl overflow-hidden flex flex-col h-full">
              <div className="bg-[#103713] p-6 flex justify-between items-center text-white">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">{formData.title || "Nama Lokasi"}</h2>
                  <p className="text-[#628B35] text-[10px] font-bold tracking-widest mt-1 uppercase">Preview Informasi Aktif</p>
                </div>
                <button onClick={() => setIsFlipped(true)} className="bg-white/10 hover:bg-[#628B35] p-3 rounded-2xl border border-white/20 transition-all">
                  <EditIcon size={20} />
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white flex-grow content-start overflow-hidden">
                <InfoItem icon={<MapPin />} label="Alamat" value={formData.alamat} />
                <InfoItem icon={<Phone />} label="Telepon" value={formData.telepon} />
                <InfoItem icon={<Mail />} label="Email" value={formData.email} />
                <InfoItem icon={<Clock />} label="Operasional" value={formData.operasional} />
                <InfoItem icon={<Map />} label="Google Maps" value={formData.link_maps} isLink />
                <InfoItem icon={<MessageCircle />} label="WhatsApp" value={formData.link_wa} isLink />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-komponen tetap (Internal Helpers)
const InfoItem = ({ icon, label, value, isLink }: any) => (
  <div className="flex gap-4 text-left group overflow-hidden">
    <div className="w-12 h-12 shrink-0 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-[#628B35] group-hover:bg-[#103713] group-hover:text-white transition-all">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest leading-none">{label}</p>
      <p className="text-sm font-bold text-[#103713] break-words leading-tight line-clamp-2">
        {isLink ? (value ? "Link Aktif ✓" : "Belum diatur") : (value || "Belum diatur")}
      </p>
    </div>
  </div>
);

const FormInput = ({ label, value, onChange, isTextArea }: any) => (
  <div className="flex flex-col gap-1.5 text-left">
    <label className="text-[11px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
    {isTextArea ? (
      <textarea 
        required 
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full p-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#628B35] text-sm font-bold transition-all min-h-[100px] resize-none" 
      />
    ) : (
      <input 
        type="text" 
        required 
        value={value || ""} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full p-4 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#628B35] text-sm font-bold transition-all" 
      />
    )}
  </div>
);

const FormSelect = ({ label, options, value, onChange }: any) => (
  <div className="flex flex-col gap-1 text-left">
    <span className="text-[9px] font-bold text-gray-400 uppercase ml-1">{label}</span>
    <select 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="p-3 rounded-lg border border-gray-100 bg-gray-50 text-xs font-bold outline-none cursor-pointer focus:border-[#628B35] transition-all"
    >
      {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const FormTime = ({ label, value, onChange }: any) => (
  <div className="flex flex-col gap-1 text-left">
    <span className="text-[9px] font-bold text-gray-400 uppercase ml-1">{label}</span>
    <input 
      type="time" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      className="p-3 rounded-lg border border-gray-100 bg-gray-50 text-xs font-bold outline-none focus:border-[#628B35] transition-all" 
    />
  </div>
);