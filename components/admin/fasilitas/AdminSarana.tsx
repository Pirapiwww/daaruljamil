"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";
import { 
  Save, Plus, X, Loader2, ChevronRight, Image as ImageIcon, 
  Trash2, Upload, ChevronLeft, PlusCircle, AlertCircle, Info, Edit3
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const AdminSaranaPrasarana = () => {
  const [selectedCabang, setSelectedCabang] = useState<"serang" | "bogor">("serang");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); 
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [saranaGroups, setSaranaGroups] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 3; 

  const currentFasilitasId = selectedCabang === "serang" ? 1 : 2;

  // --- FETCH DATA ---
  const fetchSaranaData = async () => {
    setIsFetching(true); 
    try {
      const { data, error } = await supabase
        .from("Fasilitas_Sarana_Title")
        .select(`
          Sarana_Title_Id,
          title,
          Fasilitas_Sarana (
            Sarana_Id,
            image_link
          )
        `)
        .eq("Fasilitas_Id", currentFasilitasId)
        .order('Sarana_Title_Id', { ascending: true });

      if (error) throw error;
      setSaranaGroups(data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsFetching(false); 
    }
  };

  useEffect(() => {
    setSaranaGroups([]); 
    fetchSaranaData();
    setIsEditing(false);
    setCurrentPage(1);
  }, [selectedCabang]);

  // --- KATEGORI ---
  const handleAddCategory = () => {
    const newGroups = [...saranaGroups, { title: "", Fasilitas_Sarana: [], isNew: true }];
    setSaranaGroups(newGroups);
    const targetPage = Math.ceil(newGroups.length / groupsPerPage);
    setCurrentPage(targetPage);
    
    Swal.fire({
      icon: 'info',
      title: 'Kategori baru ditambahkan di baris terakhir',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    });
  };

  // --- PAGINATION LOGIC ---
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = saranaGroups.slice(indexOfFirstGroup, indexOfLastGroup);
  const totalPages = Math.ceil(saranaGroups.length / groupsPerPage);

  const updateLocalTitle = (indexInCurrent: number, newTitle: string) => {
    const actualIndex = indexOfFirstGroup + indexInCurrent;
    const next = [...saranaGroups];
    next[actualIndex].title = newTitle;
    setSaranaGroups(next);
  };

  // --- UPLOAD ---
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, titleId: number, currentCount: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (currentCount >= 5) {
      Swal.fire({ icon: 'error', title: 'Batas Tercapai', text: 'Maksimal 5 gambar per kategori.' });
      return;
    }

    setUploadingId(titleId);
    Swal.fire({ title: 'Mengunggah...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

    try {
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
      const { error: uploadError } = await supabase.storage.from("fasilitas").upload(`sarana/${fileName}`, file);
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("fasilitas").getPublicUrl(`sarana/${fileName}`);
      await supabase.from("Fasilitas_Sarana").insert([{ image_link: publicUrl, Sarana_Title_Id: titleId }]);

      await fetchSaranaData();
      Swal.fire({ icon: 'success', title: 'Berhasil diunggah', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: error.message });
    } finally { setUploadingId(null); }
  };

  // --- DELETE ---
  const deleteSarana = async (item: any) => {
    const result = await Swal.fire({ title: 'Hapus Foto Sarana?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33' });
    if (result.isConfirmed) {
      Swal.fire({ title: 'Menghapus...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      try {
        const fileName = item.image_link.split('/').pop();
        await supabase.storage.from("fasilitas").remove([`sarana/${fileName}`]);
        await supabase.from("Fasilitas_Sarana").delete().eq("Sarana_Id", item.Sarana_Id);
        await fetchSaranaData();
        Swal.fire({ icon: 'success', title: 'Terhapus', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
      } catch (err) { Swal.fire({ icon: 'error', title: 'Gagal Hapus' }); }
    }
  };

  const deleteGroup = async (id: number, indexInCurrent: number) => {
    const result = await Swal.fire({ 
      title: 'Hapus Kategori?', 
      text: 'Seluruh foto di dalamnya akan ikut terhapus.', 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#d33' 
    });
    
    if (result.isConfirmed) {
      Swal.fire({ title: 'Memproses...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      const actualIndex = indexOfFirstGroup + indexInCurrent;
      const targetGroup = saranaGroups[actualIndex];
      if (!targetGroup.isNew) {
        await supabase.from("Fasilitas_Sarana_Title").delete().eq("Sarana_Title_Id", id);
      }
      const newGroups = saranaGroups.filter((_, i) => i !== actualIndex);
      setSaranaGroups(newGroups);
      const newTotalPages = Math.ceil(newGroups.length / groupsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) setCurrentPage(newTotalPages);
      Swal.fire({ icon: 'success', title: 'Kategori Berhasil Dihapus', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
    }
  };

  // --- SAVE ACTION ---
  const saveAllChanges = async () => {
    setIsLoading(true);
    Swal.fire({ title: 'Sedang Menyimpan...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    
    try {
      for (const group of saranaGroups) {
        if (!group.title || group.title.trim() === "") continue; 

        if (group.isNew) {
          await supabase.from("Fasilitas_Sarana_Title").insert([{ 
            title: group.title.trim(), 
            Fasilitas_Id: currentFasilitasId 
          }]);
        } else {
          await supabase.from("Fasilitas_Sarana_Title")
            .update({ title: group.title.trim() })
            .eq("Sarana_Title_Id", group.Sarana_Title_Id);
        }
      }
      
      setIsEditing(false);
      await fetchSaranaData();

      Swal.fire({
        title: 'Berhasil!',
        text: 'Publikasi telah diperbarui.',
        icon: 'success',
        confirmButtonColor: '#7c3aed', 
        confirmButtonText: 'OK',
        customClass: { confirmButton: 'px-10 py-2.5 rounded-xl font-bold' }
      });

    } catch (err) { 
      Swal.fire({ icon: 'error', title: 'Gagal Simpan', text: 'Terjadi kesalahan saat menghubungi database.' }); 
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-full space-y-6 relative font-sans text-[#103713]">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
            <Link href="/admin/fasilitas" className="hover:text-[#628B35]">Fasilitas Section</Link>
            <span>/</span>
            <span className="text-[#628B35] font-bold">Sarana & Prasarana</span>
          </div>
          <h1 className="mt-6 text-2xl font-black text-[#103713] uppercase tracking-tight">Manajemen Sarana & Prasarana</h1>
        </div>

        <div className="flex flex-col items-end gap-3">
          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
            {(["serang", "bogor"] as const).map((c) => (
              <button 
                key={c} 
                disabled={isEditing || isFetching} 
                onClick={() => setSelectedCabang(c)} 
                className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase transition-all ${selectedCabang === c ? "bg-[#103713] text-white shadow-lg" : "text-gray-400 hover:text-[#103713]"}`}
              >
                {c}
              </button>
            ))}
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)} 
              className="px-6 py-3 bg-[#628B35] text-white rounded-2xl font-bold text-xs shadow-md hover:bg-[#103713] transition-all transform active:scale-95"
            >
              <Edit3 size={16} className="inline mr-2"/> KELOLA SARANA & PRASARANA
            </button>
          )}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100 min-h-[400px] flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-inner"><ImageIcon size={24}/></div>
            <h2 className="text-xl font-black uppercase tracking-tight">
                {selectedCabang === "serang" ? "Pondok Pesantren Ardaniah - Serang" : "Rumah Tahfidz Pondok Pesantren Ardaniah - Bogor"}
            </h2>
          </div>
          {isEditing && (
            <button 
              onClick={handleAddCategory} 
              className="px-4 py-2 bg-[#628B35] text-white rounded-xl font-bold text-xs hover:bg-[#103713] shadow-sm transition-all"
            >
              <PlusCircle size={16} className="inline mr-2"/> TAMBAH KATEGORI
            </button>
          )}
        </div>

        {isFetching ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-[#628B35]" size={48} />
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Sinkronisasi Data...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {currentGroups.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
                <p className="text-gray-400 font-medium italic">Data sarana masih kosong untuk cabang ini.</p>
              </div>
            )}

            {currentGroups.map((group, gIdx) => {
              const photoCount = group.Fasilitas_Sarana?.length || 0;
              return (
                <div key={gIdx} className="group/parent border-b border-gray-100 pb-10 last:border-0">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-1.5 h-7 rounded-full transition-all duration-500 ${isEditing ? 'bg-orange-400 animate-pulse' : 'bg-[#628B35]'}`} />
                      {isEditing ? (
                        <input 
                          autoFocus={group.isNew}
                          className="text-lg font-black uppercase outline-none border-b-2 border-[#628B35]/30 focus:border-[#628B35] bg-orange-50/30 px-3 py-1.5 rounded-lg w-full max-w-md transition-all placeholder:text-gray-300" 
                          placeholder="Masukkan Nama Kategori..." 
                          value={group.title} 
                          onChange={(e) => updateLocalTitle(gIdx, e.target.value)} 
                        />
                      ) : (
                        <h3 className="text-lg font-black uppercase italic tracking-tight">{group.title}</h3>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {!group.isNew && (
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${photoCount >= 5 ? 'bg-red-50 border-red-100 text-red-500' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                          {photoCount} / 5 Foto Terunggah
                        </div>
                      )}
                      {isEditing && (
                        <button 
                          onClick={() => deleteGroup(group.Sarana_Title_Id, gIdx)} 
                          className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-5">
                    {group.Fasilitas_Sarana?.map((img: any, iIdx: number) => (
                      <div key={iIdx} className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-100">
                        <img src={img.image_link} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="sarana" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <button onClick={() => deleteSarana(img)} className="p-2.5 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}

                    {!group.isNew && photoCount < 5 && (
                      <label className="cursor-pointer relative aspect-square rounded-2xl border-2 border-dashed border-[#628B35]/30 bg-[#628B35]/5 flex flex-col items-center justify-center hover:bg-[#628B35]/10 transition-all text-center group/upload">
                        {uploadingId === group.Sarana_Title_Id ? (
                            <Loader2 className="animate-spin text-[#628B35]" size={28} />
                        ) : (
                          <>
                            <div className="p-3 bg-white text-[#628B35] rounded-xl shadow-sm group-hover/upload:rotate-90 transition-transform duration-300"><PlusCircle size={22} /></div>
                            <span className="text-[10px] font-black uppercase mt-3 tracking-widest px-2">Tambah Foto</span>
                            <span className="text-[8px] text-gray-400 mt-1 uppercase font-bold">Sisa: {5 - photoCount}</span>
                          </>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, group.Sarana_Title_Id, photoCount)} />
                      </label>
                    )}
                  </div>
                </div>
              );
            })}

            {/* --- PAGINATION UI (Centered) --- */}
            {totalPages > 1 && (
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-3 rounded-xl transition-all ${
                      currentPage === 1 
                      ? "bg-gray-50 text-gray-300 cursor-not-allowed" 
                      : "bg-white border border-gray-200 text-[#103713] hover:border-[#628B35] hover:text-[#628B35] shadow-sm active:scale-90"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-11 h-11 rounded-xl text-xs font-black transition-all ${
                          currentPage === i + 1
                            ? "bg-[#628B35] text-white shadow-lg scale-110"
                            : "bg-white border border-gray-100 text-gray-400 hover:border-[#628B35] hover:text-[#628B35]"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-xl transition-all ${
                      currentPage === totalPages 
                      ? "bg-gray-50 text-gray-300 cursor-not-allowed" 
                      : "bg-white border border-gray-200 text-[#103713] hover:border-[#628B35] hover:text-[#628B35] shadow-sm active:scale-90"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                
              </div>
            )}
          </div>
        )}
      </div>

      {/* FLOATING SAVE BAR */}
      {isEditing && (
        <div className="fixed bottom-10 left-0 right-0 z-[100] flex justify-center px-4 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-[#103713] p-2.5 rounded-full shadow-2xl flex items-center gap-5 border border-white/20 backdrop-blur-lg">
            <button 
              disabled={isLoading} 
              onClick={() => { setIsEditing(false); fetchSaranaData(); }} 
              className="px-8 py-3 text-white/60 text-xs font-black hover:text-white transition-all uppercase tracking-widest"
            >
              Batal
            </button>
            <button 
              disabled={isLoading} 
              onClick={saveAllChanges} 
              className="flex items-center gap-3 px-12 py-4 bg-[#628B35] text-white rounded-full font-black text-xs hover:bg-[#76a541] transition-all shadow-xl uppercase tracking-widest"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18}/>} Simpan Perubahan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSaranaPrasarana;