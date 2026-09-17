"use client";
import React, { useEffect } from "react";
import { Image as ImageIcon, AlertCircle } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

interface EditorProps {
  formData: any;
  setFormData: (data: any) => void;
  quillRef: React.RefObject<any>;
  modules: any;
  isEditing?: boolean;
}

const PublikasiEditor = ({ 
  formData, setFormData, quillRef, modules, isEditing 
}: EditorProps) => {

  const isContentEmpty = !formData.isi || formData.isi === "<p><br></p>" || formData.isi.trim() === "";

  // Paksa update UI saat editor siap
  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.theme.modules.toolbar.attach(document.getElementById('toolbar'));
    }
  }, [quillRef]);

  return (
    <div className="bg-white p-8 rounded-[3rem] border border-gray-200 shadow-sm space-y-6">
      <div className="space-y-2">
        <h3 className="font-black text-[#103713] text-sm uppercase px-1">Isi Konten Publikasi</h3>
        
        <div className="border border-gray-200 rounded-[2rem] overflow-hidden bg-white shadow-inner">
          
          {/* TOOLBAR */}
          <div id="toolbar" className="!border-none !bg-gray-50/50 p-4 flex flex-wrap items-center gap-2 border-b border-gray-200">
            <span className="ql-formats">
              <select className="ql-header" defaultValue="">
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="">Normal</option>
              </select>
            </span>
            
            <span className="ql-formats">
              <button className="ql-bold"></button>
              <button className="ql-italic"></button>
              <button className="ql-underline"></button>
            </span>

            <span className="ql-formats">
              <button className="ql-list" value="ordered"></button>
              <button className="ql-list" value="bullet"></button>
            </span>

            <span className="ql-formats">
              <button className="ql-link"></button>
              {/* Tombol Image harus ql-image */}
              <button className="ql-image !w-auto !flex items-center gap-2 px-4 py-1.5 bg-[#628B35] text-white rounded-xl hover:bg-[#103713] border-none">
                <ImageIcon size={16} />
                <span className="text-xs font-bold tracking-tight uppercase">Gambar</span>
              </button>
            </span>

            <span className="ql-formats">
              <button className="ql-clean"></button>
            </span>
          </div>

          <style jsx global>{`
            /* CSS UNTUK HEADING AGAR TERLIHAT BESAR */
            .ql-editor h1 { font-size: 2.5em !important; font-weight: bold !important; line-height: 1.2; margin-top: 10px; display: block; }
            .ql-editor h2 { font-size: 1.8em !important; font-weight: bold !important; line-height: 1.2; margin-top: 8px; display: block; }
            .ql-editor h3 { font-size: 1.4em !important; font-weight: bold !important; line-height: 1.2; margin-top: 5px; display: block; }
            
            /* CSS UNTUK INDIKATOR TOMBOL AKTIF */
            .ql-snow .ql-toolbar button.ql-active {
              background-color: #628B35 !important;
              border-radius: 4px;
            }
            .ql-snow .ql-toolbar button.ql-active .ql-stroke {
              stroke: white !important;
            }
            .ql-snow .ql-toolbar button.ql-active .ql-fill {
              fill: white !important;
            }

            /* Perbaikan dropdown */
            .ql-snow .ql-picker.ql-header .ql-picker-label::before { content: 'Format'; }
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before { content: 'Heading 1'; font-size: 20px; font-weight: bold; }
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before { content: 'Heading 2'; font-size: 18px; font-weight: bold; }
            .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before { content: 'Heading 3'; font-size: 16px; font-weight: bold; }
          `}</style>

          <ReactQuill 
            forwardedRef={quillRef} 
            theme="snow" 
            modules={modules} 
            value={formData.isi || ""} 
            onChange={(content: string) => setFormData({...formData, isi: content})} 
            placeholder="Tuliskan isi publikasi Anda di sini..."
            className="h-[700px] mb-12 !border-none" 
          />
        </div>
      </div>
    </div>
  );
};

export default PublikasiEditor;