import { createClient } from "@supabase/supabase-js";

// Inisialisasi client di luar fungsi agar bisa di-reuse
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export const triggerViewCount = async () => {
  try {
    const { error } = await supabase.rpc('increment_view_count');
    if (error) throw error;
  } catch (err) {
    // Kita pakai console.warn saja agar tidak terlalu 'berisik' di log kalau hanya masalah koneksi ringan
    console.warn("View count not triggered:", err);
  }
};