import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, Save, LogOut, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentEditor } from "@/components/site/ContentEditor";
import { seo } from "@/components/site/PageHero";
import { getAdminData, saveSiteContent, updateBooking } from "@/lib/admin.functions";
import { bookingStatuses, contentSchema } from "@/lib/content-schema";
import { supabase } from "@/integrations/supabase/client";
import type { SiteContent } from "@/content/site";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ ...seo("LockIn Admin — Bookings & Website", "Private booking management and website editing for LockIn Group."), meta: [...seo("LockIn Admin — Bookings & Website", "Private booking management and website editing for LockIn Group.").meta, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminPage,
});
const sections = ["Bookings", "Packages", "Rooms", "Videos", "Contact", "FAQs", "Testimonials", "Gallery", "Legal"] as const;
const input = "rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function AdminPage() {
  const load = useServerFn(getAdminData);
  const save = useServerFn(saveSiteContent);
  const update = useServerFn(updateBooking);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const query = useQuery({ queryKey: ["admin-data"], queryFn: () => load(), retry: false });
  const [section, setSection] = useState<(typeof sections)[number]>("Bookings");
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [busyId, setBusyId] = useState<string | null>(null);
  const content = draft ?? query.data?.content;
  async function signOut() {
    await queryClient.cancelQueries(); queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }
  async function persist() {
    if (!content) return;
    setSaving(true);
    try {
      await save({ data: contentSchema.parse(content) });
      setDraft(null);
      await queryClient.invalidateQueries({ queryKey: ["admin-data"] });
      await queryClient.invalidateQueries({ queryKey: ["site-content"] });
      toast.success("Website changes saved.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "Changes could not be saved."); }
    finally { setSaving(false); }
  }
  const bindings: Record<string, (keyof SiteContent)[]> = { Packages: ["packagesIntro", "packages", "packageComparison", "packagesDisclaimer"], Rooms: ["rooms"], Videos: ["videos"], Contact: ["site"], FAQs: ["faqs"], Testimonials: ["testimonials"], Gallery: ["gallery"], Legal: ["legal"] };
  const bookings = query.data?.bookings.filter(b => (status === "all" || b.status === status) && `${b.full_name} ${b.email} ${b.event_type} ${b.preferred_room ?? ""}`.toLowerCase().includes(search.toLowerCase())) ?? [];
  return <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8">
    <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border pb-8"><div><p className="eyebrow">LockIn Group</p><h1 className="mt-3 text-3xl font-semibold">Admin</h1></div><div className="flex gap-2"><Button variant="outline" onClick={() => void query.refetch()} title="Refresh"><RefreshCw />Refresh</Button><Button variant="outline" onClick={() => void signOut()}><LogOut />Sign out</Button></div></div>
    {query.isPending ? <p className="py-16 text-muted-foreground">Loading…</p> : query.isError ? <div role="alert" className="py-16"><h2 className="text-xl">Admin access required</h2><p className="mt-3 text-muted-foreground">Sign in with the designated admin account to view bookings and edit the website.</p><Button className="mt-6" onClick={() => void signOut()}>Use another account</Button></div> : <>
    <nav aria-label="Admin sections" className="my-8 flex flex-wrap gap-2">{sections.map(s => <Button key={s} variant={section === s ? "default" : "ghost"} onClick={() => setSection(s)}>{s}</Button>)}</nav>
    {section === "Bookings" ? <><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><h2 className="flex items-center gap-3 text-xl"><CalendarDays className="text-primary-glow" />Booking requests <span className="text-muted-foreground">({bookings.length})</span></h2><div className="flex flex-wrap gap-3"><label className="flex items-center gap-2"><Search className="h-4 w-4" /><input aria-label="Search bookings" className={input} placeholder="Search bookings" value={search} onChange={e => setSearch(e.target.value)} /></label><select aria-label="Filter booking status" className={input} value={status} onChange={e => setStatus(e.target.value)}><option value="all">All statuses</option>{bookingStatuses.map(s => <option key={s}>{s}</option>)}</select></div></div>
      <div className="space-y-5">{bookings.map(b => <article key={b.id} className="rounded-lg border border-border bg-card p-5 md:p-7"><div className="flex flex-wrap justify-between gap-4"><div><h3 className="text-lg font-semibold">{b.full_name}</h3><p className="mt-1 text-sm text-muted-foreground">{b.event_type} · Received {new Date(b.created_at).toLocaleDateString("en-SG", { timeZone: "Asia/Singapore" })}</p></div><select aria-label={`Status for ${b.full_name}`} className={input} value={b.status} disabled={busyId === b.id} onChange={async e => { setBusyId(b.id); try { await update({ data: { id: b.id, status: e.target.value as (typeof bookingStatuses)[number] } }); await query.refetch(); toast.success("Booking status saved."); } catch { toast.error("Status could not be saved."); } finally { setBusyId(null); } }}>{bookingStatuses.map(s => <option key={s}>{s}</option>)}</select></div><dl className="mt-6 grid gap-4 break-words text-sm sm:grid-cols-2 lg:grid-cols-3">{[["Email", b.email], ["Phone", b.phone], ["Room", b.preferred_room], ["Package", b.preferred_package], ["Participants", b.participants], ["Event date", b.event_date], ["Consultation (Singapore)", b.consultation_at ? new Date(b.consultation_at).toLocaleString("en-SG", { timeZone: "Asia/Singapore" }) : null], ["Venue", b.venue]].map(([k,v]) => <div key={String(k)}><dt className="text-muted-foreground">{k}</dt><dd className="mt-1">{v ?? "—"}</dd></div>)}</dl>{b.notes && <p className="mt-5 whitespace-pre-wrap border-t border-border pt-4 text-sm">{b.notes}</p>}</article>)}{!bookings.length && <p className="py-12 text-muted-foreground">No booking requests match.</p>}</div></> : content && <div className="max-w-4xl"><div className="mb-8 flex flex-wrap justify-between gap-4"><h2 className="text-2xl font-semibold">{section}</h2><div className="flex gap-3"><Button variant="outline" disabled={!draft || saving} onClick={() => setDraft(null)}>Discard changes</Button><Button disabled={!draft || saving} onClick={() => void persist()}><Save />{saving ? "Saving…" : "Save changes"}</Button></div></div><div className="space-y-10">{bindings[section]?.map(key => <div key={key}><ContentEditor name={key} value={content[key]} onChange={value => setDraft({ ...content, [key]: value })} /></div>)}</div><Button className="mt-8" disabled={!draft || saving} onClick={() => void persist()}><Save />Save changes</Button></div>}
    </>}
  </section>;
}