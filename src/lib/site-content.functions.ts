import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { defaultContent } from "@/content/site";
import { contentSchema } from "./content-schema";
import heroImg from "@/assets/hero.jpg";
import searchImg from "@/assets/room-search-rescue.jpg";
import alphaImg from "@/assets/room-alpha-team.jpg";
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
  const content = data ? contentSchema.parse(data.content) : defaultContent;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const bundled: Record<string, string> = { "hero": heroImg, "room-search-rescue": searchImg, "room-alpha-team": alphaImg };
  async function resolveMedia(value: unknown): Promise<unknown> {
    if (typeof value === "string" && (value.startsWith("/src/assets/") || value.startsWith("/assets/"))) {
      const base = value.split("/").pop()?.split(".")[0]?.replace(/-[A-Za-z0-9_]{6,}$/, "") ?? "";
      return bundled[base] ?? value;
    }
    if (typeof value === "string" && value.startsWith("media:")) {
      const result = await supabaseAdmin.storage.from("site-media").createSignedUrl(value.slice(6), 86400);
      return result.data?.signedUrl ?? "";
    }
    if (Array.isArray(value)) return Promise.all(value.map(resolveMedia));
    if (value && typeof value === "object") return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([k,v]) => [k, await resolveMedia(v)])));
    return value;
  }
  return contentSchema.parse(await resolveMedia(content));
});