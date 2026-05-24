// ไฟล์ที่ใช้ตั้งค่าการเชื่อมต่อไปยัง Supabase ซึ่งต้องใช้ URL และ KEY ของ Supabase

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://kptnexkjsuvysvmpyvoj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_852mx6I8In2OuXc3I_2M4A_rZLET7sZ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
