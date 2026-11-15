import { z } from "zod";
import { defaultContent, type SiteContent } from "@/content/site";

export function safeMediaUrl(value: string) {
  return value === "" || /^media:[a-zA-Z0-9._/-]+$/.test(value) || value.startsWith("/assets/") || value.startsWith("/src/assets/") || /^https:\/\//i.test(value);
}

function schemaFor(value: unknown, key = ""): z.ZodTypeAny {
  if (typeof value === "string") {
    const schema = z.string().max(20000);
    if (["image", "heroImage", "src"].includes(key)) return schema.refine(safeMediaUrl, "Use an HTTPS media address or upload a file.");
    if (key === "href") return schema.refine(v => v === "#" || /^https:\/\//i.test(v), "Use an HTTPS link.");
    return schema;
  }
  if (typeof value === "boolean") return z.boolean();
  if (value === null) return z.number().min(0).max(5).nullable();
  if (Array.isArray(value)) return z.array(schemaFor(value[0])).max(100);
  if (value && typeof value === "object") {
    const shape = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, schemaFor(v, k)]));
    if ("highlights" in value) shape.recommended = z.boolean().optional();
    if ("theme" in value) shape.theme = z.enum(["horror", "classified", "genie"]);
    if ("slug" in value) shape.slug = z.enum(["search-and-rescue", "alpha-team-classified", "the-genies-secret"]);
    return z.object(shape);
  }
  return z.unknown();
}

export const contentSchema = schemaFor(defaultContent) as z.ZodType<SiteContent>;
export const bookingStatuses = ["pending", "contacted", "confirmed", "cancelled"] as const;
export const statusSchema = z.enum(bookingStatuses);