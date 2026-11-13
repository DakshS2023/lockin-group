import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Truck, Wallet, Users } from "lucide-react";
import { rooms, site } from "@/content/site";
import { RoomCard } from "@/components/site/RoomCard";
import { seo } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";
import { PackagePreview } from "@/components/site/PackagePreview";

export const Route = createFileRoute("/")({
  head: () => seo(
    "LockIn Group — Mobile Escape Rooms Delivered to Your Venue in Singapore",
    "Immersive escape-room experiences, original mysteries and unforgettable adventures for birthdays, families and corporate team building — delivered across Singapore.",
  ),
  component: Index,
});

const why = [
  { icon: Sparkles, title: "Original Experiences", text: "Every mystery is designed in-house — stories you won’t find anywhere else." },
  { icon: Truck, title: "Delivered to Your Venue", text: "Your home, office or event space becomes the adventure. We bring everything to you." },
  { icon: Wallet, title: "Affordable Packages", text: "High-quality entertainment without the premium price tag." },
  { icon: Users, title: "Unforgettable Group Experiences", text: "Puzzles, teamwork and storytelling that bring people together." },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img src={site.heroImage} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-40 lg:px-8 lg:pb-28">
          <p className="eyebrow reveal inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Singapore’s mobile escape room experience
          </p>
          <h1 className="reveal mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] [animation-delay:120ms] sm:text-6xl lg:text-8xl">
            THE GAME STARTS WHEN YOU <span className="text-gradient">LOCK IN.</span>
          </h1>
          <p className="reveal mt-7 max-w-xl text-lg text-muted-foreground [animation-delay:240ms]">
            Immersive escape-room experiences. Original mysteries. Unforgettable adventures. Delivered directly to your venue.
          </p>
          <div className="reveal mt-10 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <Link to="/rooms" className="rounded-full bg-gradient-primary px-8 py-4 text-center text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
              EXPLORE OUR ROOMS
            </Link>
            <Link to="/book" className="rounded-full border border-foreground/25 bg-background/40 px-8 py-4 text-center text-xs font-semibold tracking-[0.18em] backdrop-blur transition-colors hover:bg-foreground/10">
              BOOK A CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Welcome to LockIn</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              Ordinary spaces. <span className="text-muted-foreground">Extraordinary adventures.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              At LockIn, we turn ordinary spaces into extraordinary adventures. From thrilling investigations to
              mysterious discoveries, our escape-room experiences bring people together through puzzles, teamwork and storytelling.
            </p>
          </div>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-border bg-card p-8">
              <p className="eyebrow text-primary">Division 01</p>
              <h3 className="mt-3 text-2xl font-semibold">LockIn Escape Room</h3>
              <p className="mt-3 text-muted-foreground">Designs and operates our original escape-room experiences.</p>
            </div>
            <div className="rounded-3xl border border-border bg-gradient-to-br from-accent to-card p-8">
              <p className="eyebrow text-primary-glow">Division 02</p>
              <h3 className="mt-3 text-2xl font-semibold">Synesthesia AV by LockIn</h3>
              <p className="mt-3 text-muted-foreground">Enhances every experience through sound, lighting and visual effects.</p>
            </div>
            <p className="px-2 text-sm italic text-muted-foreground">{site.tagline}</p>
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section className="mx-auto max-w-7xl px-5 pb-28 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Our experiences</p>
            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Choose your mystery.</h2>
          </div>
          <Link to="/rooms" className="text-xs font-semibold tracking-[0.18em] text-muted-foreground hover:text-foreground">VIEW ALL ROOMS →</Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {rooms.map((r) => <RoomCard key={r.slug} room={r} />)}
        </div>
      </section>

      {/* Why */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
          <p className="eyebrow">Why LockIn?</p>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold md:text-5xl">Premium adventures, without the premium price.</h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-border bg-background p-7 transition-colors hover:border-primary/50">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary-glow"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-6 text-lg font-semibold leading-snug">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
