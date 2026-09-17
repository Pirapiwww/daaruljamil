import Link from "next/link";
import { Play, ChevronLeft, ChevronRight, Youtube, ArrowRight, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

const PER_PAGE = 9;

async function getChannelInfo() {
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

try {
    const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`,
    { cache: "no-store" }
    );
    const data = await res.json();
    if (!data.items) return null;
    
    return {
    title: data.items[0].snippet.title,
    thumbnail: data.items[0].snippet.thumbnails.medium.url,
    subscriberCount: data.items[0].statistics.subscriberCount,
    customUrl: data.items[0].snippet.customUrl,
    };
} catch (error) {
    return null;
}
}

async function getVideos(pageToken?: string) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
      { cache: "no-store" }
    );
    const channelData = await channelRes.json();
    if (!channelData.items) return { videos: [], nextPageToken: null };
    
    const uploadsId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

    let collected: any[] = [];
    let currentToken = pageToken || "";
    let finalNextToken = null;

    // Loop hingga mendapatkan jumlah video yang diinginkan (PER_PAGE)
    while (collected.length < PER_PAGE) {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=20&pageToken=${currentToken}&key=${API_KEY}`;
      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      if (!data.items || data.items.length === 0) break;

      // Ambil semua Video ID dari hasil playlist untuk cek durasi
      const videoIds = data.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
      
      // Fetch detail video untuk mendapatkan durasi (contentDetails)
      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`,
        { cache: "no-store" }
      );
      const detailsData = await detailsRes.json();

      const filtered = detailsData.items
        .filter((video: any) => {
          const duration = video.contentDetails.duration; // Format ISO 8601 (misal: PT1M15S)
          const isShortDuration = duration.includes('S') && !duration.includes('M') && !duration.includes('H');
          
          // Logika Filter:
          // 1. Bukan Shorts (Biasanya < 60 detik)
          // 2. Tidak ada kata "Shorts" di judul atau deskripsi
          // 3. Bukan video Live
          const isShortsTag = /#shorts/i.test(video.snippet.title) || /#shorts/i.test(video.snippet.description);
          const isLive = /\blive\b/i.test(video.snippet.title);

          // Video dianggap shorts jika durasinya kurang dari 60 detik (hanya ada detik 'S' tanpa 'M' menit)
          // atau mengandung hashtag #shorts
          return !isShortDuration && !isShortsTag && !isLive;
        })
        .map((video: any) => ({
          title: video.snippet.title,
          videoId: video.id,
          publishedAt: video.snippet.publishedAt,
        }));

      collected = [...collected, ...filtered];
      currentToken = data.nextPageToken;
      finalNextToken = data.nextPageToken;

      if (!data.nextPageToken) break;
    }

    return {
      videos: collected.slice(0, PER_PAGE),
      nextPageToken: finalNextToken,
    };
  } catch (error) {
    console.error("YouTube Error:", error);
    return { videos: [], nextPageToken: null };
  }
}

export default async function VideoSection({
page = 1,
pageTokens,
}: {
page?: number;
pageTokens?: string;
}) {
const currentPage = Number(page) || 1;
const tokenArray = pageTokens ? pageTokens.split(",") : [];
const activeToken = currentPage > 1 ? tokenArray[currentPage - 2] : undefined;

const [channel, { videos, nextPageToken }] = await Promise.all([
    getChannelInfo(),
    getVideos(activeToken)
]);

return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 lg:px-6">
    {/* HEADER */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-8">
        <div className="space-y-2">
        <h2 className="text-3xl md:text-5xl font-black text-[#103713] tracking-tighter uppercase leading-none">
            DOKUMENTASI VIDEO
        </h2>
        <div className="h-2 w-20 bg-[#628B35]" />
        </div>
        <p className="text-gray-500 text-sm max-w-xs md:text-right font-medium italic">
        Kumpulan video kegiatan dan informasi visual resmi Pondok Pesantren.
        </p>
    </div>

    {/* CHANNEL INFO BAR */}
    {channel && (
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 p-6 bg-lightGray border border-gray-100 rounded-3xl gap-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#628B35]">
            <img 
                src="/logo/logo1.png" 
                alt={channel.title} 
                className="w-full h-full object-cover"
            />
            </div>
            <div>
            <h2 className="text-lg font-bold text-[#103713]">{channel.title}</h2>
            <p className="text-xs text-gray-500 font-bold tracking-wider uppercase">
                {Number(channel.subscriberCount).toLocaleString('id-ID')} SUBSCRIBERS
            </p>
            </div>
        </div>
        
        <a 
            href={`https://www.youtube.com/${channel.customUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 bg-[#103713] text-[#FFFDF5] rounded-xl font-black text-xs tracking-widest hover:bg-[#628B35] transition-all shadow-lg active:scale-95"
        >
            <Youtube size={16} />
            SUBSCRIBE NOW
        </a>
        </div>
    )}

    {/* GRID LAYOUT */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {videos.map((video: any) => (
        <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col"
        >
            {/* Thumbnail Section */}
            <div className="relative aspect-video overflow-hidden">
            <img
                src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 group-hover:bg-[#628B35] group-hover:text-white rounded-full flex items-center justify-center shadow-xl transition-all transform group-hover:scale-110 text-[#103713]">
                <Play size={20} fill="currentColor" />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white text-xs font-bold flex items-center gap-2">
                Tonton Sekarang <ArrowRight size={14}/>
                </span>
            </div>
            </div>

            {/* Content Section dengan Tanggal */}
            <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-sm font-bold text-[#103713] leading-snug group-hover:text-[#628B35] transition-colors line-clamp-2 mb-4">
                {video.title}
            </h3>
            
            {/* Tanggal Publikasi (Mirroring style info publikasi) */}
            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center gap-2 text-[#103713]/50">
                <Calendar size={14} className="text-[#628B35]" />
                <span className="text-[11px] font-bold tracking-wider uppercase">
                {new Date(video.publishedAt).toLocaleDateString("id-ID", {
                    day: 'numeric', month: 'long', year: 'numeric'
                })}
                </span>
            </div>
            </div>
        </a>
        ))}
    </div>

    {/* PAGINATION */}
    <div className="mt-16 flex items-center justify-between border-t border-gray-100 pt-8">
        <div className="min-w-[120px]">
        {currentPage > 1 && (
            <Link
            scroll={false}
            href={`/informasi/video?page=${currentPage - 1}&pageTokens=${tokenArray.slice(0, -1).join(",")}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:border-[#628B35] hover:text-[#628B35] transition-all group"
            >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Sebelumnya</span>
            </Link>
        )}
        </div>

        <div className="w-10 h-10 rounded-xl bg-[#628B35] text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-[#628B35]/30">
        {currentPage}
        </div>

        <div className="min-w-[120px] flex justify-end">
        {nextPageToken && (
            <Link
            scroll={false}
            href={`/informasi/video?page=${currentPage + 1}&pageTokens=${[...tokenArray, nextPageToken].join(",")}`}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:border-[#628B35] hover:text-[#628B35] transition-all group"
            >
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        )}
        </div>
    </div>
    </div>
);
}