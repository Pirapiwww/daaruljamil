import Link from "next/link";

export default function AdminPendidikan() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        <span className="text-[#628B35] font-bold">Pendidikan Section</span>
      </div>

      <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
        PENDIDIKAN SECTION
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          
          {/* Card Kurikulum & Tujuan */}
          <Link href="/admin/pendidikan/kurikulum" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-amber-200 transition-all text-left w-full overflow-hidden cursor-pointer">
              <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1 block">
                  Akademik & Visi
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                  Kurikulum & Tujuan
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Kelola penjelasan kurikulum, serta poin-poin bentuk dan tujuan.
                </p>
              </div>
              <div className="hidden sm:flex h-16 w-16 bg-amber-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card Kelas */}
          <Link href="/admin/pendidikan/kelas" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all text-left w-full overflow-hidden cursor-pointer">
              <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1 block">
                  Manajemen Kelas
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                  Kelas Pilihan
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Atur deskripsi dan informasi setiap kelas pilihan.
                </p>
              </div>
              <div className="hidden sm:flex h-16 w-16 bg-indigo-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-indigo-100 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card Tahassus */}
          <Link href="/admin/pendidikan/tahassus" className="block">
            <div className="group relative flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all text-left w-full overflow-hidden cursor-pointer">
              <div className="z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600 mb-1 block">
                  Program Private
                </span>
                <h4 className="text-2xl font-black text-gray-800">
                  Program Tahassus
                </h4>
                <p className="text-gray-500 mt-1 text-sm md:text-base">
                  Kelola data program khusus untuk meningkatkan kemampuan santri.
                </p>
              </div>
              <div className="hidden sm:flex h-16 w-16 bg-rose-50 rounded-2xl items-center justify-center group-hover:scale-110 group-hover:bg-rose-100 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-rose-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}