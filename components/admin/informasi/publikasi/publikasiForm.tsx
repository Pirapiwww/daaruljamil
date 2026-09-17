"use client";
import React, { useEffect } from "react";
import { User, Calendar, Upload, Trash2, Image as ImageIcon, Plus, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormProps {
  formData: any;
  setFormData: (data: any) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>; 
  selectedCategoryName: string;
  isEditing?: boolean;
  // Props tambahan untuk Tag yang dipindah
  tags: any[];
  newTag: string;
  setNewTag: (val: string) => void;
  handleAddTag: () => void;
  handleDeleteTag: (id: any) => void;
}

const PublikasiForm = ({ 
  formData, setFormData, fileInputRef, selectedCategoryName, isEditing,
  tags, newTag, setNewTag, handleAddTag, handleDeleteTag
}: FormProps) => {

  useEffect(() => {
    if (!formData.previewUrl && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [formData.previewUrl, fileInputRef]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div key={isEditing ? `edit-${formData.PublikasiId}` : "new-form"} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Kolom Kiri: Input */}
      <div className={`lg:col-span-8 bg-white p-8 rounded-[3rem] border transition-all duration-500 shadow-sm space-y-6 ${
        isEditing ? 'border-[#628B35] ring-4 ring-[#628B35]/5' : 'border-gray-200'
      }`}>
        
        {/* Input Judul */}
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase ml-1 tracking-wider">Judul Artikel</label>
          <input 
            type="text" 
            autoComplete="off"
            placeholder="Masukan judul publikasi..." 
            className="w-full text-2xl font-bold outline-none border-b-2 border-gray-100 focus:border-[#628B35] pb-2 transition-all bg-transparent placeholder:text-gray-200" 
            value={formData.title || ""} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
          />
        </div>

        {/* Row: Penulis & Tanggal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase ml-1 tracking-wider">Penulis</label>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200 focus-within:border-[#628B35] transition-all">
              <User size={18} className="text-gray-400"/>
              <input 
                type="text" 
                className="bg-transparent outline-none w-full font-bold text-gray-700 placeholder:text-gray-300" 
                placeholder="Nama penulis..." 
                value={formData.author || ""} 
                onChange={e => setFormData({...formData, author: e.target.value})} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase ml-1 tracking-wider">Tanggal Kegiatan</label>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-200 focus-within:border-[#628B35] transition-all">
              <Calendar size={18} className="text-gray-400"/>
              <DatePicker 
                selected={formData.date ? new Date(formData.date) : null} 
                onChange={(d: Date | null) => setFormData({...formData, date: d ? d.toISOString().split('T')[0] : ""})} 
                className="bg-transparent outline-none w-full font-bold text-gray-700 cursor-pointer" 
                placeholderText="Pilih tanggal..."
                dateFormat="yyyy-MM-dd" 
              />
            </div>
          </div>
        </div>

        {/* PINDAHAN: Input Kategori */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <label className="text-xs font-black text-gray-400 uppercase ml-1 tracking-wider">Pilih Kategori Artikel</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="px-4 py-2 bg-gray-50 rounded-xl text-xs outline-none border border-gray-200 focus:border-[#628B35] transition-all w-full md:w-48" 
                placeholder="Tambah kategori..." 
                value={newTag} 
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button 
                type="button" 
                onClick={handleAddTag} 
                className="p-2 bg-[#628B35] text-white rounded-xl hover:bg-[#103713] transition-colors"
              >
                <Plus size={18}/>
              </button>
            </div>
          </div>

          <div className={`flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border-2 border-dashed transition-all min-h-[60px] ${
            !formData.TagId ? 'border-amber-200' : 'border-gray-200'
          }`}>
            {tags.map(t => (
              <button 
                key={t.TagId} 
                type="button" 
                onClick={() => setFormData({...formData, TagId: t.TagId})}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black transition-all border ${
                  String(formData.TagId) === String(t.TagId)
                  ? "bg-[#628B35] text-white border-[#628B35] shadow-md" 
                  : "bg-white text-[#628B35] border-[#628B35]/20 hover:bg-[#628B35]/5"
                }`}
              >
                {t.title}
                <X size={12} className="ml-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleDeleteTag(t.TagId); }} />
              </button>
            ))}
          </div>
        </div>

        {/* Upload Thumbnail */}
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase ml-1 tracking-wider">Foto Thumbnail</label>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-center gap-3 p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all">
              <Upload size={20} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-500 uppercase">
                  {formData.previewUrl ? "Ganti Gambar" : "Pilih File Gambar Utama"}
              </span>
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" 
                onChange={e => {
                  const file = e.target.files?.[0];
                  if(file) {
                    const url = URL.createObjectURL(file);
                    setFormData({...formData, imageFile: file, previewUrl: url});
                  }
                }} 
              />
            </label>
            {formData.previewUrl && (
              <button type="button" onClick={() => { setFormData({...formData, imageFile: null, previewUrl: ""}); if (fileInputRef.current) fileInputRef.current.value = ""; }} 
                className="p-4 bg-red-50 text-red-500 rounded-2xl border border-red-100">
                <Trash2 size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Preview Card (SESUAI GAMBAR) */}
      <div className="lg:col-span-4 mt-8">
        <div className="flex items-center justify-between px-2 mb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <span>Live Preview</span>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col sticky top-8">
          {/* Gambar Preview */}
          <div className="relative h-52 bg-gray-100">
            {formData.previewUrl ? (
              <img src={formData.previewUrl} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center opacity-20">
                <ImageIcon size={48} />
                <p className="text-[10px] font-black uppercase mt-2">No Image Selected</p>
              </div>
            )}
          </div>
          
          {/* Konten Preview */}
          <div className="p-6 space-y-4">
            {/* Tag/Kategori (BERITA) */}
            <div className="text-[10px] font-black text-[#628B35] uppercase tracking-wider">
              {selectedCategoryName || "KATEGORI"}
            </div>

            {/* Judul */}
            <h3 className="text-lg font-black text-[#103713] leading-tight line-clamp-3">
              {formData.title || "Judul publikasi Anda akan muncul di sini..."}
            </h3>

            {/* Garis Pemisah Tipis */}
            <div className="w-full h-[1px] bg-gray-100"></div>

            {/* Metadata Penulis & Tanggal */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                <User size={14} className="text-gray-300" />
                <span>{formData.author || "Nama Penulis"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                <Calendar size={14} className="text-gray-300" /> 
                <span>{formData.date || "2024-01-01"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublikasiForm;