import AllHero from "@/components/AllHero";
import VideoSection from "@/components/informasi/video/VideoSection";
import Image from "next/image";

export default async function VideosPage({
searchParams,
}: {
searchParams: Promise<{
    page?: string;
    pageTokens?: string;
}>;
}) {
const params = await searchParams;
const currentPage = Number(params?.page) || 1;
const currentTokens = params?.pageTokens || "";

return (
    <main className="min-h-screen"> 
    
    <AllHero
        title="Video Kegiatan"
        description="Dokumentasi resmi seluruh rangkaian kegiatan santri dan agenda utama Pondok Pesantren Darul Amanah."
        imageSrc="/image/hero-1.jpg"
        altText="Hero Image"
        imagePosition="70%"
    />

    {/* Area Video Section */}
        <div className="w-full">
        <VideoSection
            page={currentPage}
            pageTokens={currentTokens}
        />
        </div>

    
    </main>
);
}