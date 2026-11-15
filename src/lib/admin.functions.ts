import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { contentSchema, statusSchema } from "./content-schema";
import type { Json } from "@/integrations/supabase/types";
import { defaultContent } from "@/content/site";

export const getAdminData = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data: admin, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || !admin) throw new Error("Admin access required.");
  const result = await context.supabase.from("enquiries").select("*").order("created_at", { ascending: false });
  if (result.error) throw new Error("Booking requests could not be loaded.");
  const stored = await context.supabase.from("site_content").select("content").eq("id", "main").maybeSingle();
  if (stored.error) throw new Error("Website content could not be loaded.");
  return { bookings: result.data, content: stored.data ? contentSchema.parse(stored.data.content) : defaultContent };
});

export const saveSiteContent = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator(input => contentSchema.parse(input)).handler(async ({ data, context }) => {
    const { data: admin, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (error || !admin) throw new Error("Admin access required.");
    const result = await context.supabase.from("site_content").upsert({ id: "main", content: data as unknown as Json, updated_at: new Date().toISOString() });
    if (result.error) throw new Error("Website changes could not be saved.");
    return { saved: true };
  });

export const updateBooking = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ id: z.string().uuid(), status: statusSchema }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: admin, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (error || !admin) throw new Error("Admin access required.");
    const result = await context.supabase.from("enquiries").update({ status: data.status }).eq("id", data.id).select("id").single();
    if (result.error) throw new Error("Booking status could not be saved.");
    return result.data;
  });