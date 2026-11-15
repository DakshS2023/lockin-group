import { describe, expect, it } from "vitest";
import { contentSchema, statusSchema, safeMediaUrl } from "@/lib/content-schema";
import { defaultContent } from "@/content/site";
import { readFileSync } from "node:fs";

describe("Admin rules", () => {
  it("keeps the initial booking status pending, requiring explicit team confirmation", () => {
    expect(statusSchema.parse("pending")).toBe("pending");
    expect(statusSchema.safeParse("auto-confirmed").success).toBe(false);
  });
  it("accepts editable package prices and room information", () => {
    const content = structuredClone(defaultContent);
    const pkg = content.packages[0]; const room = content.rooms[0];
    if (!pkg || !room) throw new Error("Missing default content");
    pkg.price = "S$120"; room.groupSize = "4–8 players";
    const parsed = contentSchema.parse(content);
    expect(parsed.packages[0]?.price).toBe("S$120");
    expect(parsed.rooms[0]?.groupSize).toBe("4–8 players");
  });
  it("rejects executable media addresses", () => { expect(safeMediaUrl("javascript:alert(1)")).toBe(false); });
  it("grants admin only to the specified verified email and protects private booking reads", () => {
    const sql = readFileSync("drizzle/migrations/0001_admin_access_and_site_content.sql", "utf8");
    expect(sql).toContain("lower(NEW.email) = 'lockinescaperooms@gmaill.com' AND NEW.email_confirmed_at IS NOT NULL");
    expect(sql).toContain('"Admins read enquiries" ON public.enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), \'admin\'))');
    expect(sql).toContain('"Admin edits content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), \'admin\'))');
  });
});