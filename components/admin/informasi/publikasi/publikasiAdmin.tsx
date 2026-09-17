"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  Loader2, Save, RotateCcw 
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

// Import Komponen Anak
import PublikasiForm from "./publikasiForm";
import PublikasiEditor from "./publikasiEditor";
import PublikasiHistory from "./publikasiHistory";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const PublikasiAdmin = () => {
  // --- STATE MANAGEMENT ---
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState<any[]>([]);
  const [newTag, setNewTag] = useState("");
  const [publications, setPublications] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [formKey, setFormKey] = useState(Date.now());

  const [formData, setFormData] = useState({
    PublikasiId: null as any,
    title: "",
    author: "",
    date: "",
    TagId: "" as any,
    imageFile: null as File | null,
    previewUrl: "",
    isi: ""
  });

  // --- REFS ---
  const quillRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedCategoryName = useMemo(() => {
    if (!formData.TagId) return "KATEGORI";
    const found = tags.find(t => String(t.TagId) === String(formData.TagId));
    return found ? found.title : "KATEGORI";
  }, [formData.TagId, tags]);

  // --- 1. FETCH DATA ---
  const fetchData = async () => {
    try {
      const { data: tagData } = await supabase.from("tagPublikasi").select("*").order("title");
      if (tagData) setTags(tagData);

      const { data: pubData } = await supabase
        .from("publikasi")
        .select(`*, tagPublikasi ( title )`)
        .order("created_at", { ascending: false });
      if (pubData) setPublications(pubData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- 2. TAG LOGIC ---
  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    try {
      const { error } = await supabase.from("tagPublikasi").insert([{ title: newTag }]);
      if (error) throw error;
      setNewTag(""); 
      fetchData();
    } catch (error: any) {
      Swal.fire("Gagal", "Gagal menambah tag: " + error.message, "error");
    }
  };

  const handleDeleteTag = async (id: any) => {
    try {
      const { error } = await supabase.from("tagPublikasi").delete().eq("TagId", id);
      if (error) throw error;
      fetchData();
    } catch (error: any) {
      Swal.fire("Gagal", "Gagal menghapus tag: " + error.message, "error");
    }
  };

  // --- 3. EDITOR LOGIC & MODULES ---
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection();
          if (quill && range) {
            quill.insertEmbed(range.index, "image", reader.result);
            quill.setSelection(range.index + 1);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar", 
      handlers: {
        image: imageHandler,
      },
    },
  }), []);

  // --- 4. UPLOAD & PROCESS ---
  const processUpload = async (fileSource: string | File, folder: string) => {
    let file: File;
    if (typeof fileSource === "string") {
      const res = await fetch(fileSource);
      const blob = await res.blob();
      file = new File([blob], "publikasi-image.jpg", { type: "image/jpeg" });
    } else {
      file = fileSource;
    }
    const options = { maxSizeMB: 0.4, maxWidthOrHeight: 1200, useWebWorker: true };
    const compressedBlob = await imageCompression(file, options);
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const { data, error } = await supabase.storage.from("publikasi").upload(`${folder}/${fileName}`, compressedBlob);
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("publikasi").getPublicUrl(data.path);
    return { url: urlData.publicUrl, placeholder: fileName };
  };

  // --- 5. SAVE DENGAN VALIDASI DINAMIS ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi konten editor (Quill default: <p><br></p> jika kosong)
    const isEditorEmpty = 
          !formData.isi || 
          formData.isi === "<p><br></p>" || 
          formData.isi.replace(/<[^>]*>/g, "").trim().length === 0;
          
    // Kumpulkan field yang kosong
    const missingFields = [];
    if (!formData.title.trim()) missingFields.push("Judul");
    if (!formData.author.trim()) missingFields.push("Penulis");
    if (!formData.date) missingFields.push("Tanggal");
    if (!formData.TagId) missingFields.push("Kategori");
    if (!formData.previewUrl) missingFields.push("Foto Thumbnail");
    if (isEditorEmpty) missingFields.push("Isi Konten");

    // Jika ada yang belum diisi, tampilkan alert spesifik
    if (missingFields.length > 0) {
      return Swal.fire({
        title: "Data Belum Lengkap",
        html: `Silakan lengkapi kolom berikut:<br><b class="text-red-500">${missingFields.join(", ")}</b>`,
        icon: "warning",
        confirmButtonColor: "#628B35"
      });
    }
    
    setLoading(true);
    try {
      let mainImageUrl = formData.previewUrl;
      if (formData.imageFile) {
        const uploaded = await processUpload(formData.imageFile, "thumbnails");
        mainImageUrl = uploaded.url;
      }

      let finalHtmlContent = formData.isi;
      const parser = new DOMParser();
      const doc = parser.parseFromString(finalHtmlContent, "text/html");
      const images = doc.querySelectorAll("img");
      for (const img of Array.from(images)) {
        const src = img.getAttribute("src");
        if (src && src.startsWith("data:image")) {
          const uploaded = await processUpload(src, "content");
          img.setAttribute("src", uploaded.url);
        }
      }
      finalHtmlContent = doc.body.innerHTML;

      const payload = {
        title: formData.title,
        author: formData.author,
        date: formData.date,
        TagId: formData.TagId,
        image_link: mainImageUrl,
        isi: finalHtmlContent
      };

      if (isEditing && formData.PublikasiId) {
        const { error } = await supabase.from("publikasi").update(payload).eq("PublikasiId", formData.PublikasiId);
        if (error) throw error;
        Swal.fire("Berhasil!", "Publikasi telah diperbarui.", "success");
      } else {
        const { error } = await supabase.from("publikasi").insert([payload]);
        if (error) throw error;
        Swal.fire("Berhasil!", "Publikasi baru telah diterbitkan.", "success");
      }
      
      handleReset();
      fetchData();
    } catch (err: any) {
      Swal.fire("Gagal!", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // --- 6. EDIT & RESET ---
  const handleEdit = (item: any) => {
    setIsEditing(true);
    setFormData({
      PublikasiId: item.PublikasiId, 
      title: item.title || "",
      author: item.author || "",
      date: item.date || "",
      TagId: item.TagId || "", 
      imageFile: null, 
      previewUrl: item.image_link || "",
      isi: item.isi || "" 
    });
    setFormKey(Date.now());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setIsEditing(false);
    setFormData({ 
      PublikasiId: null, 
      title: "", 
      author: "", 
      date: "", 
      TagId: "", 
      imageFile: null, 
      previewUrl: "", 
      isi: "" 
    });
    setFormKey(Date.now()); 
  };

  const handleDelete = async (item: any) => {
    const result = await Swal.fire({ 
      title: 'Hapus Publikasi?', 
      text: "Data akan dihapus permanen.", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#d33', 
      confirmButtonText: 'Ya, Hapus' 
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const { error } = await supabase.from("publikasi").delete().eq("PublikasiId", item.PublikasiId);
        if (error) throw error;
        Swal.fire('Terhapus!', 'Publikasi berhasil dihapus.', 'success');
        fetchData();
      } catch (err: any) {
        Swal.fire('Gagal!', err.message, 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  // --- PAGINATION ---
  const currentItems = publications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(publications.length / itemsPerPage);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 text-sm text-[#103713]/60 font-medium">
        <Link href="/admin/informasi" className="hover:text-[#628B35]">Informasi Section</Link>
        <span>/</span>
        <span className="text-[#628B35] font-bold">Publikasi</span>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-black text-[#103713] uppercase tracking-tight">
          {isEditing ? "📝 Mode Edit Publikasi" : "Manajemen Publikasi"}
        </h1>
        <div className="flex gap-3">
          {isEditing && (
            <button 
              type="button"
              onClick={handleReset} 
              className="bg-gray-100 text-gray-500 px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <RotateCcw size={18} /> Batal Edit
            </button>
          )}
          <button 
            onClick={handleSave} 
            disabled={loading} 
            className={`${isEditing ? 'bg-[#628B35]' : 'bg-[#103713]'} text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50 shadow-lg`}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />} 
            {isEditing ? "Simpan Perubahan" : "Terbitkan Publikasi"}
          </button>
        </div>
      </div>

      <PublikasiForm 
        key={`form-${formKey}`} 
        formData={formData} 
        setFormData={setFormData} 
        fileInputRef={fileInputRef} 
        selectedCategoryName={selectedCategoryName} 
        isEditing={isEditing}
        tags={tags}
        newTag={newTag}
        setNewTag={setNewTag}
        handleAddTag={handleAddTag}
        handleDeleteTag={handleDeleteTag}
      />

      <PublikasiEditor 
        key={`editor-${formKey}`}
        formData={formData}
        setFormData={setFormData}
        quillRef={quillRef}
        modules={modules}
        isEditing={isEditing}
      />

      <PublikasiHistory 
        publications={publications}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PublikasiAdmin;