"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { 
  Plus, Image as ImageIcon, Calendar, Trash2, Eye, 
  Edit3, X, Loader2, ChevronLeft, ChevronRight, Save 
} from "lucide-react";

// Library Pendukung
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

// --- SUB-KOMPONEN: FORM INPUT ---
const PrestasiForm = ({ isEditing, formData, setFormData, loading, onSave, onCancel }: any) => (
  <section className={`lg:col-span-2 p-8 rounded-[2rem] border transition-all ${isEditing ? 'bg-white border-[#628B35] ring-4 ring-[#628B35]/5' : 'bg-white border-gray-100 shadow-sm'}`}>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        {isEditing ? <Edit3 className="text-[#628B35]" size={20} /> : <Plus className="text-[#628B35]" size={20} />}
        {isEditing ? "Mode Edit Prestasi" : "Tambah Prestasi Baru"}
      </h3>
      {isEditing && (
        <button onClick={onCancel} className="text-xs font-bold text-red-500 flex items-center gap-1 hover:underline">
          <X size={14} /> Batalkan
        </button>
      )}
    </div>
    
    <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">Judul Pencapaian</label>
        <input 
          type="text" required value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Contoh: Juara 1 MTQ Nasional"
          className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#628B35] outline-none text-gray-800 font-medium transition-all"
        />
      </div>

      <div className="space-y-2 flex flex-col">
        <label className="text-sm font-bold text-gray-700 ml-1">Tanggal Kegiatan</label>
        <div className="relative w-full">
          <DatePicker
            selected={formData.date ? new Date(formData.date) : null}
            onChange={(date: Date | null) => {
              if (date) {
                const yyyy = date.getFullYear();
                const mm = String(date.getMonth() + 1).padStart(2, '0');
                const dd = String(date.getDate()).padStart(2, '0');
                setFormData({...formData, date: `${yyyy}-${mm}-${dd}`});
              }
            }}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select" 
            dateFormat="dd MMMM yyyy"
            placeholderText="Pilih tanggal..."
            className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#628B35] outline-none text-gray-800 font-medium transition-all cursor-pointer"
            wrapperClassName="w-full"
          />
          <Calendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
      </div>

      <div className="md:col-span-2 space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">Unggah Foto (Auto-Compress)</label>
        <label className="border-2 border-dashed border-gray-200 rounded-[2rem] p-10 hover:border-[#628B35] bg-gray-50 hover:bg-white flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group">
          <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:text-[#628B35] transition-colors">
            <ImageIcon size={28} />
          </div>
          <p className="text-sm font-bold text-gray-500 text-center">
            {formData.imageFile ? (formData.imageFile as File).name : "Klik untuk pilih gambar"}
          </p>
          <input type="file" className="hidden" accept="image/*" onChange={(e) => {
            const file = e.target.files?.[0];
            if(file) setFormData({...formData, imageFile: file, previewUrl: URL.createObjectURL(file)});
          }} />
        </label>
      </div>

      <button 
        disabled={loading} type="submit" 
        className={`md:col-span-2 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${isEditing ? 'bg-[#628B35] hover:opacity-90' : 'bg-[#103713] hover:opacity-90'}`}
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : (isEditing ? <Save size={18}/> : <Plus size={18}/>)}
        {loading ? "MENYIMPAN..." : (isEditing ? "PERBARUI DATA" : "SIMPAN DOKUMENTASI")}
      </button>
    </form>
  </section>
);

// --- KOMPONEN UTAMA ---
export default function AdminPrestasi() {
  const formRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [formData, setFormData] = useState({ 
    id: null as any, 
    title: "", 
    date: "", 
    imageFile: null as File | null, 
    previewUrl: "" 
  });

  const fetchData = async () => {
    const { data, error } = await supabase.from("galeri").select("*").eq("type", "prestasi").order("created_at", { ascending: false });
    if (!error) setDataList(data);
  };

  useEffect(() => { fetchData(); }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataList.length / itemsPerPage);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tampilkan Loading Overlay seperti di gambar
    Swal.fire({
      title: 'Menyimpan Perubahan...',
      html: 'Sedang mengunggah dan memproses data prestasi',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setLoading(true);
    try {
      let finalImageUrl = formData.previewUrl;
      
      if (formData.imageFile) {
        let file = formData.imageFile as File; 

        // --- PROSES KOMPRESI ---
        const options = {
          maxSizeMB: 0.4,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        };
        
        try {
          const compressedBlob = await imageCompression(file, options);
          file = new File([compressedBlob], file.name, { type: file.type });
        } catch (error) {
          console.error("Gagal kompresi, menggunakan file asli:", error);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("galeri")
          .upload(`prestasi/${fileName}`, file);
          
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from("galeri").getPublicUrl(uploadData.path);
        finalImageUrl = urlData.publicUrl;
      }

      const payload = { title: formData.title, date: formData.date, image_link: finalImageUrl, type: "prestasi" };

      const { error } = isEditing 
        ? await supabase.from("galeri").update(payload).eq("GaleriId", formData.id)
        : await supabase.from("galeri").insert([payload]);

      if (error) throw error;
      
      resetForm(); 
      fetchData();

      // Notifikasi Toast Sukses
      Swal.fire({
        icon: 'success',
        title: 'Berhasil Disimpan',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

    } catch (err: any) { 
      Swal.fire({ icon: 'error', title: 'Gagal!', text: err.message, confirmButtonColor: '#d33' });
    } finally { 
      setLoading(false); 
    }
  };

  const handleDelete = async (item: any) => {
    const result = await Swal.fire({
      title: 'Hapus data ini?',
      text: "Gambar di storage juga akan dihapus permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#103713',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
    });

    if (result.isConfirmed) {
      // Loading saat hapus
      Swal.fire({
        title: 'Menghapus...',
        allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });

      try {
        setLoading(true);
        if (item.image_link) {
          const urlParts = item.image_link.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const filePath = `prestasi/${fileName}`;
          await supabase.storage.from("galeri").remove([filePath]);
        }

        const { error: dbError } = await supabase
          .from("galeri")
          .delete()
          .eq("GaleriId", item.GaleriId);

        if (dbError) throw dbError;

        Swal.fire({
          icon: 'success',
          title: 'Data Dihapus',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000
        });

        fetchData();
        if (currentItems.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);

      } catch (err: any) {
        Swal.fire('Gagal!', err.message, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (item: any) => {
    setIsEditing(true);
    setFormData({ id: item.GaleriId, title: item.title, date: item.date, imageFile: null, previewUrl: item.image_link });
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetForm = () => {
    setIsEditing(false);
    setFormData({ id: null, title: "", date: "", imageFile: null, previewUrl: "" });
  };

  return (
    <div className="w-full space-y-6 pb-20">
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <Link href="/admin/informasi" className="hover:text-gray-700">Informasi Section</Link>
        <span>/</span>
        <Link href="/admin/informasi/galeri" className="hover:text-gray-700">Galeri</Link>
        <span>/</span>
        <span className="text-[#628B35] font-bold">Prestasi</span>
      </div>

      <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Manajemen Prestasi</h1>

      <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <PrestasiForm isEditing={isEditing} formData={formData} setFormData={setFormData} loading={loading} onSave={handleSave} onCancel={resetForm} />
        <section className="space-y-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-2 flex items-center gap-2">
            <Eye size={14} /> Preview Card
          </h3>
          <PrestasiCard item={formData} isPreview={true} />
        </section>
      </div>

      <section className="pt-10 border-t border-gray-100">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Daftar Galeri Prestasi</h3>
          <p className="text-xs font-bold text-gray-400">Hal {currentPage} dari {totalPages || 1}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {currentItems.map((item) => (
            <PrestasiCard key={item.GaleriId} item={item} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>

        {dataList.length > itemsPerPage && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="p-3 rounded-xl bg-white border border-gray-200 disabled:opacity-30"><ChevronLeft size={20} /></button>
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-xl font-bold ${currentPage === i + 1 ? 'bg-[#628B35] text-white' : 'bg-white text-gray-400 border border-gray-100'}`}>{i + 1}</button>
              ))}
            </div>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="p-3 rounded-xl bg-white border border-gray-200 disabled:opacity-30"><ChevronRight size={20} /></button>
          </div>
        )}
      </section>
    </div>
  );
}

// Tambahkan sub-komponen PrestasiCard jika belum ada di file yang sama
const PrestasiCard = ({ item, onEdit, onDelete, isPreview = false }: any) => (
  <div className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col relative transition-all duration-500 ${!isPreview && 'hover:shadow-xl'}`}>
    {!isPreview && (
      <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button onClick={() => onEdit(item)} className="p-2 bg-white/90 backdrop-blur shadow-lg hover:bg-[#628B35] hover:text-white text-[#628B35] rounded-xl transition-all"><Edit3 size={16} /></button>
        <button onClick={() => onDelete(item)} className="p-2 bg-white/90 backdrop-blur shadow-lg hover:bg-red-600 hover:text-white text-red-600 rounded-xl transition-all"><Trash2 size={16} /></button>
      </div>
    )}

    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
      {item.image_link || item.previewUrl ? (
        <img src={item.image_link || item.previewUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      ) : (
        <div className="flex items-center justify-center h-full"><ImageIcon size={40} className="text-gray-300" /></div>
      )}
      <div className="absolute inset-0 bg-[#103713]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-[#103713] leading-tight group-hover:text-[#628B35] transition-colors line-clamp-2 mb-4">
        {item.title || "Judul prestasi akan tampil di sini..."}
      </h3>
      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-2 text-[#103713]/40">
        <Calendar size={14} className="text-[#628B35]" />
        <span className="text-[11px] font-bold tracking-wider uppercase">
          {item.date || "TANGGAL"}
        </span>
      </div>
    </div>
  </div>
);