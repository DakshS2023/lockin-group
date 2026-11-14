import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { rooms, packages } from "@/content/site";
import { enquirySchema, eventTypes, type EnquiryInput } from "@/lib/enquiry";
import { PageHero, seo } from "@/components/site/PageHero";

type Search = { room?: string; package?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (typeof s["room"] === "string") out.room = s["room"];
    if (typeof s["package"] === "string") out.package = s["package"];
    return out;
  },
  head: () => seo("Book a Consultation — LockIn Group", "Plan your next adventure. Request a free consultation for a LockIn mobile escape-room experience in Singapore."),
  component: BookPage,
});

const allPackages = packages.map((p) => ({ id: p.id, label: p.name }));

const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";

function BookPage() {
  const search = Route.useSearch();
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { preferred_room: search.room ?? "", preferred_package: search.package ?? "" },
  });

  const onSubmit = handleSubmit(async (raw) => {
    setServerError(null);
    const v = enquirySchema.parse(raw);
    const room = rooms.find((r) => r.slug === v.preferred_room)?.name ?? null;
    const pkg = allPackages.find((p) => p.id === v.preferred_package)?.label ?? null;
    const { error } = await supabase.from("enquiries").insert({
      full_name: v.full_name, email: v.email, phone: v.phone, event_type: v.event_type,
      preferred_room: room, preferred_package: pkg,
      participants: typeof v.participants === "number" ? v.participants : null,
      event_date: v.event_date || null,
      consultation_at: v.consultation_at ? new Date(v.consultation_at).toISOString() : null,
      venue: v.venue || null, notes: v.notes || null,
    });
    if (error) { setServerError("Something went wrong sending your request. Please try again."); return; }
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (done) {
    return (
      <section className="mx-auto max-w-2xl px-5 pb-28 pt-44 text-center reveal">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary-glow" />
        <h1 className="mt-6 text-3xl font-semibold md:text-5xl">Request received.</h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Thank you! Your consultation request has been sent. The LockIn team will contact you to confirm your consultation.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Please note: your booking is not confirmed until it has been approved by our team.</p>
        <Link to="/rooms" className="mt-9 inline-flex rounded-full border border-border px-7 py-3.5 text-xs font-semibold tracking-[0.18em] hover:bg-secondary">EXPLORE OUR ROOMS</Link>
      </section>
    );
  }

  const Err = ({ name }: { name: keyof EnquiryInput }) =>
    errors[name] ? <p className="mt-1.5 text-xs text-destructive">{String(errors[name]?.message)}</p> : null;

  return (
    <>
      <PageHero eyebrow="Book a consultation" title={<>LET’S PLAN YOUR NEXT <span className="text-gradient">ADVENTURE.</span></>}>
        Tell us a little about your event, and our team will help you find the perfect LockIn experience.
      </PageHero>
      <div className="mx-auto max-w-3xl px-5 pb-28">
        <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[2rem] border border-border bg-card p-6 sm:grid-cols-2 md:p-10">
          <L label="Full name *"><input className={field} autoComplete="name" {...register("full_name")} /><Err name="full_name" /></L>
          <L label="Email address *"><input type="email" className={field} autoComplete="email" {...register("email")} /><Err name="email" /></L>
          <L label="Contact number *"><input type="tel" className={field} autoComplete="tel" {...register("phone")} /><Err name="phone" /></L>
          <L label="Event type *">
            <select className={field} defaultValue="" {...register("event_type")}>
              <option value="" disabled>Select…</option>
              {eventTypes.map((t) => <option key={t}>{t}</option>)}
            </select><Err name="event_type" />
          </L>
          <L label="Preferred escape room">
            <select className={field} {...register("preferred_room")}>
              <option value="">Not sure yet</option>
              {rooms.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}
            </select>
          </L>
          <L label="Preferred package">
            <select className={field} {...register("preferred_package")}>
              <option value="">Not sure yet</option>
              {packages.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.duration}</option>)}
            </select>
          </L>
          <L label="Estimated participants"><input type="number" min={1} className={field} {...register("participants")} /><Err name="participants" /></L>
          <L label="Preferred event date"><input type="date" className={field} {...register("event_date")} /></L>
          <L label="Preferred consultation date & time"><input type="datetime-local" className={field} {...register("consultation_at")} /></L>
          <L label="Venue / location"><input className={field} {...register("venue")} /></L>
          <L label="Additional requirements or questions" full><textarea rows={4} className={field} {...register("notes")} /></L>
          <label className="flex items-start gap-3 text-sm text-muted-foreground sm:col-span-2">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" {...register("consent")} />
            <span>I agree that LockIn may store these details and contact me about my enquiry, as described in the <Link to="/privacy" className="underline">Privacy Policy</Link>.</span>
          </label>
          <div className="sm:col-span-2"><Err name="consent" /></div>
          {serverError && <p className="text-sm text-destructive sm:col-span-2" role="alert">{serverError}</p>}
          <button type="submit" disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60 sm:col-span-2">
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} REQUEST A CONSULTATION
          </button>
        </form>
      </div>
    </>
  );
}

function L({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-xs font-medium tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
