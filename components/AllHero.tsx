import Image from "next/image";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  altText?: string;
  imageFit?: "cover" | "contain";
  imagePosition?: string;
}

const AllHero = ({
  title,
  description,
  imageSrc,
  altText,
  imageFit = "cover",
  imagePosition = "50%",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[260px] md:h-[340px] flex items-center justify-center border-b-4 border-gold/60 overflow-hidden bg-primary">
      {/* Layer 1: Gambar Background */}
      <Image
        src={imageSrc}
        alt={altText || title}
        fill
        priority
        className="transition-all duration-500 scale-105"
        style={{
          objectFit: imageFit,
          objectPosition: `center ${imagePosition}`,
        }}
      />

      {/* Layer 2: Overlay Phthalo Green Gelap dengan Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/65 to-primary/90 backdrop-blur-[2px]" />

      {/* Layer 3: Ornamen Islami Background */}
      {/* Bingkai Motif Kubah (Dome Arch) Transparan */}
      <div className="absolute inset-3 md:inset-5 border border-gold/25 rounded-t-[80px] md:rounded-t-[130px] pointer-events-none" />

      {/* Accent Sparkles/Bintang Islami */}
      <div className="absolute top-5 left-8 text-gold/30 pointer-events-none">
        <Sparkles size={22} />
      </div>
      <div className="absolute bottom-5 right-8 text-gold/30 pointer-events-none">
        <Sparkles size={20} />
      </div>

      {/* Layer 4: Konten Teks */}
      <div className="mt-10 relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        {/* Calligraphy Sub-heading Decorative Accent */}
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-6 md:w-8 h-[1px] bg-gold/60" />
          <span className="text-gold font-serif text-[11px] md:text-xs tracking-[0.2em] uppercase font-medium">
            Masjid Daarul Jamil
          </span>
          <div className="w-6 md:w-8 h-[1px] bg-gold/60" />
        </div>

        {/* Title Utama */}
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-milk tracking-wide mb-1.5 drop-shadow-md">
          {title}
        </h1>

        {/* Divider Islami (Bintang Segi Empat + Garis Emas) */}
        <div className="flex items-center gap-2 my-2">
          <div className="w-10 md:w-14 h-[2px] bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2.5 h-2.5 rotate-45 border border-gold bg-gold/20 flex items-center justify-center">
            <div className="w-1 h-1 bg-gold rounded-full" />
          </div>
          <div className="w-10 md:w-14 h-[2px] bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Deskripsi */}
        <p className="text-xs md:text-sm text-bone/90 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-xs line-clamp-2 md:line-clamp-none">
          {description}
        </p>
      </div>

      {/* Ornamen Siku Sudut (Corner Accents) */}
      <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-gold/50 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-gold/50 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-gold/50 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-gold/50 pointer-events-none" />
    </div>
  );
};

export default AllHero;