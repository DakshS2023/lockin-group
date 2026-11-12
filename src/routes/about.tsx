import { createFileRoute } from "@tanstack/react-router";
import { PageHero, seo } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/CtaBand";

export const Route = createFileRoute("/about")({
  head: () => seo("About LockIn Group — LockIn Escape Room & Synesthesia AV", "Meet LockIn Group: LockIn Escape Room creates the experience, Synesthesia AV makes it more immersive."),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About us" title={<>Two divisions. <span className="text-gradient">One adventure.</span></>}>
        LockIn Escape Room creates the experience. Synesthesia AV makes it more immersive. LockIn Group brings everything together.
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 md:grid-cols-2 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10">
          <p className="eyebrow text-primary">The experience</p>
          <h2 className="mt-4 text-3xl font-semibold">LockIn Escape Room</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Designs and operates our original escape-room experiences — the stories, the puzzles and the game itself.</p>
        </div>
        <div className="rounded-3xl border border-border bg-gradient-to-br from-accent to-card p-10">
          <p className="eyebrow text-primary-glow">The immersion</p>
          <h2 className="mt-4 text-3xl font-semibold">Synesthesia AV by LockIn</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">Our technical division, bringing every experience to life with sound, lighting and visual effects.</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 border-t border-border px-5 py-24 md:grid-cols-2 lg:px-8">
        <div>
          <p className="eyebrow">Our mission</p>
          <p className="mt-5 font-display text-2xl leading-snug md:text-3xl">To make exciting, high-quality escape-room experiences accessible and affordable for everyone.</p>
        </div>
        <div>
          <p className="eyebrow">Our vision</p>
          <p className="mt-5 font-display text-2xl leading-snug md:text-3xl">To become one of Singapore’s leading providers of affordable, high-quality mobile escape-room entertainment.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
