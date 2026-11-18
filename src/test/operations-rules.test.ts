import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { bookingNoteSchema, inspectionChecks, inspectionSchema, roomOperationsSchema } from "@/lib/operations-schema";

describe("Admin operational records", () => {
  it("stores booking notes separately from the customer message", () => {
    const note = bookingNoteSchema.parse({ enquiry_id: "00000000-0000-4000-8000-000000000001", body: "Call about venue access", follow_up_date: "2026-11-20" });
    expect(note.body).toBe("Call about venue access");
    expect(note.follow_up_date).toBe("2026-11-20");
    expect(bookingNoteSchema.safeParse({ ...note, body: " " }).success).toBe(false);
  });
  it("stores room equipment and inspection readiness independently of public room data", () => {
    const record = roomOperationsSchema.parse({ room_slug: "search-and-rescue", readiness: "maintenance", equipment: "Radio and locks", setup_instructions: "Reset radio", internal_notes: "Check batteries" });
    expect(record.equipment).toBe("Radio and locks");
    expect(record.readiness).toBe("maintenance");
    expect(roomOperationsSchema.safeParse({ ...record, room_slug: "unknown" }).success).toBe(false);
  });
  it("does not allow an inspection to pass with unchecked safety items", () => {
    const inspection = { room_slug: "search-and-rescue", inspected_on: "2026-11-18", inspector: "Team member", result: "passed", checklist: Object.fromEntries(inspectionChecks.map(key => [key, true])), findings: "", actions: "", next_inspection: null };
    expect(inspectionSchema.safeParse(inspection).success).toBe(true);
    expect(inspectionSchema.safeParse({ ...inspection, checklist: { ...inspection.checklist, "Safety and access": false } }).success).toBe(false);
  });
  it("keeps notes, room records and inspection history admin-only", () => {
    const sql = readFileSync("drizzle/migrations/0004_admin_operations.sql", "utf8");
    for (const table of ["booking_notes", "room_operations", "room_inspections"]) {
      expect(sql).toContain(`ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY`);
      expect(sql).toMatch(new RegExp(`ON public\\.${table} FOR SELECT TO authenticated USING \\(public\\.has_role\\(auth\\.uid\\(\\), 'admin'\\)\\)`));
      expect(sql).not.toMatch(new RegExp(`GRANT[^;]+ON public\\.${table} TO anon`));
    }
  });
});