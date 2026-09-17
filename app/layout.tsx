import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/NavbarWrapper";

export const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masjid Daarul Jamil",
  description: "Website resmi Masjid Daarul Jamil",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cinzel.variable}>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-lightGray/80
          text-primary
        `}
      >
        {/* 2. Panggil di sini agar berjalan di setiap halaman */}
        
        <NavbarWrapper />
        
        <main>{children}</main>
      </body>
    </html>
  );
}