import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Supaya Next.js mengeksekusi request secara dinamis saat dipanggil
export const dynamic = "force-dynamic";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  try {
    const prompt = `
Pilih 1 topik/pembahasan islami harian yang inspiratif secara acak (contoh: "Sabar", "Berbuat Baik kepada Orang Tua", "Menjaga Lisan", "Amanah", "Sedekah", "Syukur", "Menjauhi Prasangka", dll).

Tentukan 1 ayat Al-Qur'an yang BENAR-BENAR membahas topik tersebut secara langsung.

ATURAN KETAT:
1. Teks Arab dan Terjemahan Bahasa Indonesia HARUS LENGKAP dan BENAR-BENAR SESUAI dengan ayat serta topik yang dipilih.
2. JANGAN MEMILIH ayat pembuka surat yang umum/potongan huruf (seperti Al-Baqarah ayat 1-2 atau An-Nur ayat 1).
3. Terjemahan Indonesia harus minimal 5 kata agar bermakna utuh.

Kembalikan respon HANYA dalam format JSON berikut tanpa teks lain:
{
  "topic": "Judul Topik Pembahasan",
  "surahName": "Nama Surat (contoh: Al-Baqarah)",
  "surahNumber": nomor_surat_1_sampai_114,
  "ayahNumber": nomor_ayat,
  "arabicText": "Teks Arab Ayat Lengkap",
  "translationText": "Terjemahan Bahasa Indonesia Ayat Lengkap"
}
`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "openai/gpt-oss-20b",
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const aiResult = JSON.parse(
      completion.choices[0]?.message?.content || "{}"
    );

    const {
      topic,
      surahName,
      surahNumber,
      ayahNumber,
      arabicText,
      translationText,
    } = aiResult;

    // Validasi sederhana jika output AI tidak lengkap
    if (!topic || !arabicText || !translationText) {
      throw new Error("Respon dari AI tidak lengkap");
    }

    return NextResponse.json({
      topic,
      surahName,
      surahNumber,
      ayahNumber,
      arabicText,
      translationText,
    });
  } catch (error) {
    console.error("Error pada API Ayat Hari Ini:", error);
    return NextResponse.json(
      { error: "Gagal memuat ayat hari ini" },
      { status: 500 }
    );
  }
}