"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

interface KontakData {
title: string;
alamat: string;
link_maps: string;
}

export default function LokasiSection() {
const [activeTab, setActiveTab] = useState<number>(1); // 1 = Pusat, 2 = Bogor
const [locations, setLocations] = useState<Record<number, KontakData>>({});

useEffect(() => {
    const fetchLocations = async () => {
    try {
        const { data, error } = await supabase
        .from("kontak")
        .select("KontakId, title, alamat, link_maps")
        .in("KontakId", [1, 2]);

        if (error) throw error;

        if (data) {
        const mappedData = data.reduce((acc, item) => {
            acc[item.KontakId] = {
            title: item.title,
            alamat: item.alamat,
            link_maps: item.link_maps,
            };
            return acc;
        }, {} as Record<number, KontakData>);

        setLocations(mappedData);
        }
    } catch (err) {
        console.error("Database Error:", err);
    }
    };

    fetchLocations();
}, []);

const current = locations[activeTab];

return (
    <section className="pt-10 pb-20 bg-gray-50 font-sans">
    <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
        <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-primary font-heading tracking-tight"
        >
            LOKASI
        </motion.h2>
        <div className="w-20 h-1.5 bg-secondary mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
        <div className="bg-bone/30 border border-bone p-1.5 rounded-2xl flex gap-2 shadow-sm scale-90 md:scale-100">
            <button
            onClick={() => setActiveTab(1)}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 text-sm ${
                activeTab === 1 ? "bg-primary text-milk shadow-lg" : "text-primary/60 hover:text-primary"
            }`}
            >
            Pusat - Banten
            </button>
            <button
            onClick={() => setActiveTab(2)}
            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 text-sm ${
                activeTab === 2 ? "bg-primary text-milk shadow-lg" : "text-primary/60 hover:text-primary"
            }`}
            >
            Cabang - Bogor
            </button>
        </div>
        </div>

        {/* Content Card */}
        <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
            {current ? (
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(16,55,19,0.1)] border border-bone flex flex-col md:flex-row"
            >
                <div className="flex flex-col md:flex-row w-full">
                
                {/* Info Box */}
                <div className="md:w-1/3 p-8 flex flex-col justify-center bg-primary text-milk">
                    <span className="text-secondary text-xs font-bold uppercase tracking-widest mb-2">
                    Alamat Lengkap
                    </span>
                    <h3 className="text-2xl font-bold mb-3 font-heading leading-tight">
                    {current.title}
                    </h3>
                    <p className="text-bone/80 text-sm leading-relaxed mb-6">
                    {current.alamat}
                    </p>
                    
                    {/* Link Maps (Konversi embed ke link search agar bisa diklik) */}
                    <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(current.alamat)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-center bg-secondary hover:bg-secondary/90 text-milk font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 text-sm"
                    >
                    Buka di Maps
                    </a>
                </div>

                {/* Map Box */}
                <div className="md:w-2/3 h-[350px] md:h-[450px] bg-bone/10">
                    <iframe
                    src={current.link_maps} 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>
                </div>
            </motion.div>
            ) : (
            // Konten kosong sementara data fetch (bisa diganti skeleton)
            <div className="h-[450px] flex items-center justify-center text-primary/20 italic">
                Sinkronisasi lokasi...
            </div>
            )}
        </AnimatePresence>
        </div>
    </div>
    </section>
);
}