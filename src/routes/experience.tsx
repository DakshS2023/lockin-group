import { createFileRoute } from "@tanstack/react-router";
import { Play, Quote, ShieldCheck, Star } from "lucide-react";
import { testimonials, videos, rooms } from "@/content/site";
import { PageHero, seo } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/experience")({
  head: () => seo("The LockIn Experience — Gameplay, Highlights & Reviews", "See what playing a LockIn escape room feels like: gameplay highlights, behind-the-scenes footage, event photos and customer stories."),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <>
      <PageHero eyebrow="The LockIn experience" title={<>What it feels like to <span className="text-gradient">lock in.</span></>}>
        Gameplay highlights, behind-the-scenes moments and stories from the people who played.
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <p className="eyebrow">Video gallery</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Highlights & behind the scenes</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {videos.map((v, i) => (
            <figure key={v.title} className={`group relative overflow-hidden rounded-3xl border border-border bg-card ${i === 0 ? "md:col-span-2" : ""}`}>
              {v.src ? (
                <video src={v.src} controls preload="metadata" className="aspect-video w-full object-cover" />
              ) : (
                <div className="relative aspect-video">
                  <img src={rooms[i % rooms.length]?.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-40 transition-opacity group-hover:opacity-55" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-primary shadow-glow"><Play className="ml-1 h-6 w-6 text-primary-foreground" /></span>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">Video coming soon</span>
                </div>
              )}
              <figcaption className="flex items-center justify-between p-5">
                <span className="font-medium">{v.title}</span>
                <span className="eyebrow">{v.kind}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <p className="eyebrow">Event highlights</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl">From previous experiences</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`grid place-items-center rounded-2xl border border-dashed border-border bg-card text-xs text-muted-foreground ${i === 0 || i === 5 ? "row-span-2 aspect-[1/2]" : "aspect-square"}`}>
              Photo placeholder
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <p className="eyebrow">Customer stories</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">What players say</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <blockquote key={i} className="flex flex-col rounded-3xl border border-border bg-background p-7">
                <Quote className="h-6 w-6 text-primary" />
                <div className="mt-4 flex gap-1" aria-label={t.rating ? `${t.rating} out of 5` : "Rating pending"}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`h-4 w-4 ${t.rating && s < t.rating ? "fill-primary-glow text-primary-glow" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-muted-foreground">{t.quote}</p>
                <footer className="mt-6 text-sm"><span className="font-semibold">{t.name}</span> · <span className="text-muted-foreground">{t.event}</span></footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="flex gap-5 rounded-3xl border border-border bg-card p-7">
          <ShieldCheck className="h-7 w-7 shrink-0 text-primary-glow" />
          <div>
            <h2 className="text-lg font-semibold">Your privacy matters</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Footage and photos are only published with the consent of the people featured. For anyone under 18, we require
              written consent from a parent or guardian before any content is shared. If you appear in any of our content and
              would like it removed, contact us and we’ll take it down promptly.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
