import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, Download, Search, Save, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { bookingStatuses } from "@/lib/content-schema";
import { addBookingNote, updateBooking } from "@/lib/admin.functions";
import type { Tables } from "@/integrations/supabase/types";
import { adminInput, singaporeDate } from "./admin-shared";

type Booking = Tables<"enquiries">;
type Note = Tables<"booking_notes">;

function BookingDetails({ booking: b, notes, refresh }: { booking: Booking; notes: Note[]; refresh: () => Promise<unknown> }) {
  const update = useServerFn(updateBooking);
  const addNote = useServerFn(addBookingNote);
  const [body, setBody] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [busy, setBusy] = useState(false);
  async function saveNote(event: React.FormEvent) {
    event.preventDefault(); setBusy(true);
    try { await addNote({ data: { enquiry_id: b.id, body, follow_up_date: followUp || null } }); setBody(""); setFollowUp(""); await refresh(); toast.success("Private note saved."); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Note could not be saved."); }
    finally { setBusy(false); }
  }
  return <div className="min-w-0">
    <div className="flex flex-wrap items-start justify-between gap-5 border-b border-border pb-6"><div><p className="eyebrow">Booking request</p><h3 className="mt-3 break-words text-2xl font-semibold">{b.full_name}</h3><p className="mt-2 text-sm text-muted-foreground">{b.event_type} · {singaporeDate(b.created_at)}</p></div><label className="w-44 text-xs text-muted-foreground">Status<select aria-label={`Status for ${b.full_name}`} className={`${adminInput} mt-2`} value={b.status} disabled={busy} onChange={async e => { setBusy(true); try { await update({ data: { id: b.id, status: e.target.value as (typeof bookingStatuses)[number] } }); await refresh(); toast.success("Booking status saved."); } catch { toast.error("Status could not be saved."); } finally { setBusy(false); } }}>{bookingStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select></label></div>
    <dl className="my-6 grid gap-x-6 gap-y-5 break-words text-sm sm:grid-cols-2">{[["Email", b.email], ["Phone", b.phone], ["Room", b.preferred_room], ["Package", b.preferred_package], ["Participants", b.participants], ["Event date", b.event_date], ["Consultation (Singapore)", b.consultation_at ? singaporeDate(b.consultation_at) : null], ["Venue", b.venue]].map(([k, v]) => <div key={String(k)}><dt className="text-muted-foreground">{k}</dt><dd className="mt-1">{v ?? "—"}</dd></div>)}</dl>
    {b.notes && <div className="border-t border-border py-5"><h4 className="text-sm font-semibold">Customer message</h4><p className="mt-2 whitespace-pre-wrap break-words text-sm text-muted-foreground">{b.notes}</p></div>}
    <div className="border-t border-border pt-6"><h4 className="flex items-center gap-2 text-sm font-semibold"><MessageSquare className="h-4 w-4 text-primary-glow" />Private team notes</h4><div className="my-5 space-y-4">{notes.map(note => <article key={note.id} className="border-l-2 border-primary-glow pl-4"><p className="whitespace-pre-wrap break-words text-sm">{note.body}</p><p className="mt-2 text-xs text-muted-foreground">{singaporeDate(note.created_at)}{note.follow_up_date && <span className="ml-3 text-primary-glow">Follow up: {note.follow_up_date}</span>}</p></article>)}{!notes.length && <p className="text-sm text-muted-foreground">No team notes yet.</p>}</div>
      <form onSubmit={saveNote} className="space-y-4"><label className="block text-sm">New note<textarea aria-label="New booking note" className={`${adminInput} mt-2`} rows={3} maxLength={10000} required value={body} onChange={e => setBody(e.target.value)} /></label><div className="flex flex-wrap items-end justify-between gap-4"><label className="text-sm">Follow-up date<input aria-label="Follow-up date" type="date" className={`${adminInput} mt-2`} value={followUp} onChange={e => setFollowUp(e.target.value)} /></label><Button disabled={busy || !body.trim()} type="submit"><Save />{busy ? "Saving…" : "Save note"}</Button></div></form>
    </div>
  </div>;
}

export function AdminBookings({ bookings, notes, refresh }: { bookings: Booking[]; notes: Note[]; refresh: () => Promise<unknown> }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = bookings.filter(b => (status === "all" || b.status === status) && `${b.full_name} ${b.email} ${b.phone} ${b.event_type} ${b.preferred_room ?? ""} ${b.venue ?? ""}`.toLowerCase().includes(search.toLowerCase()));
  const active = filtered.find(b => b.id === selected) ?? filtered[0];
  function download() {
    const cell = (value: unknown) => { const text = String(value ?? ""); return `"${(/^[=+@\-\t\r]/.test(text) ? "'" + text : text).replaceAll('"', '""')}"`; };
    const csv = [["Name", "Email", "Phone", "Event", "Room", "Package", "Participants", "Event date", "Venue", "Status"], ...filtered.map(b => [b.full_name, b.email, b.phone, b.event_type, b.preferred_room, b.preferred_package, b.participants, b.event_date, b.venue, b.status])].map(row => row.map(cell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = "lockin-bookings.csv"; link.click(); URL.revokeObjectURL(url);
  }
  return <>
    <div className="grid grid-cols-2 gap-4 border-b border-border pb-7 lg:grid-cols-4">{[["Total requests", bookings.length], ["Pending", bookings.filter(b => b.status === "pending").length], ["Confirmed", bookings.filter(b => b.status === "confirmed").length], ["Follow-up notes", notes.filter(n => n.follow_up_date).length]].map(([label, count]) => <div key={label} className="border-l border-border pl-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 font-mono text-3xl">{count}</p></div>)}</div>
    <div className="my-6 flex flex-wrap items-center justify-between gap-4"><h2 className="flex items-center gap-2 text-lg font-semibold"><CalendarDays className="h-5 w-5 text-primary-glow" />Requests</h2><div className="flex w-full flex-wrap gap-3 sm:w-auto"><label className="relative min-w-0 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input aria-label="Search bookings" placeholder="Search requests" className={`${adminInput} pl-9`} value={search} onChange={e => setSearch(e.target.value)} /></label><select aria-label="Filter booking status" className={`${adminInput} w-auto`} value={status} onChange={e => setStatus(e.target.value)}><option value="all">All statuses</option>{bookingStatuses.map(s => <option key={s}>{s}</option>)}</select><Button variant="outline" onClick={download} disabled={!filtered.length} title="Export filtered bookings"><Download className="h-4 w-4" />Export</Button></div></div>
    {!filtered.length ? <p className="py-16 text-center text-muted-foreground">No booking requests match.</p> : <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]"><div className="max-h-[640px] space-y-2 overflow-y-auto lg:border-r lg:border-border lg:pr-5">{filtered.map(b => <Button key={b.id} variant="ghost" onClick={() => setSelected(b.id)} className={`h-auto w-full justify-start whitespace-normal rounded-md border p-4 text-left ${active?.id === b.id ? "border-primary-glow bg-accent" : "border-border"}`}><span className="block w-full min-w-0"><span className="flex flex-wrap justify-between gap-2"><span className="break-words font-semibold">{b.full_name}</span><span className="font-mono text-[10px] uppercase text-primary-glow">{b.status}</span></span><span className="mt-2 block text-xs text-muted-foreground">{b.event_type} · {b.event_date ?? "Date not set"}</span>{notes.some(n => n.enquiry_id === b.id && n.follow_up_date) && <span className="mt-2 block text-xs text-primary-glow">Follow-up scheduled</span>}</span></Button>)}</div>{active && <BookingDetails key={active.id} booking={active} notes={notes.filter(n => n.enquiry_id === active.id)} refresh={refresh} />}</div>}
  </>;
}