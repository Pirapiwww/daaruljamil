"use client";

import { useState } from "react";

const PROFILE_DATA = {
  pusat: {
    title: "Pondok Pesantren MTA Pusat",
    location: "Serang, Banten",
    youtubeEmbed: "https://www.youtube.com/embed/YROCHT-yDLA?si=GNPGiqk7WHGYw3Ac&controls=0&autoplay=1&mute=1&loop=1&playlist=YROCHT-yDLA",
    youtubeLink: "https://youtu.be/YROCHT-yDLA?si=GNPGiqk7WHGYw3Ac",
    history: [
      "Yayasan Majlis Tafsir Al Qur’an (MTA) Pusat Serang merupakan jantung dari lembaga dakwah dan pendidikan kami. Berdiri sebagai pusat koordinasi untuk mencetak generasi Qurani di wilayah Banten dan sekitarnya.",
      "Lembaga ini fokus pada integrasi kurikulum nasional dengan nilai-nilai salafiyah, memastikan santri tidak hanya unggul secara akademik tetapi juga memiliki kedalaman spiritual yang kuat."
    ],
    vision: "Menjadi barometer pendidikan Islam yang unggul dan berdaya saing global berbasis Al-Qur’an dan As-Sunnah.",
    mission: [
      "Menyelenggarakan pendidikan berkualitas dengan standar manajemen modern.",
      "Membentuk karakter santri yang disiplin, mandiri, dan berjiwa dakwah.",
      "Mengembangkan potensi minat dan bakat santri."
    ],
    stats: [
      { label: "Luas Lahan", value: "12 Ha" },
      { label: "Santri Aktif", value: "1500+" },
      { label: "Cabang Dakwah", value: "640+" }
    ]
  },
  cabang: {
    title: "Pondok Pesantren MTA Cabang",
    location: "Mojogedang Karanganyar, Jawa Tengah",
    youtubeEmbed: "https://www.youtube.com/embed/CgrqWp8PxBc?si=6aGrdTaKIdGMDAkj&controls=0&autoplay=1&mute=1&loop=1&playlist=CgrqWp8PxBc",
    youtubeLink: "https://youtu.be/CgrqWp8PxBc",
    history: [
      "MTA Cabang Bogor dibangun di atas lahan seluas 10 hektar di Desa Pojok. Lokasi ini dipilih karena udaranya yang sejuk dan lingkungan yang sangat mendukung untuk konsentrasi menghafal Al-Qur'an.",
      "Didirikan pada tahun 2018, cabang ini menjadi pusat pengembangan soft-skill dan hard-skill bagi para santri agar siap terjun ke masyarakat dengan bekal keterampilan yang mumpuni."
    ],
    vision: "Mewujudkan lingkungan pendidikan yang asri untuk menumbuhkan generasi Islam yang berpegang teguh pada manhaj nubuwah.",
    mission: [
      "Menumbuhkan generasi penerus yang memahami, menghayati, dan mengamalkan Al-Qur’an.",
      "Mengembangkan potensi kewirausahaan santri berbasis nilai-nilai keislaman.",
      "Membentuk pribadi yang berakhlakul karimah."
    ],
    stats: [
      { label: "Luas Lahan", value: "10 Ha" },
      { label: "Target Tahfidz", value: "15 Juz" },
      { label: "Kapasitas", value: "800+" }
    ]
  }
};

const ProfileSection = () => {
  const [activeTab, setActiveTab] = useState<"pusat" | "cabang">("pusat");
  const data = PROFILE_DATA[activeTab];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* TAB SWITCHER */}
        <div className="flex justify-center mb-16">
          <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-xl flex gap-2">
            <button
              onClick={() => setActiveTab("pusat")}
              className={`px-8 py-3 rounded-xl text-xs font-black tracking-widest transition-all ${
                activeTab === "pusat"
                  ? "bg-[#103713] text-white shadow-lg shadow-[#103713]/20"
                  : "text-[#103713]/40 hover:bg-gray-50"
              }`}
            >
              PUSAT - SERANG
            </button>
            <button
              onClick={() => setActiveTab("cabang")}
              className={`px-8 py-3 rounded-xl text-xs font-black tracking-widest transition-all ${
                activeTab === "cabang"
                  ? "bg-[#103713] text-white shadow-lg shadow-[#103713]/20"
                  : "text-[#103713]/40 hover:bg-gray-50"
              }`}
            >
              CABANG - BOGOR
            </button>
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
          
          {/* ATAS: Teks Profil & Video */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Bagian Teks */}
            <div className="lg:w-7/12 space-y-8">
              <div className="space-y-3">
                <h4 className="text-[#628B35] font-bold tracking-[0.3em] uppercase text-[10px]">Profil Lembaga</h4>
                <h2 className="text-3xl md:text-5xl font-black text-[#103713] uppercase leading-none tracking-tighter">
                  {data.title}
                </h2>
                <p className="text-[#628B35] font-bold italic border-l-4 border-[#628B35] pl-4 text-sm">
                  {data.location}
                </p>
              </div>

              <div className="space-y-5 text-justify leading-relaxed text-gray-600 font-medium">
                {data.history.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {data.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#628B35]" />
                    <span className="block text-xl md:text-2xl font-black text-[#103713] mb-1">{stat.value}</span>
                    <span className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bagian Video */}
            <div className="lg:w-5/12 w-full">
              <div className="relative group">
                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-[#628B35] opacity-20" />
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-4 border-r-4 border-[#103713] opacity-20" />

                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black z-10 border-4 border-white">
                  <iframe
                    src={data.youtubeEmbed}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none scale-105"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>

                  <a 
                    href={data.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20 bg-black/30 hover:bg-black/10 transition-all duration-500 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#628B35] transition-all duration-300">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* BAWAH: Visi & Misi (Grid 2 Kolom) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kartu Visi */}
            <div className="bg-[#103713] text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#628B35]/10 rounded-full -mr-16 -mt-16" />
              <div className="relative z-10">
                <h3 className="text-[#628B35] font-black text-[10px] tracking-[0.3em] mb-4 uppercase">Visi Utama</h3>
                <p className="text-lg md:text-2xl font-bold leading-tight text-white tracking-tight italic">
                  "{data.vision}"
                </p>
              </div>
            </div>

            {/* Kartu Misi */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-50 rounded-full -mr-16 -mb-16" />
              <div className="relative z-10">
                <h3 className="text-[#628B35] font-black text-[10px] tracking-[0.3em] mb-6 uppercase">Misi Strategis</h3>
                <ul className="space-y-5">
                  {data.mission.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-[#628B35] shadow-[0_0_10px_#628B35] shrink-0" />
                      <span className="text-sm md:text-base font-semibold text-gray-600 leading-relaxed group-hover:text-[#103713] transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProfileSection;