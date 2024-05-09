import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.PROJECT_ID || "YOUR_PROJECT_URL",
  process.env.API_KEY || "YOUR_API_KEY"
);

export default supabase;
