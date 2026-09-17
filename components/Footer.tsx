"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Facebook, Instagram, MapPin, Phone, Mail, Youtube, ChevronDown } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

const Footer = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  
  // Memberikan nilai default agar tidak kosong saat proses fetch
  const [contactData, setContactData] = useState({
    alamat: "Jalan Cikulur Jl. Kuranji, Taktakan, Kota Serang, Banten 42162",
    telepon: "087771643527",
    email: "pesantrenardaniah@gmail.com"
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data, error } = await supabase
          .from("kontak")
          .select("alamat, telepon, email")
          .eq("KontakId", 1)
          .single();

        if (error) throw error;
        if (data) setContactData(data);
      } catch (error) {
        console.error("Gagal sinkronisasi database:", error);
      }
    };

    fetchContact();
  }, []);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((item) => item !== menuName)
        : [...prev, menuName]
    );
  };

  const isOpen = (menuName: string) => openMenus.includes(menuName);

  return (
    <footer className="bg-primary text-milk pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Bagian 1: Logo & Sosial Media */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 bg-milk/10 rounded-lg flex items-center justify-center p-2">
                <Image 
                  src="/logo/logo1.png" 
                  alt="Logo Ardaniah" 
                  fill 
                  className="object-contain p-2"
                />
              </div>
              <div>
                <h2 className="font-cinzel text-lg leading-tight font-bold tracking-wider">
                  PONDOK PESANTREN
                </h2>
                <h1 className="font-cinzel text-2xl font-black tracking-tighter text-secondary">
                  ARDANIAH
                </h1>
                <p className="font-sans text-[10px] tracking-[0.2em] opacity-80 uppercase">
                  SERANG - BANTEN
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Link href="https://www.instagram.com/ponpes_ardaniah" className="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 p-2 rounded-md hover:scale-110 transition-transform">
                <Instagram size={18} />
              </Link>
              <Link href="https://www.youtube.com/@ardaniahbanten" className="bg-red-600 p-2 rounded-md hover:scale-110 transition-transform">
                <Youtube size={18} />
              </Link>
              <Link href="https://web.facebook.com/ardaniahpusatbanten" className="bg-[#1877F2] p-2 rounded-md hover:scale-110 transition-transform">
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {/* Bagian 2: Useful Links */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-6 text-secondary italic">
              Useful Links
            </h3>
            
            <div className="flex justify-between gap-4 text-sm font-medium opacity-90">
              <ul className="flex-1 space-y-4">
                <li><Link href="/profil" className="hover:text-secondary block">Profil</Link></li>
                <li className="flex flex-col">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-secondary select-none" onClick={() => toggleMenu('pendidikan')}>
                    <span>Pendidikan</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen('pendidikan') ? "rotate-180 text-secondary" : ""}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen('pendidikan') ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-2 ml-1">
                      <li><Link href="/pendidikan/kurikulum" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Kurikulum</Link></li>
                      <li><Link href="/pendidikan/kelas" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Kelas</Link></li>
                    </ul>
                  </div>
                </li>
                <li className="flex flex-col">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-secondary select-none" onClick={() => toggleMenu('pendaftaran')}>
                    <span>Pendaftaran</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen('pendaftaran') ? "rotate-180 text-secondary" : ""}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen('pendaftaran') ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-2 ml-1">
                      <li><Link href="/pendaftaran/syarat" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Syarat Pendaftaran</Link></li>
                      <li><Link href="/pendaftaran/informasi" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Informasi Pendaftaran</Link></li>
                    </ul>
                  </div>
                </li>
              </ul>

              <ul className="flex-1 space-y-4">
                <li className="flex flex-col">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-secondary select-none" onClick={() => toggleMenu('fasilitas')}>
                    <span>Fasilitas</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen('fasilitas') ? "rotate-180 text-secondary" : ""}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen('fasilitas') ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-2 ml-1">
                      <li><Link href="/fasilitas/serang" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Pusat - Banten</Link></li>
                      <li><Link href="/fasilitas/bogor" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Cabang - Bogor</Link></li>
                    </ul>
                  </div>
                </li>
                <li className="flex flex-col">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-secondary select-none" onClick={() => toggleMenu('informasi')}>
                    <span>Informasi</span>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen('informasi') ? "rotate-180 text-secondary" : ""}`} />
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen('informasi') ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-2 ml-1">
                      <li><Link href="/informasi/publikasi" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Publikasi</Link></li>
                      <li><Link href="/informasi/video" className="pl-3 border-l-2 border-secondary/20 hover:border-secondary hover:text-secondary transition-all block">Video</Link></li>
                      <li className="flex flex-col">
                        <div className="pl-3 border-l-2 border-secondary/20 flex items-center justify-between cursor-pointer hover:border-secondary hover:text-secondary transition-all" onClick={(e) => { e.stopPropagation(); toggleMenu('galeri-nested'); }}>
                          <span>Galeri</span>
                          <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen('galeri-nested') ? "rotate-180" : "-rotate-90"}`} />
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ${isOpen('galeri-nested') ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                          <ul className="space-y-2 ml-4">
                            <li><Link href="/informasi/galeri/prestasi" className="pl-3 border-l-2 border-secondary/10 hover:border-secondary hover:text-secondary transition-all block text-[11px]">Prestasi</Link></li>
                            <li><Link href="/informasi/galeri/kegiatan" className="pl-3 border-l-2 border-secondary/10 hover:border-secondary hover:text-secondary transition-all block text-[11px]">Kegiatan</Link></li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li><Link href="/kontak" className="hover:text-secondary block">Kontak</Link></li>
              </ul>
            </div>
          </div>

          {/* Bagian 3: Address Us (LANGSUNG DATA) */}
          <div className="space-y-6">
            <h3 className="font-heading text-2xl font-bold text-secondary italic">
              Address Us
            </h3>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-secondary shrink-0 mt-1" />
                <span className="leading-relaxed">
                  {contactData.alamat}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-secondary shrink-0" />
                <span>
                  {contactData.telepon}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-secondary shrink-0" />
                <span>
                  {contactData.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-milk/10 pt-8 text-center text-[10px] opacity-50 tracking-widest uppercase">
          <p>Copyright © Pondok Pesantren Ardaniah Pusat all rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;