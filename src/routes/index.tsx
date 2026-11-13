import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Truck, Wallet, Users, ArrowRight } from "lucide-react";
import { rooms, site, packages, faqs, videos } from "@/content/site";
import { RoomCard } from "@/components/site/RoomCard";
import { seo } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CtaBand } from "@/components/site/CtaBand";

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
      <section className="relative flex min-h-[88svh] items-end overflow-hidden">
        <img src={site.heroImage} alt="" width={1920} height={1088} className="absolute inset-0 h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:pb-20">
          <p className="eyebrow reveal inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Singapore’s mobile escape room experience
          </p>
          <h1 className="reveal mt-7 max-w-5xl text-4xl font-semibold leading-[0.98] [animation-delay:120ms] sm:text-5xl lg:text-7xl">
            LOCKIN <span className="text-gradient">GROUP.</span>
          </h1>
          <p className="reveal mt-7 max-w-xl text-lg text-muted-foreground [animation-delay:240ms]">
            Immersive escape-room experiences. Original mysteries. Unforgettable adventures. Delivered directly to your venue.
          </p>
          <div className="reveal mt-10 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <Link to="/" hash="rooms" className="rounded-full bg-gradient-primary px-8 py-4 text-center text-xs font-semibold tracking-[0.18em] text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">
              EXPLORE OUR ROOMS
            </Link>
            <Link to="/contact" hash="consultation" className="rounded-full border border-foreground/25 bg-background/40 px-8 py-4 text-center text-xs font-semibold tracking-[0.18em] backdrop-blur transition-colors hover:bg-foreground/10">
              BOOK A CONSULTATION
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section id="about" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 lg:px-8">
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
      <section id="rooms" className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-20 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Our experiences</p>
            <h2 className="mt-5 text-3xl font-semibold md:text-5xl">Choose your mystery.</h2>
          </div>

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

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="eyebrow">LockIn Plus · Synesthesia AV included</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Choose your level of adventure.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{packages.map(p => <article key={p.id} className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold">{p.name}</h3><p className="mt-4 text-3xl font-display">{p.duration}<span className="ml-2 text-sm font-sans text-muted-foreground">minutes</span></p><p className="mt-4 text-sm text-muted-foreground">{p.blurb}</p>
        </article>)}</div>
        <p className="mt-5 text-sm text-muted-foreground">Proposed packages; gameplay durations shown. Final inclusions are confirmed during consultation.</p>
        <Button asChild variant="outline" className="mt-8"><Link to="/pricing">Read more — packages <ArrowRight /></Link></Button>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <Accordion type="multiple" className="border-t border-border">
          <AccordionItem value="about-more">
            <AccordionTrigger className="py-6 text-lg">More about LockIn Group</AccordionTrigger>
            <AccordionContent className="grid gap-8 text-muted-foreground md:grid-cols-2">
              <div><h3 className="mb-3 text-lg text-foreground">Our mission</h3><p>To make exciting, high-quality escape-room experiences accessible and affordable for everyone.</p></div>
              <div><h3 className="mb-3 text-lg text-foreground">Our vision</h3><p>To become one of Singapore’s leading providers of affordable, high-quality mobile escape-room entertainment.</p></div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="highlights" id="highlights" className="scroll-mt-28">
            <AccordionTrigger className="py-6 text-lg">Gameplay & event highlights</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-6 sm:grid-cols-2">{videos.map((v,i) => <figure key={v.title} className="overflow-hidden rounded-lg border border-border bg-card">
                {v.src ? <video src={v.src} controls preload="metadata" className="aspect-video w-full" /> : <div className="relative aspect-video"><img src={rooms[i % rooms.length]?.image} alt="" loading="lazy" className="h-full w-full object-cover" /><span className="absolute bottom-3 left-3 bg-background/85 px-3 py-2 text-xs">Video coming soon</span></div>}
                <figcaption className="p-4">{v.title}</figcaption>
              </figure>)}</div>
              <p className="mt-6 text-muted-foreground">[APPROVED EVENT PHOTOS — TO BE PROVIDED]</p>
              <p className="mt-6 text-sm text-muted-foreground">Photos and footage are only published with consent. For anyone under 18, written consent from a parent or guardian is required. Contact us if you would like content featuring you removed.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq" id="faq" className="scroll-mt-28">
            <AccordionTrigger className="py-6 text-lg">Frequently asked questions</AccordionTrigger>
            <AccordionContent><Accordion type="single" collapsible>{faqs.map((f,i) => <AccordionItem key={f.q} value={`q${i}`}><AccordionTrigger className="text-left">{f.q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion></AccordionContent>
          </AccordionItem>
          <AccordionItem value="privacy" id="privacy" className="scroll-mt-28">
            <AccordionTrigger className="py-6 text-lg">Privacy Policy</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">We collect details submitted through our consultation form only to respond to your enquiry and plan your event. We do not sell your data. Photos and videos are only published with consent; anyone under 18 requires parent or guardian consent. For access, correction or deletion, contact {site.email}. [FULL PRIVACY POLICY — TO BE PROVIDED, INCLUDING PDPA DETAILS]</AccordionContent>
          </AccordionItem>
          <AccordionItem value="terms" id="terms" className="scroll-mt-28">
            <AccordionTrigger className="py-6 text-lg">Terms & Conditions</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">Submitting a consultation request does not confirm a booking. Bookings are confirmed only once approved by the LockIn team. Final pricing depends on the selected experience, venue and event requirements. [FULL TERMS & CONDITIONS — TO BE PROVIDED]</AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-12 flex flex-wrap gap-4"><Button asChild variant="outline"><Link to="/testimonials">Read more — testimonials <ArrowRight /></Link></Button><Button asChild><Link to="/contact">Contact LockIn <ArrowRight /></Link></Button></div>
      </section>
      <CtaBand />
    </>
  );
}
