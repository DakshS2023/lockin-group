import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { defaultContent } from "@/content/site";
import { contentSchema } from "./content-schema";
import type { Database } from "@/integrations/supabase/types";

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error("Website content is unavailable.");
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      headers.set("apikey", key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from("site_content").select("content").eq("id", "main").maybeSingle();
  if (error) throw new Error("Website content could not be loaded.");
  if (!data) return defaultContent;
  return contentSchema.parse(data.content);
});