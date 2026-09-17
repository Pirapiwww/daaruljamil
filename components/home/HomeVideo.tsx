import VideoSlider from "./VideoSlider";
import { Youtube } from "lucide-react";

export const dynamic = "force-dynamic";

async function getVideos() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  try {
    const resChannel = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const dataChannel = await resChannel.json();
    if (!dataChannel.items) return [];

    const uploadsId = dataChannel.items[0].contentDetails.relatedPlaylists.uploads;

    // 1. NAIKKAN maxResults ke 50 (maksimal API) 
    // agar kalau banyak Shorts, kita tetap punya cadangan video reguler
    const resVids = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=50&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const dataVids = await resVids.json();
    const items = dataVids.items || [];

    if (items.length === 0) return [];

    // 2. Ambil detail semua video tersebut untuk cek durasi
    const videoIds = items.map((v: any) => v.snippet.resourceId.videoId).join(",");
    const resDetails = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );
    const dataDetails = await resDetails.json();

    return (dataDetails.items || [])
      .filter((v: any) => {
        const duration = v.contentDetails.duration; // Format PT#M#S
        const title = v.snippet.title.toLowerCase();
        
        // Logika Filter yang lebih akurat:
        const isLive = /\blive\b/i.test(title);
        const hasShortsTag = title.includes("#shorts");
        
        // Shorts biasanya < 1 menit. 
        // PT1M5S (1m 5s) -> Ada 'M', berarti bukan shorts.
        // PT45S (45s) -> Tidak ada 'M', berarti shorts.
        const isShortDuration = !duration.includes("M") && !duration.includes("H");

        return !isLive && !hasShortsTag && !isShortDuration;
      })
      .map((v: any) => ({
        title: v.snippet.title,
        videoId: v.id,
        publishedAt: v.snippet.publishedAt,
      }))
      .slice(0, 5); // Sekarang slice 5 akan aman karena ambil dari 50 data awal
  } catch (e) {
    console.error("HomeVideo Error:", e);
    return [];
  }
}

export default async function HomeVideo() {
  const videos = await getVideos();

  if (videos.length === 0) return null;

  return (
    <section className="w-full py-12">
      {/* Tambahkan div pembungkus (container) di sini */}
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary mb-1">
              <Youtube size={22} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] font-sans">Official Feed</span>
            </div>
            <h2 className="mt-3 text-xl md:text-3xl font-black text-primary tracking-tight leading-none font-heading uppercase">
              VIDEO TERBARU
            </h2>
            <div className="h-1.5 w-32 bg-secondary rounded-full" />
          </div>

          <div className="hidden lg:block max-w-[300px]">
            <p className="text-primary/70 text-sm text-right leading-relaxed font-medium font-sans italic">
              Dokumentasi dan informasi terkini langsung dari kanal YouTube resmi kami.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Efek hiasan (blur) tetap di sini agar relatif terhadap kontainer video */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-bone/30 rounded-full blur-[80px] -z-10" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10" />
          
          <VideoSlider videos={videos} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <a 
            href={"/informasi/video"}
            className="group flex items-center gap-4 bg-primary text-milk px-8 py-4 rounded-xl font-bold transition-all duration-500 hover:bg-secondary hover:shadow-xl active:scale-95 font-sans"
          >
            <span className="tracking-wide uppercase text-sm">Lihat Lebih Banyak</span>
          </a>
        </div>

      </div>
    </section>
  );
}