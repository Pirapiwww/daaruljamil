"use client";
import React from "react";
import { Edit, Trash2, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";

interface HistoryProps {
  publications: any[];
  currentItems: any[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleEdit: (item: any) => void;
  handleDelete: (item: any) => void;
}

const PublikasiHistory = ({ 
  publications, currentItems, currentPage, totalPages, 
  setCurrentPage, handleEdit, handleDelete 
}: HistoryProps) => {
  
  // Fungsi untuk merender nomor halaman
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all ${
            currentPage === i
              ? "bg-[#628B35] text-white shadow-lg shadow-[#628B35]/30"
              : "bg-white text-gray-400 border border-gray-100 hover:border-[#628B35] hover:text-[#628B35]"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <section className="space-y-10 pt-10 border-t border-gray-100">
      {/* Header Riwayat */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-black text-[#103713] uppercase tracking-tight">
          Riwayat Publikasi Terbit
        </h2>
      </div>

      {/* Grid Card Publikasi */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {currentItems.map((p) => {
          const pubId = p.PublikasiId ?? p.publikasi_id;
          return (
            <div key={pubId} className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img 
                  src={p.image_link} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={p.title}
                />
                <div className="absolute top-3 right-3 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button onClick={() => handleEdit(p)} className="p-2 bg-white text-[#628B35] rounded-xl shadow-lg hover:bg-[#628B35] hover:text-white transition-all">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(p)} className="p-2 bg-white text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow space-y-4">
                <span className="text-[10px] font-black tracking-widest text-[#628B35] uppercase">
                  {p.tagPublikasi?.title || "BERITA"}
                </span>
                <h3 className="text-md font-black text-[#103713] leading-tight line-clamp-3 min-h-[3rem]">
                  {p.title}
                </h3>
                <div className="w-full h-[1px] bg-gray-100"></div>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                    <User size={14} className="text-gray-300" />
                    <span>{p.author || "Admin"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                    <Calendar size={14} className="text-gray-300" /> 
                    <span>{p.date}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {publications.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase border-2 border-dashed border-gray-100 rounded-[3rem] bg-gray-50/50">
            Belum ada riwayat publikasi terbit
          </div>
        )}
      </div>

      {/* Pagination Style Baru (DIBAWAH CARD) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 py-10">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            disabled={currentPage === 1} 
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl disabled:opacity-30 transition-all hover:bg-gray-50 hover:border-[#628B35] group"
          >
            <ChevronLeft size={20} className="text-gray-400 group-hover:text-[#628B35]" />
          </button>
          
          <div className="flex gap-2">
            {renderPageNumbers()}
          </div>

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            disabled={currentPage === totalPages} 
            className="w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl disabled:opacity-30 transition-all hover:bg-gray-50 hover:border-[#628B35] group"
          >
            <ChevronRight size={20} className="text-gray-400 group-hover:text-[#628B35]" />
          </button>
        </div>
      )}
    </section>
  );
};

export default PublikasiHistory;