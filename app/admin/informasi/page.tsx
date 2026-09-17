import Link from "next/link";

export default function AdminInformasi() {
return (
    <div className="space-y-6">
        {/* Breadcrumb */}
    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <span className="text-[#628B35] font-bold">Informasi Section</span>
    </div>

    <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
        INFORMASI SECTION
    </h1>

    <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
        
        {/* Card Publikasi - Sekarang Menjadi Link */}
        <Link href="/admin/informasi/publikasi" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-left w-full overflow-hidden cursor-pointer">
            <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1 block">
                Konten Web
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                Manajemen Publikasi
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                Kelola berita, artikel, dan pengumuman terbaru untuk pengunjung.
                </p>
            </div>
            <div className="hidden sm:flex h-16 w-16 bg-emerald-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 2v6h6"
                />
                </svg>
            </div>
            </div>
        </Link>

        {/* Card Galeri - Sekarang Menjadi Link */}
        <Link href="/admin/informasi/galeri" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left w-full overflow-hidden cursor-pointer">
            <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                Media Visual
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                Galeri Foto
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                Upload dan atur dokumentasi visual kegiatan serta prestasi santri dan pesantren.
                </p>
            </div>
            <div className="hidden sm:flex h-16 w-16 bg-blue-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
                </svg>
            </div>
            </div>
        </Link>

        </div>
    </div>
    </div>
);
}