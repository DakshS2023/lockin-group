import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Save, LogOut, RefreshCw, Globe, CalendarDays, ClipboardCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentEditor } from "@/components/site/ContentEditor";
import { seo } from "@/components/site/PageHero";
import { getAdminData, saveSiteContent } from "@/lib/admin.functions";
import { contentSchema } from "@/lib/content-schema";
import { supabase } from "@/integrations/supabase/client";
import type { SiteContent } from "@/content/site";
import { toast } from "sonner";
import { AdminBookings } from "@/components/site/AdminBookings";
import { AdminRooms } from "@/components/site/AdminRooms";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ ...seo("LockIn Admin — Bookings & Website", "Private booking management and website editing for LockIn Group."), meta: [...seo("LockIn Admin — Bookings & Website", "Private booking management and website editing for LockIn Group.").meta, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminPage,
});
const sections = ["Packages", "Rooms", "Room operations", "Videos", "Contact", "FAQs", "Testimonials", "Gallery", "Legal"] as const;

function AdminPage() {
  const load = useServerFn(getAdminData);
  const save = useServerFn(saveSiteContent);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const query = useQuery({ queryKey: ["admin-data"], queryFn: () => load(), retry: false });
  const [section, setSection] = useState<(typeof sections)[number]>("Packages");
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [workspace, setWorkspace] = useState<"website" | "bookings">("bookings");
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
  return <section className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8">
    <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border pb-8"><div><p className="eyebrow">LockIn Group / Control centre</p><h1 className="mt-3 text-3xl font-semibold">Admin workspace</h1></div><div className="flex flex-wrap gap-2"><Button variant="outline" size="icon" onClick={() => void query.refetch()} title="Refresh admin data" aria-label="Refresh admin data"><RefreshCw /></Button><Button variant="outline" asChild><Link to="/"><ExternalLink />View website</Link></Button><Button variant="ghost" onClick={() => void signOut()}><LogOut />Sign out</Button></div></div>
    {query.isPending ? <p className="py-16 text-muted-foreground">Loading…</p> : query.isError ? <div role="alert" className="py-16"><h2 className="text-xl">Admin access required</h2><p className="mt-3 text-muted-foreground">Sign in with the designated admin account to view bookings and edit the website.</p><Button className="mt-6" onClick={() => void signOut()}>Use another account</Button></div> : query.data && <>
      <div role="tablist" aria-label="Admin workspaces" className="my-8 grid grid-cols-2 gap-3 sm:max-w-xl">
        <Button role="tab" aria-selected={workspace === "bookings"} variant={workspace === "bookings" ? "default" : "outline"} className="h-16 justify-start rounded-md px-5" onClick={() => setWorkspace("bookings")}><CalendarDays className="h-5 w-5" /><span>Bookings <span className="ml-2 font-mono text-xs">{query.data.bookings.length}</span></span></Button>
        <Button role="tab" aria-selected={workspace === "website"} variant={workspace === "website" ? "default" : "outline"} className="h-16 justify-start rounded-md px-5" onClick={() => setWorkspace("website")}><Globe className="h-5 w-5" />Website</Button>
      </div>
      {workspace === "bookings" ? <AdminBookings bookings={query.data.bookings} notes={query.data.notes} refresh={() => query.refetch()} /> : <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)]">
        <nav aria-label="Website sections" className="flex flex-wrap content-start gap-2 lg:flex-col lg:border-r lg:border-border lg:pr-5">{sections.map(s => <Button key={s} variant={section === s ? "secondary" : "ghost"} className="justify-start rounded-md" onClick={() => setSection(s)}>{s === "Room operations" && <ClipboardCheck className="h-4 w-4" />}{s}</Button>)}</nav>
        {section === "Room operations" ? <AdminRooms rooms={content?.rooms ?? []} operations={query.data.operations} inspections={query.data.inspections} refresh={() => query.refetch()} /> : content && <div className="min-w-0 max-w-4xl"><div className="mb-8 flex flex-wrap justify-between gap-4"><div><p className="eyebrow">Website content</p><h2 className="mt-3 text-2xl font-semibold">{section}</h2></div><div className="flex flex-wrap items-center gap-3">{draft && <span className="text-xs text-primary-glow">Unsaved changes</span>}<Button variant="outline" disabled={!draft || saving} onClick={() => setDraft(null)}>Discard changes</Button><Button disabled={!draft || saving} onClick={() => void persist()}><Save />{saving ? "Saving…" : "Save changes"}</Button></div></div><div className="space-y-10">{bindings[section]?.map(key => <div key={key}><ContentEditor name={key} value={content[key]} onChange={value => setDraft({ ...content, [key]: value })} /></div>)}</div><Button className="mt-8" disabled={!draft || saving} onClick={() => void persist()}><Save />Save changes</Button></div>}
      </div>}
    </>}
  </section>;
}
