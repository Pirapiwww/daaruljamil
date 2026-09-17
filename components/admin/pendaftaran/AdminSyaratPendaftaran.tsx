"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
  Save, Plus, Loader2, Trash2, FileText, CheckCircle2, Info, ArrowRight
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

// Interface sesuai struktur DB
interface SyaratItem {
  id: number;
  syarat: string;
}

interface SyaratCategory {
  SyaratId?: number;
  title: string;
  desc: string; // Digunakan untuk sub-header (misal: "WAJIB BAGI SEMUA SANTRI")
  note: string; // Digunakan untuk catatan kaki/footer (hijau muda di gambar)
  items: SyaratItem[];
}

const AdminSyaratPendaftaran = () => {
  const [categories, setCategories] = useState<SyaratCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      // Ambil data Syarat (Parent)
      const { data: syaratData, error: err1 } = await supabase
        .from("Syarat")
        .select("*")
        .order("SyaratId", { ascending: true });

      // Ambil data SyaratPendaftaran (Child)
      const { data: itemsData, error: err2 } = await supabase
        .from("SyaratPendaftaran")
        .select("*")
        .order("id", { ascending: true });

      if (err1 || err2) throw err1 || err2;

      // Gabungkan data berdasarkan SyaratId
      const formattedData = (syaratData || []).map((cat) => ({
        ...cat,
        items: (itemsData || []).filter((item) => item.SyaratId === cat.SyaratId),
      }));

      setCategories(formattedData);
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
      // 1. Hapus semua data lama (Sesuai pola kode sebelumnya)
      // Karena ada ON DELETE CASCADE di DB, menghapus Syarat akan menghapus SyaratPendaftaran
      await supabase.from("Syarat").delete().neq("SyaratId", 0);

      // 2. Loop untuk insert data baru
      for (const cat of categories) {
        if (cat.title.trim() === "") continue;

        // Insert Parent
        const { data: newCat, error: catErr } = await supabase
          .from("Syarat")
          .insert([{ title: cat.title, desc: cat.desc, note: cat.note }])
          .select()
          .single();

        if (catErr) throw catErr;

        // Insert Children
        const validItems = cat.items
          .filter(i => i.syarat.trim() !== "")
          .map(i => ({ SyaratId: newCat.SyaratId, syarat: i.syarat }));

        if (validItems.length > 0) {
          const { error: itemErr } = await supabase.from("SyaratPendaftaran").insert(validItems);
          if (itemErr) throw itemErr;
        }
      }

      Swal.fire({ title: 'Berhasil!', text: 'Syarat pendaftaran telah diperbarui.', icon: 'success' });
      setIsEditing(false);
      fetchData();
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Gagal Menyimpan', text: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = () => {
    setCategories([...categories, { title: "", desc: "", note: "", items: [] }]);
  };

  const addItem = (catIdx: number) => {
    const newCats = [...categories];
    newCats[catIdx].items.push({ id: Date.now(), syarat: "" });
    setCategories(newCats);
  };

  return (
    <div className="w-full space-y-12 relative font-sans pb-32">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <Link href="/admin/pendaftaran" className="hover:text-[#628B35]">Pendaftaran Section</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Syarat Pendaftaran</span>
          </div>
          <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Syarat</h1>
        </div>

        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-3 bg-[#628B35] text-white rounded-2xl font-bold text-xs hover:bg-[#103713] transition-all shadow-md">
            <Plus size={16} /> EDIT SYARAT
          </button>
        )}
      </div>

      {/* CARDS CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className={`bg-white rounded-[2.5rem] border-2 p-8 transition-all ${isEditing ? 'border-emerald-200' : 'border-gray-100 shadow-sm'}`}>
            
            {/* Category Header */}
            <div className="flex gap-4 mb-6">
              <div className="w-12 h-12 bg-[#103713] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <FileText size={24} />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <input 
                      className="w-full text-xl font-black text-[#103713] uppercase outline-none border-b border-gray-100 focus:border-emerald-500"
                      value={cat.title}
                      placeholder="JUDUL (Misal: PERSYARATAN UMUM)"
                      onChange={(e) => {
                        const n = [...categories]; n[catIdx].title = e.target.value; setCategories(n);
                      }}
                    />
                    <input 
                      className="w-full text-[10px] font-bold text-emerald-600 uppercase tracking-widest outline-none"
                      value={cat.desc}
                      placeholder="SUB-TITLE (Misal: WAJIB BAGI SEMUA SANTRI)"
                      onChange={(e) => {
                        const n = [...categories]; n[catIdx].desc = e.target.value; setCategories(n);
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-black text-[#103713] uppercase leading-tight">{cat.title || "Tanpa Judul"}</h2>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{cat.desc}</p>
                  </>
                )}
              </div>
              {isEditing && (
                <button onClick={() => setCategories(categories.filter((_, i) => i !== catIdx))} className="text-red-400 p-1 hover:bg-red-50 rounded-full h-fit">
                  <Trash2 size={18}/>
                </button>
              )}
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-8">
              {cat.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex items-start gap-3 group">
                  <div className="mt-1">
                    {cat.title.toLowerCase().includes('excellent') ? 
                      <ArrowRight size={16} className="text-gray-300" /> : 
                      <CheckCircle2 size={16} className="text-gray-300" />
                    }
                  </div>
                  
                  {isEditing ? (
                    <div className="flex-1 flex gap-2">
                      <textarea 
                        className="flex-1 text-sm font-medium text-gray-600 bg-gray-50 p-2 rounded-lg outline-none focus:ring-1 focus:ring-emerald-200"
                        value={item.syarat}
                        rows={1}
                        onChange={(e) => {
                          const n = [...categories]; n[catIdx].items[itemIdx].syarat = e.target.value; setCategories(n);
                        }}
                      />
                      <button onClick={() => {
                        const n = [...categories]; n[catIdx].items.splice(itemIdx, 1); setCategories(n);
                      }} className="text-gray-300 hover:text-red-400">
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold text-gray-700 leading-relaxed">{item.syarat}</p>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button onClick={() => addItem(catIdx)} className="w-full py-2 border border-dashed border-emerald-200 rounded-xl text-emerald-600 text-[10px] font-bold uppercase hover:bg-emerald-50 transition-all">
                  + Tambah Poin Syarat
                </button>
              )}
            </div>

            {/* Note/Footer Section (Box Hijau di Gambar) */}
            {(isEditing || cat.note) && (
              <div className={`p-4 rounded-2xl border ${isEditing ? 'bg-white border-emerald-100' : 'bg-emerald-50/50 border-emerald-100/50'}`}>
                {isEditing ? (
                  <div className="flex gap-2">
                    <Info size={14} className="text-emerald-600 shrink-0 mt-1" />
                    <textarea 
                      className="w-full text-[11px] italic text-emerald-700 bg-transparent outline-none"
                      value={cat.note}
                      placeholder="Catatan tambahan (Opsional, muncul di kotak bawah)..."
                      onChange={(e) => {
                        const n = [...categories]; n[catIdx].note = e.target.value; setCategories(n);
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-[11px] italic text-emerald-700 leading-relaxed">
                    * {cat.note}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {isEditing && (
          <button onClick={addCategory} className="border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-gray-400 hover:text-[#628B35] hover:bg-emerald-50 hover:border-emerald-200 transition-all">
            <Plus size={48} />
            <span className="font-black uppercase tracking-widest mt-4">Tambah Kategori Syarat</span>
          </button>
        )}
      </div>

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

export default AdminSyaratPendaftaran;