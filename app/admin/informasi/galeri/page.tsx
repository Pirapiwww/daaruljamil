import Link from "next/link";

export default function AdminGaleri() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <Link href="/admin/informasi" className="hover:text-gray-700 transition-colors">
          Informasi Section
        </Link>
        <span>/</span>
        <span className="text-[#628B35] font-bold">Galeri</span>
      </div>

      <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
        Dokumentasi Galeri
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          
          {/* Card Prestasi */}
          <Link href="/admin/informasi/galeri/prestasi" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all text-left w-full overflow-hidden cursor-pointer">
              <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1 block">Pencapaian</span>
                <h4 className="text-2xl font-black text-gray-800">Galeri Prestasi</h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Dokumentasi piagam, piala, dan momen kemenangan santri.
                </p>
              </div>
              <div className="hidden sm:flex h-16 w-16 bg-amber-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card Kegiatan */}
          <Link href="/admin/informasi/galeri/kegiatan" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-left w-full overflow-hidden cursor-pointer">
              <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1 block">Aktivitas Harian</span>
                <h4 className="text-2xl font-black text-gray-800">Galeri Kegiatan</h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Foto-foto kegiatan belajar mengajar, ekstrakurikuler, dan harian.
                </p>
              </div>
              <div className="hidden sm:flex h-16 w-16 bg-indigo-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Tombol Back */}
      <div className="pt-4">
        <Link 
          href="/admin/informasi" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Informasi Section
        </Link>
      </div>
    </div>
  );
}