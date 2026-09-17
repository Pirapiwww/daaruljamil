import Link from "next/link";
import { Home, Clock, Building2 } from "lucide-react";

export default function AdminFasilitas() {
return (
    <div className="space-y-6">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <span className="text-[#628B35] font-bold">Fasilitas Section</span>
    </div>

    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
        MANAJEMEN FASILITAS & KEGIATAN
    </h1>

    <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
        
        {/* Card Fasilitas & Kemudahan */}
        <Link href="/admin/fasilitas/kemudahan" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#628B35]/20 transition-all text-left w-full overflow-hidden cursor-pointer">
            <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#628B35] mb-1 block">
                Layanan & Benefit
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                Fasilitas & Kemudahan
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                Kelola daftar keunggulan pondok, info beasiswa, serta fasilitas gratis bagi santri.
                </p>
            </div>
            <div className="hidden sm:flex h-16 w-16 bg-emerald-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-[#628B35] group-hover:text-white transition-all duration-300">
                <Home className="h-8 w-8 text-[#628B35] group-hover:text-white" />
            </div>
            </div>
        </Link>

        {/* Card Aktivitas Keseharian */}
        <Link href="/admin/fasilitas/aktifitas" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all text-left w-full overflow-hidden cursor-pointer">
            <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1 block">
                Jadwal Santri
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                Aktivitas Keseharian
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                Atur agenda rutin santri mulai dari bangun tidur hingga istirahat malam (Kitab Kuning & Tahassus).
                </p>
            </div>
            <div className="hidden sm:flex h-16 w-16 bg-amber-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                <Clock className="h-8 w-8 text-amber-600 group-hover:text-white" />
            </div>
            </div>
        </Link>

        {/* Card Sarana & Prasarana */}
        <Link href="/admin/fasilitas/sarana" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left w-full overflow-hidden cursor-pointer">
            <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                Infrastruktur
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                Sarana & Prasarana
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                Kelola galeri pendukung seperti lapangan olahraga, alat musik religi, dan gedung belajar.
                </p>
            </div>
            <div className="hidden sm:flex h-16 w-16 bg-blue-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Building2 className="h-8 w-8 text-blue-600 group-hover:text-white" />
            </div>
            </div>
        </Link>

        </div>
    </div>
    </div>
);
}