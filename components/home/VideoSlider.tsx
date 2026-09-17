"use client";

import { Play, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface Video {
videoId: string;
title: string;
publishedAt: string;
}

export default function VideoSlider({ videos }: { videos: Video[] }) {
const scroll = (direction: "left" | "right") => {
    const el = document.getElementById('video-slider');
    if (el) {
    const scrollAmount = 400;
    el.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
    });
};

return (
    <div className="relative group w-full">
    <div 
        id="video-slider"
        className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory pb-8 no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
        {videos.map((video) => (
        <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[85%] sm:min-w-[48%] lg:min-w-[32%] snap-start group/card flex flex-col bg-white rounded-2xl overflow-hidden border border-bone shadow-sm hover:shadow-xl transition-all duration-500"
        >
            {/* Thumbnail Wrapper */}
            <div className="relative aspect-video overflow-hidden">
            <img
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
            <div className="absolute inset-0 bg-primary/20 group-hover/card:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-2xl scale-90 group-hover/card:scale-100 transition-all duration-300">
                <Play size={28} fill="currentColor" />
                </div>
            </div>
            
            <div className="absolute bottom-3 right-3 bg-primary/80 text-milk text-[10px] px-2 py-1 rounded font-bold backdrop-blur-sm">
                HD
            </div>
            </div>

            {/* Content Wrapper */}
            <div className="p-5 flex flex-col flex-grow bg-white border-t border-bone/50">
            {/* Tanggal */}
            <div className="flex items-center gap-1.5 text-secondary mb-3 font-sans">
                <Calendar size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                {formatDate(video.publishedAt)}
                </span>
            </div>

            {/* Judul (Title) */}
            <h3 className="font-bold text-primary text-base leading-snug line-clamp-2 font-sans group-hover/card:text-secondary transition-colors duration-300">
                {video.title}
            </h3>
            
            {/* Garis Aksen saat Hover */}
            <div className="w-0 group-hover/card:w-full h-0.5 bg-secondary mt-4 transition-all duration-500" />
            </div>
        </a>
        ))}
    </div>

    {/* Navigasi Panah - Menggunakan palet Primary/Secondary */}
    <button 
        onClick={() => scroll("left")}
        className="absolute -left-4 top-[40%] -translate-y-1/2 bg-white p-3 rounded-full shadow-xl border border-bone hidden md:flex hover:bg-primary hover:text-milk transition-all z-30 active:scale-95"
    >
        <ChevronLeft size={24} />
    </button>

    <button 
        onClick={() => scroll("right")}
        className="absolute -right-4 top-[40%] -translate-y-1/2 bg-white p-3 rounded-full shadow-xl border border-bone hidden md:flex hover:bg-primary hover:text-milk transition-all z-30 active:scale-95"
    >
        <ChevronRight size={24} />
    </button>
    </div>
);
}