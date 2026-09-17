"use server";

import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export async function loginAction(usernameInput: string, passwordInput: string) {
  // 1. Ambil Kredensial dari env.local
  const correctUser = process.env.ADMIN_USERNAME; // Ini harus bernilai 'ardaniah'
  const correctPass = process.env.ADMIN_PASSWORD;

  // 2. Validasi Kredensial
  if (usernameInput === correctUser && passwordInput === correctPass) {
    
    // 3. Ambil info device (User Agent)
    const headerList = await headers();
    const userAgent = headerList.get("user-agent") || "Unknown Device";

    // 4. Buat Session Token Baru
    const newSessionToken = crypto.randomUUID();

    // 5. Eksekusi UPSERT
    // Kita gunakan 'correctUser' (dari ENV) untuk memastikan yang diupdate 
    // selalu baris 'ardaniah', bukan baris baru dari input yang mungkin typo.
    const { error } = await supabase
      .from("admin_sessions")
      .upsert(
        {
          admin_username: correctUser, // Menggunakan nilai murni dari ENV
          session_token: newSessionToken,
          update_at: new Date().toISOString(),
          user_agent: userAgent,
        },
        { 
          onConflict: 'admin_username' 
        }
      );

    if (error) {
      console.error("Supabase Error:", error.message);
      return { success: false, message: `Database Error: ${error.message}` };
    }

    return { 
      success: true, 
      sessionToken: newSessionToken 
    };
  }

  return { success: false, message: "Username atau password salah." };
}