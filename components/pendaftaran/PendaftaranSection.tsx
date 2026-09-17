"use client";

import React, { useState } from "react";
import { 
ChevronDown, 
Send, 
Calendar, 
MessageCircleQuestion,
ExternalLink,
Clock
} from "lucide-react";

export default function PendaftaranSection() {
const [activeFaq, setActiveFaq] = useState<number | null>(null);

const alurPendaftaran = [
    {
    title: "Tes Wawancara",
    date: "18 Desember 2025 - 04 Januari 2026",
    desc: "Setelah mengisi formulir dan kuisioner online, calon santri akan mendapatkan jadwal dari panitia untuk melakukan Tes Wawancara. Satu hari sebelum jadwal tersebut, calon santri akan dihubungi oleh pewawancara perihal kesiapan, kemudian pada jadwal yang ditentukan akan dihubungi melalui WhatsApp Video Call. Pastikan nomor WhatsApp aktif.",
    },
    // Kamu bisa tambah alur lain di sini dengan format yang sama
];

const faqs = [
    { q: "Kapan pendaftaran dibuka?", a: "Pendaftaran gelombang pertama dibuka mulai Januari hingga Maret setiap tahunnya." },
    { q: "Apa saja syarat berkasnya?", a: "Fotokopi KK, Akta Kelahiran, Ijazah terakhir, dan pas foto 3x4 (4 lembar)." },
];

return (
    <section className="py-24">
    <div className="container mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* SISI KIRI: Info & Timeline Alur */}
        <div className="lg:col-span-8 space-y-12">
            <div>
            <h4 className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] mb-2">Prosedur Penerimaan</h4>
            <h2 className="text-4xl font-black text-primary uppercase tracking-tighter">Informasi & Alur</h2>
            <div className="w-16 h-1.5 bg-secondary rounded-full mt-2"></div>
            </div>

            {/* Timeline Alur */}
            <div className="space-y-8">
            {alurPendaftaran.map((step, idx) => (
                <div key={idx} className="relative bg-white border border-bone p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group">
                {/* Label Step */}
                <div className="absolute -top-4 left-8 px-4 py-1 bg-secondary text-white text-[10px] font-black rounded-full shadow-lg">
                    TAHAPAN {idx + 1}
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-2xl font-black text-primary uppercase tracking-tight italic">
                        {step.title}
                    </h3>
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-xl border border-primary/10 text-primary">
                        <Calendar size={14} className="text-secondary" />
                        <span className="text-xs font-bold">{step.date}</span>
                    </div>
                    </div>

                    <div className="flex gap-4 items-start bg-milk/50 p-5 rounded-2xl border border-dashed border-bone">
                    <Clock size={20} className="text-secondary shrink-0 mt-1" />
                    <p className="text-sm font-medium text-primary/70 leading-relaxed text-justify">
                        {step.desc}
                    </p>
                    </div>
                </div>
                </div>
            ))}
            </div>

            {/* FAQ Area di bawah Alur */}
            <div className="pt-8 space-y-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-3">
                <MessageCircleQuestion className="text-secondary" size={24} /> FAQ Pendaftaran
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-bone">
                    <button 
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left flex justify-between items-start group"
                    >
                    <span className="text-sm font-black text-primary/80 group-hover:text-secondary transition-colors italic leading-snug">{faq.q}</span>
                    <ChevronDown size={16} className={`shrink-0 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
                    </button>
                    {activeFaq === idx && (
                    <p className="mt-4 text-xs font-medium text-primary/60 leading-relaxed animate-in fade-in slide-in-from-top-2">
                        {faq.a}
                    </p>
                    )}
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* SISI KANAN: Tombol Pendaftaran (Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="bg-primary p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
            {/* Dekorasi Bulat */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <div className="relative z-10 space-y-8 text-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto border border-white/20 shadow-xl">
                    <Send size={32} className="text-secondary animate-pulse" />
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">
                        Daftar <br /> Sekarang
                    </h3>
                    <div className="space-y-1"> {/* Wrapper untuk Tahun & Gelombang */}
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                            Tahun Ajaran 2026/2027
                        </p>
                        {/* Penambahan Gelombang 2 */}
                        <div className="mt-4 inline-block px-3 py-1 bg-secondary/20 border border-secondary/30 rounded-full">
                            <p className="text-secondary text-[10px] font-black uppercase tracking-widest">
                                Gelombang 2
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <p className="text-sm font-medium text-white/80 leading-relaxed">
                    Silakan tekan tombol di bawah untuk diarahkan langsung ke Google Form pendaftaran.
                </p>

                <a 
                    href="https://google.form/pendaftaran-anda" 
                    target="_blank"
                    className="inline-flex w-full items-center justify-center gap-3 px-8 py-5 bg-secondary text-white font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_20px_-10px_#628B35] group"
                >
                    ISI FORMULIR
                    <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <p className="text-[10px] text-white/40 font-bold italic tracking-wide">
                    *Pastikan data yang diisi sudah benar dan valid.
                </p>
            </div>
            </div>
        </div>

        </div>
    </div>
    </section>
);
}