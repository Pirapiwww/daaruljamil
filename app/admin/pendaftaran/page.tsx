import Link from "next/link";

export default function AdminPendaftaran() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <span className="text-[#628B35] font-bold">Pendaftaran Section</span>
      </div>

      <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
        PENDAFTARAN SECTION
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          
          {/* Card Syarat Pendaftaran */}
          <Link href="/admin/pendaftaran/syarat" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all text-left w-full overflow-hidden cursor-pointer">
              <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-1 block">
                  Ketentuan Calon Santri
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                  Syarat Pendaftaran
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Kelola dokumen wajib, kriteria usia, dan persyaratan administrasi lainnya.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card Informasi Pendaftaran */}
          <Link href="/admin/pendaftaran/informasi" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all text-left w-full overflow-hidden cursor-pointer">
              <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1 block">
                  Prosedur & Jadwal
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                  Informasi Pendaftaran
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Atur alur pendaftaran, biaya pendidikan, dan pengumuman tanggal penting.
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}