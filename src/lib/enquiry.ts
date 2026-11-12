import { z } from "zod";

export const eventTypes = ["Birthday", "Private Event", "Corporate Team Building", "School Event", "Other"] as const;

export const enquirySchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{6,19}$/, "Please enter a valid contact number"),
  event_type: z.enum(eventTypes, { errorMap: () => ({ message: "Please choose an event type" }) }),
  preferred_room: z.string().max(80).optional().or(z.literal("")),
  preferred_package: z.string().max(80).optional().or(z.literal("")),
  participants: z.coerce.number().int().min(1, "At least 1 participant").max(1000).optional().or(z.literal("").transform(() => undefined)),
  event_date: z.string().optional(),
  consultation_at: z.string().optional(),
  venue: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree so we can contact you" }) }),
});
export type EnquiryInput = z.input<typeof enquirySchema>;
