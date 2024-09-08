import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseKey || !supabaseUrl) {
  throw new Error("Missing SUPABASE_KEY or SUPABASE_URL environment variable");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
