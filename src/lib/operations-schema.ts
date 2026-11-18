import { z } from "zod";

export const roomSlugSchema = z.enum(["search-and-rescue", "alpha-team-classified", "the-genies-secret"]);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}, "Choose a valid date.");
export const bookingNoteSchema = z.object({ enquiry_id: z.string().uuid(), body: z.string().trim().min(1).max(10000), follow_up_date: date.nullable() });
export const roomOperationsSchema = z.object({ room_slug: roomSlugSchema, readiness: z.enum(["not_reviewed", "ready", "maintenance", "out_of_service"]), equipment: z.string().max(10000), setup_instructions: z.string().max(10000), internal_notes: z.string().max(10000) });
export const inspectionChecks = ["Puzzles and locks", "Props and equipment", "Sound and lighting", "Safety and access", "Reset and cleanliness"] as const;
export const inspectionSchema = z.object({ room_slug: roomSlugSchema, inspected_on: date, inspector: z.string().trim().min(1).max(200), result: z.enum(["passed", "action_required", "out_of_service"]), checklist: z.record(z.string(), z.boolean()).refine(checks => inspectionChecks.every(key => typeof checks[key] === "boolean"), "Complete the checklist."), findings: z.string().max(10000), actions: z.string().max(10000), next_inspection: date.nullable() }).refine(value => value.result !== "passed" || inspectionChecks.every(key => value.checklist[key]), "All checks must pass for a passed inspection.");