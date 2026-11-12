import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getRoom, rooms } from "@/content/site";
import { themeStyles, RoomCard, RoomStats } from "@/components/site/RoomCard";

export const Route = createFileRoute("/rooms/$slug")({
  loader: ({ params }) => {
    const room = getRoom(params.slug);
    if (!room) throw notFound();
    return { room };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.room.name} — LockIn Escape Room` : "Escape room not found — LockIn";
    const desc = loaderData ? `${loaderData.room.genre}. ${loaderData.room.description}` : "This escape room could not be found.";
    return { meta: [{ title }, { name: "description", content: desc }, { property: "og:title", content: title }, { property: "og:description", content: desc }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="text-3xl font-semibold">Room not found</h1>
      <Link to="/rooms" className="mt-6 inline-block text-primary">Back to all rooms</Link>
    </div>
  ),
  component: RoomPage,
});

function RoomPage() {
  const { room } = Route.useLoaderData();
  const t = themeStyles[room.theme];
  const others = rooms.filter((r) => r.slug !== room.slug);
  return (
    <>
      <section className="relative flex min-h-[85svh] items-end overflow-hidden">
        <img src={room.image} alt={`${room.name} escape room`} width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 lg:px-8">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-xs tracking-[0.18em] text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> ALL ROOMS</Link>
          <p className={`reveal mt-8 text-xs uppercase tracking-[0.25em] ${t.accent} ${t.font}`}>{t.label} · {room.genre}</p>
          <h1 className={`reveal mt-4 max-w-4xl text-4xl font-semibold leading-[1.02] md:text-7xl ${room.theme === "classified" ? "font-mono uppercase" : ""}`}>{room.name}</h1>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div>
          <p className="eyebrow">The story</p>
          <p className="mt-5 text-xl leading-relaxed md:text-2xl">{room.storyline}</p>
          <p className="eyebrow mt-12">Special features</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {room.features.map((f) => <li key={f} className="rounded-2xl border border-border bg-card p-5 text-sm">{f}</li>)}
          </ul>
        </div>
        <aside className="h-fit rounded-3xl border border-border bg-card p-7 lg:sticky lg:top-28">
          <RoomStats room={room} />
          <Link to="/book" search={{ room: room.slug }} className="mt-6 flex justify-center rounded-full bg-gradient-primary px-6 py-4 text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow">BOOK THIS EXPERIENCE</Link>
          <Link to="/pricing" className="mt-3 flex justify-center rounded-full border border-border px-6 py-4 text-xs font-semibold tracking-[0.18em] hover:bg-secondary">SEE PACKAGES</Link>
        </aside>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-28 lg:px-8">
        <h2 className="text-2xl font-semibold">More experiences</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">{others.map((r) => <RoomCard key={r.slug} room={r} />)}</div>
      </section>
    </>
  );
}
