import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

// Load env from project workspace
dotenv.config({ path: "/Users/romerosoft/Work/DESARROLLO/WEB/apps/.env.local" });

async function run() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    console.error("Missing env vars!");
    return;
  }

  const supabase = createClient(url, anonKey);
  const { data, error } = await supabase.from("apps").select("*").eq("slug", "vitalspath");
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Supabase Reps Data:", JSON.stringify(data, null, 2));
  }
}

run();
