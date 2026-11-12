import { createFileRoute, Link } from "@tanstack/react-router";
import { rooms, type Room } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";
import { themeStyles } from "@/components/site/RoomCard";

export const Route = createFileRoute("/rooms/")({
  head: () => seo("Our Escape Rooms — LockIn Group Singapore", "Explore Search & Rescue, Alpha Team: Classified and The Genie’s Secret — three original mobile escape rooms by LockIn."),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <>
      <PageHero eyebrow="Our rooms" title={<>Three worlds. <span className="text-gradient">One choice.</span></>}>
        Original escape-room experiences, each with its own story, atmosphere and puzzles.
      </PageHero>
      <div className="mx-auto max-w-7xl space-y-10 px-5 pb-28 lg:px-8">
        {rooms.map((r, i) => <RoomFeature key={r.slug} room={r} flip={i % 2 === 1} />)}
      </div>
    </>
  );
}

export function RoomStats({ room }: { room: Room }) {
  const t = themeStyles[room.theme];
  const stats = [["Difficulty", room.difficulty], ["Group size", room.groupSize], ["Duration", room.duration], ["Age", room.age]];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
      {stats.map(([k, v]) => (
        <div key={k} className="bg-background/80 p-4">
          <dt className={`text-[0.65rem] uppercase tracking-[0.2em] ${t.accent} ${t.font}`}>{k}</dt>
          <dd className="mt-1 text-sm">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function RoomFeature({ room, flip }: { room: Room; flip: boolean }) {
  const t = themeStyles[room.theme];
  return (
    <article className={`relative overflow-hidden rounded-[2rem] border border-border bg-card ${room.theme === "classified" ? "bg-[repeating-linear-gradient(0deg,transparent,transparent_31px,var(--border)_32px)]" : ""}`}>
      <div className={`pointer-events-none absolute -top-24 ${flip ? "left-0" : "right-0"} h-72 w-72 rounded-full blur-[100px] ${t.glow}`} />
      <div className={`relative grid lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative min-h-[320px] overflow-hidden">
          <img src={room.image} alt={`${room.name} escape room`} loading="lazy" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
          {room.theme === "classified" && (
            <span className="absolute right-6 top-6 rotate-[-8deg] rounded border-2 border-destructive px-3 py-1 font-mono text-sm font-bold tracking-[0.3em] text-destructive">CLASSIFIED</span>
          )}
        </div>
        <div className="relative p-8 md:p-12">
          <p className={`text-xs uppercase tracking-[0.2em] ${t.accent} ${t.font}`}>{room.genre}</p>
          <h2 className={`mt-4 text-3xl font-semibold leading-tight md:text-4xl ${room.theme === "classified" ? "font-mono uppercase tracking-tight" : ""}`}>{room.name}</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">{room.storyline}</p>
          <div className="mt-7"><RoomStats room={room} /></div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {room.features.map((f) => <li key={f} className="rounded-full bg-secondary px-3 py-1 text-xs">{f}</li>)}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book" search={{ room: room.slug }} className="rounded-full bg-gradient-primary px-6 py-3.5 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow">BOOK THIS EXPERIENCE</Link>
            <Link to="/rooms/$slug" params={{ slug: room.slug }} className="rounded-full border border-border px-6 py-3.5 text-xs font-semibold tracking-[0.18em] hover:bg-secondary">VIEW DETAILS</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
